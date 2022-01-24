import { HStack, IconButton, Link, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { AnalyticsUrl, colors, GeyserPrivacyUrl, GeyserTelegramUrl, GeyserTwitterUrl } from '../../constants';

export const Footer = () => (
	<VStack
		width="100%"
		borderTop="solid 1px"
		borderTopColor={colors.bgGreyDark}
		backgroundColor="brand.bgGrey"
		alignItems="center"
		justifyContent="center"
		paddingBottom="5px"
	>
		<HStack
			spacing="20px"
			paddingLeft="30px"
		>
			<Text color="grey">
			Geyser
			</Text>
			<Link color="grey" href={GeyserPrivacyUrl} isExternal>
				<Text color="grey">
			Privacy
				</Text>

			</Link>
			<Link color="grey" href={AnalyticsUrl} isExternal>
				<Text color="grey">
				Analytics
				</Text>

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

		<Text textAlign="center" color="grey">
				Made with ❤️ from around the 🌍 by <Link href="https://twitter.com/metamick14" isExternal>@metamick14</Link>, <Link href="https://twitter.com/steliosats" isExternal>@steliosats</Link> & <Link href="https://twitter.com/sajald77" isExternal>@sajald77</Link>
		</Text>
	</VStack>

);
