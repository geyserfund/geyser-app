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
			justifyContent="space-between"
			margin="10px 0px"
		>
			<Logo />
			<Box>
				<ButtonComponent
					leftIcon={<AddIcon />}
					primary
					standard
					margin="0px 12px"
				>
			Start
				</ButtonComponent>
				<ButtonComponent
					leftIcon={<Icon as={FiTwitter}/>}
					standard
					margin="0px 12px"
				>
			Login
				</ButtonComponent>
				<NavMenu />
			</Box>

		</Box>

	</Box>
);

