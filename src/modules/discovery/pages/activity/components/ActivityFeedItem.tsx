import { Badge, Box, HStack, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiBag, PiFlagBannerFold, PiLightning, PiNewspaper } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
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
  ProjectRewardCreated = 'ProjectRewardCreated',
  ProjectGoalCreated = 'ProjectGoalCreated',
  ProjectGoalReached = 'ProjectGoalReached',
  ContributionConfirmed = 'ContributionConfirmed',
}

export const ActivityFeedItem = ({ activityType, createdAt, project, resource }: Activity) => {
  const isMobile = useMobileMode()

  const isGoalActivity =
    activityType === ActivityType.ProjectGoalCreated || activityType === ActivityType.ProjectGoalReached
  const isRewardActivity = activityType === ActivityType.ProjectRewardCreated
  const isFundingTxActivity = activityType === ActivityType.ContributionConfirmed
  const isPostActivity = activityType === ActivityType.PostPublished

  const activityPath = (activityType: string) => {
    switch (activityType) {
      case ActivityType.ProjectGoalCreated:
      case ActivityType.ProjectGoalReached:
        return getPath('projectGoals', project.name)
      case ActivityType.ProjectRewardCreated:
        return getPath('projectRewardView', project.name, resource.id)
      case ActivityType.PostPublished:
        return getPath('projectPostView', project.name, resource.id)
      default:
        return getPath('project', project.name)
    }
  }

  return (
    <CardLayout
      as={Link}
      to={activityPath(activityType)}
      width={{ base: 'full', lg: '586px' }}
      _hover={{
        borderColor: 'neutralAlpha.8',
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
        {!isFundingTxActivity && <ActivityTitle resource={resource} />}
        {(isRewardActivity || isPostActivity) && <ActivityImage resource={resource} />}
        {isRewardActivity && <RewardsInfo reward={resource as ProjectReward} />}
        <ActivityDescription resource={resource} />
        {isGoalActivity && (
          <>
            <GoalProgressBar goal={resource as ProjectGoal} />
            <GoalTargetAmount goal={resource as ProjectGoal} />
          </>
        )}
        {isFundingTxActivity && <ContributorInfo resource={resource} />}
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
    <HStack as={Link} to={getPath('project', projectName)}>
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
    console.log('resource', resource)
    console.log('entryImage', resource.entryImage)
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
  const { t } = useTranslation()

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

  if ('amount' in resource && typeof resource.amount === 'number') {
    return (
      <Body size="md" medium muted>
        {t('Received contribution of ')}
        <Body as="span" size="md" dark>
          {commaFormatted(resource.amount)} {' Sats.'}
        </Body>
      </Body>
    )
  }

  return null
}

const GoalProgressBar = ({ goal }: { goal: ProjectGoal }) => {
  if (!goal) return null

  const reached = goal.status === ProjectGoalStatus.Completed

  return (
    <HStack width="100%" height="8px" justifyContent="flex-start" borderRadius="44px" bg="neutral1.3">
      {reached && (
        <HStack
          p={'5px'}
          width={'100%'}
          height="8px"
          bgColor={'primary1.9'}
          borderRadius="44px"
          justifyContent={'flex-end'}
          alignItems="center"
        />
      )}
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

  const { formatAmount } = useCurrencyFormatter()

  if (!reward) return null

  return (
    <HStack>
      <Body size="sm" bold>
        {formatAmount(reward.cost, reward.rewardCurrency)}{' '}
        <Body as="span" size="sm" muted>
          {reward.rewardCurrency === RewardCurrency.Btcsat ? 'Sats' : 'USD'}
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

const ContributorInfo = ({ resource }: { resource: ActivityResource }) => {
  const { t } = useTranslation()

  if ('funder' in resource && typeof resource.funder === 'object') {
    if (resource.isAnonymous) {
      return (
        <HStack width="full" spacing={2} justifyContent="flex-start">
          <Body size="md" muted>
            {t('Anonymous contributor')}
          </Body>
        </HStack>
      )
    }

    const { user } = resource.funder

    return (
      <HStack width="full" spacing={2} justifyContent="flex-start">
        <Body size="md" muted>
          {t('Contributor')}:
        </Body>
        <HStack spacing={1}>
          {user && user.imageUrl && <Image width={'24px'} height={'24px'} borderRadius={'full'} src={user.imageUrl} />}
          <Body size="md" dark>
            {user?.username}
          </Body>
        </HStack>
      </HStack>
    )
  }

  return null
}
