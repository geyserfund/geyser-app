import { Box, Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
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
			<Card width="75%" height="85%" display="flex">
				<Box backgroundColor="brand.bgGrey" flex={3}>
					<Text> Project</Text>
					<Box>
						<Heading>
							The Hut in El Salvador
						</Heading>
						<Text>Created 1 Week ago</Text>
					</Box>
					This is grey area
				</Box>
				<Box flex={2}>
					this is white area
				</Box>

			</Card>
		</Box>
	);
};
