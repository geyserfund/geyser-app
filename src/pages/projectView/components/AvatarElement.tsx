import { Avatar, HStack, Text } from '@chakra-ui/react';
import React from 'react';

interface IAvatarElement {
	username: string;
	image: string
}

export const AvatarElement = ({username, image}:IAvatarElement) => (
	<HStack>
		<Avatar size="xs" borderRadius="4px" src={image}/>
		<Text color="brand.neutral600">{username}</Text>
	</HStack>

);
