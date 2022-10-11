import { Avatar, HStack, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { IProject } from '../../interfaces';
import { Project } from '../../types/generated/graphql';

type Props = {
  project: IProject | Project;
  textColor?: string;
};

export const ProjectAvatarLink = ({
  project,
  textColor = 'brand.neutral700',
}: Props) => {
  const avatarSrc = project.image;

  return (
    <Link
      as={ReactRouterLink}
      to={`/project/${project.name}`}
      color={textColor}
    >
      <HStack spacing={1}>
        <Avatar borderRadius="4px" src={avatarSrc} boxSize={'1em'} />
        <Text fontWeight={'bold'}>{project.title}</Text>
      </HStack>
    </Link>
  );
};
