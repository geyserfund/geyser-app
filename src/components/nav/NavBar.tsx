import React, { useContext } from 'react';
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

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { user, logout } = useContext(AuthContext);

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
										onClick={onOpen}
									>
										Login
									</ButtonComponent>
							}
							<NavMenu logout={logout} />
						</> : (
							<Box>
								<ButtonComponent
									leftIcon={<AddIcon />}
									primary
									standard
									marginRight="12px"
								>
									Start a Crowdfund
								</ButtonComponent>
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
											onClick={onOpen}
										>
											Login
										</ButtonComponent>
								}
								<NavMenu logout={logout} />
							</Box>
						)
					}

				</Box>

			</Box>
			<ConnectTwitter isOpen={isOpen} onClose={onClose} />
		</>
	);
};

// 161616
