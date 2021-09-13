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
	>
		<Logo />
		<ButtonComponent
			leftIcon={<AddIcon />}
			primary
			standard
		>
			Start
		</ButtonComponent>
		<ButtonComponent
			leftIcon={<Icon as={FiTwitter}/>}
			standard
		>
			Login
		</ButtonComponent>
		<NavMenu />
	</Box>
);

