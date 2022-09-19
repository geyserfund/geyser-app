import { Avatar, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../interfaces';

interface IAvatarElement {
	user: IUser
}

export const AvatarElement = ({user}:IAvatarElement) => (
	<Link to={`/profile/${user.id}`}>
		<HStack >
			<Avatar size="xs" borderRadius="4px" src={user.imageUrl}/>
			<Text color="brand.neutral600">{user.username}</Text>
		</HStack>
	</Link>
);
