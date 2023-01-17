import React from 'react';
import { Divider, HTMLChakraProps, Box, VStack } from '@chakra-ui/react';
// import { LandingPageProjectsEntriesList } from './LandingPageProjectsEntriesList';
import { LandingPageContributionsList } from './LandingPageContributionsList';
import { H3 } from '../../../components/typography';
import { StickToTop } from '../../../components/layouts';

type Props = HTMLChakraProps<'div'> & {};

export const ActivityView = ({ ...rest }: Props) => {
  return (
    <Box {...rest}>
      <VStack height="full" width="full" alignItems="flex-start">
        <StickToTop
          id="landing-page-contributionTitle"
          width="100%"
          _onStick={{ width: 'calc(100% - 20px)' }}
        >
          <VStack
            alignItems="flex-start"
            paddingTop="10px"
            backgroundColor="bgWhite"
          >
            <H3>Contributions</H3>
            <Divider borderWidth={'2px'} zIndex={-1} borderRadius="full" />
          </VStack>
        </StickToTop>

        <LandingPageContributionsList />
      </VStack>
    </Box>
  );
};
