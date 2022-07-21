import React, { useContext, useEffect } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { FiTwitter } from 'react-icons/fi';
import { ButtonComponent } from '../ui';
import { AnimatedLogo } from './AnimatedLogo';
import { Box, HStack } from '@chakra-ui/layout';
import { NavMenu } from './NavMenu';
import { isDarkMode, isMobileMode, isMediumScreen } from '../../utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { ConnectTwitter } from '../molecules';
import { Avatar } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { AuthContext } from '../../context';
// Import { StartCrowdFundUrl } from '../../constants';
import { useLocation, useHistory } from 'react-router';
import { customHistory } from '../../config';

const useStyles = createUseStyles({
	userInfo: {
		marginRight: '12px',
		'&:hover': {
			backgroundColor: 'white',
		},
	},
});

interface INavBar {
	showBorder: boolean
}

export const NavBar = ({showBorder}: INavBar) => {
	const classes = useStyles();
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
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

	const handleLaunch = () => {
		history.push('/launch');
	};

	const handleProfileClick = () => {
		history.push(`/profile/${user.id}`);
	};

	return (
		<>
			<Box
				display="flex"
				width="100%"
				justifyContent="center"
				background={isDark ? 'brand.bgHeavyDarkMode' : 'rgba(252,252,252,0.9)'}
				borderBottom={showBorder ? '1px solid rgba(0,0,0,0)' : '1px solid rgba(233,233,233,0.9)' }
				boxSizing="border-box"
				position="fixed"
				backdropFilter="blur(2px)"
				top={0}
				left={0}
				zIndex={1000}
			>

				<Box
					display="flex"
					width="100%"
					justifyContent="space-between"
					margin={isMobile ? '10px' : '15px 40px 15px 40px'}
				>
					<HStack
						spacing="25px"
						justifyContent="center"
						alignItems="center">
						<AnimatedLogo />
					</HStack>
					{
						isMobile ? <>
							{
								user.id
									? <ButtonComponent
										className={classes.userInfo}
										leftIcon={<Avatar left="-20px" size="sm" name={user.username} src={user.imageUrl} />}
										standard
										onClick={handleProfileClick}
										border={history.location.pathname === `/profile/${user.id}` ? '3px solid #20ECC7' : '3px solid rgba(0, 0, 0, 0)'}
									>
										{user.username}
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
							<>
								<HStack display={isMedium ? 'none' : 'flex'} position="absolute" top="13px" left="calc(50vw - 96px)">
									<Box border={history.location.pathname === '/home' || history.location.pathname === '/' ? '3px solid #20ECC7' : '3px solid rgba(0, 0, 0, 0)'} borderRadius="lg" marginRight="5px">
										<ButtonComponent onClick={() => {
											history.push('/home');
										}}>Campaigns</ButtonComponent>
									</Box>
									<Box position="relative" border={history.location.pathname === '/grants' ? '3px solid #20ECC7' : '3px solid rgba(0, 0, 0, 0)'} borderRadius="lg">
										<ButtonComponent onClick={() => {
											history.push('/grants');
										}}>Grants
											<Text zIndex={1} p={0.5} pt={1} px={2} bg="brand.primary" borderRadius="full" position="absolute" top="-10px" right="-14px" fontSize="10px" fontWeight="bold" textAlign="center">NEW</Text>
										</ButtonComponent>
									</Box>
								</HStack>
								<Box>
									<ButtonComponent
										leftIcon={<AddIcon />}
										primary
										marginRight="12px"
										onClick={handleLaunch}
									>
										Launch
									</ButtonComponent>
									{
										user.id
											? <ButtonComponent
												border={history.location.pathname === `/profile/${user.id}` ? '3px solid #20ECC7' : '3px solid rgba(0, 0, 0, 0)'}
												className={classes.userInfo}
												leftIcon={<Avatar left="-20px" size="sm" name={user.username} src={user.imageUrl} />}
												standard
												onClick={handleProfileClick}
											>
												{user.username}
											</ButtonComponent>
											: <ButtonComponent
												marginRight="12px"
												onClick={twitterOnOpen}
											>
											Connect
											</ButtonComponent>
									}
									<NavMenu user={user} logout={logout} />
								</Box>
							</>
						)
					}

				</Box>

			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent display="flex" alignItems="center" padding="20px 15px">
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
