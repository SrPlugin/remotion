import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Edge} from '../Diagram';
import {Shell} from '../Shell';
import {C} from '../theme';

const chips = ['Multi-región', 'Cadence', 'Jaeger', 'M3'];
const chipSub = ['Failover', 'Workflows', 'Trazas', 'Métricas'];

export const Resilience: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const down = interpolate(frame, [80, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const panels = [
		{x: 480, name: 'Región A', dead: down},
		{x: 1440, name: 'Región B', dead: 0},
	];

	return (
		<Shell
			kicker="Resiliencia"
			title="Diseñado para fallar bien"
			captions={[
				'Todo está pensado para fallar sin que lo notes.',
				'Operación en varias regiones, flujos duraderos con Cadence, trazas con Jaeger y métricas con M3.',
			]}
		>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<Edge from={{x: 960, y: 290}} to={{x: 480, y: 370}} start={10} phase={0} color={C.green} opacity={1 - down} />
				<Edge from={{x: 960, y: 290}} to={{x: 1440, y: 370}} start={10} phase={0} color={C.green} opacity={1} />
			</svg>
			<div style={{position: 'absolute', left: 860, top: 220, width: 200, textAlign: 'center', fontSize: 36, fontWeight: 700, color: C.muted}}>
				Tráfico
			</div>
			{panels.map((p) => (
				<div
					key={p.name}
					style={{
						position: 'absolute',
						left: p.x - 340,
						top: 370,
						width: 680,
						height: 270,
						borderRadius: 28,
						background: C.panel,
						border: `3px solid ${p.dead > 0.5 ? C.red : C.green}`,
						opacity: p.dead > 0.5 ? 0.55 : 1,
						padding: 28,
					}}
				>
					<div style={{fontSize: 44, fontWeight: 800, color: p.dead > 0.5 ? C.red : C.text}}>
						{p.name}
						{p.dead > 0.5 ? ' · caída' : ''}
					</div>
					<div style={{display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap'}}>
						{Array.from({length: 6}, (_, i) => (
							<div key={i} style={{width: 80, height: 70, borderRadius: 14, background: p.dead > 0.5 ? '#3a1a1a' : 'rgba(6,193,103,0.22)', border: `2px solid ${p.dead > 0.5 ? C.red : C.green}`}} />
						))}
					</div>
				</div>
			))}
			<div style={{position: 'absolute', left: 560, top: 655, width: 800, textAlign: 'center', fontSize: 44, fontWeight: 800, color: C.green, opacity: down}}>
				Failover automático a la Región B
			</div>
			{chips.map((c, i) => {
				const s = spring({frame: frame - (140 + i * 15), fps, config: {damping: 200}});
				return (
					<div
						key={c}
						style={{
							position: 'absolute',
							left: 150 + i * 410,
							top: 745,
							width: 380,
							height: 120,
							background: C.panel,
							border: `2px solid ${C.line}`,
							borderRadius: 22,
							opacity: s,
							transform: `translateY(${(1 - s) * 30}px)`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div style={{fontSize: 44, fontWeight: 800}}>{c}</div>
						<div style={{fontSize: 28, color: C.muted}}>{chipSub[i]}</div>
					</div>
				);
			})}
		</Shell>
	);
};
