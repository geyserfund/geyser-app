import { Avatar } from '@chakra-ui/avatar';
import Icon from '@chakra-ui/icon';
import { HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { Badge, BadgeVariant } from '../ui';

interface IIdComponent {
    URL: string;
    userName: string;
    fullName: string;
    twitter: boolean;
    badge: BadgeVariant
}

export const IdComponent = ({URL, userName, fullName, twitter, badge}: IIdComponent) => (
	<HStack spacing="5px" display="flex">
		<Avatar width="20px" height="20px" name={fullName} src={URL}/>
		<Text> {userName}</Text>
		{
			twitter && <Icon as={FaTwitter}/>
		}
		<Badge variant={badge}/>
	</HStack>
);

