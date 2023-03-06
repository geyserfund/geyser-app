import { HStack, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { Project } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { LandingProjectCard } from '../../components'

export const ProjectActivityItem = ({ project }: { project: Project }) => {
  return (
    <VStack w="full">
      <HStack w="full" justifyContent="start">
        <AvatarElement rounded="full" user={project.owners[0].user} />
        <Body2>published a new entry</Body2>
      </HStack>
      <LandingProjectCard project={project} isMobile />
    </VStack>
  )
}
