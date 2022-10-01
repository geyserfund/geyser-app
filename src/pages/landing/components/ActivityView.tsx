import React from 'react';
import { TabList, Tab, Tabs, TabPanel, TabPanels } from '@chakra-ui/react';
import { LandingPageProjectsEntriesList } from './LandingPageProjectsEntriesList';
import { LandingPageContributionsList } from './LandingPageContributionsList';

type ActivityViewTab = 'Entries' | 'Contributions';

const styles = {
  selectedTab: {
    borderBottom: '4px solid',
    borderBottomColor: 'brand.primary',
  },
};

export const ActivityView = () => {
  return (
    <Tabs variant={'line'} height="full" width="full">
      <TabList>
        <Tab _selected={styles.selectedTab}>Entries</Tab>
        <Tab _selected={styles.selectedTab}>Contributions</Tab>
      </TabList>

      <TabPanels width="100%">
        <TabPanel>
          <LandingPageProjectsEntriesList />
        </TabPanel>
        <TabPanel>
          <LandingPageContributionsList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
