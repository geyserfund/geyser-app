import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { PrelaunchFollowButton } from '@/modules/project/pages1/projectView/views/body/components/PrelaunchFollowButton.tsx'
import { NonProjectProjectIcon } from '@/modules/project/pages1/projectView/views/body/sections/header/components/NonProjectProjectIcon.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/index.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPathWithGeyserHero } from '@/shared/constants/index.ts'
import { ProjectForLaunchpadPageFragment } from '@/types/index.ts'

const FOLLOWERS_NEEDED = 21

type LaunchpadProjectItemProps = {
  project: ProjectForLaunchpadPageFragment
} & CardLayoutProps

export const LaunchpadProjectItem = ({ project, ...rest }: LaunchpadProjectItemProps) => {
  const currentFollowers = project.followersCount ?? 0
  const followersNeeded = Math.max(0, FOLLOWERS_NEEDED - currentFollowers)

  return (
    <CardLayout
      hover
      as={Link}
      to={getPathWithGeyserHero('project', project.name)}
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={0}
      flex={{ base: 'unset', lg: 1 }}
      position="relative"
      {...rest}
    >
      <Box
        minWidth={{ base: '102px', lg: 'auto' }}
        width="auto"
        height={{ base: '139px', lg: 'auto' }}
        position="relative"
      >
        <ImageWithReload
          width="100%"
          height="100%"
          aspectRatio={1}
          objectFit="cover"
          src={project.thumbnailImage}
          alt={`${project.title}-header-image`}
        />
        <Box position="absolute" top={2} right={2}>
          <NonProjectProjectIcon taxProfile={project.owners?.[0]?.user?.taxProfile} />
        </Box>
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
        padding={4}
        alignItems="start"
        overflow="hidden"
        spacing={{ base: 2, lg: 4 }}
      >
        <VStack w="full" spacing={0}>
          <H3 size="lg" medium isTruncated width="100%">
            {project.title}
          </H3>
          <Body size="sm" dark noOfLines={2} isTruncated width="100%" wordBreak={'break-all'} whiteSpace={'normal'}>
            {project.shortDescription}
          </Body>
          <HStack w="full" justify="space-between">
            <Body size="sm" light>
              {currentFollowers} {t('followers')}
            </Body>
            <Body size="sm" light>
              {followersNeeded > 0 ? t('{{count}} remaining', { count: followersNeeded }) : t('Goal reached!')}
            </Body>
          </HStack>
        </VStack>
        <PrelaunchFollowButton project={project} width="full" size={{ base: 'md', lg: 'lg' }} />
      </VStack>
    </CardLayout>
  )
}

export const LaunchpadProjectItemSkeleton = () => {
  return (
    <CardLayout
      padding="0px"
      overflow="hidden"
      borderColor="neutral.border"
      bg="neutral.surface"
      borderWidth="1px"
      borderRadius="lg"
      direction="column"
      spacing={0}
      w="full"
      maxW="sm"
    >
      <Skeleton h="160px" w="full" />

      <VStack p="4" spacing="3" align="stretch" flex={1}>
        <SkeletonLayout height="24px" width="80%" />
        <SkeletonLayout height="16px" width="100%" />
        <SkeletonLayout height="16px" width="100%" />
        <SkeletonLayout height="16px" width="60%" />

        <HStack justify="space-between" spacing="4" mt={1}>
          <SkeletonLayout height="16px" width="80px" />
          <SkeletonLayout height="16px" width="120px" />
        </HStack>

        <Box pt={2}>
          <Skeleton height="48px" w="full" borderRadius="md" />
        </Box>
      </VStack>
    </CardLayout>
  )
}
