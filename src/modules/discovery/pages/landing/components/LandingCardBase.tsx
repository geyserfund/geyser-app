import { Box, Button, HStack, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { NonProjectProjectIcon } from '@/modules/project/pages/projectView/views/body/sections/header/components/NonProjectProjectIcon.tsx'
import { AnimatedFire } from '@/shared/components/display/AnimatedFire.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { InteractiveCardLayout } from '@/shared/components/layouts/InteractiveCardLayout.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { AonProgressBar } from '@/shared/molecules/project/AonProgressBar.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { aonProjectTimeLeft, getAonGoalPercentage } from '@/shared/utils/project/getAonData.ts'
import { centsToDollars, isAllOrNothing, isInactive } from '@/utils'

import { SkeletonLayout } from '../../../../../shared/components/layouts'
import { ContributionsSummary, ProjectForLandingPageFragment } from '../../../../../types'
import { AllOrNothingIcon } from './AllOrNothingIcon.tsx'

export interface LandingCardBaseProps extends CardLayoutProps {
  isMobile?: boolean
  project: ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  }
  hideContributionContent?: boolean
  noMobile?: boolean
  hasSubscribe?: boolean
}

export const LandingCardBase = ({
  isMobile,
  project,
  hasSubscribe,
  noMobile,
  hideContributionContent,
  ...rest
}: LandingCardBaseProps) => {
  const inActive = isInactive(project.status)
  const navigate = useNavigate()
  const { formatAmount } = useCurrencyFormatter(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getFires = (amount: number) => {
    if (amount > 1000) {
      return '🔥'
    }

    return ''
  }

  const contributionAmount =
    project.contributionSummary?.contributionsTotalUsd || centsToDollars(project.balanceUsdCent)

  const isAonProject = isAllOrNothing(project)
  const percentage = getAonGoalPercentage(project.aonGoal)
  const timeLeft = aonProjectTimeLeft(project.aonGoal)

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

  const getResponsiveValue = ({ base, lg }: { base: any; lg: any }) => {
    return noMobile ? lg : { base, lg }
  }

  const headerContent = (props?: { alwaysTruncate?: boolean; highlight?: boolean }) => {
    const { alwaysTruncate } = props || {}

    return (
      <HStack w="full" overflow="hidden" alignItems="start">
        <Tooltip label={projectOwner?.username}>
          <Box display={getResponsiveValue({ base: 'none', lg: 'block' })} paddingY={'2px'}>
            <ProfileAvatar
              guardian={projectOwner?.guardianType}
              src={projectOwner?.imageUrl || ''}
              onClick={handleProfileClick}
              height="28px"
              width="28px"
              wrapperProps={{
                padding: '2px',
                height: '32px',
                width: '32px',
              }}
            />
          </Box>
        </Tooltip>
        <VStack flex={1} alignItems="start" spacing={0} overflow="hidden">
          <H3 size="md" medium width="100%" isTruncated={alwaysTruncate || !isOpen}>
            {project.title}
          </H3>
          <HStack w="full" spacing={1}>
            <Box display={getResponsiveValue({ base: 'block', lg: 'none' })}>
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
              size="xs"
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
            color={percentage > 100 ? 'primary1.11' : timeLeft?.label !== 'days left' ? 'warning.11' : 'neutral1.12'}
            isTruncated
          >
            {percentage ? (
              <>
                {timeLeft?.value} {timeLeft?.label} {' - '}
                <Body as="span" bold color={percentage >= 100 ? 'primary1.11' : 'neutral1.12'}>
                  {percentage}% {t('funded')}
                </Body>
              </>
            ) : (
              t('Just launched')
            )}
          </Body>
        ) : (
          <HStack spacing={0}>
            {fires ? <AnimatedFire /> : ''}

            <Body size="sm" bold color="primary1.11" isTruncated>
              {contributionAmount ? (
                <>
                  {formatAmount(contributionAmount, 'USD')}{' '}
                  <Body as="span" regular>
                    {isWeekly ? t('this week') : t('raised')}
                  </Body>
                </>
              ) : (
                t('Just launched')
              )}
            </Body>
          </HStack>
        )}
      </HStack>
    )
  }

  return (
    <InteractiveCardLayout
      padding="0px"
      width={'full'}
      direction={getResponsiveValue({ base: 'row', lg: 'column' })}
      spacing={2}
      flex={getResponsiveValue({ base: 'unset', lg: 1 })}
      position="relative"
      background="transparent"
      hoverContent={
        <VStack
          paddingX={getResponsiveValue({ base: 3, lg: 4 })}
          paddingBottom={getResponsiveValue({ base: 3, lg: 4 })}
          width="100%"
          alignItems="start"
          marginTop={hideContributionContent ? '-49px' : '-70px'}
        >
          <VStack w="full" spacing={0} opacity={!isOpen ? 0 : 1}>
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
      <HStack
        width={getResponsiveValue({ base: '120px', lg: 'auto' })}
        height={getResponsiveValue({ base: '120px', lg: 'auto' })}
        position="relative"
        justifyContent="center"
        zIndex={1}
      >
        <ImageWithReload
          width="100%"
          height="100%"
          aspectRatio={getResponsiveValue({ base: undefined, lg: 1 })}
          objectFit="cover"
          borderRadius="8px"
          src={project.thumbnailImage || ''}
          alt={`${project.title}-header-image`}
        />
        <Box position="absolute" top={2} right={2}>
          <NonProjectProjectIcon taxProfile={project.owners?.[0]?.user?.taxProfile} />
          <AllOrNothingIcon project={project} />
        </Box>
        {isAonProject && (
          <AonProgressBar
            aonGoal={project.aonGoal}
            height={getResponsiveValue({ base: '10px', lg: '14px' })}
            wrapperProps={{
              position: 'absolute',
              width: 'calc(100% - 6px)',
              bottom: '3px',
            }}
          />
        )}
      </HStack>

      <VStack
        flex={1}
        width={getResponsiveValue({ base: 'auto', lg: '100%' })}
        minWidth={getResponsiveValue({ base: '170px', lg: 'auto' })}
        alignItems="start"
        overflow="hidden"
        spacing={getResponsiveValue({ base: 1, lg: 0 })}
        opacity={isOpen ? 0 : 1}
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
          display={getResponsiveValue({ base: 'block', lg: 'none' })}
        >
          {project.shortDescription}
        </Body>
        {!hideContributionContent && contributionContent()}
      </VStack>
    </InteractiveCardLayout>
  )
}

export const LandingCardBaseSkeleton = ({ isMobile, noMobile }: { isMobile?: boolean; noMobile?: boolean }) => {
  const getResponsiveValue = ({ base, lg }: { base: any; lg: any }) => {
    return noMobile ? lg : { base, lg }
  }

  return (
    <>
      <InteractiveCardLayout
        padding="0px"
        width={getResponsiveValue({ base: 'full', lg: 'auto' })}
        direction={getResponsiveValue({ base: 'row', lg: 'column' })}
        spacing={0}
        flex={getResponsiveValue({ base: 'unset', lg: 1 })}
      >
        <Box
          width={getResponsiveValue({ base: '96px', lg: 'auto' })}
          height={getResponsiveValue({ base: '96px', lg: 'auto' })}
          aspectRatio={1}
        >
          <SkeletonLayout width="100%" height="100%"></SkeletonLayout>
        </Box>
        <VStack
          flex={1}
          width={getResponsiveValue({ base: 'auto', lg: '100%' })}
          minWidth={getResponsiveValue({ base: '170px', lg: 'auto' })}
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
