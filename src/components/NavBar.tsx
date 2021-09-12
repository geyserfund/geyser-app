import React from 'react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import {FiTwitter, FiMoreHorizontal} from 'react-icons/fi';
import { ButtonComponent } from './ButtonComponent';
import { Logo } from './Logo';
import { IconButtonComponent } from './IconButtonComponent';

export const NavBar = () => (
	<div>
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
		<IconButtonComponent
			aria-label="menu"
			icon={<Icon as={FiMoreHorizontal} boxSize="30px"/>}
		/>
	</div>
);

