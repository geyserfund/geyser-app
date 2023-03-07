import { HStack, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { LinkableAvatar } from '../../../../components/ui'
import { Project } from '../../../../types'
import { LandingProjectCard } from '../../components'

export const ProjectActivityItem = ({ project }: { project: Project }) => {
  const owner = project.owners[0].user
  return (
    <VStack w="full">
      <HStack w="full" justifyContent="start">
        <LinkableAvatar
          imageSrc={`${owner.imageUrl}`}
          avatarUsername={owner.username}
          userProfileID={owner.id}
          imageSize={'24px'}
          textColor="brand.neutral600"
        />
        <Body2>launched a new Project</Body2>
      </HStack>
      <LandingProjectCard project={project} isMobile />
    </VStack>
  )
}
