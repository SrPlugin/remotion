import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Shell} from '../Shell';
import {C} from '../theme';

const rows = [
	{name: 'Kafka', desc: 'Bus de eventos: cada viaje emite mensajes'},
	{name: 'Schemaless · Cassandra', desc: 'Datos operativos con alta disponibilidad'},
	{name: 'Pinot', desc: 'Analítica en tiempo real'},
	{name: 'Hadoop · Spark', desc: 'Data lake: histórico y procesamiento masivo'},
];

export const DataLayer: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<Shell
			kicker="Datos"
			title="Cada viaje es un flujo de eventos"
			captions={[
				'Cada viaje es un flujo de eventos, y Kafka los transporta.',
				'Los datos operativos viven en Schemaless y Cassandra.',
				'El análisis en tiempo real, en Pinot. El histórico, en un data lake con Hadoop y Spark.',
			]}
		>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<line x1={170} y1={335} x2={170} y2={815} stroke={C.line} strokeWidth={4} />
				{[0, 1, 2].map((k) => {
					const t = (((frame + k * 40) % 120) / 120) * 480;
					return <circle key={k} cx={170} cy={335 + t} r={9} fill={C.green} />;
				})}
			</svg>
			{rows.map((row, i) => {
				const s = spring({frame: frame - (30 + i * 45), fps, config: {damping: 200}});
				return (
					<div
						key={row.name}
						style={{
							position: 'absolute',
							left: 240,
							top: 270 + i * 160,
							width: 1500,
							height: 130,
							background: C.panel,
							border: `2px solid ${C.line}`,
							borderLeft: `8px solid ${C.green}`,
							borderRadius: 22,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0 40px',
							opacity: s,
							transform: `translateX(${(1 - s) * 80}px)`,
						}}
					>
						<div style={{fontSize: 52, fontWeight: 800}}>{row.name}</div>
						<div style={{fontSize: 32, color: C.muted, width: 700, textAlign: 'right'}}>{row.desc}</div>
					</div>
				);
			})}
		</Shell>
	);
};
