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
			<svg
				width={1920}
				height={1080}
				style={{position: 'absolute', inset: 0}}
			>
				<path
					d="M 120 800 C 450 640, 750 880, 1100 740 S 1550 640, 1800 760"
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
						<circle
							cx={1800}
							cy={760}
							r={16 + pulse * 40}
							fill="none"
							stroke={C.green}
							strokeWidth={4}
							opacity={1 - pulse}
						/>
						<circle cx={1800} cy={760} r={16} fill={C.green} />
					</>
				) : null}
			</svg>
			<div
				style={{
					position: 'absolute',
					left: 120,
					top: 200,
					width: 1600,
					fontSize: 128,
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
					left: 120,
					top: 560,
					fontSize: 52,
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
