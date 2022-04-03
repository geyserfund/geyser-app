import { Avatar } from '@chakra-ui/avatar';
import { HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { BadgeVariant } from '../ui';

export interface IIdComponent {
	URL: string;
	username: string;
	fullName: string;
	twitter: boolean;
	badge: BadgeVariant
}

export const IdComponent = ({ URL, username, fullName }: IIdComponent) => (
	<HStack spacing="5px" display="flex">
		<Avatar width="30px" height="30px" name={fullName} src={URL} sx={{
			'& .chakra-avatar__initials': {
				lineHeight: '30px',
			},
		}} />
		<Text> {username}</Text>
	</HStack>
);

