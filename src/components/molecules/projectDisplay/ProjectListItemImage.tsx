import { Box, HTMLChakraProps, Image } from '@chakra-ui/react'

import { Project } from '../../../types/generated/graphql'
import { toSmallImageUrl } from '../../../utils'
import { ProjectImageListItemPlaceholder } from '..'

type Props = HTMLChakraProps<'div'> & {
  imageSrc?: string
  project: Project
  boxSize?: string
  borderRadius?: string
}

export const ProjectListItemImage = ({
  imageSrc,
  project,
  boxSize = '42px',
  borderRadius = 'md',
  ...rest
}: Props) => {
  const imageSource = toSmallImageUrl(project.thumbnailImage || '')

  return (
    <Box boxSize={boxSize} {...rest}>
      <Image
        flexShrink={0}
        src={imageSource}
        boxSize={boxSize}
        borderRadius={borderRadius}
        objectFit="cover"
        fallback={<ProjectImageListItemPlaceholder />}
        alt={`Main image for ${project.name}`}
      />
    </Box>
  )
}
