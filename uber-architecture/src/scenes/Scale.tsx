import React from 'react';
import {
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

type Stat = {
	readonly prefix: string;
	readonly value: number | null;
	readonly text: string;
	readonly suffix: string;
	readonly label: string;
};

export const Scale: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const stats: Stat[] = [
		{prefix: '', value: 70, text: '', suffix: '+', label: 'países'},
		{prefix: '~', value: 30, text: '', suffix: 'M', label: 'viajes al día'},
		{prefix: '', value: 170, text: '', suffix: 'M+', label: 'usuarios al mes'},
		{prefix: '', value: null, text: 'Miles', suffix: '', label: 'de microservicios'},
	];

	return (
		<Shell
			kicker="Escala"
			title="Un planeta en movimiento"
			captions={[
				'Uber opera en más de 70 países.',
				'Cada día se completan decenas de millones de viajes.',
				'Cada uno genera ubicaciones, precios, pagos y mensajes en tiempo real.',
			]}
		>
			{stats.map((s, i) => {
				const start = 30 + i * 20;
				const enter = spring({frame: frame - start, fps, config: {damping: 200}});
				const count = interpolate(frame, [start, start + 70], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.out(Easing.cubic),
				});
				return (
					<div
						key={s.label}
						style={{
							position: 'absolute',
							left: 80 + (i % 2) * 480,
							top: 620 + Math.floor(i / 2) * 340,
							width: 440,
							height: 300,
							background: C.panel,
							border: `2px solid ${C.line}`,
							borderTop: `6px solid ${C.green}`,
							borderRadius: 28,
							opacity: enter,
							transform: `translateY(${(1 - enter) * 60}px)`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div style={{fontSize: 96, fontWeight: 800, color: C.green}}>
							{s.value === null
								? s.text
								: `${s.prefix}${Math.round(s.value * count)}${s.suffix}`}
						</div>
						<div style={{fontSize: 40, fontWeight: 600, marginTop: 8, textAlign: 'center', padding: '0 16px'}}>
							{s.label}
						</div>
					</div>
				);
			})}
			<div
				style={{
					position: 'absolute',
					left: 80,
					top: 1310,
					fontSize: 32,
					color: C.muted,
				}}
			>
				Cifras aproximadas publicadas por Uber
			</div>
		</Shell>
	);
};
