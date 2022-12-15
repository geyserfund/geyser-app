import React from 'react';
import {
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Divider,
  Stack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import {
  UserProfilePageContributionsList,
  UserProfilePageEntriesList,
  UserProfilePageProjectsList,
} from '.';

type Props = {
  profileUser: User;
};

type TabData = {
  title: string;
  itemCount: number;
  component: React.ElementType;
};

const styles = {
  selectedTab: {
    borderBottom: '4px solid',
    borderBottomColor: 'brand.primary',
    fontWeight: 'bold',
  },
};

export const UserProfilePageTabs = ({ profileUser }: Props) => {
  const tabData: TabData[] = [
    {
      title: 'Projects',
      itemCount: profileUser.ownerOf.length,
      component: UserProfilePageProjectsList,
    },
    {
      title: 'Entries',
      itemCount: profileUser.entries.length,
      component: UserProfilePageEntriesList,
    },
    {
      title: 'Contributions',
      itemCount: profileUser.fundingTxs.length,
      component: UserProfilePageContributionsList,
    },
  ];

  return (
    <Tabs variant={'line'} height="full" width="full" isLazy>
      <Stack spacing={'-0.125em'} zIndex={1}>
        <TabList
          borderBottomWidth={0}
          borderRadius="sm"
          zIndex={1}
          paddingX="22px"
        >
          {tabData.map((tabItem: TabData, index: number) => (
            <Tab
              key={index}
              fontSize="16px"
              color={'brand.neutral900'}
              _selected={styles.selectedTab}
            >
              <HStack
                justifyContent={'center'}
                alignItems={'center'}
                spacing={'6px'}
                fontSize="18px"
              >
                <Text fontSize={'inherit'}>{tabItem.title}</Text>

                <Text
                  fontSize={'inherit'}
                  backgroundColor="brand.neutral200"
                  padding="0.33em"
                  lineHeight={1}
                  borderRadius="0.25em"
                >
                  {tabItem.itemCount}
                </Text>
              </HStack>
            </Tab>
          ))}
        </TabList>

        <Divider borderWidth={'2px'} />
      </Stack>

      <TabPanels width="100%">
        {tabData.map((tab, index) => (
          <TabPanel key={index} mt={6} p={0}>
            <tab.component profileUser={profileUser}></tab.component>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
