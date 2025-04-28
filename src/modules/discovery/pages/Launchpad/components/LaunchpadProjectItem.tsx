import { Badge, Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime, Duration } from 'luxon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PrelaunchFollowButton } from '@/modules/project/pages1/projectView/views/body/components/PrelaunchFollowButton.tsx'
import { NonProjectProjectIcon } from '@/modules/project/pages1/projectView/views/body/sections/header/components/NonProjectProjectIcon.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/index.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPathWithGeyserHero } from '@/shared/constants/index.ts'
import { ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import { ProjectForLaunchpadPageFragment } from '@/types/index.ts'

const FOLLOWERS_NEEDED = 21

type LaunchpadProjectItemProps = {
  project: ProjectForLaunchpadPageFragment
  onFollowCompleted?: (projectId: string) => void
} & CardLayoutProps

export const LaunchpadProjectItem = ({ project, onFollowCompleted, ...rest }: LaunchpadProjectItemProps) => {
  const currentFollowers = project.followersCount ?? 0
  const followersNeeded = Math.max(0, FOLLOWERS_NEEDED - currentFollowers)

  // Time remaining calculation
  const [timeLeft, setTimeLeft] = useState<Duration | null>(null)

  useEffect(() => {
    if (!project?.preLaunchedAt) {
      setTimeLeft(null)
      return
    }

    const launchTime = DateTime.fromMillis(project.preLaunchedAt)
    const endTime = launchTime.plus({ days: 30 })

    const updateCountdown = () => {
      const now = DateTime.now()
      const remaining = endTime.diff(now, ['days', 'hours', 'minutes'])

      if (remaining.valueOf() <= 0) {
        setTimeLeft(Duration.fromMillis(0))
        clearInterval(intervalId)
      } else {
        setTimeLeft(remaining)
      }
    }

    updateCountdown()
    const intervalId = setInterval(updateCountdown, 60000)

    return () => clearInterval(intervalId)
  }, [project?.preLaunchedAt])

  // Format time value helper
  const formatTimeValue = (value: number): string => {
    return String(Math.max(0, Math.floor(value))).padStart(2, '0')
  }

  // Format time string for display
  let timeDisplay = ''
  if (timeLeft === null) {
    timeDisplay = ''
  } else if (timeLeft.valueOf() <= 0) {
    timeDisplay = t('Time is up')
  } else if (timeLeft.days > 0) {
    timeDisplay = `${formatTimeValue(timeLeft.days)}d ${t('left')}`
  } else if (timeLeft.hours > 0) {
    timeDisplay = `${formatTimeValue(timeLeft.hours)}hr ${t('left')}`
  } else {
    timeDisplay = `${formatTimeValue(timeLeft.minutes)}min ${t('left')}`
  }

  // Determine color for followers count
  const getFollowersColor = () => {
    if (currentFollowers < 3) return 'error.11'
    if (currentFollowers < 15) return 'warning.11'
    return 'primary1.11'
  }

  // Determine color for time display
  const getTimeColor = () => {
    if (!timeLeft) return 'neutral.text'
    if (timeLeft.days > 15) return 'primary1.11'
    if (timeLeft.days >= 1) return 'warning.11'
    return 'error.11'
  }

  return (
    <CardLayout
      hover
      as={Link}
      to={getPathWithGeyserHero('projectPreLaunch', project.name)}
      padding="0px"
      width={'auto'}
      direction={'column'}
      spacing={0}
      flex={1}
      position="relative"
      {...rest}
    >
      <Box minWidth={'auto'} width="auto" height={'auto'} position="relative">
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
      <VStack flex={1} width={'100%'} minWidth={'auto'} padding={4} alignItems="start" overflow="hidden" spacing={2}>
        <H3 size="lg" medium isTruncated width="100%">
          {project.title}
        </H3>

        <Body
          height="50px"
          size="sm"
          dark
          noOfLines={3}
          lineHeight={'1.2'}
          isTruncated
          width="100%"
          wordBreak={'break-all'}
          whiteSpace={'normal'}
        >
          {project.shortDescription}
        </Body>

        <Badge variant="soft" colorScheme="neutral1">
          {ProjectSubCategoryLabel[project.subCategory ?? '']}
        </Badge>

        <HStack w="full" justify="space-between">
          <Body size="sm" bold color={getFollowersColor()}>
            {followersNeeded > 0 ? `${currentFollowers} ${t('followers')}` : t('Goal reached!')}
          </Body>
          <Body size="sm" bold color={getTimeColor()}>
            {timeDisplay}
          </Body>
        </HStack>
        <PrelaunchFollowButton
          project={project}
          width="full"
          size={'lg'}
          onFollowCompleted={() => onFollowCompleted?.(project.id)}
        />
      </VStack>
    </CardLayout>
  )
}

export const LaunchpadProjectItemSkeleton = () => {
  return (
    <CardLayout padding="0px" width={'auto'} direction={'column'} spacing={0} flex={1} position="relative">
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
