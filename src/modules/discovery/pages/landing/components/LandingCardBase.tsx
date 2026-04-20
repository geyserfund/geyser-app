import { Box, Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiClockCountdown, PiMapPin } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { ProjectMatchingPublicBadge } from '@/modules/project/matching/components/ProjectMatchingPublicBadge.tsx'
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
import { isAllOrNothing, isInactive, useMobileMode } from '@/utils/index.ts'

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
  statusPillLabel?: string
  trendingAmountLabel?: string
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

const StatusPill = ({ label }: { label: string }) => (
  <HStack
    bg="primary1.3"
    color="primary1.12"
    borderRadius="md"
    px={2}
    py={1}
    spacing={1}
    boxShadow="sm"
    alignItems="center"
    flexShrink={0}
    maxW="100%"
  >
    <Body size="xs" fontWeight="semibold" color="inherit" isTruncated>
      {label}
    </Body>
  </HStack>
)

/** AON campaign status line (time left, percentage funded, failed). */
const AonStatusDisplay = ({
  percentage,
  timeLeft,
  isFailed,
  isEndedFunded,
  size = 'sm',
  wrap = true,
}: {
  percentage: number
  timeLeft: ReturnType<typeof aonProjectTimeLeft>
  isFailed: boolean
  isEndedFunded: boolean
  size?: 'xs' | 'sm'
  wrap?: boolean
}) => {
  const getStatusColor = () => {
    if (percentage > 100) return 'primary1.11'
    if (timeLeft?.label !== 'days left') return 'warning.11'
    return 'neutral1.12'
  }

  const statusColor = getStatusColor()

  if (isFailed) {
    return (
      <Body size={size} bold color={statusColor} isTruncated>
        {t('Campaign Failed')}
      </Body>
    )
  }

  if (isEndedFunded) {
    return (
      <Body size={size} bold color="neutral1.12" isTruncated>
        {t('Ended')} - {percentage}% {t('funded')}
      </Body>
    )
  }

  const percentageColor = percentage >= 100 ? 'primary1.11' : 'neutral1.12'

  return (
    <HStack spacing={1} alignItems="center" flexWrap={wrap ? 'wrap' : 'nowrap'} overflow="hidden">
      {timeLeft && (
        <>
          <Icon as={PiClockCountdown} color={statusColor} />
          <Body size={size} bold color={statusColor} isTruncated>
            {timeLeft.value} {timeLeft.label}
          </Body>
          <Box backgroundColor={statusColor} width="5px" height="5px" borderRadius="full" flexShrink={0} />
        </>
      )}
      {Number.isFinite(percentage) ? (
        <Body size={size} bold color={percentageColor} isTruncated>
          {percentage}% {t('funded')}
        </Body>
      ) : (
        <Body size={size} bold color={statusColor} isTruncated>
          {t('Ongoing')}
        </Body>
      )}
    </HStack>
  )
}

/** Amount raised with optional fire emoji for trending projects. */
const ContributionAmount = ({
  amount,
  hasFire,
  label,
  size = 'sm',
}: {
  amount: string
  hasFire: boolean
  label: string
  size?: 'xs' | 'sm'
}) => (
  <HStack spacing={0} overflow="hidden">
    {hasFire && <AnimatedFire />}
    <Body size={size} bold color="primary1.11" isTruncated>
      {amount}{' '}
      <Body as="span" size={size} regular>
        {label}
      </Body>
    </Body>
  </HStack>
)

/** Bottom section: status/amount + progress bar (AON) + Contribute CTA. */
const CardFooter = ({
  project,
  isAonProject,
  isAonFailed,
  isAonEndedFunded,
  percentage,
  timeLeft,
  formattedAmount,
  hasFire,
  contributionLabel,
  onContribute,
  isDisabled,
}: {
  project: ProjectForLandingPageFragment
  isAonProject: boolean
  isAonFailed: boolean
  isAonEndedFunded: boolean
  percentage: number
  timeLeft: ReturnType<typeof aonProjectTimeLeft>
  formattedAmount: string
  hasFire: boolean
  contributionLabel: string
  onContribute: (e: React.MouseEvent<HTMLButtonElement>) => void
  isDisabled: boolean
}) => {
  const contributeButton = (
    <Box
      flexShrink={0}
      opacity={isDisabled ? 0 : { base: 1, md: 0 }}
      _groupHover={{ opacity: isDisabled ? 0 : 1 }}
      transition="opacity 0.2s ease"
    >
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
    if (isAonEndedFunded) {
      return (
        <HStack width="100%" alignItems="center" spacing={3} marginTop="auto">
          <AonStatusDisplay
            percentage={percentage}
            timeLeft={timeLeft}
            isFailed={isAonFailed}
            isEndedFunded={isAonEndedFunded}
          />
        </HStack>
      )
    }

    return (
      <HStack width="100%" alignItems="center" spacing={3} marginTop="auto">
        <VStack flex={1} spacing={1} alignItems="start" justifyContent="center">
          <AonStatusDisplay
            percentage={percentage}
            timeLeft={timeLeft}
            isFailed={isAonFailed}
            isEndedFunded={isAonEndedFunded}
          />
          <AonProgressBar project={project} height="8px" />
        </VStack>
        {contributeButton}
      </HStack>
    )
  }

  return (
    <HStack width="100%" justifyContent="space-between" alignItems="center" marginTop="auto">
      <ContributionAmount amount={formattedAmount} hasFire={hasFire} label={contributionLabel} />
      {contributeButton}
    </HStack>
  )
}

/** Thumbnail image with location + category pills overlayed at the bottom, and status icons at top-right. */
const CardImage = ({
  project,
  countryName,
  categoryLabel,
  statusPillLabel,
  compact,
}: {
  project: ProjectForLandingPageFragment
  countryName?: string
  categoryLabel?: string
  statusPillLabel?: string
  compact?: boolean
}) => (
  <Box
    width={compact ? '128px' : 'full'}
    minWidth={compact ? '128px' : undefined}
    position="relative"
    flexShrink={0}
    padding={compact ? 0 : 2}
  >
    <ImageWithReload
      width="100%"
      height="100%"
      aspectRatio={compact ? 1 : 1.45}
      objectFit="cover"
      borderRadius="8px"
      src={project.thumbnailImage || ''}
      alt={`${project.title}-header-image`}
    />
    <Box position="absolute" top={compact ? 2 : 4} right={compact ? 2 : 4}>
      <NonProjectProjectIcon taxProfile={project.owners?.[0]?.user?.taxProfile} />
      <AllOrNothingIcon project={project} />
    </Box>

    {!compact && (countryName || categoryLabel || statusPillLabel || project.activeMatching) && (
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
        {statusPillLabel && <StatusPill label={statusPillLabel} />}
        {project.activeMatching && <ProjectMatchingPublicBadge matching={project.activeMatching} variant="discovery" />}
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
  statusPillLabel,
  trendingAmountLabel,
  ...rest
}: LandingCardBaseProps) => {
  const isMobileMode = useMobileMode()
  const inActive = isInactive(project.status)
  const navigate = useNavigate()
  const { formatAmount } = useCurrencyFormatter(true)
  const { getProjectBalance, getAonGoalPercentage, isFundingDisabled } = useProjectToolkit(project)
  const useCompactLayout = !noMobile && Boolean(isMobile ?? isMobileMode)

  const trendingContributionUsd = project.contributionSummary?.contributionsTotalUsd
  const hasTrendingContribution = trendingContributionUsd !== null && trendingContributionUsd !== undefined
  const isAonProject = isAllOrNothing(project)
  const isAonFailed = isAonProject && AON_FAILED_STATUSES.includes(project.aonGoal?.status as ProjectAonGoalStatus)

  const contributionAmount = trendingContributionUsd ?? getProjectBalance().usd
  const percentage = getAonGoalPercentage()
  const timeLeft = aonProjectTimeLeft(project.aonGoal)
  const isAonEndedFunded = isAonProject && !isAonFailed && !timeLeft && percentage >= 100
  const hasFire = (hasTrendingContribution && contributionAmount > 100) || contributionAmount > 1000
  const contributionLabel = hasTrendingContribution ? trendingAmountLabel ?? t('this week') : t('raised')

  const projectOwner = project.owners?.[0]?.user
  const hasProjectOwner = Boolean(projectOwner?.id)
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

    if (!projectOwner?.id) {
      return
    }

    navigate(getPath('userProfile', projectOwner.id))
  }

  return (
    <InteractiveCardLayout
      role="group"
      padding={useCompactLayout ? 0 : '0px'}
      width="full"
      height="100%"
      direction={useCompactLayout ? 'row' : 'column'}
      spacing={0}
      flex={1}
      position="relative"
      background="transparent"
      boxShadow={useCompactLayout ? 'none' : '0px 2px 12px rgba(0, 0, 0, 0.08)'}
      borderRadius="12px"
      overflow="hidden"
      alignItems={useCompactLayout ? 'stretch' : undefined}
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

      <CardImage
        project={project}
        countryName={countryName}
        categoryLabel={categoryLabel}
        statusPillLabel={statusPillLabel}
        compact={useCompactLayout}
      />

      <VStack
        flex={1}
        width="100%"
        minWidth={0}
        alignItems="start"
        overflow="hidden"
        justifyContent={useCompactLayout ? 'space-between' : undefined}
        spacing={useCompactLayout ? 2 : 3}
        paddingX={useCompactLayout ? 3 : 2}
        paddingTop={useCompactLayout ? 3 : 0}
        paddingBottom={useCompactLayout ? 3 : 2}
      >
        {useCompactLayout ? (
          <VStack width="100%" alignItems="start" spacing={2} overflow="hidden">
            <H3 size="sm" medium width="100%" noOfLines={2}>
              {project.title}
            </H3>

            {(statusPillLabel || project.activeMatching) && (
              <HStack spacing={1} flexWrap="wrap">
                {statusPillLabel && <StatusPill label={statusPillLabel} />}
                {project.activeMatching && (
                  <ProjectMatchingPublicBadge matching={project.activeMatching} variant="discovery" />
                )}
              </HStack>
            )}

            <Body
              size="sm"
              dark
              noOfLines={2}
              width="100%"
              wordBreak="break-word"
              whiteSpace="normal"
              lineHeight="1.4"
              overflow="hidden"
            >
              {project.shortDescription}
            </Body>
          </VStack>
        ) : (
          <VStack width="100%" alignItems="start" spacing={2}>
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
                  onClick={hasProjectOwner ? handleProfileClick : undefined}
                />
                <ProfileText
                  size="xs"
                  guardian={projectOwner?.guardianType}
                  _hover={hasProjectOwner ? { textDecoration: 'underline' } : undefined}
                  onClick={hasProjectOwner ? handleProfileClick : undefined}
                  maxWidth="120px"
                  isTruncated
                >
                  {projectOwner?.username}
                </ProfileText>
              </HStack>
            </HStack>
          </VStack>
        )}

        {!useCompactLayout && (
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
        )}

        {!hideContributionContent &&
          (useCompactLayout ? (
            isAonProject ? (
              <AonStatusDisplay
                percentage={percentage}
                timeLeft={timeLeft}
                isFailed={isAonFailed}
                isEndedFunded={isAonEndedFunded}
                size="xs"
                wrap={false}
              />
            ) : (
              <ContributionAmount
                amount={formatAmount(contributionAmount || 0, 'USD')}
                hasFire={hasFire}
                label={contributionLabel}
                size="xs"
              />
            )
          ) : (
            <CardFooter
              project={project}
              isAonProject={isAonProject}
              isAonFailed={isAonFailed}
              isAonEndedFunded={isAonEndedFunded}
              percentage={percentage}
              timeLeft={timeLeft}
              formattedAmount={formatAmount(contributionAmount || 0, 'USD')}
              hasFire={hasFire}
              contributionLabel={contributionLabel}
              onContribute={handleContribute}
              isDisabled={isFundingDisabled()}
            />
          ))}
      </VStack>
    </InteractiveCardLayout>
  )
}

export const LandingCardBaseSkeleton = () => {
  const isMobile = useMobileMode()

  if (isMobile) {
    return (
      <InteractiveCardLayout padding={0} width="full" height="100%" direction="row" spacing={0} flex={1}>
        <SkeletonLayout width="128px" minWidth="128px" aspectRatio={1} />

        <VStack
          flex={1}
          minWidth={0}
          alignItems="start"
          justifyContent="center"
          overflow="hidden"
          spacing={2}
          paddingX={3}
          paddingY={3}
        >
          <SkeletonLayout width="85%" height="18px" />
          <SkeletonLayout width="100%" height="48px" />
          <SkeletonLayout width="72px" height="14px" />
        </VStack>
      </InteractiveCardLayout>
    )
  }

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
