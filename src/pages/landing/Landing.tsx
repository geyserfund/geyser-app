import React from 'react';
import { Box, Flex, Divider } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { isMobileMode } from '../../utils';
import { Footer } from '../../components/molecules';

import { ActivityView, ProjectsList, TopBanner } from './components';
import { useHistory } from 'react-router';

type RuleNames = string;

interface IStyleProps {
  isMobile?: boolean;
}

const useStyles = createUseStyles<RuleNames, IStyleProps>({
  headers: ({ isMobile }: IStyleProps) => ({
    fontSize: isMobile ? '30px' : '40px',
  }),
  titles: ({ isMobile }: IStyleProps) => ({
    fontSize: isMobile ? '20px' : '25px',
    fontWeight: 600,
  }),
  pageStats: {
    width: '100%',
    height: '80px',
    background: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    justifyContent: 'space-between',
    maxWidth: '910px',
  },
  boldText: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    textShadow: '1px 1px #20ECC7',
  },
  sectionTitle: {
    fontSize: '16px',
    color: colors.textGrey,
  },
  subtitleText: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#2B2A2A',
  },
});

export const Landing = () => {
  const isMobile = isMobileMode();
  const history = useHistory();

  return (
    <Flex
      position="relative"
      paddingTop="60px"
      direction="column"
      height="full"
    >
      <TopBanner />
      <Flex direction="row" height="full" paddingTop={30}>
        <Box width="full" height="full">
          <ActivityView />
        </Box>
        <Divider orientation="vertical" />
        <Box width="full" maxWidth={400} height="full">
          <ProjectsList />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};
