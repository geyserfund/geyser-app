import { Box, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
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
        width={{ base: '125px', xl: 'full' }}
        height={{ base: '125px', xl: '200px' }}
      >
        <ImageWithReload
          grey
          width="100%"
          height="100%"
          objectFit="cover"
          src={project.thumbnailImage || ''}
        />
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', xl: '100%' }}
        minWidth={{ base: '170px', md: 'auto' }}
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
          justifyContent={{
            base: 'space-between',
            sm: 'start',
            xl: 'space-between',
          }}
          spacing={{ base: '0px', sm: '30px', xl: '0px' }}
        />
      </VStack>
    </CardLayout>
  )
}
