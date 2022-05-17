import { Box, Text, HStack, Link } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import React, { ReactElement } from 'react';
import { Avatar, Image } from '@chakra-ui/react';
import { Badge } from '../ui';
import { IFundingTx, IProject } from '../../interfaces';
import { SatoshiIcon } from '../icons';
import { getDaysAgo, getRandomOrb } from '../../utils';
import { fonts } from '../../constants/fonts';
import { computeFunderBadges } from '../../helpers/computeBadges';
import FountainLogo from '../../assets/fountain-logo-black-small.png';

interface IIdBar extends HTMLChakraProps<'div'> {
	fundingTx: IFundingTx
	project: IProject
}

interface IAvatarMetadata {
	username?: string,
	appName?: string
	image?: string
	link?: string
}

interface ILinkableAvatar {
	avatarMetadata: IAvatarMetadata
	badges: ReactElement[]
}
const AnonymousAvatar = ({ seed }: { seed: number }) => (
	<HStack spacing="5px" display="flex">
		<Avatar width="30px" height="3	0px" name={'Anonymous'} src={getRandomOrb(seed)} sx={{
			'& .chakra-avatar__initials': {
				lineHeight: '30px',
			},
		}}/>
		<Text fontSize="16px"> {''}</Text>
	</HStack>
);

const LinkableAvatar = ({ avatarMetadata, badges }: ILinkableAvatar) => (
	<Link href={avatarMetadata.link} isExternal style={{ textDecoration: 'none' }}>
		<HStack spacing="5px" display="flex">
			<Avatar width="30px" height="30px" name={avatarMetadata.username} src={avatarMetadata.image} sx={{
				'& .chakra-avatar__initials': {
					lineHeight: '30px',
				},
			}}/>
			<Text fontSize="16px"> {avatarMetadata.username}</Text>
			{badges}
		</HStack>
	</Link>
);

export const IdBar = ({ fundingTx, project, ...rest }: IIdBar) => {
	const { funder, onChain, paidAt, source } = fundingTx;

	const getMetadata = (): IAvatarMetadata => {
		if (source) {
			if (source === 'Fountain') {
				const username = funder.user.username.replace('@', '');
				return {
					username,
					appName: 'Fountain.fm',
					image: FountainLogo,
					link: ` https://fountain.fm/${username}`,
				};
			}
		}

		return {
			username: funder.user.username,
			image: funder.user.imageUrl || getRandomOrb(fundingTx.id),
			link: `https://twitter.com/${funder.user.twitterHandle}`,
		};
	};

	const anonymous = funder.user.username === 'anonymous';
	const timeAgo = getDaysAgo(paidAt) || '';
	const avatarMetadata = getMetadata();
	const badges = computeFunderBadges({ project, funder }).map(badge => (<Badge key={`${badge.badge}`} badge={`${badge.badge}`}/>));

	const getAvatarSource = () => {
		if (anonymous) {
			return getRandomOrb(fundingTx.id);
		}

		if (sourceMetadata) {
			return sourceMetadata.image;
		}

		return funder.user.imageUrl;
	};

	return (
		<Box
			padding="10px 25px"
			mt={2}
			width="95%"
			boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
			borderRadius="12px"
			{...rest}
		><Box
				display="flex"
				justifyContent="space-between"
			>
				{
					anonymous
						? <AnonymousAvatar seed={fundingTx.id}/>
						: <LinkableAvatar
							avatarMetadata={avatarMetadata}
							badges={badges}
						/>
				}

				<Box display="flex" alignItems="center">
					<SatoshiIcon scale={0.7}/><Text marginLeft="5px">{`${fundingTx.amount}`} </Text>
				</Box>
			</Box>
			<Box marginTop="6px" width="100%">
				{fundingTx.comment && <Text mb="6px" fontFamily={fonts.solway}>{fundingTx.comment}</Text>}
				{fundingTx.media && <Image src={`${fundingTx.media}`} alt="gif" width="100%" borderRadius="4px" />}
				<Text mt="6px" color="brand.textGrey" fontSize="10px" fontFamily={fonts.solway}>
					{timeAgo && `${onChain ? '⛓' : '⚡️'} ${timeAgo} ago `}
					{!anonymous && avatarMetadata.appName && `from ${avatarMetadata.appName}`}
				</Text>
			</Box>

		</Box>
	);
};
