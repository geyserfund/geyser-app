import { Heading, HStack, VStack, Text, Container } from '@chakra-ui/react';
import React from 'react';
import { Project } from '../../../types/generated/graphql';
import { ProjectListItemImage } from '../../molecules';

type Props = {
  project: Project;
};

export const NavBarUserProjectMenuItem = ({ project }: Props) => {
  return (
    <Container padding={4}>
      <VStack
        spacing={1}
        paddingX={2}
        paddingY={1.5}
        alignItems="flex-start"
        backgroundColor={'brand.neutral200'}
        borderRadius="sm"
        overflow={'hidden'}
      >
        <Text
          textTransform={'uppercase'}
          fontSize="xs"
          fontWeight={'bold'}
          color={'brand.neutral500'}
        >
          Project
        </Text>

        <HStack spacing={1} overflow="hidden" width="full">
          <ProjectListItemImage project={project} flexShrink={0} />

          <Heading fontWeight={600} fontSize="16px" as={'h6'} isTruncated>
            {project.title}
          </Heading>
        </HStack>
      </VStack>
    </Container>
  );
};
