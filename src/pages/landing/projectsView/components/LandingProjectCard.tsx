import { Box, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { Project } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { ProjectFundingStatWithFollow } from './ProjectFundingStatWithFollow'

export const LandingProjectCard = ({ project }: { project: Project }) => {
  return (
    <CardLayout
      hover
      as={Link}
      to={getPath('project', project.name)}
      padding="0px"
      width={{ base: 'full', xl: '240px' }}
      direction={{ base: 'row', xl: 'column' }}
      spacing="0px"
    >
      <Box
        width={{ base: '120px', xl: 'full' }}
        height={{ base: '120px', xl: '200px' }}
        overflow="hidden"
      >
        <Image
          width="100%"
          height="100%"
          objectFit="cover"
          src={project.thumbnailImage || ''}
        />
      </Box>
      <VStack
        width={{ base: 'auto', xl: '100%' }}
        minWidth={{ base: '250px', md: 'auto' }}
        padding="10px"
        alignItems="start"
        justifyContent="center"
        overflow="hidden"
      >
        <H3 isTruncated width="100%">
          {project.title}
        </H3>
        <Box width="100%" overflow="hidden">
          <AvatarElement
            borderRadius="50%"
            user={project.owners[0].user}
            noLink
          />
        </Box>
        <ProjectFundingStatWithFollow
          width="100%"
          project={project}
          justifyContent={{ base: 'start', xl: 'space-between' }}
          spacing={{ base: '30px', xl: '0px' }}
        />
      </VStack>
    </CardLayout>
  )
}
