import { Box, Text, HStack } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';
import { Badge, LinkableAvatar, AnonymousAvatar } from '../ui';
import { IProject, IFunder, IAvatarMetadata } from '../../interfaces';
import { SatoshiIcon } from '../icons';
import { getRandomOrb } from '../../utils';
import { computeFunderBadges } from '../../helpers/computeBadges';
import { commaFormatted } from '../../utils/helperFunctions';

interface IIdBarLeaderboard extends HTMLChakraProps<'div'> {
	project: IProject
	funder: IFunder
	count: number
}

export const IdBarLeaderboard = ({ funder, count, project, ...rest }: IIdBarLeaderboard) => {
	const getMetadata = (): IAvatarMetadata => {
		const username = funder.user.username.replace('@', '');
		return {
			username,
			image: funder.user.imageUrl || getRandomOrb(funder.id),
			link: funder.user.id ? `profile/${funder.user.id}` : '',
		};
	};

	const anonymous = funder.user.username === 'anonymous';
	const avatarMetadata = getMetadata();
	const badges = computeFunderBadges({ project, funder }).map(badge => (<Badge key={`${badge.badge}`} badge={`${badge.badge}`} />));

	return (
		<Box
			padding="10px 25px"
			mt={2}
			width="95%"
			boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
			_hover={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)'}}
			borderRadius="12px"
			{...rest}
		><Box
				display="flex"
				justifyContent="space-between"
			>
				<HStack>
					<Text fontWeight="bold" mr={2}>{count}</Text>
					{
						anonymous
							? <AnonymousAvatar seed={funder.id} />
							: <LinkableAvatar
								avatarMetadata={avatarMetadata}
								badges={badges}
							/>
					}
				</HStack>
				<Box display="flex" alignItems="center">
					<SatoshiIcon scale={0.7} /><Text marginLeft="5px">{`${commaFormatted(funder.amountFunded)}`} </Text>
				</Box>
			</Box>
		</Box>
	);
};
