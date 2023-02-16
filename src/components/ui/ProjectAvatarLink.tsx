import { Avatar, HStack, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { getPath } from '../../constants'
import { Project } from '../../types/generated/graphql'
import { toSmallImageUrl } from '../../utils'

type Props = {
  project: Project
  textColor?: string
}

export const ProjectAvatarLink = ({
  project,
  textColor = 'brand.neutral700',
}: Props) => {
  const avatarSrc = toSmallImageUrl(project.thumbnailImage || '')

  return (
    <Link
      as={ReactRouterLink}
      to={getPath('project', project.name)}
      color={textColor}
    >
      <HStack spacing={1}>
        <Avatar borderRadius="4px" src={avatarSrc} boxSize={'1em'} />
        <Text fontWeight={'bold'} noOfLines={1}>
          {project.title}
        </Text>
      </HStack>
    </Link>
  )
}
