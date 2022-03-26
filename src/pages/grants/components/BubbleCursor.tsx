import React from 'react';
import AnimatedCursor from 'react-animated-cursor';

export const BubbleCursor = () => (
	<AnimatedCursor
		innerSize={0}
		outerSize={21}
		color="32, 236, 199"
		outerAlpha={0.7}
		innerScale={0}
		outerScale={2.1}
		trailingSpeed={1}
		clickables={[
			'a',
			'label[for]',
			'select',
			'button',
			'.link',
			'#increments',
			'#blob',
		]}
	/>
);
