import { Heading, HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Project } from '../../../types/generated/graphql';
import { ProjectListItemImage } from '../../molecules';

type Props = {
  project: Project;
};

export const NavBarUserProjectMenuItem = ({ project }: Props) => {
  return (
    <VStack
      spacing={1}
      padding={4}
      alignItems="flex-start"
      backgroundColor={'brand.neutral200'}
      borderRadius="sm"
    >
      <Text
        as="caption"
        textTransform={'uppercase'}
        fontSize="xs"
        fontWeight={'bold'}
        color={'brand.neutral500'}
      >
        Project
      </Text>

      <HStack spacing={1}>
        <ProjectListItemImage project={project} flexShrink={0} />

        <Heading fontWeight={600} fontSize="16px" as={'h6'}>
          {project.title}
        </Heading>
      </HStack>
    </VStack>
  );
};
