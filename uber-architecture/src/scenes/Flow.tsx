import React from 'react';
import {Edge, Node, Point} from '../Diagram';
import {Shell} from '../Shell';
import {C} from '../theme';

const app: Point = {x: 540, y: 660};
const gw: Point = {x: 540, y: 800};
const services = [
	{p: {x: 188, y: 980}, title: 'Dispatch', sub: 'Asignación'},
	{p: {x: 423, y: 980}, title: 'Precios', sub: 'Tarifa'},
	{p: {x: 658, y: 980}, title: 'Mapas', sub: 'ETA'},
	{p: {x: 893, y: 980}, title: 'Pagos', sub: 'Cobro'},
];
const kafka: Point = {x: 540, y: 1160};
const lake: Point = {x: 540, y: 1320};

export const Flow: React.FC = () => (
	<Shell
		kicker="Flujo"
		title="Una petición, muchos servicios"
		captions={[
			'Tu solicitud entra por un API Gateway que autentica y enruta.',
			'Se reparte a servicios especializados: Dispatch, Precios, Mapas con ETA y Pagos.',
			'Se comunican por gRPC y cada decisión se publica como evento en Kafka.',
		]}
	>
		<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
			<Edge vertical from={{x: app.x, y: app.y + 45}} to={{x: gw.x, y: gw.y - 45}} start={30} phase={0} color={C.green} opacity={1} />
			{services.map((s, i) => (
				<Edge key={s.title} vertical from={{x: gw.x, y: gw.y + 45}} to={{x: s.p.x, y: s.p.y - 60}} start={90 + i * 12} phase={i * 12} color={C.green} opacity={1} />
			))}
			{services.map((s, i) => (
				<Edge key={`k-${s.title}`} vertical from={{x: s.p.x, y: s.p.y + 60}} to={{x: kafka.x, y: kafka.y - 45}} start={300 + i * 10} phase={i * 12 + 25} color={C.blue} opacity={1} />
			))}
			<Edge vertical from={{x: kafka.x, y: kafka.y + 45}} to={{x: lake.x, y: lake.y - 45}} start={400} phase={0} color={C.blue} opacity={1} />
		</svg>
		<Node x={app.x} y={app.y} w={440} h={90} title="Apps" sub="Pasajero · Conductor" titleSize={40} subSize={26} start={0} highlight={false} />
		<Node x={gw.x} y={gw.y} w={440} h={90} title="API Gateway" sub="Auth · gRPC" titleSize={40} subSize={26} start={50} highlight={false} />
		{services.map((s, i) => (
			<Node key={s.title} x={s.p.x} y={s.p.y} w={215} h={120} title={s.title} sub={s.sub} titleSize={34} subSize={26} start={110 + i * 14} highlight={i === 0} />
		))}
		<Node x={kafka.x} y={kafka.y} w={440} h={90} title="Kafka" sub="Bus de eventos" titleSize={40} subSize={26} start={320} highlight={false} />
		<Node x={lake.x} y={lake.y} w={440} h={90} title="Data Lake" sub="Hadoop · Spark" titleSize={40} subSize={26} start={400} highlight={false} />
	</Shell>
);
