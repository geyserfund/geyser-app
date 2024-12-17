import { Badge, Box, HStack, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiBag, PiFlagBannerFold, PiLightning, PiNewspaper, PiSparkle } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { ProfileText } from '@/shared/components/display/ProfileText'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPathWithGeyserHero } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import {
  Activity,
  ActivityResource,
  ProjectGoal,
  ProjectGoalCurrency,
  ProjectGoalStatus,
  ProjectReward,
  RewardCurrency,
} from '@/types'
import { commaFormatted, getFormattedDate, useMobileMode } from '@/utils'

enum ActivityType {
  PostPublished = 'PostPublished',
  ProjectLaunched = 'ProjectLaunched',
  ProjectRewardCreated = 'ProjectRewardCreated',
  ProjectGoalCreated = 'ProjectGoalCreated',
  ProjectGoalReached = 'ProjectGoalReached',
  ContributionConfirmed = 'ContributionConfirmed',
}

export const ActivityFeedItem = ({ activityType, createdAt, project, resource }: Activity) => {
  const isMobile = useMobileMode()

  const isProjectLaunchedActivity = activityType === ActivityType.ProjectLaunched
  const isGoalActivity =
    activityType === ActivityType.ProjectGoalCreated || activityType === ActivityType.ProjectGoalReached
  const isRewardActivity = activityType === ActivityType.ProjectRewardCreated
  const isFundingTxActivity = activityType === ActivityType.ContributionConfirmed
  const isPostActivity = activityType === ActivityType.PostPublished

  const activityPath = (activityType: string) => {
    switch (activityType) {
      case ActivityType.ProjectGoalCreated:
      case ActivityType.ProjectGoalReached:
        return getPathWithGeyserHero('projectGoals', project.name)
      case ActivityType.ProjectRewardCreated:
        return getPathWithGeyserHero('projectRewardView', project.name, resource.id)
      case ActivityType.PostPublished:
        return getPathWithGeyserHero('projectPostView', project.name, resource.id)
      default:
        return getPathWithGeyserHero('project', project.name)
    }
  }

  return (
    <CardLayout
      as={Link}
      to={activityPath(activityType)}
      width={{ base: 'full', lg: '586px' }}
      borderColor={isProjectLaunchedActivity ? 'primaryAlpha.6' : 'neutralAlpha.6'}
      backgroundColor={isProjectLaunchedActivity ? 'primaryAlpha.2' : 'none'}
      _hover={{
        borderColor: isProjectLaunchedActivity ? 'primaryAlpha.8' : 'neutralAlpha.8',
      }}
      p={4}
    >
      {isMobile ? (
        <VStack width="full" alignItems="flex-start">
          <HStack width="full" justifyContent={'space-between'}>
            <ActivityTypeItem activityType={activityType as ActivityType} />
            <ActivityDate date={createdAt} />
          </HStack>
          <ProjectTitle
            projectTitle={project.title}
            projectImage={project.thumbnailImage || ''}
            projectName={project.name}
          />
        </VStack>
      ) : (
        <HStack width="full" justifyContent={'space-between'} alignItems="center">
          <HStack justifyContent="flex-start" spacing={3}>
            <ProjectTitle
              projectTitle={project.title}
              projectImage={project.thumbnailImage || ''}
              projectName={project.name}
            />
            <ActivityTypeItem activityType={activityType as ActivityType} />
          </HStack>

          <ActivityDate date={createdAt} />
        </HStack>
      )}
      <VStack width="full" alignItems="flex-start" spacing={1}>
        {isPostActivity && <ActivityImage resource={resource} />}
        {!isFundingTxActivity && !isProjectLaunchedActivity && <ActivityTitle resource={resource} />}
        {isRewardActivity && <ActivityImage resource={resource} />}
        {isRewardActivity && <RewardsInfo reward={resource as ProjectReward} />}
        <ActivityDescription resource={resource} />
        {isGoalActivity && (
          <>
            <GoalProgressBar goal={resource as ProjectGoal} />
            <GoalTargetAmount goal={resource as ProjectGoal} />
          </>
        )}
        {isFundingTxActivity && <ContributionInfo resource={resource} />}
      </VStack>
    </CardLayout>
  )
}

const ProjectTitle = ({
  projectTitle,
  projectImage,
  projectName,
}: {
  projectTitle: string
  projectImage: string
  projectName: string
}) => {
  return (
    <HStack as={Link} to={getPathWithGeyserHero('project', projectName)}>
      {projectImage && (
        <Image width={'32px'} height={'32px'} borderRadius={'8px'} src={projectImage} objectFit="cover" />
      )}
      <Body size="lg" medium isTruncated maxW={{ base: '250px', lg: '200px' }}>
        {projectTitle}
      </Body>
    </HStack>
  )
}

const ActivityDate = ({ date }: { date: string }) => {
  return (
    <Body size="md" muted>
      {getFormattedDate(date)}
    </Body>
  )
}

const ActivityTypeItem = ({ activityType }: { activityType: ActivityType }) => {
  const { t } = useTranslation()

  switch (activityType) {
    case ActivityType.ProjectGoalCreated:
      return (
        <HStack color={'neutralAlpha.11'} spacing={1}>
          <Box mt={-1}>
            <PiFlagBannerFold size={'20px'} />
          </Box>
          <Body size="lg" medium light>
            {t('Goal created')}
          </Body>
        </HStack>
      )

    case ActivityType.ProjectGoalReached:
      return (
        <HStack color={'neutralAlpha.11'} spacing={1}>
          <Box mt={-1}>
            <PiFlagBannerFold size={'20px'} />
          </Box>
          <Body size="lg" medium light>
            {t('Goal reached')}
          </Body>
        </HStack>
      )

    case ActivityType.PostPublished:
      return (
        <HStack color={'neutralAlpha.11'} spacing={1}>
          <PiNewspaper size={'20px'} />
          <Body size="lg" medium light>
            {t('New post')}
          </Body>
        </HStack>
      )
    case ActivityType.ProjectRewardCreated:
      return (
        <HStack color={'neutralAlpha.11'} spacing={1}>
          <Box mt={-0.5}>
            <PiBag size={'20px'} />
          </Box>
          <Body size="lg" medium light>
            {t('Created reward')}
          </Body>
        </HStack>
      )
    case ActivityType.ContributionConfirmed:
      return (
        <HStack color={'neutralAlpha.11'} spacing={1}>
          <Box mt={-0.5}>
            <PiLightning size={'20px'} />
          </Box>
          <Body size="lg" medium light>
            {t('Top Contribution')}
          </Body>
        </HStack>
      )
    case ActivityType.ProjectLaunched:
      return (
        <HStack color={'primaryAlpha.11'} spacing={1}>
          <Box mt={-0.5}>
            <PiSparkle size={'20px'} color="primaryAlpha.11" />
          </Box>
          <Body size="lg" medium light color="primaryAlpha.11">
            {t('New Project')}
          </Body>
        </HStack>
      )
    default:
      return (
        <Body size="lg" medium light>
          {t('Unknown activity')}
        </Body>
      )
  }
}

const ActivityTitle = ({ resource }: { resource: ActivityResource }) => {
  if ('title' in resource && typeof resource.title === 'string') {
    return (
      <Body size="xl" medium>
        {resource.title}
      </Body>
    )
  }

  return null
}

const ActivityImage = ({ resource }: { resource: ActivityResource }) => {
  if ('entryImage' in resource && typeof resource.entryImage === 'string') {
    if (!resource.entryImage) return null
    return (
      <ImageWithReload
        width={'full'}
        height={{ base: '100px', lg: '175px' }}
        borderRadius="md"
        src={resource.entryImage}
        objectFit="cover"
        my={{ base: 2, lg: 1 }}
      />
    )
  }

  if ('projectRewardImage' in resource && typeof resource.projectRewardImage === 'string') {
    if (!resource.projectRewardImage) return null
    return (
      <ImageWithReload
        width={'full'}
        height={{ base: '100px', lg: '175px' }}
        borderRadius="md"
        src={resource.projectRewardImage}
        objectFit="cover"
        my={{ base: 2, lg: 1 }}
      />
    )
  }

  return null
}

const ActivityDescription = ({ resource }: { resource: ActivityResource }) => {
  if ('entryDescription' in resource && typeof resource.entryDescription === 'string') {
    return (
      <Body size="md" medium muted>
        {resource.entryDescription}
      </Body>
    )
  }

  if ('projectRewardDescription' in resource && typeof resource.projectRewardDescription === 'string') {
    return (
      <Body size="md" medium muted>
        {resource.projectRewardDescription}
      </Body>
    )
  }

  if ('goalDescription' in resource && typeof resource.goalDescription === 'string') {
    return (
      <Body size="md" medium muted>
        {resource.goalDescription}
      </Body>
    )
  }

  if ('comment' in resource && typeof resource.comment === 'string') {
    return <Body size="sm">{resource.comment}</Body>
  }

  return null
}

const GoalProgressBar = ({ goal }: { goal: ProjectGoal }) => {
  if (!goal) return null

  const reached = goal.status === ProjectGoalStatus.Completed

  return (
    <HStack width="100%" height="8px" justifyContent="flex-start" borderRadius="44px" bg="neutral1.3">
      <HStack
        p={'5px'}
        width={reached ? '100%' : '4%'}
        height="8px"
        bgColor={'primary1.9'}
        borderRadius="44px"
        justifyContent={'flex-end'}
        alignItems="center"
      />
    </HStack>
  )
}

const GoalTargetAmount = ({ goal }: { goal: ProjectGoal }) => {
  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const { targetAmount, currency } = goal

  const formattedTargetAmount = formatAmount(targetAmount, currency)

  const targetUsdAmount = formatUsdAmount(targetAmount)
  const targetSatsAmount = formatSatsAmount(targetAmount ?? 0)

  return (
    <HStack width="full" justifyContent="flex-end" spacing={1}>
      <Body size="md" muted>
        <Body as="span" size="md" dark>
          {formattedTargetAmount}{' '}
        </Body>
        {currency === ProjectGoalCurrency.Btcsat ? `(${targetUsdAmount})` : `(${targetSatsAmount})`}{' '}
      </Body>
    </HStack>
  )
}

const RewardsInfo = ({ reward }: { reward: ProjectReward }) => {
  const { t } = useTranslation()

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  if (!reward) return null

  return (
    <HStack>
      <Body size="sm" bold>
        {formatAmount(reward.cost, reward.rewardCurrency)}{' '}
        <Body as="span" size="sm" muted>
          {reward.rewardCurrency === RewardCurrency.Btcsat ? 'sats' : 'USD'}{' '}
        </Body>
        <Body as="span" size="sm" medium muted>
          {reward.rewardCurrency === RewardCurrency.Btcsat
            ? `(${formatUsdAmount(reward.cost)})`
            : `(${formatSatsAmount(reward.cost)})`}
        </Body>
      </Body>
      {reward.sold && (
        <Body size="sm" muted>
          {t('Sold')} {': '}
          <Body as="span" size="sm" dark bold>
            {reward.sold}
          </Body>
        </Body>
      )}
      {reward.maxClaimable && (
        <Body size="sm" muted>
          {t('Available')} {': '}
          <Body as="span" size="sm" dark bold>
            {reward.maxClaimable}
          </Body>
        </Body>
      )}
      {reward.category && (
        <Badge size="sm" variant="soft" colorScheme="neutral1">
          {reward.category}
        </Badge>
      )}
    </HStack>
  )
}

const ContributionInfo = ({ resource }: { resource: ActivityResource }) => {
  const { t } = useTranslation()

  const { formatUsdAmount } = useCurrencyFormatter()

  if ('funder' in resource && typeof resource.funder === 'object') {
    if (resource.isAnonymous) {
      return (
        <HStack width="full" spacing={2} justifyContent="flex-start">
          <Body size="md" muted>
            {t('Anonymous contributor')}
          </Body>
          <Body size="md" medium dark>
            {commaFormatted(resource.amount)} {' sats '}
            <Body as="span" size="md" muted>
              ({formatUsdAmount(resource.amount)})
            </Body>
          </Body>
        </HStack>
      )
    }

    const { user } = resource.funder

    return (
      <HStack width="full" spacing={2} justifyContent="flex-start">
        {user && user.imageUrl && (
          <ProfileAvatar width={'40px'} height={'40px'} src={user.imageUrl} guardian={user.guardian} />
        )}
        <VStack alignItems="flex-start" justifyContent="center" spacing={0}>
          <ProfileText size="md" dark guardian={user?.guardian}>
            {user?.username}
          </ProfileText>
          <Body size="md" medium dark>
            {commaFormatted(resource.amount)} {' sats '}
            <Body as="span" size="md" muted>
              {' '}
              ({formatUsdAmount(resource.amount)})
            </Body>
          </Body>
        </VStack>
      </HStack>
    )
  }

  return null
}
