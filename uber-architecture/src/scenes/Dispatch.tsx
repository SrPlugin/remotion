import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

const SIZE = 40;
const CX = 1350;
const CY = 560;
const RADIUS = 5;

const toPixel = (q: number, r: number) => ({
	x: CX + SIZE * Math.sqrt(3) * (q + r / 2),
	y: CY + SIZE * 1.5 * r,
});

const hexes: {q: number; r: number; dist: number}[] = [];
for (let q = -RADIUS; q <= RADIUS; q++) {
	for (let r = -RADIUS; r <= RADIUS; r++) {
		const dist = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
		if (dist <= RADIUS) hexes.push({q, r, dist});
	}
}

const corners = (x: number, y: number) =>
	[0, 1, 2, 3, 4, 5]
		.map((i) => {
			const a = (Math.PI / 180) * (60 * i - 30);
			return `${x + (SIZE - 2) * Math.cos(a)},${y + (SIZE - 2) * Math.sin(a)}`;
		})
		.join(' ');

const drivers = [
	{q: -2, r: 1, winner: true},
	{q: 3, r: -1, winner: false},
	{q: -1, r: -3, winner: false},
	{q: 2, r: 2, winner: false},
	{q: -4, r: 2, winner: false},
];

const bullets = [
	'H3 divide la Tierra en celdas',
	'Busca en anillos vecinos',
	'Asigna por tiempo de llegada',
];

export const Dispatch: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const match = interpolate(frame, [300, 340], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const rider = toPixel(0, 0);
	const win = toPixel(drivers[0].q, drivers[0].r);
	const wx = win.x + Math.sin(frame / 20) * 5;
	const wy = win.y + Math.cos(frame / 17) * 5;

	return (
		<Shell
			kicker="Dispatch"
			title="El mapa son hexágonos"
			captions={[
				'Para emparejar rápido, Uber no compara coordenadas una por una.',
				'Divide el planeta en hexágonos con H3, su sistema de indexado geoespacial de código abierto.',
				'Busca conductores en la celda del pasajero y en los anillos vecinos.',
				'Asigna al más cercano por tiempo estimado de llegada.',
			]}
		>
			{bullets.map((b, i) => {
				const s = spring({frame: frame - (60 + i * 100), fps, config: {damping: 200}});
				return (
					<div
						key={b}
						style={{
							position: 'absolute',
							left: 120,
							top: 330 + i * 150,
							width: 760,
							display: 'flex',
							alignItems: 'center',
							gap: 24,
							fontSize: 48,
							fontWeight: 700,
							opacity: s,
							transform: `translateX(${(1 - s) * -40}px)`,
						}}
					>
						<div style={{width: 24, height: 24, borderRadius: 12, background: C.green, flexShrink: 0}} />
						{b}
					</div>
				);
			})}
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				{hexes.map((h) => {
					const p = toPixel(h.q, h.r);
					const appear = interpolate(frame, [h.dist * 4, h.dist * 4 + 15], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					const t0 = 110 + h.dist * 35;
					const flash =
						h.dist === 0
							? 0.7
							: h.dist <= 3
								? interpolate(frame, [t0, t0 + 10, t0 + 50], [0, 0.5, 0.14], {
										extrapolateLeft: 'clamp',
										extrapolateRight: 'clamp',
									})
								: 0;
					return (
						<polygon
							key={`${h.q},${h.r}`}
							points={corners(p.x, p.y)}
							fill={C.green}
							fillOpacity={flash}
							stroke={C.line}
							strokeWidth={2}
							opacity={appear}
						/>
					);
				})}
				{match > 0 ? (
					<line
						x1={rider.x}
						y1={rider.y}
						x2={rider.x + (wx - rider.x) * match}
						y2={rider.y + (wy - rider.y) * match}
						stroke={C.green}
						strokeWidth={6}
						strokeLinecap="round"
					/>
				) : null}
				<circle cx={rider.x} cy={rider.y} r={16} fill={C.green} />
				<circle cx={rider.x} cy={rider.y} r={26 + (frame % 40)} fill="none" stroke={C.green} strokeWidth={3} opacity={1 - (frame % 40) / 40} />
				{drivers.map((d, i) => {
					const p = toPixel(d.q, d.r);
					const x = p.x + Math.sin(frame / 20 + i * 2) * 5;
					const y = p.y + Math.cos(frame / 17 + i) * 5;
					const show = interpolate(frame, [90, 110], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<circle
							key={i}
							cx={x}
							cy={y}
							r={d.winner && match > 0 ? 15 : 11}
							fill={d.winner && match > 0 ? C.green : C.text}
							opacity={show}
						/>
					);
				})}
			</svg>
			<div
				style={{
					position: 'absolute',
					left: (rider.x + wx) / 2 - 200,
					top: (rider.y + wy) / 2 - 90,
					fontSize: 44,
					fontWeight: 800,
					color: C.green,
					background: C.bg,
					padding: '4px 16px',
					borderRadius: 14,
					border: `2px solid ${C.green}`,
					opacity: match,
				}}
			>
				ETA 3 min
			</div>
		</Shell>
	);
};
