import { Box, Text, HStack } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { Avatar } from '@chakra-ui/react';
// Import { Badge } from '../ui';
import { IProjectFunding } from '../../interfaces';
import { SatoshiIcon } from '../icons';
import { getDaysAgo } from '../../utils';
import { fonts } from '../../constants/fonts';

interface IIdBar extends HTMLChakraProps<'div'> {
	funder: IProjectFunding
}

export const IdBar = ({ funder, ...rest }: IIdBar) => {
	const { colorMode } = useColorMode();
	const dark = colorMode === 'dark';

	const timeAgo = getDaysAgo(funder.paidAt) || '';
	console.log('checking timeAgo', timeAgo);
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
				<HStack spacing="5px" display="flex">
					<Avatar width="30px" height="3	0px" name={funder.user.username} src={funder.user.imageUrl} sx={{
						'& .chakra-avatar__initials': {
							lineHeight: '30px',
						},
					}}/>
					<Text fontSize="16px"> {funder.user.username}</Text>
					{/* <Badge variant={''} /> */}
				</HStack>
				<Box display="flex" alignItems="center">
					<Text marginRight="5px">{`${funder.amount}`} </Text><SatoshiIcon />
				</Box>
			</Box>
			{funder.comment && <Text marginTop="5px" fontFamily={fonts.solway}>{funder.comment}</Text>}
			{timeAgo && <Text color="brand.textGrey" fontSize="10px" fontFamily={fonts.solway}>{`${timeAgo} ago`}</Text>}
		</Box>
	);
};
