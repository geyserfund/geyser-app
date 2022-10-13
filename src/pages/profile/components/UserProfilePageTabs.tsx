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
      itemCount: profileUser.contributions.length,
      component: UserProfilePageContributionsList,
    },
  ];

  return (
    <Tabs variant={'line'} height="full" width="full" isLazy>
      <Stack spacing={'-0.125em'} zIndex={1}>
        <TabList borderBottomWidth={0} borderRadius="sm" zIndex={1}>
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
              >
                <Text>{tabItem.title}</Text>

                <Text
                  backgroundColor="brand.neutral200"
                  padding="4px 6px"
                  borderRadius="4px"
                >
                  {tabItem.itemCount}
                </Text>
              </HStack>
            </Tab>
          ))}
        </TabList>

        <Divider borderWidth={'2px'} zIndex={-1} borderRadius="full" />
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

/* <Tabs
  variant="line"
  colorScheme="brand.textGrey"
  defaultIndex={userProfile && userProfile.ownerOf.length === 0 ? 1 : 0}
>
  <TabList>
    <Tab>
      <HStack minWidth={'40px'}>
        <Text fontWeight={500}>EntryCreateEdits</Text>

        <Text
          fontSize="12px"
          backgroundColor="brand.bgGrey3"
          padding="4px 8px"
          borderRadius="4px"
        >
          {userProfile && userProfile.ownerOf.length}
        </Text>
      </HStack>
    </Tab>
    <Tab>
      <HStack minWidth={'40px'}>
        <Text fontWeight={500}>Contributions</Text>
        <Text
          fontSize="12px"
          backgroundColor="brand.bgGrey3"
          padding="4px 8px"
          borderRadius="4px"
        >
          {userProfile && userProfile.contributions.length}
        </Text>
      </HStack>
    </Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      {userProfile && userProfile.ownerOf && userProfile.ownerOf.length > 0 ? (
        <Box className={isMobile ? classes.containerMobile : classes.container}>
          <Wrap
            paddingY="0px"
            width="100%"
            justify={!isLargerThan1080 ? 'center' : 'flex-start'}
            spacing="30px"
          >
            {userProfile &&
              userProfile.ownerOf.map((projectOwnershipData) => {
                if (projectOwnershipData?.project) {
                  // const { project }: { project: Project } =
                  //   projectOwnershipData;

                  const project = projectOwnershipData?.project;

                  return (
                    <WrapItem key={project.id}>
                      <ProfileProjectCard
                        title={project.title}
                        name={project.name}
                        project={project}
                        imgSrc={project.media[0] || ''}
                        marginLeft="0px !important"
                        privateUser={myProfile}
                      />
                    </WrapItem>
                  );
                }
              })}
          </Wrap>
        </Box>
      ) : (
        <Box width="100%" display="flex" justifyContent="center">
          <Text>There are no items here.</Text>
        </Box>
      )}
    </TabPanel>

    <TabPanel>
      {userProfile &&
      userProfile.contributions &&
      userProfile.contributions.length > 0 ? (
        <Box className={isMobile ? classes.containerMobile : classes.container}>
          <Wrap
            paddingY="0px"
            width="100%"
            justify={!isLargerThan1080 ? 'center' : 'flex-start'}
            spacing="30px"
          >
            {userProfile &&
              userProfile.contributions.map((contribution) => {
                if (contribution) {
                  return (
                    <WrapItem key={contribution?.project.id}>
                      <ProjectContributionCard
                        marginLeft="0px !important"
                        contribution={contribution}
                      />
                    </WrapItem>
                  );
                }
              })}
          </Wrap>
        </Box>
      ) : (
        <Box width="100%" display="flex" justifyContent="center">
          <Text>There are no items here.</Text>
        </Box>
      )}
    </TabPanel>
  </TabPanels>
</Tabs>; */
