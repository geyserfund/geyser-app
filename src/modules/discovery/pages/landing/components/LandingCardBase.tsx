import { Box, Button, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'

import { FollowButton } from '@/modules/project/pages1/projectView/views/body/components/FollowButton.tsx'
import { NonProjectProjectIcon } from '@/modules/project/pages1/projectView/views/body/sections/header/components/NonProjectProjectIcon.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { InteractiveCardLayout } from '@/shared/components/layouts/InteractiveCardLayout.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { centsToDollars, isInactive } from '@/utils'

import { SkeletonLayout } from '../../../../../shared/components/layouts'
import { ContributionsSummary, ProjectForLandingPageFragment } from '../../../../../types'

export interface LandingCardBaseProps extends CardLayoutProps {
  isMobile?: boolean
  project: ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  }
  hasSubscribe?: boolean
}

export const LandingCardBase = ({ isMobile, project, hasSubscribe, ...rest }: LandingCardBaseProps) => {
  const inActive = isInactive(project.status)
  const navigate = useNavigate()
  const { formatAmount } = useCurrencyFormatter(true)

  const getFires = (amount: number) => {
    if (amount > 100) {
      return '🔥'
    }

    if (amount > 1000) {
      return '🔥🔥'
    }

    if (amount > 10000) {
      return '🔥🔥🔥'
    }

    return ''
  }

  const contributionAmount =
    project.contributionSummary?.contributionsTotalUsd || centsToDollars(project.balanceUsdCent)
  const isWeekly = Boolean(project.contributionSummary?.contributionsTotalUsd)
  const fires = getFires(contributionAmount)

  const handleContribute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('projectFunding', project.name))
  }

  return (
    <InteractiveCardLayout
      padding="0px"
      width={{ base: 'full', lg: 'full' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={0}
      flex={{ base: 'unset', lg: 1 }}
      position="relative"
      hoverContent={
        <VStack paddingX={{ base: 3, lg: 4 }} paddingBottom={{ base: 3, lg: 4 }} width="100%">
          <Button variant="solid" colorScheme="primary1" size="sm" width="100%" onClick={handleContribute}>
            {t('Contribute')}
          </Button>
        </VStack>
      }
      {...rest}
    >
      {inActive && (
        <Box
          backgroundColor={'utils.pbg'}
          opacity={0.5}
          zIndex="1"
          pointerEvents={'none'}
          position="absolute"
          width="100%"
          height="100%"
        />
      )}
      <Box width={{ base: '120px', lg: 'auto' }} height={{ base: '141px', lg: 'auto' }} position="relative">
        <ImageWithReload
          width="100%"
          height="100%"
          aspectRatio={{ base: undefined, lg: 1 }}
          objectFit="cover"
          borderRadius="8px"
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
        spacing={1}
      >
        <H3 size="lg" medium isTruncated width="100%">
          {project.title}
        </H3>
        <Body
          size="sm"
          height="45px"
          dark
          noOfLines={2}
          isTruncated
          width="100%"
          wordBreak={'break-word'}
          whiteSpace={'normal'}
        >
          {project.shortDescription}
        </Body>
        <HStack w="full" justifyContent="space-between">
          <Body size="sm" bold color="primary1.11" isTruncated>
            {fires ? `${fires} ` : ''}
            {formatAmount(contributionAmount, 'USD')}{' '}
            <Body as="span" regular>
              {isWeekly ? t('raised this week!') : t('raised!')}
            </Body>
          </Body>
          <FollowButton project={project} />
        </HStack>
      </VStack>
    </InteractiveCardLayout>
  )
}

export const LandingCardBaseSkeleton = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <>
      <InteractiveCardLayout
        padding="0px"
        width={{ base: 'full', lg: 'auto' }}
        direction={{ base: 'row', lg: 'column' }}
        spacing={0}
        flex={{ base: 'unset', lg: 1 }}
      >
        <Box width={{ base: '96px', lg: 'auto' }} height={{ base: '96px', lg: 'auto' }} aspectRatio={1}>
          <Skeleton width="100%" height="100%"></Skeleton>
        </Box>
        <VStack
          flex={1}
          width={{ base: 'auto', lg: '100%' }}
          minWidth={{ base: '170px', lg: 'auto' }}
          padding={4}
          alignItems="start"
          justifyContent="space-between"
          overflow="hidden"
          spacing={1}
        >
          <SkeletonLayout width="100%" height="22px" />

          <HStack w="full" justifyContent={'start'} spacing={3}>
            <SkeletonLayout width="30px" height="22px" />

            <SkeletonLayout width="60px" height="22px" />
          </HStack>
        </VStack>
      </InteractiveCardLayout>
    </>
  )
}
