import React from 'react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { FiTwitter } from 'react-icons/fi';
import { ButtonComponent } from '../ui';
import { Logo } from './Logo';
import { Box } from '@chakra-ui/layout';
import { NavMenu } from './NavMenu';
import { isDarkMode, isMobileMode } from '../../utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { ConnectTwitter } from '../molecules';
import { Button } from '@chakra-ui/react';

export const NavBar = () => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box
				display="flex"
				width="100%"
				justifyContent="center"
				background={isDark ? 'brand.bgDarkMode' : 'brand.bgGrey2'}
				borderBottom={'2px solid #E9E9E9'}
				boxSizing="border-box"
			>
				<Box
					display="flex"
					width={isMobile ? '100%' : '75%'}
					maxWidth="1300px"
					justifyContent="space-between"
					margin="10px 10px"
				>
					<Logo />
					{
						isMobile ? <>
							<ButtonComponent
								leftIcon={<Icon as={FiTwitter} />}
								standard
								circular
								marginRight="12px"
								onClick={onOpen}
							>
								Login
							</ButtonComponent>
							<NavMenu />
						</> : (
							<Box>
								<ButtonComponent
									leftIcon={<AddIcon />}
									primary
									standard
									marginRight="12px"
								>
									Start Project
								</ButtonComponent>
								<Button
									variant="ghost"
									marginRight="12px"
									onClick={onOpen}
									width="150px"
									fontSize="15px"
								>
									Login
								</Button>
								<NavMenu />
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
