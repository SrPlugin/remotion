import React from 'react';
import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {C} from './theme';

export type Point = {readonly x: number; readonly y: number};

const bezier = (a: Point, b: Point, t: number): Point => {
	const mx = (a.x + b.x) / 2;
	const u = 1 - t;
	return {
		x: u * u * u * a.x + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b.x,
		y: u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y,
	};
};

type EdgeProps = {
	readonly from: Point;
	readonly to: Point;
	readonly start: number;
	readonly phase: number;
	readonly color: string;
	readonly opacity: number;
	readonly vertical: boolean;
};

// Render inside an <svg>. Draws a curve, then loops a packet along it.
export const Edge: React.FC<EdgeProps> = ({
	from,
	to,
	start,
	phase,
	color,
	opacity,
	vertical,
}) => {
	const frame = useCurrentFrame();
	const draw = interpolate(frame, [start, start + 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const mx = (from.x + to.x) / 2;
	const my = (from.y + to.y) / 2;
	const d = vertical
		? `M ${from.x} ${from.y} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${to.y}`
		: `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
	const t = ((((frame - start - 20 + phase) % 50) + 50) % 50) / 50;
	const p = vertical
		? (() => {
				const q = bezier({x: from.y, y: from.x}, {x: to.y, y: to.x}, t);
				return {x: q.y, y: q.x};
			})()
		: bezier(from, to, t);

	return (
		<g opacity={opacity}>
			<path
				d={d}
				fill="none"
				stroke={C.line}
				strokeWidth={3}
				pathLength={1}
				strokeDasharray={1}
				strokeDashoffset={1 - draw}
			/>
			{frame > start + 20 ? (
				<circle cx={p.x} cy={p.y} r={7} fill={color} />
			) : null}
		</g>
	);
};

type NodeProps = {
	readonly x: number;
	readonly y: number;
	readonly w: number;
	readonly h: number;
	readonly title: string;
	readonly sub: string;
	readonly titleSize: number;
	readonly subSize: number;
	readonly start: number;
	readonly highlight: boolean;
};

export const Node: React.FC<NodeProps> = ({
	x,
	y,
	w,
	h,
	title,
	sub,
	titleSize,
	subSize,
	start,
	highlight,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - start, fps, config: {damping: 200}});

	return (
		<div
			style={{
				position: 'absolute',
				left: x - w / 2,
				top: y - h / 2,
				width: w,
				height: h,
				opacity: s,
				transform: `scale(${0.85 + 0.15 * s})`,
				background: C.panel,
				border: `2px solid ${highlight ? C.green : C.line}`,
				boxShadow: highlight ? '0 0 40px rgba(6,193,103,0.35)' : 'none',
				borderRadius: 22,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{fontSize: titleSize, fontWeight: 800}}>{title}</div>
			<div style={{fontSize: subSize, color: C.muted, marginTop: 4}}>{sub}</div>
		</div>
	);
};
