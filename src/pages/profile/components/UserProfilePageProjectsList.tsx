import React from 'react';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';
import { UserProfilePageProjectsListItem } from '../containers';

type Props = {
  profileUser: User;
};

export const UserProfilePageProjectsList = ({ profileUser }: Props) => {
  const projectIDs = profileUser.ownerOf
    .map((ownedProjectInfo) => ownedProjectInfo?.project?.id)
    .filter(Boolean);

  if (projectIDs.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no projects."
      />
    );
  }

  return (
    <Box display={'flex'} justifyContent="center" alignItems={'center'}>
      <SimpleGrid columns={3} spacingX={7} spacingY={8}>
        {projectIDs.map((projectID: number) => (
          <GridItem key={projectID} colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }}>
            <UserProfilePageProjectsListItem projectID={projectID} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};
