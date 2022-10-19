import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Grid,
  GridItem,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useHistory, useLocation, useParams } from 'react-router';
import { ButtonComponent } from '../../components/ui';
import Loader from '../../components/ui/Loader';
import { useAuthContext } from '../../context';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';
import { isMobileMode } from '../../utils';
import { NotAuthorized } from '../notAuthorized';
import { NotFoundPage } from '../notFound';
import { Entries } from './Entries';
import { MilestoneSettings } from './MilestoneSettings';
import { NodeSettings } from './NodeSettings';
import { ProjectSettings } from './ProjectSettings';
import { RewardSettings } from './RewardSettings';

export type TDashboardTabs =
  | 'entries'
  | 'milestones'
  | 'rewards'
  | 'node'
  | 'project';

export const ProjectDashboard = () => {
  const isMobile = isMobileMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { state } = useLocation<{ loggedOut?: boolean }>();
  const history = useHistory();

  const { user, setNav } = useAuthContext();

  const [view, setView] = useState<TDashboardTabs>('entries');

  useEffect(() => {
    try {
      getProject();
    } catch (_) {
      history.push('/not-found');
    }
  }, [state]);

  const [getProject, { loading, error, data }] = useLazyQuery(
    QUERY_PROJECT_BY_NAME,
    {
      variables: { where: { name: projectId }, input: {} },
      onCompleted(data) {
        setNav({
          title: data.project.title,
          path: `/projects/${data.project.name}`,
          projectOwnerId: data.project.owners[0].user.id,
        });
      },
    },
  );

  const handleBack = () => {
    history.push(`/projects/${projectId}`);
  };

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.project) {
    return <NotFoundPage />;
  }

  if (data.project.owners[0].user.id !== user.id) {
    return <NotAuthorized />;
  }

  const { project } = data;

  const renderTabs = () => {
    switch (view) {
      case 'entries':
        return <Entries project={project} />;
      case 'milestones':
        return <MilestoneSettings project={project} />;
      case 'rewards':
        return <RewardSettings project={project} />;
      case 'node':
        return <NodeSettings project={project} />;
      case 'project':
        return <ProjectSettings project={project} />;
      default:
        return <Entries project={project} />;
    }
  };

  const renderButton = (nav: TDashboardTabs) => {
    return (
      <Box
        borderBottom="3px solid"
        borderColor={view === nav ? 'brand.primary' : 'brand.neutral500'}
      >
        <Button
          borderRadius="4px"
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={view === nav ? 'bold' : 'normal'}
          fontSize="16px"
          marginTop="10px"
          onClick={() => setView(nav)}
          textTransform="capitalize"
        >
          {nav}
        </Button>
      </Box>
    );
  };

  const navList: TDashboardTabs[] = [
    'entries',
    'milestones',
    'rewards',
    'node',
    'project',
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
        <GridItem colSpan={8} display="flex" justifyContent="center">
          <VStack
            spacing="30px"
            width="100%"
            minWidth="350px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box display="flex">{navList.map((nav) => renderButton(nav))}</Box>
          </VStack>
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
        <GridItem
          colSpan={isLargerThan1280 ? 5 : 2}
          display="flex"
          justifyContent="flex-start"
        ></GridItem>
        {renderTabs()}
      </Grid>
    </Box>
  );
};
