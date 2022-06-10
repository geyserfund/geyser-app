import React, { ReactElement } from 'react';
import { Text, HStack, Link } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { IAvatarMetadata } from '../../interfaces';

interface ILinkableAvatar {
  avatarMetadata: IAvatarMetadata;
  badges?: ReactElement[];
}

export const LinkableAvatar = ({ avatarMetadata, badges }: ILinkableAvatar) => {
	const calculateBadgesLength = () => {
		if (!badges) {
			return 0;
		}

		return badges.reduce((length, element) => length + element.props.badge.length, 0);
	};

	const getFormattedUsername = () => {
		if (!avatarMetadata.username) {
			return;
		}

		if (!badges && avatarMetadata.username.length > 25) {
			return `${avatarMetadata.username.slice(0, 23)}...`;
		}

		if (badges && badges.length && avatarMetadata.username.length + calculateBadgesLength() > 22) {
			return `${avatarMetadata.username.slice(0, 4)}...`;
		}

		return avatarMetadata.username;
	};

	return (
		<Link
			href={avatarMetadata.link}
			cursor={avatarMetadata.link ? 'pointer' : 'normal'}
			isExternal
			style={{ textDecoration: 'none' }}
		>
			<HStack spacing="5px" display="flex">
				<Avatar
					width="30px"
					height="30px"
					// Name={avatarMetadata.username}
					src={avatarMetadata.image}
					sx={{
						'& .chakra-avatar__initials': {
							lineHeight: '30px',
						},
					}}
				/>
				<Text fontSize="16px">
					{' '}
					{getFormattedUsername()}
				</Text>
				{badges}
			</HStack>
		</Link>
	);
};
