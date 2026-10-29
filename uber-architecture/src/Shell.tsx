import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {C, FONT} from './theme';

type ShellProps = {
	readonly kicker: string | null;
	readonly title: string | null;
	readonly captions: string[];
	readonly children: React.ReactNode;
};

export const Shell: React.FC<ShellProps> = ({
	kicker,
	title,
	captions,
	children,
}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const fade = Math.min(
		interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'}),
		interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
			extrapolateLeft: 'clamp',
		}),
	);
	const titleIn = spring({frame, fps, config: {damping: 200}});

	const segment = durationInFrames / captions.length;
	const captionIndex = Math.min(
		captions.length - 1,
		Math.floor(frame / segment),
	);
	const local = frame - captionIndex * segment;
	const captionOpacity = interpolate(
		local,
		[0, 8, segment - 8, segment],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.bg,
				fontFamily: FONT,
				color: C.text,
				opacity: fade,
			}}
		>
			<AbsoluteFill
				style={{
					backgroundImage: `radial-gradient(circle at ${20 + frame * 0.05}% 0%, rgba(6,193,103,0.16), transparent 55%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
					backgroundSize: '100% 100%, 80px 80px, 80px 80px',
				}}
			/>
			{title ? (
				<div
					style={{
						position: 'absolute',
						left: 120,
						top: 70,
						opacity: titleIn,
						transform: `translateY(${(1 - titleIn) * 24}px)`,
					}}
				>
					{kicker ? (
						<div
							style={{
								fontSize: 32,
								fontWeight: 700,
								letterSpacing: 6,
								textTransform: 'uppercase',
								color: C.green,
								marginBottom: 6,
							}}
						>
							{kicker}
						</div>
					) : null}
					<div style={{fontSize: 84, fontWeight: 800, lineHeight: 1.05}}>
						{title}
					</div>
				</div>
			) : null}
			{children}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: 170,
					background:
						'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0))',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 160,
					right: 160,
					bottom: 50,
					textAlign: 'center',
					fontSize: 38,
					fontWeight: 500,
					lineHeight: 1.3,
					opacity: captionOpacity,
				}}
			>
				{captions[captionIndex]}
			</div>
		</AbsoluteFill>
	);
};
