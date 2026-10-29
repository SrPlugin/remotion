import React from 'react';
import {Composition, Sequence} from 'remotion';
import {DataLayer} from './scenes/DataLayer';
import {Dispatch} from './scenes/Dispatch';
import {Flow} from './scenes/Flow';
import {Intro} from './scenes/Intro';
import {MachineLearning} from './scenes/MachineLearning';
import {Monolith} from './scenes/Monolith';
import {Outro} from './scenes/Outro';
import {Resilience} from './scenes/Resilience';
import {Ring} from './scenes/Ring';
import {Scale} from './scenes/Scale';

const UberArchitecture: React.FC = () => (
	<>
		<Sequence name="Intro" from={0} durationInFrames={240}>
			<Intro />
		</Sequence>
		<Sequence name="Escala" from={240} durationInFrames={360}>
			<Scale />
		</Sequence>
		<Sequence name="Monolito" from={600} durationInFrames={420}>
			<Monolith />
		</Sequence>
		<Sequence name="Flujo" from={1020} durationInFrames={540}>
			<Flow />
		</Sequence>
		<Sequence name="Dispatch" from={1560} durationInFrames={480}>
			<Dispatch />
		</Sequence>
		<Sequence name="Ringpop" from={2040} durationInFrames={360}>
			<Ring />
		</Sequence>
		<Sequence name="Datos" from={2400} durationInFrames={420}>
			<DataLayer />
		</Sequence>
		<Sequence name="ML" from={2820} durationInFrames={300}>
			<MachineLearning />
		</Sequence>
		<Sequence name="Resiliencia" from={3120} durationInFrames={240}>
			<Resilience />
		</Sequence>
		<Sequence name="Cierre" from={3360} durationInFrames={240}>
			<Outro />
		</Sequence>
	</>
);

export const RemotionRoot: React.FC = () => (
	<Composition
		id="UberArchitecture"
		component={UberArchitecture}
		durationInFrames={3600}
		fps={30}
		width={1080}
		height={1920}
	/>
);
