import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Card } from '../../components/ui';

export const Project = () => {
	console.log('this is the project component');
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
			<Card width="75%" height="85%">
				<Box color="Background.bgGrey" flex={3}>

				</Box>
				<Box color="Background.bgGrey" flex={2}>

				</Box>

			</Card>
		</Box>
	);
};
