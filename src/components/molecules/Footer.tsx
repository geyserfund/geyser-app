import {
	HStack,
	IconButton,
	Link,
	Stack,
	Text,
	useDisclosure,
	VStack,
	Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { AnalyticsUrl, GeyserLignteningNodeUrl, GeyserPrivacyUrl, GeyserTelegramUrl, GeyserTwitterUrl } from '../../constants';
import { isMobileMode } from '../../utils';
import { SubscribeModal } from '../nav/SubscribeModal';
import { ButtonComponent, Linkin } from '../ui';

export const Footer = () => {
	const isMobile = isMobileMode();

	const {isOpen, onOpen, onClose} = useDisclosure();

	return (
		<VStack
			width="100%"
			backgroundColor="brand.bgGrey"
			alignItems="center"
			justifyContent="center"
			padding={isMobile ? '10px 10px' : '25px 32px'}
		>
			<Stack
				direction={isMobile ? 'column' : 'row'}
				width="100%"
				spacing="20px"
				justifyContent="space-between"
				alignItems="center"
			>
				<Wrap spacing={isMobile ? '10px' : '24px'} justify={isMobile ? 'center' : ' flex-start'}>
					<Text lineHeight="30px" fontWeight={600} color="brand.gray500">Connect: </Text>
					<Link href={GeyserTwitterUrl} isExternal>
						<IconButton
							size="sm"
							background={'none'}
							aria-label="twitter"
							icon={<FaTwitter fontSize="20px" />}
							color={'brand.gray500'}
						/>
					</Link>
					<Link href={GeyserTelegramUrl} isExternal>
						<IconButton
							size="sm"
							background={'none'}
							aria-label="telegram"
							icon={<FaTelegramPlane fontSize="20px" />}
							marginLeft="5px"
							color={'brand.gray500'}
						/>
					</Link>
					<ButtonComponent size="sm" minWidth="150px" onClick={onOpen}>
					Subscribe
					</ButtonComponent>
					<Linkin href={GeyserLignteningNodeUrl} isExternal>
						<ButtonComponent size="sm" minWidth="150px">
							{'Open a channel to Geyser\'s lightning node'}
						</ButtonComponent>
					</Linkin>
				</Wrap>
				<HStack spacing="24px">
					<Text color="brand.gray500">
			Geyser
					</Text>
					<Link color="brand.gray500" href={GeyserPrivacyUrl} isExternal>
						<Text color="brand.gray500">
			Privacy
						</Text>

					</Link>
					<Link color="brand.gray500" href={AnalyticsUrl} isExternal>
						<Text color="brand.gray500">
				Analytics
						</Text>

					</Link>
				</HStack>

			</Stack>

			{/* <Text textAlign="center" color="grey">
				Made with ❤️ from around the 🌍 by <Link href="https://twitter.com/metamick14" isExternal>@metamick14</Link>, <Link href="https://twitter.com/steliosats" isExternal>@steliosats</Link> & <Link href="https://twitter.com/sajald77" isExternal>@sajald77</Link>
		</Text> */}
			<SubscribeModal {...{isOpen, onClose}} />

		</VStack>

	);
};
