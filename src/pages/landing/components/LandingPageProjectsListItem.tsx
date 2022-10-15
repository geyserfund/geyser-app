import {
  HStack,
  HTMLChakraProps,
  Text,
  Image,
  Link,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ProjectImageListItemPlaceholder } from '../../../components/molecules';
import { Project } from '../../../types/generated/graphql';

type Props = HTMLChakraProps<'div'> & {
  project: Project;
};

export const LandingPageProjectsListItem = ({ project, ...rest }: Props) => {
  const projectImageSrc = project.image || '';

  return (
    <Link
      as={ReactRouterLink}
      to={`/projects/${project.name}`}
      _hover={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <HStack
        spacing={3}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        {...rest}
      >
        <Box width="42px" height="42px" flexShrink={0}>
          <Image
            src={projectImageSrc}
            borderRadius="md"
            objectFit="cover"
            fallback={<ProjectImageListItemPlaceholder />}
            alt={`Main image for ${project.name}`}
          />
        </Box>

        <Text color="brand.neutral900" fontWeight={'bold'} isTruncated>
          {project.title}
        </Text>
      </HStack>
    </Link>
  );
};
