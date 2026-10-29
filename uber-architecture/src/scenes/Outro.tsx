import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

const words = ['Geo-datos.', 'Eventos.', 'Microservicios.'];

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cta = spring({frame: frame - 100, fps, config: {damping: 200}});

	return (
		<Shell
			kicker={null}
			title={null}
			captions={[
				'Tres ideas para llevarte: indexa el espacio, trabaja con eventos y divide por responsabilidades.',
				'Si quieres aprender a diseñar sistemas así, te esperamos en byteTECH.',
			]}
		>
			<div style={{position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontSize: 120, fontWeight: 800, lineHeight: 1.1}}>
				{words.map((w, i) => {
					const s = spring({frame: frame - (10 + i * 22), fps, config: {damping: 200}});
					return (
						<div key={w} style={{opacity: s, transform: `translateY(${(1 - s) * 40}px)`, color: i === 0 ? C.green : C.text}}>
							{w}
						</div>
					);
				})}
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 640,
					display: 'flex',
					justifyContent: 'center',
					opacity: cta,
					transform: `scale(${0.9 + 0.1 * cta})`,
				}}
			>
				<div style={{background: C.green, color: '#001a0d', fontSize: 52, fontWeight: 800, padding: '24px 56px', borderRadius: 999}}>
					Aprende a diseñar sistemas así en byteTECH
				</div>
			</div>
			<div style={{position: 'absolute', left: 0, right: 0, top: 800, textAlign: 'center', fontSize: 30, color: C.muted, opacity: cta}}>
				Basado en blogs públicos de Uber Engineering
			</div>
		</Shell>
	);
};
