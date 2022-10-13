import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';
import { ProjectEntryCard } from '../../../components/molecules';

type Props = {
  profileUser: User;
};

export const UserProfilePageEntriesList = ({ profileUser }: Props) => {
  const entryIDs = profileUser.entries.map((entry) => entry?.id);

  if (entryIDs?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project entries."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      <Text>UserProfilePageEntriesList</Text>

      <VStack alignItems={'flex-start'} width="full">
        {entryIDs.map((entryID: number) => (
          <ProjectEntryCard entryID={entryID} key={entryID} />
        ))}
      </VStack>
    </VStack>
  );
};
