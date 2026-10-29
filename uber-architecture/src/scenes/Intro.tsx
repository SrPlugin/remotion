import React from 'react';
import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const head = spring({frame: frame - 10, fps, config: {damping: 200}});
	const sub = spring({frame: frame - 40, fps, config: {damping: 200}});
	const route = interpolate(frame, [20, 150], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const pulse = (frame % 40) / 40;

	return (
		<Shell
			kicker={null}
			title={null}
			captions={[
				'Abres la app, tocas Pedir, y en segundos hay un carro en camino.',
				'Detrás de ese toque hay una de las arquitecturas más estudiadas del mundo.',
			]}
		>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<path
					d="M 80 1330 C 300 1130, 480 1400, 620 1220 S 860 1040, 940 1180"
					fill="none"
					stroke={C.green}
					strokeWidth={10}
					strokeLinecap="round"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - route}
				/>
				{route >= 1 ? (
					<>
						<circle cx={940} cy={1180} r={16 + pulse * 40} fill="none" stroke={C.green} strokeWidth={4} opacity={1 - pulse} />
						<circle cx={940} cy={1180} r={16} fill={C.green} />
					</>
				) : null}
			</svg>
			<div
				style={{
					position: 'absolute',
					left: 80,
					top: 380,
					width: 920,
					fontSize: 112,
					fontWeight: 800,
					lineHeight: 1.05,
					opacity: head,
					transform: `translateY(${(1 - head) * 40}px)`,
				}}
			>
				Así encuentra Uber tu carro en{' '}
				<span style={{color: C.green}}>milisegundos</span>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 80,
					top: 840,
					width: 920,
					fontSize: 50,
					color: C.muted,
					fontWeight: 500,
					opacity: sub,
				}}
			>
				Arquitectura explicada en 2 minutos
			</div>
		</Shell>
	);
};
