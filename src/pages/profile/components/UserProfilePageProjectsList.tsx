import React, { useMemo, useState } from 'react';
import { Button, Divider, Text, VStack } from '@chakra-ui/react';
import { PaginationInput, User } from '../../../types/generated/graphql';
import { AlertBox } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { useProjectEntries } from '../../../hooks';

type Props = {
  profileUser: User;
};

export const UserProfilePageProjectsList = ({ profileUser }: Props) => {
  return <Text>UserProfilePageProjectsList</Text>;
};
