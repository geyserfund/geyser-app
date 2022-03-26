import React from 'react';
import AnimatedCursor from 'react-animated-cursor';

export const BubbleCursor = () => (
	<AnimatedCursor
		innerSize={21}
		outerSize={21}
		color="32, 236, 199"
		outerAlpha={0.2}
		innerScale={0.7}
		outerScale={5}
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
