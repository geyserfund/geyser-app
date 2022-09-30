import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { History } from 'history';

type Props = {
  match: any;
  history: History;
};

export const ProjectDiscoveryPage = ({ match, history }: Props) => {
  return (
    <VStack>
      <Text>Project Discovery Page</Text>
    </VStack>
  );
};
