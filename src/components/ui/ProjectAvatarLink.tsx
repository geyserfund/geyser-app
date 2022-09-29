import { Avatar, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProject } from '../../interfaces';

type Props = {
  project: IProject;
  textColor?: string;
};

export const ProjectAvatarLink = ({
  project,
  textColor = 'brand.neutral700',
}: Props) => {
  const avatarSrc = project.media.length > 0 ? project.media[0] : '';

  return (
    <Link to={`/project/${project.id}`} color={textColor}>
      <HStack spacing={1}>
        <Avatar borderRadius="4px" src={avatarSrc} boxSize={'1em'} />
        <Text fontWeight={'bold'}>{project.title}</Text>
      </HStack>
    </Link>
  );
};
