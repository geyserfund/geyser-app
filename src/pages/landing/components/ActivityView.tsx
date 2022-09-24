import React from 'react';
import { Box, TabList, Tab, Tabs, TabPanel, TabPanels } from '@chakra-ui/react';
import { isMobileMode } from '../../../utils';

import { EntriesList } from './EntriesList';
import { ContributionsList } from './ContributionsList';
// import TabView from './TabView';

type ActivityViewTab = 'Entries' | 'Contributions';

const styles = {
  selectedTab: {
    borderBottom: '4px solid',
    borderBottomColor: 'brand.primary',
  },
};

export const ActivityView = () => {
  const isMobile = isMobileMode();
  const tabs: ActivityViewTab[] = ['Contributions', 'Entries'];

  return (
    // <Box
    //   width="100%"
    //   height="100%"
    //   display="flex"
    //   flexDirection="column"
    //   // alignItems="left"
    //   overflow="hidden"
    //   flex="1"
    // >
    //   <Tabs variant={'line'} height="100%">
    //     <TabList>
    //       <Tab _selected={styles.selectedTab}>Entries</Tab>
    //       <Tab _selected={styles.selectedTab}>Contributions</Tab>
    //     </TabList>

    //     {/* <TabPanels> */}
    //     <TabPanels
    //       spacing={'15px'}
    //       width="100%"
    //       overflow="auto"
    //       height={isMobile ? 'calc(100% - 44px)' : '100%'}
    //       paddingBottom="10px"
    //       // paddingRight={view === 'entries' ? 30 : 10}
    //       // paddingLeft={view === 'entries' ? 30 : 0}
    //       justifyItems="left"
    //     >
    //       <TabPanel>
    //         <EntriesList />
    //       </TabPanel>
    //       <TabPanel>
    //         <ContributionsList />
    //       </TabPanel>
    //     </TabPanels>
    //   </Tabs>
    // </Box>
    // <Box
    //   width="100%"
    //   height="100%"
    //   display="flex"
    //   flexDirection="column"
    //   // alignItems="left"
    //   overflow="hidden"
    //   flex="1"
    // >
    <Tabs variant={'line'} height="100%">
      <TabList>
        <Tab _selected={styles.selectedTab}>Entries</Tab>
        <Tab _selected={styles.selectedTab}>Contributions</Tab>
      </TabList>

      {/* <TabPanels> */}
      <TabPanels
        // spacing={'15px'}
        width="100%"
        // overflow="auto"
        // height={isMobile ? 'calc(100% - 44px)' : '100%'}
        // paddingBottom="10px"
        // paddingRight={view === 'entries' ? 30 : 10}
        // paddingLeft={view === 'entries' ? 30 : 0}
        // justifyItems="left"
      >
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
