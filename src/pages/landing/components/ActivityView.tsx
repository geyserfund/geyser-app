import React from 'react';
import {
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Divider,
  Stack,
  HTMLChakraProps,
  Box,
} from '@chakra-ui/react';
// import { LandingPageProjectsEntriesList } from './LandingPageProjectsEntriesList';
import { LandingPageContributionsList } from './LandingPageContributionsList';

type ActivityViewTab = {
  title: string;
  component: React.ElementType;
};

type Props = HTMLChakraProps<'div'> & {};

const styles = {
  selectedTab: {
    borderBottom: '4px solid',
    borderBottomColor: 'brand.primary',
    fontWeight: 'medium',
  },
};

export const ActivityView = ({ ...rest }: Props) => {
  const tabs: ActivityViewTab[] = [
    {
      title: 'Contributions',
      component: LandingPageContributionsList,
    },
    // TODO: remove and refactor with the new landing page design
    // {
    //   title: 'Entries',
    //   component: LandingPageProjectsEntriesList,
    // },
  ];

  return (
    <Box {...rest}>
      <Tabs variant={'line'} height="full" width="full" isLazy>
        <Stack spacing={'-0.125em'} zIndex={1}>
          <TabList borderBottomWidth={0} borderRadius="sm" zIndex={1}>
            {tabs.map((tab, index) => (
              <Tab _selected={styles.selectedTab} key={index}>
                {tab.title}
              </Tab>
            ))}
          </TabList>

          <Divider borderWidth={'2px'} zIndex={-1} borderRadius="full" />
        </Stack>

        <TabPanels width="100%">
          {tabs.map((tab, index) => (
            <TabPanel key={index} mt={6} p={0}>
              <tab.component></tab.component>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
