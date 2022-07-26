import React from 'react';
import { isMobileMode } from '../../utils';
import { HStack, Text } from '@chakra-ui/react';
import { ButtonComponent } from '../ui';
import { BoltIcon } from '../icons';

interface IProjectMobileMenuProps {
 showMobileMenu:boolean
 fundButtonFunction:any
 handleFundClick:any
 viewName:string
}

export const ProjectMobileMenu = ({ showMobileMenu, fundButtonFunction, handleFundClick, viewName }:IProjectMobileMenuProps) => {
	const isMobile = isMobileMode();

	return (
		<>
			{isMobile
&& <HStack position="absolute" bottom={showMobileMenu ? 0 : -100} transition="all 0.5s ease-in-out" left={0} w="100%" p={2} bg="white" zIndex={100}>
	<ButtonComponent primary onClick={fundButtonFunction} w="75%">
		<HStack>
			<BoltIcon/>	<Text fontSize="xs">Fund campaign</Text>
		</HStack>
	</ButtonComponent>
	<ButtonComponent w="25%" onClick={handleFundClick}>
		{viewName}
	</ButtonComponent>
</HStack>
			}
		</>
	);
};
