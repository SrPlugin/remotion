import React from 'react';
import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

const COLS = 6;
const ROWS = 4;

export const Monolith: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const split = spring({frame: frame - 150, fps, config: {damping: 200}, durationInFrames: 60});
	const blockIn = spring({frame: frame - 10, fps, config: {damping: 200}});

	const nodes: {x: number; y: number; sx: number; sy: number; key: string}[] = [];
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			nodes.push({
				key: `${r}-${c}`,
				sx: 360 + (c / (COLS - 1)) * 280,
				sy: 400 + (r / (ROWS - 1)) * 240,
				x: 900 + c * 150,
				y: 330 + r * 130,
			});
		}
	}
	const at = (c: number, r: number) => nodes[r * COLS + c];
	const pos = (n: (typeof nodes)[number]) => ({
		x: n.sx + (n.x - n.sx) * split,
		y: n.sy + (n.y - n.sy) * split,
	});

	return (
		<Shell
			kicker="Evolución"
			title="Un monolito, miles de servicios"
			captions={[
				'Al principio era un monolito: una sola aplicación en Python con una base de datos.',
				'Funcionó, hasta que cada cambio frenaba a todos los equipos.',
				'Uber lo separó en servicios independientes, cada uno con un dueño y un trabajo claro.',
			]}
		>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				{nodes.map((n) => {
					const [r, c] = n.key.split('-').map(Number);
					const a = pos(n);
					return (
						<React.Fragment key={n.key}>
							{c < COLS - 1 ? (
								<line x1={a.x} y1={a.y} x2={pos(at(c + 1, r)).x} y2={pos(at(c + 1, r)).y} stroke={C.green} strokeWidth={2} opacity={split * 0.6} />
							) : null}
							{r < ROWS - 1 ? (
								<line x1={a.x} y1={a.y} x2={pos(at(c, r + 1)).x} y2={pos(at(c, r + 1)).y} stroke={C.green} strokeWidth={2} opacity={split * 0.6} />
							) : null}
						</React.Fragment>
					);
				})}
				{nodes.map((n) => {
					const p = pos(n);
					return (
						<rect
							key={n.key}
							x={p.x - 26}
							y={p.y - 26}
							width={52}
							height={52}
							rx={12}
							fill={C.panel}
							stroke={C.green}
							strokeWidth={3}
							opacity={interpolate(split, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'})}
						/>
					);
				})}
			</svg>
			<div
				style={{
					position: 'absolute',
					left: 340,
					top: 380,
					width: 320,
					height: 280,
					borderRadius: 28,
					background: C.panel,
					border: `3px solid ${C.muted}`,
					opacity: blockIn * (1 - Math.min(1, split * 5)),
					transform: `scale(${0.9 + 0.1 * blockIn})`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div style={{fontSize: 52, fontWeight: 800}}>Monolito</div>
				<div style={{fontSize: 28, color: C.muted, marginTop: 6}}>Python · una DB</div>
			</div>
			<div style={{position: 'absolute', left: 340, top: 760, fontSize: 44, fontWeight: 700, color: C.muted, opacity: 1 - split}}>
				Antes: una sola app
			</div>
			<div style={{position: 'absolute', left: 900, top: 800, fontSize: 44, fontWeight: 700, color: C.green, opacity: split}}>
				Hoy: servicios con dueño y misión
			</div>
		</Shell>
	);
};
