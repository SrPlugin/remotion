import React from 'react';
import {
	interpolate,
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

const N = 10;
const CX = 540;
const CY = 1010;
const R = 200;
const FAILED = 3;
const palette = [C.green, C.blue, C.orange, C.purple, C.yellow];

const angle = (i: number) => (i / N) * Math.PI * 2 - Math.PI / 2;
const point = (a: number) => ({x: CX + R * Math.cos(a), y: CY + R * Math.sin(a)});

const lines = [
	'Cada nodo sabe qué le toca',
	'Los fallos se detectan por gossip',
	'El rango se redistribuye solo',
];

export const Ring: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const fail = interpolate(frame, [150, 190], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const intro = spring({frame, fps, config: {damping: 200}});

	return (
		<Shell
			kicker="Ringpop"
			title="Sin jefe central"
			captions={[
				'Miles de servidores deben coordinarse sin un punto central.',
				'Uber usa Ringpop, una librería propia de hashing consistente.',
				'Cada servidor sabe qué parte del trabajo le toca y detecta cuándo otro cae.',
			]}
		>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: intro}}>
				{Array.from({length: N}, (_, i) => {
					const a0 = angle(i - 1);
					const a1 = angle(i);
					const p0 = point(a0);
					const p1 = point(a1);
					const own = palette[i % palette.length];
					const next = palette[(i + 1) % palette.length];
					const color = i === FAILED ? interpolateColors(fail, [0, 1], [own, next]) : own;
					return (
						<path
							key={i}
							d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y}`}
							fill="none"
							stroke={color}
							strokeWidth={16}
							strokeLinecap="butt"
						/>
					);
				})}
				{Array.from({length: N}, (_, i) => {
					const p = point(angle(i));
					const dead = i === FAILED && fail > 0.5;
					return (
						<g key={i}>
							<circle cx={p.x} cy={p.y} r={30} fill={dead ? C.red : C.bg} stroke={dead ? C.red : C.text} strokeWidth={4} />
							<text x={p.x} y={p.y + 10} textAnchor="middle" fontSize={28} fontWeight={800} fill={C.text}>
								{dead ? '×' : i + 1}
							</text>
						</g>
					);
				})}
			</svg>
			{lines.map((l, i) => {
				const s = spring({frame: frame - (40 + i * 100), fps, config: {damping: 200}});
				return (
					<div
						key={l}
						style={{
							position: 'absolute',
							left: 80,
							top: 1290 + i * 58,
							width: 920,
							display: 'flex',
							alignItems: 'center',
							gap: 24,
							fontSize: 38,
							fontWeight: 700,
							opacity: s,
							transform: `translateX(${(1 - s) * 40}px)`,
						}}
					>
						<div style={{width: 24, height: 24, borderRadius: 12, background: C.green, flexShrink: 0}} />
						{l}
					</div>
				);
			})}
		</Shell>
	);
};
