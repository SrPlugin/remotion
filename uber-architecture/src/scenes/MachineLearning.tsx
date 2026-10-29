import React from 'react';
import {Edge, Node, Point} from '../Diagram';
import {Shell} from '../Shell';
import {C} from '../theme';

const input: Point = {x: 540, y: 680};
const core: Point = {x: 540, y: 900};
const outs = [
	{p: {x: 225, y: 1200}, title: 'ETA', sub: 'Llegada'},
	{p: {x: 540, y: 1200}, title: 'Precio', sub: 'Dinámico'},
	{p: {x: 855, y: 1200}, title: 'Fraude', sub: 'Detección'},
];

export const MachineLearning: React.FC = () => (
	<Shell
		kicker="Machine learning"
		title="Datos que deciden"
		captions={[
			'Sobre esos datos corre Michelangelo, la plataforma de machine learning de Uber.',
			'De ahí salen el tiempo de llegada, el precio dinámico y la detección de fraude.',
		]}
	>
		<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
			<Edge vertical from={{x: input.x, y: input.y + 50}} to={{x: core.x, y: core.y - 70}} start={30} phase={0} color={C.green} opacity={1} />
			{outs.map((o, i) => (
				<Edge key={o.title} vertical from={{x: core.x, y: core.y + 70}} to={{x: o.p.x, y: o.p.y - 55}} start={120 + i * 15} phase={i * 15} color={C.green} opacity={1} />
			))}
		</svg>
		<Node x={input.x} y={input.y} w={440} h={100} title="Datos" sub="Viajes · señales" titleSize={42} subSize={28} start={0} highlight={false} />
		<Node x={core.x} y={core.y} w={560} h={140} title="Michelangelo" sub="Plataforma de ML" titleSize={48} subSize={30} start={60} highlight />
		{outs.map((o, i) => (
			<Node key={o.title} x={o.p.x} y={o.p.y} w={290} h={110} title={o.title} sub={o.sub} titleSize={40} subSize={28} start={140 + i * 15} highlight={false} />
		))}
	</Shell>
);
