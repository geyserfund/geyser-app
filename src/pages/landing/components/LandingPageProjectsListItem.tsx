import {
  HStack,
  HTMLChakraProps,
  Text,
  Image,
  SkeletonCircle,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { IProject } from '../../../interfaces';
import { Link as ReactRouterLink } from 'react-router-dom';

type Props = HTMLChakraProps<'div'> & {
  project: IProject;
};

export const LandingPageProjectsListItem = ({ project, ...rest }: Props) => {
  const projectImageSrc = project.media[0] || '';

  return (
    <Link
      as={ReactRouterLink}
      to={`/projects/${project.id}`}
      _hover={{ textDecoration: 'none' }}
    >
      <HStack spacing={3} display="flex" alignItems="center" {...rest}>
        {projectImageSrc.length > 0 ? (
          <Image
            src={projectImageSrc}
            boxSize="42px"
            borderRadius="md"
            objectFit="cover"
            alt={`Main image for ${project.name}`}
          />
        ) : (
          <SkeletonCircle size="42px" borderRadius="md" />
        )}

        <Text color="brand.neutral900" fontWeight={'bold'} isTruncated>
          {project.title}
        </Text>
      </HStack>
    </Link>
  );
};
