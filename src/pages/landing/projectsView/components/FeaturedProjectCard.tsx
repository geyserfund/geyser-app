import { AddIcon } from '@chakra-ui/icons'
import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'

import { SatoshiPng } from '../../../../assets'
import { H2, H3 } from '../../../../components/typography'
import { IconButtonComponent } from '../../../../components/ui'
import { fonts } from '../../../../styles'
import { Project } from '../../../../types'
import { getShortAmountLabel } from '../../../../utils'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { ProjectDiscoveryComponent } from './ProjectDiscoveryComponent'
import { ProjectFundingStatWithFollow } from './ProjectFundingStatWithFollow'

export const FeaturedProjectCard = ({ project }: { project: Project }) => {
  return (
    <ProjectDiscoveryComponent title="Featured Project" width="100%">
      <HStack width="100%" height="245px" alignItems="start" spacing="20px">
        <Box flex={4} height="100%" borderRadius="8px" overflow="hidden">
          <Image
            height="full"
            width="full"
            src="https://picsum.photos/200/300"
            objectFit="cover"
          ></Image>
        </Box>
        <VStack
          flex={3}
          height="100%"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
        >
          <H2 color="brand.neutral700"> {project.title} </H2>
          <AvatarElement user={project.owners[0].user} />
          <H3
            color="brand.neutral800"
            isTruncated
            noOfLines={5}
            whiteSpace="normal"
          >
            {project.shortDescription}
          </H3>
          <ProjectFundingStatWithFollow
            flex={1}
            pb={1}
            align={'flex-end'}
            justifyContent={'space-between'}
            project={project}
            bold
          />
        </VStack>
      </HStack>
    </ProjectDiscoveryComponent>
  )
}
