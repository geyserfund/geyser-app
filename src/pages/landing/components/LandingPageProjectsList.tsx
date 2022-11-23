import React from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { AlertBox } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { LandingPageProjectsListItem } from './LandingPageProjectsListItem';
import {
  OrderByOptions,
  Project,
  ProjectsGetQueryInput,
} from '../../../types/generated/graphql';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../../graphql';

type Props = {
  itemLimit?: number;
};

type ResponseData = {
  projects: {
    projects: Project[];
  };
};

type QueryVariables = {
  input: ProjectsGetQueryInput;
};

export const LandingPageProjectsList = ({ itemLimit = 14 }: Props) => {
  const {
    data: projectsResponseData,
    error,
    loading: isLoading,
  } = useQuery<ResponseData, QueryVariables>(QUERY_PROJECTS, {
    variables: {
      input: {
        pagination: {
          take: itemLimit,
        },
        orderBy: [{ balance: OrderByOptions.Desc }],
      },
    },
    fetchPolicy: 'no-cache',
  });

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch projects."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  const projects = projectsResponseData?.projects.projects || [];

  if (projects.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no projects."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  return (
    <>
      {isLoading && <Loader />}

      <List spacing={3}>
        {projects.slice(0, itemLimit - 1).map((project: Project) => (
          <ListItem key={project.id} justifyContent="center" cursor="pointer">
            <LandingPageProjectsListItem project={project} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
