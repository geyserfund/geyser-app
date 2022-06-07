import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { isMobileMode } from '../../../utils';

interface ComingSoonProps {
image: string,
number: string,
date: string,
title: string,
}

export const ComingSoon = ({image, number, date, title}:ComingSoonProps) => {
	const isMobile = isMobileMode();
	return (

		<Box backgroundColor="white" p={2} boxShadow="lg" rounded="md" m={10}>

			<Box w={isMobile ? '275px' : '400px'}>
				<Image w={isMobile ? '275px' : '400px'} h={isMobile ? '275px' : '400px'} objectFit="cover" opacity={0.5} src={image} alt="grant" />

				<Text fontSize="xs" fontWeight="medium" color="#6E6E6E" my={2} opacity={0.5}>GRANT {number}: {date}</Text>

				<Text fontWeight="bold" fontSize="3xl" opacity={0.5}>{title}</Text>

				<Box bg="brand.bgGrey3" w="400px" h="100px" rounded="sm" mb={3} opacity={0.5}></Box>
				<Box bg="brand.bgGrey3" w="400px" h="100px" rounded="sm" mb={3} opacity={0.5}></Box>
				<Box bg="brand.bgGrey3" w="400px" h="50px" rounded="sm" opacity={0.5}></Box>

			</Box>

		</Box>

	);
};
