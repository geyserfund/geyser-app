import { Badge, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface IProjectSectionBar {
  name: string;
  number?: string | number;
  rightSection?: React.ReactNode;
}

export const ProjectSectionBar = ({
  name,
  number,
  rightSection,
}: IProjectSectionBar) => {
  console.log('sd');
  return (
    <VStack
      width="100%"
      alignItems="flex-start"
      borderBottom="2px solid"
      borderColor="brand.neutral300"
    >
      <HStack width="100%" marginBottom="10px" justifyContent="space-between">
        <HStack>
          <Text fontSize="18px" color="brand.neutral900">
            {name}
          </Text>
          {number && <Badge>{number}</Badge>}
        </HStack>
        {rightSection}
      </HStack>
    </VStack>
  );
};
