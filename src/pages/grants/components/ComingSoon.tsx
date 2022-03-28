import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface ComingSoonProps {
title: string
}

export const ComingSoon = ({title}:ComingSoonProps) => (
	<Box backgroundColor="white" p={10} boxShadow="lg" rounded="md" opacity="0.5" width="20rem" height="20.5rem" display="flex" justifyContent="center" alignItems="center" m={10}>
		<Box>
			<Text fontSize="2xl" fontWeight="bold">{title}</Text>
			<Text fontSize="lg" fontWeight="bold" color="brand.darkerPrimary">Coming soon</Text>
		</Box>
	</Box>

);
