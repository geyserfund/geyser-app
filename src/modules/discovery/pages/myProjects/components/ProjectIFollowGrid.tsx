import { Badge, Box, Grid, GridItem, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { Project } from '@/types'

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
        <Body size="2xl" bold>
          {t('Updates on projects I follow')}
        </Body>
      </HStack>
      <Grid
        templateColumns={{ base: 'repeat(auto-fill, minmax(110px, 1fr))', lg: 'repeat(auto-fill, minmax(145px, 1fr))' }}
        gap={{ base: 2, lg: 4 }}
        overflow="hidden"
        width="100%"
      >
        {followedProjectsActivities.map((activity) => (
          <>
            <ProjectIFollowGridItem key={activity.project.id} project={activity.project} count={activity.count} />
            <ProjectIFollowGridItem key={activity.project.id} project={activity.project} count={activity.count} />
          </>
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
      borderRadius="md"
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
      />
      <Badge
        width={'20px'}
        height={'20px'}
        zIndex={2}
        position="absolute"
        top={2}
        left={2}
        p={2}
        bg={'primary1.9'}
        borderRadius="md"
        color="white"
      >
        <Body size="xs" dark medium>
          {count}
        </Body>
      </Badge>
      <Box zIndex={2} position="absolute" bottom={0} left={0} right={0} p={2} height="52px" bg="rgba(0, 0, 0, 0.5)">
        <Body size="sm" color="white" medium>
          {project.title}
        </Body>
      </Box>
    </GridItem>
  )
}
