import React, { useContext, useEffect } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { FiTwitter } from 'react-icons/fi';
import { ButtonComponent, Linkin } from '../ui';
import { Logo } from './Logo';
import { Box, HStack } from '@chakra-ui/layout';
import { NavMenu } from './NavMenu';
import { isDarkMode, isMobileMode } from '../../utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { ConnectTwitter } from '../molecules';
import { Avatar } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { AuthContext } from '../../context';
import { StartCrowdFundUrl, HomeUrl } from '../../constants';
import { useLocation, useHistory } from 'react-router';
import { customHistory } from '../../config';
import { Link, Show } from '@chakra-ui/react';
import { BubbleCursor } from '../../pages/grants/components/BubbleCursor';

const useStyles = createUseStyles({
	userInfo: {
		marginRight: '12px',
		cursor: 'not-allowed',
		'&:hover': {
			backgroundColor: 'white',
		},
	},
});

export const NavBar = () => {
	const classes = useStyles();
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	const { user, getUser, logout, twitterisOpen, twitterOnOpen, twitterOnClose } = useContext(AuthContext);

	const { state } = useLocation<{ loggedOut?: boolean, refresh?: boolean }>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();

	useEffect(() => {
		if (state && state.loggedOut) {
			logout();
			onOpen();
			customHistory.replace(customHistory.location.pathname, {});
		}

		if (state && state.refresh) {
			getUser();
			customHistory.replace(customHistory.location.pathname, {});
		}
	}, [state]);

	return (
		<>
			<Box
				display="flex"
				width="100%"
				justifyContent="center"
				background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey2'}
				borderBottom={isDark ? '1px solid #464646' : '2px solid #E9E9E9'}
				boxSizing="border-box"
			>
				<Box
					display="flex"
					width="100%"
					justifyContent="space-between"
					margin={isMobile ? '10px' : '10px 20px 10px 40px'}
				>
					<HStack
						spacing="25px"
						justifyContent="center"
						alignItems="center">
						<Logo mr={isMobile ? 0 : 5} />
						<Show above="md">
							<Link href={HomeUrl} fontWeight="bold">
						Home
							</Link>
							<Link fontWeight="bold" onClick={() => history.push('/grants/')}>
						Grants
							</Link>
						</Show>
					</HStack>
					{
						isMobile ? <>
							{
								user.id
									? <ButtonComponent
										className={classes.userInfo}
										leftIcon={<Avatar left="-20px" size="sm" name={user.username} src={user.imageUrl} />}
										standard
									>
										{user.twitterHandle}
									</ButtonComponent>
									: <ButtonComponent
										leftIcon={<Icon as={FiTwitter} />}
										standard
										circular
										marginRight="12px"
										onClick={twitterOnOpen}
									>
										Log In
									</ButtonComponent>
							}
							<NavMenu user={user} logout={logout} />
						</> : (
							<Box>
								<Linkin href={StartCrowdFundUrl} isExternal >
									<ButtonComponent
										leftIcon={<AddIcon />}
										primary
										standard
										marginRight="12px"
										width="220px"
									>
										Start a Crowdfund
									</ButtonComponent>
								</Linkin>
								{
									user.id
										? <ButtonComponent
											className={classes.userInfo}
											leftIcon={<Avatar left="-20px" size="sm" name={user.username} src={user.imageUrl} />}
											standard
										>
											{user.twitterHandle}
										</ButtonComponent>
										: <ButtonComponent
											leftIcon={<Icon as={FiTwitter} />}
											standard
											marginRight="12px"
											onClick={twitterOnOpen}
										>
											Log In
										</ButtonComponent>
								}
								<NavMenu user={user} logout={logout} />
							</Box>
						)
					}

				</Box>

			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent display="flex" alignItems="center" padding="20px 15px">
					{history.location.pathname === '/project/bitcoin-hackathons'
		&& <BubbleCursor/>}
					<ModalHeader><Text fontSize="16px" fontWeight="normal">You have been logged out</Text></ModalHeader>
					<ModalCloseButton />
					<ModalBody >
						<Text>
							Please log back in with your profile, or press continue if you want to stay anonymous.
						</Text>
						<Box display="flex" justifyContent="space-between" paddingTop="20px">
							<ButtonComponent width="50%" mx={1} primary onClick={twitterOnOpen}>
								Log In
							</ButtonComponent>
							<ButtonComponent width="50%" mx={1} onClick={onClose}>
								Continue
							</ButtonComponent>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
			<ConnectTwitter isOpen={twitterisOpen} onClose={twitterOnClose} />
		</>
	);
};

// 161616
