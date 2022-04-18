import { Box, Text, HStack, Link } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { Avatar } from '@chakra-ui/react';
import { Badge } from '../ui';
import { IProjectFunding, IProject } from '../../interfaces';
import { SatoshiIcon } from '../icons';
import { getDaysAgo, getRandomOrb } from '../../utils';
import { fonts } from '../../constants/fonts';
import { computeFunderBadges } from '../../helpers/computeBadges';

interface IIdBar extends HTMLChakraProps<'div'> {
	fundingTx: IProjectFunding
	project: IProject
}

export const IdBar = ({ fundingTx, project, ...rest }: IIdBar) => {
	const { colorMode } = useColorMode();
	const dark = colorMode === 'dark';

	const { funder } = fundingTx;
	const timeAgo = getDaysAgo(fundingTx.paidAt) || '';
	let anonymous = false;
	if (funder.user.username === 'anonymous') {
		anonymous = true;
	}

	return (
		<Box
			padding="10px 25px"
			backgroundColor={dark ? 'brand.bgGreenDark' : 'brand.bgGreen'}
			width="100%"
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
								<Avatar width="30px" height="3	0px" name={funder.user.username} src={funder.user.imageUrl} sx={{
									'& .chakra-avatar__initials': {
										lineHeight: '30px',
									},
								}}/>
								<Text fontSize="16px"> {funder.user.twitterHandle}</Text>
								{computeFunderBadges({project, funder }).map(badge => (<Badge key={`${badge.badge}`} badge={`${badge.badge}`}/>))}
							</HStack>
						</Link>
						: <HStack spacing="5px" display="flex">
							<Avatar width="30px" height="3	0px" name={anonymous ? 'Anonymous' : funder.user.username} src={anonymous ? getRandomOrb(fundingTx.id) : funder.user.imageUrl} sx={{
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
			<Box marginTop="5px" width="100%">
				{fundingTx.comment && <Text fontFamily={fonts.solway}>{fundingTx.comment}</Text>}
				{timeAgo && <Text color="brand.textGrey" fontSize="10px" fontFamily={fonts.solway}>{`${fundingTx.onChain ? '⛓' : '⚡️'} ${timeAgo} ago`}</Text>}
			</Box>

		</Box>
	);
};
