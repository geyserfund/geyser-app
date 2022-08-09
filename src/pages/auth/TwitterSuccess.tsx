import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { isMobileMode } from '../../utils';

export const TwitterSuccess = () => {
	const isMobile = isMobileMode();
	return (
		<VStack
			height="100vh"
			width="100%"
			justifyContent="center"
			alignItems="center"
			spacing="20px"
		>
			<Text fontWeight="bold" fontSize={isMobile ? '2xl' : '3xl'} textAlign="center">Connected to Twitter</Text>
			<Box bg="brand.primary" borderRadius="full" width="75px" height="75px" display="flex" justifyContent="center" alignItems="center">
				<CheckIcon w={7} h={7}/>
			</Box>
			<Text fontSize={isMobile ? 'md' : 'lg'} w={isMobile ? '90%' : '550px'} textAlign="center">You can now close this view and go back to the original page where you can continue.</Text>
		</VStack>
	);
};
