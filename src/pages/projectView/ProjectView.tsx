/* eslint-disable no-unreachable */
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql';
import { useFundingFlow } from '../../hooks';
import { useAuthContext } from '../../context';
import {
  Owner,
  Project,
  UniqueProjectQueryInput,
} from '../../types/generated/graphql';
import { getPath } from '../../constants';
import { ProjectDetailsViewContainer } from './containers';

type ResponseData = {
  project: Project;
};

type QueryVariables = {
  where: UniqueProjectQueryInput;
};

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();

  const { setNav } = useAuthContext();
  const [detailOpen, setDetailOpen] = useState(true);
  const fundingFlow = useFundingFlow();

  const { loading, error, data } = useQuery<ResponseData, QueryVariables>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: { where: { name: projectId } },
      fetchPolicy: 'network-only',

      onError() {
        history.push(getPath('notFound'));
      },

      onCompleted(data) {
        if (!data?.project) {
          history.replace(getPath('notFound'));
          return;
        }

        const { project } = data;

        setNav({
          projectName: project.name,
          projectTitle: project.title,
          projectPath: getPath('project', project.name),
          projectOwnerIDs:
            project.owners.map((ownerInfo: Owner) => {
              return Number(ownerInfo.user.id || -1);
            }) || [],
        });
      },
    },
  );

  if (loading || error || !data) {
    return <Loader />;
  }

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
          {...{ project: data.project, detailOpen, setDetailOpen, fundingFlow }}
          {...{ project: data.project, detailOpen, setDetailOpen, fundingFlow }}
        />
      </Box>
    </Box>
  );
};
