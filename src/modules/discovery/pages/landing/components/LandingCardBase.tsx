import { Box, Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiClockCountdown, PiMapPin } from 'react-icons/pi'
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
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import { AonProgressBar } from '@/shared/molecules/project/AonProgressBar.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { aonProjectTimeLeft } from '@/shared/utils/project/getAonData.ts'
import { isAllOrNothing, isInactive } from '@/utils'

import { SkeletonLayout } from '../../../../../shared/components/layouts'
import { ContributionsSummary, ProjectAonGoalStatus, ProjectForLandingPageFragment } from '../../../../../types'
import { AllOrNothingIcon } from './AllOrNothingIcon.tsx'

const AON_FAILED_STATUSES = [
  ProjectAonGoalStatus.Failed,
  ProjectAonGoalStatus.Cancelled,
  ProjectAonGoalStatus.Unclaimed,
  ProjectAonGoalStatus.Finalized,
]

export interface LandingCardBaseProps extends CardLayoutProps {
  isMobile?: boolean
  project: ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  }
  hideContributionContent?: boolean
  noMobile?: boolean
  hasSubscribe?: boolean
}

/** Shared pill style used for location and category overlays on the image. */
const ImagePill = ({ children }: { children: React.ReactNode }) => (
  <HStack
    backgroundColor="utils.pbg"
    borderRadius="md"
    paddingX={2}
    paddingY={1}
    spacing={1}
    boxShadow="sm"
    flexShrink={0}
  >
    {children}
  </HStack>
)

/** AON campaign status line (time left, percentage funded, failed). */
const AonStatusDisplay = ({
  percentage,
  timeLeft,
  isFailed,
}: {
  percentage: number
  timeLeft: ReturnType<typeof aonProjectTimeLeft>
  isFailed: boolean
}) => {
  const getStatusColor = () => {
    if (percentage > 100) return 'primary1.11'
    if (timeLeft?.label !== 'days left') return 'warning.11'
    return 'neutral1.12'
  }

  const statusColor = getStatusColor()

  if (isFailed) {
    return (
      <Body size="sm" bold color={statusColor} isTruncated>
        {t('Campaign Failed')}
      </Body>
    )
  }

  const percentageColor = percentage >= 100 ? 'primary1.11' : 'neutral1.12'

  return (
    <HStack spacing={1} alignItems="center" flexWrap="wrap" overflow="hidden">
      {timeLeft && (
        <>
          <Icon as={PiClockCountdown} color={statusColor} />
          <Body size="sm" bold color={statusColor} isTruncated>
            {timeLeft.value} {timeLeft.label}
          </Body>
          <Box backgroundColor={statusColor} width="5px" height="5px" borderRadius="full" flexShrink={0} />
        </>
      )}
      {percentage ? (
        <Body size="sm" bold color={percentageColor} isTruncated>
          {percentage}% {t('funded')}
        </Body>
      ) : (
        <Body size="sm" bold color={statusColor} isTruncated>
          {t('Ongoing')}
        </Body>
      )}
    </HStack>
  )
}

/** Amount raised with optional fire emoji for trending projects. */
const ContributionAmount = ({ amount, hasFire, isWeekly }: { amount: string; hasFire: boolean; isWeekly: boolean }) => (
  <HStack spacing={0} overflow="hidden">
    {hasFire && <AnimatedFire />}
    <Body size="sm" bold color="primary1.11" isTruncated>
      {amount}{' '}
      <Body as="span" regular>
        {isWeekly ? t('this week') : t('raised')}
      </Body>
    </Body>
  </HStack>
)

/** Bottom section: status/amount + progress bar (AON) + Contribute CTA. */
const CardFooter = ({
  project,
  isAonProject,
  isAonFailed,
  percentage,
  timeLeft,
  formattedAmount,
  hasFire,
  isWeekly,
  onContribute,
  isDisabled,
}: {
  project: ProjectForLandingPageFragment
  isAonProject: boolean
  isAonFailed: boolean
  percentage: number
  timeLeft: ReturnType<typeof aonProjectTimeLeft>
  formattedAmount: string
  hasFire: boolean
  isWeekly: boolean
  onContribute: (e: React.MouseEvent<HTMLButtonElement>) => void
  isDisabled: boolean
}) => {
  const contributeButton = (
    <Box flexShrink={0} opacity={0} _groupHover={{ opacity: isDisabled ? 0 : 1 }} transition="opacity 0.2s ease">
      <Button
        variant="solid"
        colorScheme="primary1"
        size="lg"
        height="44px"
        onClick={onContribute}
        isDisabled={isDisabled}
      >
        {t('Contribute')}
      </Button>
    </Box>
  )

  if (isAonProject) {
    return (
      <HStack width="100%" alignItems="center" spacing={3} marginTop="auto">
        <VStack flex={1} spacing={1} alignItems="start" justifyContent="center">
          <AonStatusDisplay percentage={percentage} timeLeft={timeLeft} isFailed={isAonFailed} />
          <AonProgressBar project={project} height="8px" />
        </VStack>
        {contributeButton}
      </HStack>
    )
  }

  return (
    <HStack width="100%" justifyContent="space-between" alignItems="center" marginTop="auto">
      <ContributionAmount amount={formattedAmount} hasFire={hasFire} isWeekly={isWeekly} />
      {contributeButton}
    </HStack>
  )
}

/** Thumbnail image with location + category pills overlayed at the bottom, and status icons at top-right. */
const CardImage = ({
  project,
  countryName,
  categoryLabel,
}: {
  project: ProjectForLandingPageFragment
  countryName?: string
  categoryLabel?: string
}) => (
  <Box width="full" position="relative" flexShrink={0} padding={2}>
    <ImageWithReload
      width="100%"
      height="100%"
      aspectRatio={1.45}
      objectFit="cover"
      borderRadius="8px"
      src={project.thumbnailImage || ''}
      alt={`${project.title}-header-image`}
    />
    <Box position="absolute" top={4} right={4}>
      <NonProjectProjectIcon taxProfile={project.owners?.[0]?.user?.taxProfile} />
      <AllOrNothingIcon project={project} />
    </Box>

    {(countryName || categoryLabel) && (
      <HStack position="absolute" bottom={4} left={4} spacing={1} overflow="hidden" maxWidth="calc(100% - 32px)">
        {countryName && (
          <ImagePill>
            <Icon as={PiMapPin} boxSize={3} color="neutral1.11" />
            <Body size="xs" medium isTruncated maxWidth="120px">
              {countryName}
            </Body>
          </ImagePill>
        )}
        {categoryLabel && (
          <ImagePill>
            <Body size="xs" medium isTruncated maxWidth="120px">
              {categoryLabel}
            </Body>
          </ImagePill>
        )}
      </HStack>
    )}
  </Box>
)

function getCategoryLabel(project: ProjectForLandingPageFragment): string | undefined {
  if (project.subCategory) return ProjectSubCategoryLabel[project.subCategory]
  if (project.category) return ProjectCategoryLabel[project.category]
  return undefined
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
  const { getProjectBalance, getAonGoalPercentage, isFundingDisabled } = useProjectToolkit(project)

  const isWeekly = Boolean(project.contributionSummary?.contributionsTotalUsd)
  const isAonProject = isAllOrNothing(project)
  const isAonFailed = isAonProject && AON_FAILED_STATUSES.includes(project.aonGoal?.status as ProjectAonGoalStatus)

  const contributionAmount = project.contributionSummary?.contributionsTotalUsd || getProjectBalance().usd
  const percentage = getAonGoalPercentage()
  const timeLeft = aonProjectTimeLeft(project.aonGoal)
  const hasFire = (isWeekly && contributionAmount > 100) || contributionAmount > 1000

  const projectOwner = project.owners?.[0]?.user
  const countryName = project.location?.country?.name
  const categoryLabel = getCategoryLabel(project)

  const handleContribute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('projectFunding', project.name))
  }

  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('userProfile', projectOwner?.id))
  }

  return (
    <InteractiveCardLayout
      role="group"
      padding="0px"
      width="full"
      height="100%"
      direction="column"
      spacing={0}
      flex={1}
      position="relative"
      background="transparent"
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.08)"
      borderRadius="12px"
      overflow="hidden"
      {...rest}
    >
      {inActive && (
        <Box
          backgroundColor="utils.pbg"
          opacity={0.6}
          zIndex="3"
          pointerEvents="none"
          position="absolute"
          width="100%"
          height="100%"
        />
      )}

      <CardImage project={project} countryName={countryName} categoryLabel={categoryLabel} />

      <VStack
        flex={1}
        width="100%"
        alignItems="start"
        overflow="hidden"
        spacing={3}
        paddingX={2}
        paddingTop={0}
        paddingBottom={2}
      >
        <HStack width="100%" alignItems="baseline" spacing={2} overflow="hidden">
          <H3 size="md" medium flex={1} isTruncated>
            {project.title}
          </H3>
          <HStack spacing={1} flexShrink={0}>
            <Body size="xs" muted>
              {t('by')}
            </Body>
            <ProfileAvatar
              guardian={projectOwner?.guardianType}
              src={projectOwner?.imageUrl || ''}
              height="16px"
              width="16px"
              wrapperProps={{ padding: '1px', height: '18px', width: '18px' }}
              onClick={handleProfileClick}
            />
            <ProfileText
              size="xs"
              guardian={projectOwner?.guardianType}
              _hover={{ textDecoration: 'underline' }}
              onClick={handleProfileClick}
              maxWidth="120px"
              isTruncated
            >
              {projectOwner?.username}
            </ProfileText>
          </HStack>
        </HStack>

        <Body
          size="md"
          dark
          noOfLines={3}
          height="68px"
          width="100%"
          wordBreak="break-word"
          whiteSpace="normal"
          lineHeight="1.4"
          overflow="hidden"
        >
          {project.shortDescription}
        </Body>

        {!hideContributionContent && (
          <CardFooter
            project={project}
            isAonProject={isAonProject}
            isAonFailed={isAonFailed}
            percentage={percentage}
            timeLeft={timeLeft}
            formattedAmount={formatAmount(contributionAmount || 0, 'USD')}
            hasFire={hasFire}
            isWeekly={isWeekly}
            onContribute={handleContribute}
            isDisabled={isFundingDisabled()}
          />
        )}
      </VStack>
    </InteractiveCardLayout>
  )
}

export const LandingCardBaseSkeleton = () => {
  return (
    <InteractiveCardLayout padding="0px" width="full" height="100%" direction="column" spacing={0} flex={1}>
      <Box width="full" padding={2}>
        <SkeletonLayout width="100%" aspectRatio={1.45} borderRadius="8px" />
      </Box>

      <VStack
        flex={1}
        width="100%"
        paddingX={2}
        paddingTop={0}
        paddingBottom={2}
        alignItems="start"
        justifyContent="space-between"
        overflow="hidden"
        spacing={3}
      >
        <HStack w="full" justifyContent="space-between">
          <SkeletonLayout width="55%" height="20px" />
          <SkeletonLayout width="30%" height="16px" />
        </HStack>
        <SkeletonLayout width="100%" height="68px" />

        <HStack w="full" justifyContent="space-between" marginTop="auto">
          <SkeletonLayout width="80px" height="18px" />
          <SkeletonLayout width="100px" height="44px" borderRadius="md" />
        </HStack>
      </VStack>
    </InteractiveCardLayout>
  )
}
