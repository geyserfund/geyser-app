import { useLazyQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { customHistory } from '../../config';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';
import { NotFound } from '../notFound';
import Activity from '../project/Activity/Activity';
import { DetailsContainer } from './DetailsContainer';
import { useFundingFlow, useFundState } from '../../hooks';
import { useAuthContext } from '../../context';
import { IProject } from '../../interfaces';

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state } = useLocation<{ loggedOut?: boolean }>();

  const { setNavTitle } = useAuthContext();

  const [detailOpen, setDetailOpen] = useState(true);
  const fundingFlow = useFundingFlow();

  useEffect(() => {
    try {
      getProject();
    } catch (_) {
      customHistory.push('/not-found');
    }
  }, [state]);

  const [getProject, { loading, error, data }] = useLazyQuery(
    QUERY_PROJECT_BY_NAME,
    {
      variables: { where: { name: projectId } },
      onCompleted(data) {
        setNavTitle(data.project.title);
      },
    },
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.project) {
    return <NotFound />;
  }

  const { project } = data;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="hidden"
        position="relative"
        bg="brand.bgGrey4"
      >
        <ProjectViewContainer
          {...{ project, detailOpen, setDetailOpen, fundingFlow }}
        />
      </Box>
    </Box>
  );
};

interface IProjectViewContainer {
  project: IProject;
  detailOpen: boolean;
  fundingFlow: any;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resourceType?: string;
  resourceId?: number;
}

const ProjectViewContainer = ({
  project,
  detailOpen,
  setDetailOpen,
  fundingFlow,
}: IProjectViewContainer) => {
  const fundForm = useFundState({ rewards: project.rewards });
  const { setFundState } = fundingFlow;
  const { updateReward } = fundForm;
  console.log('chekcing dundform', fundForm);
  return (
    <>
      <DetailsContainer
        project={project}
        {...{ detailOpen, setDetailOpen, setFundState, updateReward }}
      />
      <Activity
        project={project}
        {...{ detailOpen, setDetailOpen, fundingFlow, fundForm }}
      />
    </>
  );
};
