import React from 'react';
import { isMobileMode } from '../../utils';
import { Box, HStack, Text } from '@chakra-ui/react';
import { ButtonComponent } from '../ui';
import { BoltIcon } from '../icons';
import { dimensions } from '../../constants';

const {
  topNavBar: { mobile: mobileNavBarDimensions },
} = dimensions;

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
  const paddingAmount = 16;

  if (isMobile === false) {
    return null;
  }

  return (
    <Box
      position={'fixed'}
      top={'100%'}
      bottom={0}
      transform={`translateY(${
        showMobileMenu
          ? `-${mobileNavBarDimensions.height * 2.25 + paddingAmount}px`
          : `${mobileNavBarDimensions.height * 2.25 + paddingAmount}px`
      })`}
      transition="all 0.35s ease-in-out"
      left={0}
      w="100%"
      py={`${paddingAmount}px`}
      px={`${paddingAmount}px`}
      backgroundColor="brand.bgWhite"
      zIndex={100}
      height={`100vh`}
      boxShadow={'0px -0px 22px 2px rgba(0, 0, 0, 0.2)'}
    >
      <HStack>
        <ButtonComponent primary onClick={fundButtonFunction} w="75%">
          <HStack>
            <BoltIcon /> <Text fontSize="xs">Fund Project</Text>
          </HStack>
        </ButtonComponent>
        <ButtonComponent w="25%" onClick={handleViewClick}>
          Activity
        </ButtonComponent>
      </HStack>
    </Box>
  );
};
