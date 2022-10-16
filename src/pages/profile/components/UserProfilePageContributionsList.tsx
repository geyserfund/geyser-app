import React from 'react';
import { VStack } from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';
import { UserProfilePageContributionsListItem } from '../containers';

type Props = {
  profileUser: User;
};

export const UserProfilePageContributionsList = ({ profileUser }: Props) => {
  const { contributions } = profileUser;

  if (contributions.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no contributions."
      />
    );
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      {contributions.map((contribution) => {
        //   // TODO: We need a way to get actual unique IDs here (see: https://discord.com/channels/940363862723690546/1030971121660612648/1030976635442311188)
        const contributionID = Math.random();

        return contribution ? (
          <UserProfilePageContributionsListItem
            key={contributionID}
            contribution={contribution}
          />
        ) : null;
      })}
    </VStack>
  );
};
