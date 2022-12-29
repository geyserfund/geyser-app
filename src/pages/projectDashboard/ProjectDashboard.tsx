import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useHistory, useLocation, useParams } from 'react-router';
import { ButtonComponent } from '../../components/ui';
import Loader from '../../components/ui/Loader';
import { useAuthContext } from '../../context';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql';
import { isMobileMode } from '../../utils';
import { NotAuthorized } from '../notAuthorized';
import { NotFoundPage } from '../notFound';
import { ProjectDashboardEntries } from './ProjectDashboardEntries';
import { MilestoneSettings } from './MilestoneSettings';
import { ProjectFundingSettings } from './ProjectFundingSettings';
import { ProjectSettings } from './ProjectSettings';
import { RewardSettings } from './RewardSettings';
import { getPath } from '../../constants';
import { Owner } from '../../types/generated/graphql';
import { ProjectContributors } from './ProjectContributors';

enum DashboardTabs {
  entries = 'entries',
  funds = 'funds',
  milestones = 'milestones',
  rewards = 'rewards',
  projectDescription = 'project description',
  contributors = 'contributors',
}

export const ProjectDashboard = () => {
  const isMobile = isMobileMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { state: locationState } = useLocation<{ loggedOut?: boolean }>();
  const history = useHistory();

  const { user, setNav } = useAuthContext();

  const [activeTab, setActiveTab] = useState<DashboardTabs>(
    DashboardTabs.entries,
  );

  useEffect(() => {
    try {
      getProject();
    } catch (_) {
      history.push(getPath('notFound'));
    }
  }, [locationState]);

  const handleTabSelection = async (selectedTab: DashboardTabs) => {
    if (selectedTab !== activeTab) {
      await getProject({ fetchPolicy: 'no-cache' });
    }

    setActiveTab(selectedTab);
  };

  const [getProject, { loading, error, data }] = useLazyQuery(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: {
        where: { name: projectId },
      },
      onCompleted(data) {
        setNav({
          projectName: data.project.name,
          projectTitle: data.project.title,
          projectPath: `${getPath('project', data.project.name)}`,
          projectOwnerIDs:
            data.project.owners.map((ownerInfo: Owner) => {
              return Number(ownerInfo.user.id || -1);
            }) || [],
        });
      },
    },
  );

  const handleBack = () => {
    history.push(getPath('project', projectId));
  };

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  if (error || !data || !data.project) {
    return <NotFoundPage />;
  }

  if (data.project.owners[0].user.id !== user.id) {
    return <NotAuthorized />;
  }

  const { project } = data;

  const renderTabs = () => {
    if (loading) {
      return (
        <GridItem colSpan={8} display="flex" justifyContent="center">
          <Loader />
        </GridItem>
      );
    }

    switch (activeTab) {
      case DashboardTabs.entries:
        return <ProjectDashboardEntries project={project} />;
      case DashboardTabs.milestones:
        return <MilestoneSettings project={project} />;
      case DashboardTabs.rewards:
        return <RewardSettings project={project} />;
      case DashboardTabs.funds:
        return <ProjectFundingSettings project={project} />;
      case DashboardTabs.projectDescription:
        return <ProjectSettings project={project} />;
      case DashboardTabs.contributors:
        return <ProjectContributors project={project} />;
      default:
        return <ProjectDashboardEntries project={project} />;
    }
  };

  const renderButton = (nav: DashboardTabs) => {
    return (
      <Box
        borderBottom="3px solid"
        borderColor={activeTab === nav ? 'brand.primary' : 'brand.neutral500'}
      >
        <Button
          borderRadius="4px"
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={activeTab === nav ? 'bold' : 'normal'}
          fontSize="16px"
          marginTop="10px"
          onClick={() => handleTabSelection(nav)}
          textTransform="capitalize"
        >
          {nav}
        </Button>
      </Box>
    );
  };

  const navList: DashboardTabs[] = [
    DashboardTabs.projectDescription,
    DashboardTabs.entries,
    DashboardTabs.contributors,
    DashboardTabs.funds,
    DashboardTabs.rewards,
    DashboardTabs.milestones,
  ];

  return (
    <Box
      background={'brand.bgGrey4'}
      position="relative"
      paddingTop="60px"
      height="100%"
      justifyContent="space-between"
    >
      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(18, 1fr)'
            : isMobile
            ? 'repeat(6, 1fr)'
            : 'repeat(15, 1fr)'
        }
        padding={isMobile ? '10px' : '40px 40px 20px 40px'}
      >
        <GridItem
          colSpan={isLargerThan1280 ? 5 : 2}
          display="flex"
          justifyContent="flex-start"
        >
          <ButtonComponent
            onClick={handleBack}
            leftIcon={<BiLeftArrowAlt style={{ fontSize: '25px' }} />}
          >
            {' '}
            Back
          </ButtonComponent>
        </GridItem>
        <GridItem
          colSpan={8}
          display="flex"
          justifyContent="center"
          overflowX={isMobile ? 'auto' : undefined}
        >
          <HStack
            spacing="0px"
            width="100%"
            minWidth="350px"
            display="flex"
            alignItems="center"
          >
            {navList.map((nav) => renderButton(nav))}
          </HStack>
        </GridItem>
        <GridItem colSpan={5} display="flex" justifyContent="center">
          <VStack
            justifyContent="center"
            alignItems="flex-start"
            maxWidth="370px"
            spacing="10px"
          ></VStack>
        </GridItem>
      </Grid>
      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(18, 1fr)'
            : isMobile
            ? 'repeat(6, 1fr)'
            : 'repeat(15, 1fr)'
        }
        padding={isMobile ? '10px' : '40px 40px 20px 40px'}
      >
        {activeTab !== DashboardTabs.contributors && (
          <GridItem
            colSpan={isLargerThan1280 ? 5 : 2}
            display="flex"
            justifyContent="flex-start"
          ></GridItem>
        )}

        {renderTabs()}
      </Grid>
    </Box>
  );
};
