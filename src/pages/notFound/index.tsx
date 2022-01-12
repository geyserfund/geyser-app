import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

export const NotFound = () => (
	<Box width="100%" backgroundColor="brand.bgGrey" display="flex" justifyContent="center" alignItems="center">
		<BiErrorAlt fontSize="40px"/>
		<Text>
            Oops!
		</Text>
		<Text>
            This page was not found.
		</Text>
	</Box>
);
