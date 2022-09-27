import React from 'react';
import { TabList, Tab, Tabs, TabPanel, TabPanels } from '@chakra-ui/react';
import { isMobileMode } from '../../../utils';

import { EntriesList } from './EntriesList';
import { ContributionsList } from './ContributionsList';

type ActivityViewTab = 'Entries' | 'Contributions';

const styles = {
  selectedTab: {
    borderBottom: '4px solid',
    borderBottomColor: 'brand.primary',
  },
};

export const ActivityView = () => {
  const isMobile = isMobileMode();

  return (
    <Tabs variant={'line'} height="full" width="full">
      <TabList>
        <Tab _selected={styles.selectedTab}>Entries</Tab>
        <Tab _selected={styles.selectedTab}>Contributions</Tab>
      </TabList>

      <TabPanels width="100%">
        <TabPanel>
          <EntriesList />
        </TabPanel>
        <TabPanel>
          <ContributionsList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
