import { Box, HTMLChakraProps, Image, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';
import { ProjectImageListItemPlaceholder } from '..';
import { IProject } from '../../../interfaces';

type Props = HTMLChakraProps<'div'> & {
  imageSrc?: string;
  project: IProject;
  size?: string;
  borderRadius?: string;
};

export const ProjectListItemImage = ({
  imageSrc,
  project,
  size = '42px',
  borderRadius = 'md',
  ...rest
}: Props) => {
  const imageSource = imageSrc ?? project.image;

  return (
    <Box {...rest}>
      {imageSrc && imageSrc.length > 0 ? (
        <Image
          flexShrink={0}
          src={imageSource}
          boxSize={size}
          borderRadius={borderRadius}
          objectFit="cover"
          fallback={<ProjectImageListItemPlaceholder />}
          alt={`Main image for ${project.name}`}
        />
      ) : (
        <SkeletonCircle size="full" speed={0} borderRadius={'4px'} />
      )}
    </Box>
  );
};
