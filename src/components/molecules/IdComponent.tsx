import { Avatar } from '@chakra-ui/avatar';
import { HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Badge, BadgeVariant } from '../ui';

export interface IIdComponent {
	URL: string;
	userName: string;
	fullName: string;
	twitter: boolean;
	badge: BadgeVariant
}

export const IdComponent = ({ URL, userName, fullName, badge }: IIdComponent) => (
	<HStack spacing="5px" display="flex">
		<Avatar width="20px" height="20px" name={fullName} src={URL} />
		<Text> {userName}</Text>
		<Badge variant={badge} />
	</HStack>
);

