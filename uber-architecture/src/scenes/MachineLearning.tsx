import React from 'react';
import {Edge, Node, Point} from '../Diagram';
import {Shell} from '../Shell';
import {C} from '../theme';

const input: Point = {x: 340, y: 560};
const core: Point = {x: 920, y: 560};
const outs = [
	{p: {x: 1530, y: 330}, title: 'ETA', sub: 'Tiempo de llegada'},
	{p: {x: 1530, y: 560}, title: 'Precio dinámico', sub: 'Oferta y demanda'},
	{p: {x: 1530, y: 790}, title: 'Fraude', sub: 'Detección en vivo'},
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
		<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
			<Edge from={{x: input.x + 150, y: input.y}} to={{x: core.x - 190, y: core.y}} start={30} phase={0} color={C.green} opacity={1} />
			{outs.map((o, i) => (
				<Edge key={o.title} from={{x: core.x + 190, y: core.y}} to={{x: o.p.x - 170, y: o.p.y}} start={120 + i * 15} phase={i * 15} color={C.green} opacity={1} />
			))}
		</svg>
		<Node x={input.x} y={input.y} w={300} h={110} title="Datos" sub="Viajes · señales" start={0} highlight={false} />
		<Node x={core.x} y={core.y} w={380} h={140} title="Michelangelo" sub="Plataforma de ML" start={60} highlight />
		{outs.map((o, i) => (
			<Node key={o.title} x={o.p.x} y={o.p.y} w={340} h={110} title={o.title} sub={o.sub} start={140 + i * 15} highlight={false} />
		))}
	</Shell>
);
