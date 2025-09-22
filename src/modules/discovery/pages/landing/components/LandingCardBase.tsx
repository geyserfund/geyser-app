import { Box, Button, HStack, Skeleton, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const projectOwner = project.owners?.[0]?.user

  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('userProfile', projectOwner?.id))
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
          <Body size="sm" dark isTruncated width="100%" wordBreak={'break-word'} whiteSpace={'normal'}>
            {project.shortDescription}
          </Body>

          <Button variant="solid" colorScheme="primary1" size="md" width="100%" onClick={handleContribute}>
            {t('Contribute')}
          </Button>
        </VStack>
      }
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
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
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
        alignItems="start"
        overflow="hidden"
        spacing={{ base: 1, lg: 0 }}
        zIndex={1}
      >
        <HStack w="full" overflow="hidden" alignItems="start">
          <Tooltip label={projectOwner?.username}>
            <Box>
              <ProfileAvatar
                guardian={projectOwner?.guardianType}
                src={projectOwner?.imageUrl || ''}
                size="sm"
                onClick={handleProfileClick}
              />
            </Box>
          </Tooltip>
          <VStack flex={1} alignItems="start" spacing={0} overflow="hidden">
            <H3 size="lg" medium width="100%" isTruncated={!isOpen}>
              {project.title}
            </H3>
            <ProfileText
              size="sm"
              guardian={projectOwner?.guardianType}
              _hover={{ textDecoration: 'underline' }}
              onClick={handleProfileClick}
              width="100%"
              wrapperProps={{ width: '100%' }}
              isTruncated={!isOpen}
            >
              {projectOwner?.username}
            </ProfileText>
          </VStack>
        </HStack>

        <Body
          size="sm"
          height="45px"
          dark
          noOfLines={2}
          isTruncated
          width="100%"
          wordBreak={'break-word'}
          whiteSpace={'normal'}
          display={{ base: 'block', lg: 'none' }}
        >
          {project.shortDescription}
        </Body>
        <HStack w="full" justifyContent="space-between" alignItems="flex-end">
          {
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
          }
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
