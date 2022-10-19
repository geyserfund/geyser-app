import React from 'react';
import { VStack } from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';
import { UserProfilePageEntriesListItem } from '../containers';

type Props = {
  profileUser: User;
};

export const UserProfilePageEntriesList = ({ profileUser }: Props) => {
  const entryIDs = profileUser.entries
    .map((entry) => entry?.id)
    .filter(Boolean);

  if (entryIDs?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project entries."
      />
    );
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      {entryIDs.map((entryID: number) => (
        <UserProfilePageEntriesListItem key={entryID} entryID={entryID} />
      ))}
    </VStack>
  );
};
