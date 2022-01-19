import { HStack, IconButton, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { colors, GeyserPrivacyUrl, GeyserTelegramUrl, GeyserTwitterUrl } from '../../constants';

export const Footer = () => (
	<HStack
		width="100%"
		borderTop="solid 1px"
		borderTopColor={colors.bgGreyDark}
		spacing="20px"
		paddingLeft="30px"
		backgroundColor="brand.bgGrey"
	>
		<Text color="grey">
			Geyser
		</Text>
		<Link color="grey" href={GeyserPrivacyUrl} t>
			Privacy
		</Link>
		<Link href={GeyserTwitterUrl} isExternal>
			<IconButton
				size="sm"
				background={'none'}
				aria-label="twitter"
				icon={<FaTwitter fontSize="25px" />}
				color={'grey'}
			/>
		</Link>
		<Link href={GeyserTelegramUrl} isExternal>
			<IconButton
				size="sm"
				background={'none'}
				aria-label="telegram"
				icon={<FaTelegramPlane fontSize="25px" />}
				marginLeft="5px"
				color={'grey'}
			/>
		</Link>
	</HStack>
);
