import React from 'react';
import { isMobileMode } from '../../../utils';
import { HStack, Text } from '@chakra-ui/react';
import { ButtonComponent } from '../../ui';
import { BoltIcon } from '../../icons';
import { dimensions } from '../../../constants';

const { mobileNavbar } = dimensions;

interface IProjectActivityActionsToolbarProps {
  fundButtonFunction: any;
  transitionButtonFunction: any;
}

export const ProjectActivityActionsToolbar = ({
  fundButtonFunction,
  transitionButtonFunction,
}: IProjectActivityActionsToolbarProps) => {
  const isMobile = isMobileMode();

  if (isMobile) {
    return (
      <HStack
        position={'static'}
        top={window.innerHeight + mobileNavbar.height}
        transition="all 0.35s ease-in-out"
        left={0}
        w="100%"
        p={0}
        px={2}
        bg="white"
        zIndex={100}
      >
        <ButtonComponent primary onClick={fundButtonFunction} w="75%">
          <HStack>
            <BoltIcon /> <Text fontSize="xs">Fund Project</Text>
          </HStack>
        </ButtonComponent>
        <ButtonComponent w="25%" onClick={transitionButtonFunction}>
          Description
        </ButtonComponent>
      </HStack>
    );
  }

  return null;
};
