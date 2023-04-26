import { HStack, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { LinkableAvatar } from '../../../../components/ui'
import { Project } from '../../../../types'
import { LandingProjectCard, TimeAgo } from '../../components'

export const ProjectActivityItem = ({
  project,
  dateTime,
}: {
  project: Project
  dateTime?: string
}) => {
  const owner = project.owners[0]?.user

  return (
    <VStack w="full" alignItems="start">
      <HStack w="full" justifyContent="start">
        {owner ? (
          <LinkableAvatar
            imageSrc={owner.imageUrl || ''}
            avatarUsername={owner.username}
            userProfileID={owner.id}
            imageSize={'24px'}
            textColor="brand.neutral600"
          />
        ) : null}
        <Body2>launched a new Project</Body2>
      </HStack>
      <LandingProjectCard project={project} isMobile />
      <TimeAgo date={dateTime || ''} />
    </VStack>
  )
}
