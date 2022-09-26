import React from 'react';
import { isMobileMode } from '../../utils';
import { HStack, Text } from '@chakra-ui/react';
import { ButtonComponent } from '../ui';
import { BoltIcon } from '../icons';
import { dimensions } from '../../constants';

const { mobileNavbar } = dimensions;

interface IProjectDetailsMobileMenuProps {
  showMobileMenu?: boolean;
  fundButtonFunction: any;
  transitionButtonFunction: any;
}

export const ProjectDetailsMobileMenu = ({
  showMobileMenu,
  fundButtonFunction,
  transitionButtonFunction: handleViewClick,
}: IProjectDetailsMobileMenuProps) => {
  const isMobile = isMobileMode();

  if (isMobile) {
    return (
      <HStack
        position={'fixed'}
        bottom={0}
        transform={`translateY(${
          showMobileMenu ? 0 : `${mobileNavbar.height}px`
        })`}
        transition="all 0.35s ease-in-out"
        left={0}
        w="100%"
        p={2}
        px={2}
        bg="white"
        zIndex={100}
      >
        <ButtonComponent primary onClick={fundButtonFunction} w="75%">
          <HStack>
            <BoltIcon /> <Text fontSize="xs">Fund Project</Text>
          </HStack>
        </ButtonComponent>
        <ButtonComponent w="25%" onClick={handleViewClick}>
          Activity
        </ButtonComponent>
      </HStack>
    );
  }

  return null;
};
