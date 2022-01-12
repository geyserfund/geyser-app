import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

export const NotFound = () => (
	<VStack
		width="100%"
		height="100%"
		backgroundColor="brand.bgGrey"
		display="flex"
		flexDirection="column"
		justifyContent="center"
		alignItems="center"
		spacing="20px"
	>
		<BiErrorAlt fontSize="80px"/>
		<Text fontSize="20px">
            Oops!
		</Text>
		<Text fontSize="20px">
            This page was not found.
		</Text>
	</VStack>
);
