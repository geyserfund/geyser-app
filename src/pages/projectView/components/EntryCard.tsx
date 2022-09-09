import { Badge, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { AvatarElement } from './AvatarElement';

export const EntryCard = () => {
	console.log('checking osmethingS');
	return (
		<HStack spacing="10px">
			<Box maxHeight="150px" maxWidth="200px">
				<Image height="100%" width="100%" src={'https://picsum.photos/500/600'}/>
			</Box>
			<VStack alignItems="flex-start">
				<Text fontSize="30px" fontWeight={700} color="brand.neutral900">Bitcoin in the Savanah</Text>
				<Text color="brand.neutral600">Bitcoin in the Savanah</Text>
				<HStack >
					<AvatarElement username="Paco de la India" image="https://picsum.photos/200/300"/>
					<Badge>ARTICLE</Badge>
				</HStack>
			</VStack>
			<VStack justifyContent="center">
				<HStack>
					<Text color="brand.primary">21</Text>
					<BsHeartFill color="brand.neutral500"/>
				</HStack>
			</VStack>
		</HStack>
	);
};
