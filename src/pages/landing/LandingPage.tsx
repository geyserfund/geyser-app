import React from 'react';
import { Box, Divider, Stack } from '@chakra-ui/react';
import { AppFooter } from '../../components/molecules';

import { ActivityView, LeaderboardView, TopBanner } from './components';
import { isMobileMode } from '../../utils';

export const LandingPage = () => {
  const isMobile = isMobileMode();

  return (
    <Box position="relative" width="full" height="full">
      <TopBanner />

      <Stack
        direction={{
          base: 'column',
          md: 'row',
        }}
        paddingBottom="30px"
        paddingX={isMobile ? '10px' : '60px'}
        width="full"
        height="auto"
        minHeight={'full'}
        overflow="hidden"
        spacing={'64px'}
      >
        <ActivityView
          flexGrow={1}
          minWidth={{
            base: 'full',
            sm: '400px',
          }}
        />
        {!isMobile && (
          <>
            <Divider orientation="vertical" borderWidth={'1px'} height="auto" />
            <LeaderboardView />
          </>
        )}
      </Stack>

      <AppFooter />
    </Box>
  );
};
