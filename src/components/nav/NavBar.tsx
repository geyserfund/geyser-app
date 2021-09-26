import React from 'react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import {FiTwitter} from 'react-icons/fi';
import { ButtonComponent } from '../ui';
import { Logo } from './Logo';
import { Box } from '@chakra-ui/layout';
import { NavMenu } from './NavMenu';

export const NavBar = () => (
	<Box
		display="flex"
		width="100%"
		justifyContent="center"
	>
		<Box
			display="flex"
			width="75%"
			maxWidth="1300px"
			justifyContent="space-between"
			margin="10px 10px"
		>
			<Logo />
			<Box>
				<ButtonComponent
					leftIcon={<AddIcon />}
					primary
					standard
					marginRight="12px"
				>
			Start Project
				</ButtonComponent>
				<ButtonComponent
					leftIcon={<Icon as={FiTwitter}/>}
					standard
					marginRight="12px"
				>
			Login
				</ButtonComponent>
				<NavMenu />
			</Box>

		</Box>

	</Box>
);

