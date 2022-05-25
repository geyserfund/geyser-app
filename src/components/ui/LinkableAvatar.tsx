import React, { ReactElement } from 'react';
import { Text, HStack, Link } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { IAvatarMetadata } from '../../interfaces';

interface ILinkableAvatar {
	avatarMetadata: IAvatarMetadata
	badges: ReactElement[]
}

export const LinkableAvatar = ({ avatarMetadata, badges }: ILinkableAvatar) => (
	<Link href={avatarMetadata.link} cursor={avatarMetadata.link ? 'pointer' : 'normal'} isExternal style={{ textDecoration: 'none' }}>
		<HStack spacing="5px" display="flex">
			<Avatar width="30px" height="30px" name={avatarMetadata.username} src={avatarMetadata.image} sx={{
				'& .chakra-avatar__initials': {
					lineHeight: '30px',
				},
			}} />
			<Text fontSize="16px"> {avatarMetadata.username}</Text>
			{badges}
		</HStack>
	</Link>
);
