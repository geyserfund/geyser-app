import React from 'react';
import { isMobileMode } from '../../utils';
import { HStack, Text } from '@chakra-ui/react';
import { ButtonComponent } from '../ui';
import { BoltIcon } from '../icons';

interface IProjectMobileMenuProps {
 showMobileMenu?:boolean
 fundButtonFunction:any
 handleViewClick:any
 viewName:string
}

export const ProjectMobileMenu = ({ showMobileMenu, fundButtonFunction, handleViewClick, viewName }:IProjectMobileMenuProps) => {
	const isMobile = isMobileMode();

	return (
		<>
			{isMobile
&& <HStack position={viewName === 'Activity' ? 'absolute' : 'static'} top={showMobileMenu ? window.innerHeight - 56 : window.innerHeight + 56} transition="all 0.5s ease-in-out" left={0} w="100%" p={viewName === 'Activity' ? 2 : 0} px={2} bg="white" zIndex={100}>
	<ButtonComponent primary onClick={fundButtonFunction} w="75%">
		<HStack>
			<BoltIcon/>	<Text fontSize="xs">Fund project</Text>
		</HStack>
	</ButtonComponent>
	<ButtonComponent w="25%" onClick={handleViewClick}>
		{viewName}
	</ButtonComponent>
</HStack>
			}
		</>
	);
};
