import React from 'react';
import {Edge, Node, Point} from '../Diagram';
import {Shell} from '../Shell';
import {C} from '../theme';

const app: Point = {x: 260, y: 510};
const gw: Point = {x: 640, y: 510};
const services = [
	{p: {x: 1060, y: 300}, title: 'Dispatch', sub: 'Asignación'},
	{p: {x: 1060, y: 440}, title: 'Precios', sub: 'Tarifa dinámica'},
	{p: {x: 1060, y: 580}, title: 'Mapas · ETA', sub: 'Rutas y tiempos'},
	{p: {x: 1060, y: 720}, title: 'Pagos', sub: 'Cobro seguro'},
];
const kafka: Point = {x: 1560, y: 380};
const lake: Point = {x: 1560, y: 650};

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
		<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
			<Edge from={{x: app.x + 150, y: app.y}} to={{x: gw.x - 150, y: gw.y}} start={30} phase={0} color={C.green} opacity={1} />
			{services.map((s, i) => (
				<Edge key={s.title} from={{x: gw.x + 150, y: gw.y}} to={{x: s.p.x - 150, y: s.p.y}} start={90 + i * 12} phase={i * 12} color={C.green} opacity={1} />
			))}
			{services.map((s, i) => (
				<Edge key={`k-${s.title}`} from={{x: s.p.x + 150, y: s.p.y}} to={{x: kafka.x - 150, y: kafka.y}} start={300 + i * 10} phase={i * 12 + 25} color={C.blue} opacity={1} />
			))}
			<Edge from={{x: kafka.x, y: kafka.y + 55}} to={{x: lake.x, y: lake.y - 55}} start={400} phase={0} color={C.blue} opacity={1} />
		</svg>
		<Node x={app.x} y={app.y} w={300} h={110} title="Apps" sub="Pasajero · Conductor" start={0} highlight={false} />
		<Node x={gw.x} y={gw.y} w={300} h={110} title="API Gateway" sub="Auth · gRPC" start={50} highlight={false} />
		{services.map((s, i) => (
			<Node key={s.title} x={s.p.x} y={s.p.y} w={300} h={110} title={s.title} sub={s.sub} start={110 + i * 14} highlight={i === 0} />
		))}
		<Node x={kafka.x} y={kafka.y} w={300} h={110} title="Kafka" sub="Bus de eventos" start={320} highlight={false} />
		<Node x={lake.x} y={lake.y} w={300} h={110} title="Data Lake" sub="Hadoop · Spark" start={400} highlight={false} />
	</Shell>
);
