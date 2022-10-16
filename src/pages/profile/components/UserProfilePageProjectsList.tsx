import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';

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
    <VStack flexDirection={'column'} spacing={6} width="full">
      <VStack alignItems={'flex-start'} width="full">
        {projectIDs.map((projectID: number) => (
          <Text key={projectID}>{projectID}</Text>
        ))}
      </VStack>
    </VStack>
  );
};
