import { Badge, Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime, Duration } from 'luxon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui/ProgressBar.tsx'
import { USD_CENTS_AMOUNT_TO_GO_LIVE } from '@/modules/project/pages1/projectView/views/body/components/PrelaunchFollowButton.tsx'
import { NonProjectProjectIcon } from '@/modules/project/pages1/projectView/views/body/sections/header/components/NonProjectProjectIcon.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/index.ts'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPathWithGeyserHero } from '@/shared/constants/index.ts'
import { ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { ProjectForLaunchpadPageFragment } from '@/types/index.ts'

type LaunchpadProjectItemProps = {
  project: ProjectForLaunchpadPageFragment
} & CardLayoutProps

export const LaunchpadProjectItem = ({ project, ...rest }: LaunchpadProjectItemProps) => {
  const { formatAmount } = useCurrencyFormatter()

  // Time remaining calculation
  const [timeLeft, setTimeLeft] = useState<Duration | null>(null)

  useEffect(() => {
    if (!project?.preLaunchExpiresAt) {
      setTimeLeft(null)
      return
    }

    const endTime = DateTime.fromMillis(project.preLaunchExpiresAt)

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
  }, [project?.preLaunchExpiresAt])

  // Format time value helper
  const formatTimeValue = (value: number): string => {
    return String(Math.max(0, Math.floor(value)))
  }

  // Format time string for display
  let timeDisplay = ''
  if (timeLeft === null) {
    timeDisplay = ''
  } else if (timeLeft.valueOf() <= 0) {
    timeDisplay = t('Time is up')
  } else if (timeLeft.days > 0) {
    timeDisplay = `${formatTimeValue(timeLeft.days)} ${timeLeft.days > 1 ? 'days' : 'day'} ${t('left')}`
  } else if (timeLeft.hours > 0) {
    timeDisplay = `${formatTimeValue(timeLeft.hours)} ${timeLeft.hours > 1 ? 'hours' : 'hour'} ${t('left')}`
  } else {
    timeDisplay = `${formatTimeValue(timeLeft.minutes)} ${timeLeft.minutes > 1 ? 'minutes' : 'minute'} ${t('left')}`
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

        <VStack w="full" spacing={0}>
          <HStack w="full" alignItems="flex-end" justify="space-between">
            <HStack spacing={0} alignItems="flex-end">
              <Body size="xl" lineHeight="1.3" bold color="primary1.11">
                {formatAmount(project.balanceUsdCent, 'USDCENT')}
              </Body>
              <Body as="span" size="sm" thin color="primary1.11">
                /$210
              </Body>
            </HStack>
            <Body size="sm" thin color={getTimeColor()}>
              {timeDisplay}
            </Body>
          </HStack>
          <ProgressBar
            current={project.balanceUsdCent}
            min={0}
            max={USD_CENTS_AMOUNT_TO_GO_LIVE}
            height="16px"
            borderRadius="6px"
            width="full"
          />
        </VStack>
      </VStack>
    </CardLayout>
  )
}

export const LaunchpadProjectItemSkeleton = () => {
  return (
    <CardLayout padding="0px" width={'auto'} direction={'column'} spacing={0} flex={1} position="relative">
      <Skeleton h="160px" w="full" />

      <VStack p="4" spacing="4" align="stretch" flex={1}>
        <SkeletonLayout height="24px" width="80%" />
        <SkeletonLayout height="16px" width="100%" />
        <SkeletonLayout height="16px" width="100%" />
        <SkeletonLayout height="16px" width="60%" />

        <VStack w="full">
          <HStack w="full" justify="space-between" spacing="4" mt={1}>
            <SkeletonLayout height="16px" width="40px" />
            <SkeletonLayout height="16px" width="80px" />
          </HStack>

          <SkeletonLayout height="16px" w="full" borderRadius="md" />
        </VStack>
      </VStack>
    </CardLayout>
  )
}
