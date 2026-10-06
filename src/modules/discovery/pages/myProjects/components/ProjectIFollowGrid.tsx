import { Badge, Box, Grid, GridItem, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import type { Project } from '@/types'
import { ProjectStatus } from '@/types'

import { useFollowedProjectsActivities } from '../hooks/useFollowedProjectsActivities'

export const ProjectIFollowGrid = () => {
  const { t } = useTranslation()
  const { followedProjectsActivities } = useFollowedProjectsActivities()

  if (followedProjectsActivities.length === 0) {
    return null
  }

  return (
    <VStack align="stretch" mt={4} spacing={4}>
      <HStack justifyContent="flex-start" alignItems="center">
        <H2 bold>{t('Updates on projects I follow')}</H2>
      </HStack>
      <Grid
        templateColumns={{ base: 'repeat(auto-fill, minmax(110px, 1fr))', lg: 'repeat(auto-fill, minmax(145px, 1fr))' }}
        gap={{ base: 2, lg: 4 }}
        overflow="hidden"
        width="100%"
      >
        {followedProjectsActivities.map((activity) => (
          <ProjectIFollowGridItem key={activity.project.id} project={activity.project} count={activity.count} />
        ))}
      </Grid>
    </VStack>
  )
}

const ProjectIFollowGridItem = ({ project, count }: { project: Project; count: number }) => {
  return (
    <GridItem
      width={{ base: '110px', lg: '145px' }}
      height={{ base: '110px', lg: '145px' }}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius="card"
      overflow="hidden"
      position="relative"
      as={Link}
      to={getPath('project', project.name)}
    >
      <ImageWithReload
        src={project.thumbnailImage || ''}
        alt={project.name}
        height="100%"
        width="100%"
        objectFit="cover"
        zIndex={1}
        opacity={project.status !== ProjectStatus.Active ? 0.5 : 1}
      />
      {count > 0 && (
        <Badge
          width={'20px'}
          height={'20px'}
          zIndex={2}
          position="absolute"
          top={2}
          left={2}
          p={2}
          bg={'primary1.9'}
          borderRadius="innerCard"
        >
          <Body size="xs" color="utils.primaryContrast" dark medium>
            {count}
          </Body>
        </Badge>
      )}
      <Box zIndex={2} position="absolute" bottom={0} left={0} right={0} p={2} height="52px" bg="blackAlpha.600">
        <Body size="sm" color="utils.whiteContrast" medium>
          {project.title}
        </Body>
      </Box>
    </GridItem>
  )
}
