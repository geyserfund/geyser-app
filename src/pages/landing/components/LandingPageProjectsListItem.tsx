import { HStack, HTMLChakraProps, Text, Image, Link } from '@chakra-ui/react';
import React from 'react';
import { IProject } from '../../../interfaces';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ProjectImageListItemPlaceholder } from '../../../components/molecules';

type Props = HTMLChakraProps<'div'> & {
  project: IProject;
};

export const LandingPageProjectsListItem = ({ project, ...rest }: Props) => {
  const projectImageSrc = project.image || '';

  return (
    <Link
      as={ReactRouterLink}
      to={`/projects/${project.name}`}
      _hover={{ textDecoration: 'none' }}
    >
      <HStack spacing={3} display="flex" alignItems="center" {...rest}>
        <Image
          flexShrink={0}
          src={projectImageSrc}
          boxSize="42px"
          borderRadius="md"
          objectFit="cover"
          fallback={<ProjectImageListItemPlaceholder />}
          fit="cover"
          alt={`Main image for ${project.name}`}
        />

        <Text color="brand.neutral900" fontWeight={'bold'} isTruncated>
          {project.title}
        </Text>
      </HStack>
    </Link>
  );
};
