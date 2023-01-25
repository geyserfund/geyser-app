import { HStack, Text } from '@chakra-ui/react';

import { dimensions } from '../../../constants';
import { useMobileMode } from '../../../utils';
import { BoltIcon } from '../../icons';
import { ButtonComponent } from '../../ui';

const {
  topNavBar: { mobile: mobileNavBarDimensions },
} = dimensions;

interface IProjectActivityActionsToolbarProps {
  fundButtonFunction: any;
  // transitionButtonFunction: any;
}

export const ProjectActivityActionsToolbar = ({
  fundButtonFunction,
}: // transitionButtonFunction,
IProjectActivityActionsToolbarProps) => {
  const isMobile = useMobileMode();

  if (isMobile) {
    return (
      <HStack
        position={'static'}
        top={window.innerHeight + mobileNavBarDimensions.height}
        transition="all 0.35s ease-in-out"
        left={0}
        w="100%"
        p={0}
        px={2}
        bg="white"
        zIndex={100}
      >
        <ButtonComponent primary onClick={fundButtonFunction} w="100%">
          <HStack>
            <BoltIcon /> <Text fontSize="xs">Fund Project</Text>
          </HStack>
        </ButtonComponent>
        {/* <ButtonComponent w="25%" onClick={transitionButtonFunction}>
          Description
        </ButtonComponent> */}
      </HStack>
    );
  }

  return null;
};
