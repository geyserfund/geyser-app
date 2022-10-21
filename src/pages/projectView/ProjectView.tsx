import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';
import { NotFoundPage } from '../notFound';
import { useFundingFlow } from '../../hooks';
import { useAuthContext } from '../../context';

import { Project } from '../../types/generated/graphql';
import { getPath } from '../../constants';
import { ProjectDetailsViewContainer } from './containers';

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();

  const { setNav } = useAuthContext();
  const [detailOpen, setDetailOpen] = useState(true);
  const fundingFlow = useFundingFlow();

  const { loading, error, data } = useQuery(QUERY_PROJECT_BY_NAME, {
    variables: { where: { name: projectId }, input: {} },
    fetchPolicy: 'network-only',
    onError() {
      history.push('/not-found');
    },
    onCompleted(data) {
      if (data.project && data.project.__typename === 'Project') {
        const { project }: { project: Project } = data;
        const projectOwnerID =
          project.owners && project.owners.length > 0
            ? project.owners[0]?.user.id
            : '';

        setNav({
          title: project.title,
          path: getPath('project', project.name),
          projectOwnerId: projectOwnerID,
        });
      }
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.project) {
    return <NotFoundPage />;
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
        <ProjectDetailsViewContainer
          {...{ project, detailOpen, setDetailOpen, fundingFlow }}
        />
      </Box>
    </Box>
  );
};
