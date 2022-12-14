import React from 'react';
import { Box } from '@chakra-ui/react';
import { History } from 'history';
import { dimensions } from '../../constants';
import { TopBanner } from '../landing/components';
import { AppFooter } from '../../components/molecules';
import { ProjectDiscoveryPageGridSection } from './components';

type Props = {
  match: any;
  history: History;
};

const { topNavBar: topNavBarDimensions } = dimensions;

export const ProjectDiscoveryPage = ({
  match: _match,
  history: _history,
}: Props) => {
  return (
    <Box
      position="relative"
      paddingTop={`${topNavBarDimensions.desktop.height}px`}
      width="full"
      height="full"
    >
      <TopBanner />

      <ProjectDiscoveryPageGridSection />

      <AppFooter />
    </Box>
  );
};
