import { Box, Text, HStack, Link } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';
import { Avatar, Image } from '@chakra-ui/react';
import { Badge } from '../ui';
import { IFundingTx, IProject } from '../../interfaces';
import { SatoshiIcon } from '../icons';
import { getDaysAgo, getRandomOrb } from '../../utils';
import { fonts } from '../../constants/fonts';
import { computeFunderBadges } from '../../helpers/computeBadges';

interface IIdBar extends HTMLChakraProps<'div'> {
	fundingTx: IFundingTx
	project: IProject
}

interface IFundingSourceMetadata {
	name: string
	image?: string
}

const getFundingSourceMetadata = (source: string): IFundingSourceMetadata | undefined => {
	switch (source) {
		case 'Fountain':
			return {
				name: 'Fountain.fm',
				image: 'https://fountain.fm/images/fountain-logo-black-small.png',
			};
		default:
	}
};

export const IdBar = ({ fundingTx, project, ...rest }: IIdBar) => {
	const { funder, source, onChain, paidAt } = fundingTx;
	const sourceMetadata = getFundingSourceMetadata(source);

	const timeAgo = getDaysAgo(paidAt) || '';
	let anonymous = false;
	if (funder.user.username === 'anonymous') {
		anonymous = true;
	}

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
					funder.user.twitterHandle
						? <Link href={`https://twitter.com/${funder.user.twitterHandle}`} isExternal style={{ textDecoration: 'none' }}>
							<HStack spacing="5px" display="flex">
								<Avatar width="30px" height="30px" name={funder.user.username} src={funder.user.imageUrl} sx={{
									'& .chakra-avatar__initials': {
										lineHeight: '30px',
									},
								}}/>
								<Text fontSize="16px"> {funder.user.twitterHandle}</Text>
								{computeFunderBadges({project, funder }).map(badge => (<Badge key={`${badge.badge}`} badge={`${badge.badge}`}/>))}
							</HStack>
						</Link>
						: <HStack spacing="5px" display="flex">
							<Avatar width="30px" height="3	0px" name={anonymous ? 'Anonymous' : funder.user.username} src={getAvatarSource()} sx={{
								'& .chakra-avatar__initials': {
									lineHeight: '30px',
								},
							}}/>
							<Text fontSize="16px"> {anonymous ? '' : funder.user.username}</Text>
						</HStack>
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
					{sourceMetadata && `on ${sourceMetadata.name}`}
				</Text>
			</Box>

		</Box>
	);
};
