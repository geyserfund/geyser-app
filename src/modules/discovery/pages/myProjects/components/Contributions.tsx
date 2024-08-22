import { Box, BoxProps, Button, Divider, HStack, Image, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useTranslation } from 'react-i18next'
import { PiCoins, PiFlagBannerFold } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useGoalsModal } from '@/modules/project/pages1/projectView/hooks'
import { Body } from '@/shared/components/typography'
import { getPath, NoContributionsReceivedUrl } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { ProjectGoal, ProjectGoalCurrency } from '@/types'
import { commaFormatted } from '@/utils'

import { useProjectGoals } from '../hooks/useProjectGoals'
import { useProjectStats } from '../hooks/useProjectStats'

interface ContributionsProps {
  projectId: string
  projectName: string
}

const Contributions = ({ projectId, projectName }: ContributionsProps) => {
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
          bg="primary1.9"
          color="accent"
          leftIcon={<PiFlagBannerFold />}
          onClick={() => {
            onGoalModalOpen()
            navigate(getPath('project', projectName))
          }}
        >
          {t('Create Goal')}
        </Button>
      </Box>
    )
  }

  return (
    <Box minHeight="269px" borderWidth={1} borderRadius="lg" p={4} flex={1}>
      <Header total={total} totalUsd={totalUsd} noContributionsReceived={noContributionsReceived} noGoals={noGoals} />
      <Divider my={4} />
      <Goals goals={goals} noContributionsReceived={noContributionsReceived} />
    </Box>
  )
}

export default Contributions

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

  const fontSize = noGoals ? '24px' : '20px'

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      <HStack w="100%" justifyContent="center">
        <PiCoins size={16} />
        <Body fontSize={'14px'} regular light>
          {t('Contributions Received')}
        </Body>
      </HStack>

      {noContributionsReceived ? (
        <HStack w="100%" justifyContent="center">
          <Body fontSize={fontSize} bold>
            {t('No contributions received')}
          </Body>
        </HStack>
      ) : (
        <HStack w="100%" justifyContent="center">
          <Body fontSize={noGoals ? '24px' : '20px'} bold>
            {commaFormatted(total)}{' '}
            <Body as="span" fontSize={fontSize} color={'neutralAlpha.11'} bold>
              Sats (${commaFormatted(totalUsd)})
            </Body>
          </Body>
        </HStack>
      )}
    </VStack>
  )
}

const Goals = ({ goals, noContributionsReceived }: { goals: ProjectGoal[]; noContributionsReceived: boolean }) => {
  if (noContributionsReceived) {
    return (
      <VStack w="100%" align="center" spacing={0.5} px={4} py={8}>
        <Image maxHeight="150px" src={NoContributionsReceivedUrl} alt="No contributions received" />
      </VStack>
    )
  }

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </VStack>
  )
}

const GoalItem = ({ goal }: { goal: ProjectGoal }) => {
  const percentage = (goal.amountContributed / goal.targetAmount) * 100

  return (
    <HStack width="100%" gap={'10px'} background="utils.pbg">
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
            <GoalStats goal={goal} percentage={percentage} />
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

const GoalStats = ({ goal, percentage }: { goal: ProjectGoal; percentage: number }) => {
  const { t } = useTranslation()
  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()
  const formattedAmountContributed = formatAmount(goal.amountContributed, goal.currency)
  const usdAmount = formatUsdAmount(goal.amountContributed)
  const satsAmount = formatSatsAmount(goal.amountContributed)

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
