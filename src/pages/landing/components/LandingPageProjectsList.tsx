import React from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { AlertBox } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { LandingPageProjectsListItem } from './LandingPageProjectsListItem';
import { useProjects } from '../../../hooks';
import { Project } from '../../../types/generated/graphql';

type Props = {
  itemLimit?: number;
};

export const LandingPageProjectsList = ({ itemLimit = 14 }: Props) => {
  const {
    isLoading,
    error,
    data: projects,
  } = useProjects({
    itemLimit,
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
        {projects.map((project: Project) => (
          <ListItem key={project.id} justifyContent="center" cursor="pointer">
            <LandingPageProjectsListItem project={project} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
