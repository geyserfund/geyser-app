import React, { useContext, useEffect } from 'react';
import { Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { FiTwitter } from 'react-icons/fi';
import { ButtonComponent } from '../ui';
import { Logo } from './Logo';
import { Box } from '@chakra-ui/layout';
import { NavMenu } from './NavMenu';
import { isDarkMode, isMobileMode } from '../../utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { ConnectTwitter } from '../molecules';
import { Avatar } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { AuthContext } from '../../context';
import { StartCrowdFundUrl } from '../../constants';
import { useLocation } from 'react-router';
import { customHistory } from '../../config';

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
					margin={isMobile ? '10px' : '10px 20px'}
				>
					<Logo />
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
										Login
									</ButtonComponent>
							}
							<NavMenu user={user} logout={logout} />
						</> : (
							<Box>
								<Link href={StartCrowdFundUrl} isExternal>
									<ButtonComponent
										leftIcon={<AddIcon />}
										primary
										standard
										marginRight="12px"
										width="220px"
									>
										Start a Crowdfund
									</ButtonComponent>
								</Link>
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
											Login
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
					<ModalHeader><Text fontSize="16px" fontWeight="normal">You have been logged out</Text></ModalHeader>
					<ModalCloseButton />
					<ModalBody >
						<Text>
							Please logback in with your profile, or press continue if you want to stay anonymous.
						</Text>
						<Box display="flex" justifyContent="space-between" paddingTop="20px">
							<ButtonComponent standard primary onClick={twitterOnOpen}>
								Login
							</ButtonComponent>
							<ButtonComponent onClick={onClose}>
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
