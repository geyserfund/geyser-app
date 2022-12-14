import React from 'react';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import { OwnerOf, User, Maybe } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';
import { UserProfilePageProjectsListItem } from '../containers';

type Props = {
  profileUser: User;
};

export const UserProfilePageProjectsList = ({ profileUser }: Props) => {
  if (profileUser.ownerOf.length === 0) {
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
    <SimpleGrid columns={4} spacingX={4} spacingY={8}>
      {profileUser.ownerOf.map((ownerOf: Maybe<OwnerOf>) => {
        if (ownerOf && ownerOf.project) {
          return (
            <GridItem
              key={ownerOf.project.id}
              colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }}
            >
              <UserProfilePageProjectsListItem projectID={ownerOf.project.id} />
            </GridItem>
          );
        }
      })}
    </SimpleGrid>
  );
};
