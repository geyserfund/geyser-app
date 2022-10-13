import React from 'react';
import { Text } from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';

type Props = {
  profileUser: User;
};

export const UserProfilePageContributionsList = ({ profileUser }: Props) => {
  return <Text>UserProfilePageContributionsList</Text>;
};
