import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { History } from 'history';
import { dimensions } from '../../constants';

type Props = {
  match: any;
  history: History;
};

const { topNavBar: topNavBarDimensions } = dimensions;

export const ProjectDiscoveryPage = ({ match, history }: Props) => {
  return (
    <VStack
      position="relative"
      paddingTop={`${topNavBarDimensions.desktop.height}px`}
      height="100%"
      justifyContent="center"
    >
      <Text>Project Discovery Page</Text>
    </VStack>
  );
};
