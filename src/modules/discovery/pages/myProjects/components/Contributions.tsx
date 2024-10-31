import { Box, BoxProps, Button, Divider, HStack, Image, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useTranslation } from 'react-i18next'
import { PiCoins, PiFlagBannerFold } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'

import { useGoalsModal } from '@/modules/project/pages1/projectView/hooks'
import { Body } from '@/shared/components/typography'
import { getPath, NoContributionImageUrl } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { ProjectGoalCurrency, ProjectGoalFragment, ProjectGoalStatus } from '@/types'
import { commaFormatted, useMobileMode } from '@/utils'

import { useProjectGoals } from '../hooks/useProjectGoals'
import { useProjectStats } from '../hooks/useProjectStats'

interface ContributionsProps {
  projectId: string
  projectName: string
}

export const Contributions = ({ projectId, projectName }: ContributionsProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { stats, isLoading, error } = useProjectStats(projectId)
  const { goals, isLoading: goalsLoading, error: goalsError } = useProjectGoals(projectId)
  const { onGoalModalOpen } = useGoalsModal()

  if (isLoading || goalsLoading) return <ContributionsSkeleton />
  if (error || goalsError) return <Box>Error: {error?.message || goalsError?.message}</Box>

  const { total, totalUsd } = stats || {}

  const noContributionsReceived = !total || total === 0
  const noGoals = goals.length === 0

  if (noGoals && !noContributionsReceived) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderWidth={1}
        borderRadius="lg"
        minHeight="269px"
        gap={2}
        p={4}
        flex={1}
      >
        <Header total={total} totalUsd={totalUsd} noContributionsReceived={noContributionsReceived} noGoals={noGoals} />
        <Button
          variant="solid"
          colorScheme="primary1"
          leftIcon={<PiFlagBannerFold />}
          onClick={() => {
            onGoalModalOpen()
            navigate(getPath('projectGoals', projectName))
          }}
        >
          {t('Create Goal')}
        </Button>
      </Box>
    )
  }

  return (
    <Box
      as={Link}
      to={getPath('projectGoals', projectName)}
      minHeight="269px"
      borderWidth={1}
      borderRadius="lg"
      p={4}
      flex={1}
    >
      <Header total={total} totalUsd={totalUsd} noContributionsReceived={noContributionsReceived} noGoals={noGoals} />
      <Divider my={4} />
      <Goals goals={goals} noContributionsReceived={noContributionsReceived} projectName={projectName} />
    </Box>
  )
}

const Header = ({
  total,
  totalUsd,
  noContributionsReceived,
  noGoals,
}: {
  total: number | undefined
  totalUsd: number | undefined
  noContributionsReceived: boolean
  noGoals: boolean
}) => {
  const { t } = useTranslation()

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      <HStack w="100%" justifyContent="center" color="neutralAlpha.11">
        <PiCoins size={16} />
        <Body size="sm">{t('Contributions Received')}</Body>
      </HStack>

      {noContributionsReceived ? (
        <HStack w="100%" justifyContent="center">
          <Body size={'xl'} bold>
            {t('No contributions received')}
          </Body>
        </HStack>
      ) : (
        <HStack w="100%" justifyContent="center">
          <Body size={'xl'} bold>
            {commaFormatted(total)}{' '}
            <Body as="span" size={'xl'} light bold>
              Sats (${commaFormatted(totalUsd)})
            </Body>
          </Body>
        </HStack>
      )}
    </VStack>
  )
}

const Goals = ({
  goals,
  noContributionsReceived,
  projectName,
}: {
  goals: ProjectGoalFragment[]
  noContributionsReceived: boolean
  projectName: string
}) => {
  if (noContributionsReceived) {
    return (
      <VStack w="100%" align="center" spacing={0.5} px={4} py={8}>
        <Image maxHeight="150px" src={NoContributionImageUrl} alt="No contributions received" />
      </VStack>
    )
  }

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} projectName={projectName} />
      ))}
    </VStack>
  )
}

const GoalItem = ({ goal, projectName }: { goal: ProjectGoalFragment; projectName: string }) => {
  const percentage = (goal.amountContributed / goal.targetAmount) * 100
  const isCompleted = goal.status === ProjectGoalStatus.Completed

  const completedStyle = {
    bg: 'neutralAlpha.2',
    borderRadius: '8px',
    p: 2,
  }

  return (
    <HStack width="100%" gap={'10px'} background="utils.pbg" {...(isCompleted && completedStyle)}>
      <VStack display="flex" alignItems="flex-start" width="100%" height="100%" spacing={0}>
        <HStack
          display="flex"
          alignItems={'center'}
          justifyContent={{ base: 'space-between', lg: 'flex-start' }}
          width="100%"
        >
          <HStack w="full" justifyContent={'start'} alignItems="center">
            {goal.emojiUnifiedCode && (
              <Box display="flex" justifyContent="center" width="24px" height="34px">
                <Emoji size={24} unified={goal.emojiUnifiedCode} emojiStyle={EmojiStyle.NATIVE} />
              </Box>
            )}
            <Body size="md" medium dark>
              {goal.title}
            </Body>
          </HStack>
        </HStack>

        <Stack flexDirection={{ base: 'column', lg: 'row' }} alignItems="center" width="100%" gap={{ base: 2, lg: 5 }}>
          <VStack width="100%">
            <GoalProgressBar width="100%" percentage={percentage} />
            <GoalStats goal={goal} projectName={projectName} percentage={percentage} />
          </VStack>
        </Stack>
      </VStack>
    </HStack>
  )
}

const GoalProgressBar = ({
  percentage,
}: Pick<BoxProps, 'width' | 'bg'> & {
  percentage: number
}) => {
  return (
    <HStack width="100%" height="8px" justifyContent="flex-start" borderRadius="44px" bg="neutral1.3">
      <HStack
        p={'5px'}
        width={`${percentage}%`}
        minWidth="30px"
        height="8px"
        bgColor={'primary1.9'}
        borderRadius="44px"
        justifyContent={'flex-end'}
        alignItems="center"
      ></HStack>
    </HStack>
  )
}

const GoalStats = ({
  goal,
  projectName,
  percentage,
}: {
  goal: ProjectGoalFragment
  projectName: string
  percentage: number
}) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()
  const formattedAmountContributed = formatAmount(goal.amountContributed, goal.currency)
  const usdAmount = formatUsdAmount(goal.amountContributed)
  const satsAmount = formatSatsAmount(goal.amountContributed)
  const isCompleted = goal.status === ProjectGoalStatus.Completed

  const isMobile = useMobileMode()

  const Direction = isMobile ? VStack : HStack

  if (isCompleted) {
    return (
      <Direction w="full" justifyContent={'space-between'} spacing={1}>
        <HStack w="full" justifyContent={isMobile ? 'flex-end' : 'flex-start'}>
          <Body size="sm" muted medium>
            {t('Goal reached:')}{' '}
            <Body as="span" size="sm" dark>
              {formattedAmountContributed}
            </Body>{' '}
            <Body as="span" size="sm" muted>
              {goal.currency === ProjectGoalCurrency.Btcsat ? `(${usdAmount})` : `(${satsAmount})`}
            </Body>
          </Body>
        </HStack>
        <Button
          variant="surface"
          size="sm"
          colorScheme="primary1"
          w={isMobile ? 'full' : 'auto'}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            navigate(`${getPath('projectPostCreate', projectName)}?goalId=${goal.id}`)
          }}
        >
          {t('Update your community')}
        </Button>
      </Direction>
    )
  }

  return (
    <HStack w="full" justifyContent={'flex-end'}>
      <Body size="xs" muted>
        {t('did ')}
        <Body as="span" dark>
          {percentage.toFixed(0)}%
        </Body>
        {t(' or ')}
        <Body as="span" dark>
          {formattedAmountContributed}{' '}
        </Body>
        <Body as="span" size="xs" muted>
          {goal.currency === ProjectGoalCurrency.Btcsat ? `(${usdAmount})` : `(${satsAmount})`}
        </Body>
      </Body>
    </HStack>
  )
}

const ContributionsSkeleton = () => (
  <Box borderWidth={1} borderRadius="lg" p={4} flex={1}>
    <HeaderSkeleton />
    <Divider my={4} />
    <GoalsSkeleton />
  </Box>
)

const HeaderSkeleton = () => (
  <VStack w="100%" align="stretch" spacing={0.5}>
    <HStack w="100%" justifyContent="center">
      <Skeleton width="24px" height="24px" />
      <Skeleton width="150px" height="20px" />
    </HStack>
    <HStack w="100%" justifyContent="center">
      <Skeleton width="200px" height="28px" />
    </HStack>
  </VStack>
)

const GoalsSkeleton = () => (
  <VStack w="100%" align="stretch" spacing={4}>
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} width="100%" height="50px" />
    ))}
  </VStack>
)
