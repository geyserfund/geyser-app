import { Box, Button, HStack, Skeleton, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'

import { ProgressBar } from '@/components/ui/ProgressBar.tsx'
import { FollowButton } from '@/modules/project/pages1/projectView/views/body/components/FollowButton.tsx'
import { NonProjectProjectIcon } from '@/modules/project/pages1/projectView/views/body/sections/header/components/NonProjectProjectIcon.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { InteractiveCardLayout } from '@/shared/components/layouts/InteractiveCardLayout.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { aonProjectTimeLeft } from '@/shared/utils/project/getTimeLeft.ts'
import { centsToDollars, isAllOrNothing, isInactive } from '@/utils'

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenTemp, onOpen: onOpenTemp, onClose: onCloseTemp } = useDisclosure()

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

  const isAonProject = isAllOrNothing(project)
  const percentage = isAonProject
    ? project.aonGoalInSats
      ? Math.round((project.balance / project.aonGoalInSats) * 100)
      : 0
    : 0
  const timeLeft = aonProjectTimeLeft(project)

  const isWeekly = Boolean(project.contributionSummary?.contributionsTotalUsd)
  const fires = getFires(contributionAmount)

  const handleContribute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('projectFunding', project.name))
  }

  const projectOwner = project.owners?.[0]?.user

  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('userProfile', projectOwner?.id))
  }

  const headerContent = (props?: { alwaysTruncate?: boolean; highlight?: boolean }) => {
    const { alwaysTruncate, highlight } = props || {}

    return (
      <HStack w="full" overflow="hidden" alignItems="start">
        <Tooltip label={projectOwner?.username}>
          <Box display={{ base: 'none', lg: 'block' }}>
            <ProfileAvatar
              guardian={projectOwner?.guardianType}
              src={projectOwner?.imageUrl || ''}
              size="sm"
              onClick={handleProfileClick}
            />
          </Box>
        </Tooltip>
        <VStack flex={1} alignItems="start" spacing={0} overflow="hidden">
          <H3
            size="lg"
            medium
            width="100%"
            isTruncated={alwaysTruncate || !isOpen}
            color={highlight ? 'primary1.8' : 'unset'}
          >
            {project.title}
          </H3>
          <HStack w="full" spacing={1}>
            <Box display={{ base: 'block', lg: 'none' }}>
              <ProfileAvatar
                guardian={projectOwner?.guardianType}
                src={projectOwner?.imageUrl || ''}
                height="16px"
                width="16px"
                wrapperProps={{
                  padding: '1px',
                  height: '18px',
                  width: '18px',
                }}
                onClick={handleProfileClick}
              />
            </Box>
            <ProfileText
              size="sm"
              guardian={projectOwner?.guardianType}
              _hover={{ textDecoration: 'underline' }}
              onClick={handleProfileClick}
              maxWidth="100%"
              wrapperProps={{ width: '100%' }}
              isTruncated={alwaysTruncate || !isOpen}
            >
              {projectOwner?.username}
            </ProfileText>
          </HStack>
        </VStack>
      </HStack>
    )
  }

  const contributionContent = () => {
    return (
      <HStack w="full" justifyContent="space-between" alignItems="flex-end">
        {isAonProject ? (
          <Body
            size="sm"
            bold
            color={percentage < 100 && timeLeft?.label !== 'days left' ? 'warning.11' : 'primary1.11'}
            isTruncated
          >
            {percentage ? (
              <>
                {timeLeft?.value} {timeLeft?.label} {' - '}
                <Body as="span" regular>
                  {percentage}% {t('raised!')}
                </Body>
              </>
            ) : (
              t('Just launched!')
            )}
          </Body>
        ) : (
          <Body size="sm" bold color="primary1.11" isTruncated>
            {contributionAmount ? (
              <>
                {fires ? `${fires} ` : ''}
                {formatAmount(contributionAmount, 'USD')}{' '}
                <Body as="span" regular>
                  {isWeekly ? t('raised this week!') : t('raised!')}
                </Body>
              </>
            ) : (
              t('Just launched!')
            )}
          </Body>
        )}
        <FollowButton project={project} />
      </HStack>
    )
  }

  return (
    <InteractiveCardLayout
      padding="0px"
      width={{ base: 'full', lg: 'full' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={2}
      flex={{ base: 'unset', lg: 1 }}
      position="relative"
      background="transparent"
      hoverContent={
        <VStack paddingX={{ base: 3, lg: 4 }} paddingBottom={{ base: 3, lg: 4 }} width="100%" alignItems="start">
          <VStack w="full" spacing={0} opacity={!isOpenTemp ? 0 : 1}>
            {headerContent({ highlight: true })}
            {contributionContent()}
          </VStack>

          <Body size="sm" dark isTruncated width="100%" wordBreak={'break-word'} whiteSpace={'normal'}>
            {project.shortDescription}
          </Body>
          <Button variant="solid" colorScheme="primary1" size="md" width="100%" onClick={handleContribute}>
            {t('Contribute')}
          </Button>
        </VStack>
      }
      isOpen={isOpen}
      onOpen={() => {
        onOpen()
        setTimeout(() => {
          onOpenTemp()
        }, 100)
      }}
      onClose={() => {
        onClose()
        setTimeout(() => {
          onCloseTemp()
        }, 100)
      }}
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
      <Box width={{ base: '120px', lg: 'auto' }} height={{ base: '120px', lg: 'auto' }} position="relative" zIndex={1}>
        <ImageWithReload
          width="100%"
          height="100%"
          aspectRatio={{ base: undefined, lg: 1 }}
          objectFit="cover"
          borderRadius="8px"
          src={project.thumbnailImage || ''}
          alt={`${project.title}-header-image`}
        />
        <Box position="absolute" top={2} right={2}>
          <NonProjectProjectIcon taxProfile={project.owners?.[0]?.user?.taxProfile} />
        </Box>
        {isAonProject && (
          <Box position="absolute" width="100%" height="12px" bottom={'-1px'} paddingTop="2px" background="utils.pbg">
            <ProgressBar
              value={percentage}
              height="10px"
              borderRadius="20px"
              borderTopLeftRadius="0px"
              borderTopEndRadius="0px"
            />
          </Box>
        )}
      </Box>
      {!isOpenTemp && (
        <VStack
          flex={1}
          width={{ base: 'auto', lg: '100%' }}
          minWidth={{ base: '170px', lg: 'auto' }}
          alignItems="start"
          overflow="hidden"
          spacing={{ base: 1, lg: 0 }}
        >
          {headerContent({ alwaysTruncate: true })}

          <Body
            size="sm"
            height="34px"
            dark
            noOfLines={2}
            isTruncated
            width="100%"
            wordBreak={'break-word'}
            whiteSpace={'normal'}
            lineHeight="1.2"
            display={{ base: 'block', lg: 'none' }}
          >
            {project.shortDescription}
          </Body>
          {contributionContent()}
        </VStack>
      )}
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
