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
			{rows.map((row, i) => {
				const s = spring({frame: frame - (30 + i * 45), fps, config: {damping: 200}});
				return (
					<div
						key={row.name}
						style={{
							position: 'absolute',
							left: 80,
							top: 600 + i * 205,
							width: 920,
							height: 175,
							background: C.panel,
							border: `2px solid ${C.line}`,
							borderLeft: `8px solid ${C.green}`,
							borderRadius: 22,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							padding: '0 36px',
							opacity: s,
							transform: `translateX(${(1 - s) * 80}px)`,
						}}
					>
						<div style={{fontSize: 48, fontWeight: 800}}>{row.name}</div>
						<div style={{fontSize: 32, color: C.muted, marginTop: 8}}>{row.desc}</div>
					</div>
				);
			})}
		</Shell>
	);
};
