import { Box, BoxProps, Button, HStack, Icon, Link as ChakraLink, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiDotOutline } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ContributeButton } from '@/modules/project/pages1/projectView/views/body/components'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { __development__ } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { ProjectGoal, useGrantProjectQuery, useGrantStatisticsQuery, useProjectInProgressGoalsQuery } from '@/types'
import { useMobileMode } from '@/utils'

const GRANT_PROJECT_ID = __development__ ? '6' : '123'

type GrantGoal = Pick<ProjectGoal, 'id' | 'title' | 'progress' | 'description' | 'amountContributed' | 'currency'>

interface GrantGoalCardProps {
  goal: GrantGoal
  onSubscribe: () => void
}

const GoalProgressBar = ({
  percentage,
}: Pick<BoxProps, 'width' | 'bg'> & {
  percentage: number
}) => {
  const isMobile = useMobileMode()

  const displayPercentage =
    percentage === 0 ? '0%' : isMobile ? `${Math.round(percentage)}%` : `${percentage.toFixed(0)}%`

  return (
    <HStack width="100%" height="24px" justifyContent="flex-start" borderRadius="44px" bg="neutral1.3">
      <HStack
        p={'5px'}
        width={`${percentage}%`}
        minWidth="30px"
        height="24px"
        bgColor={'neutral1.11'}
        borderRadius="44px"
        justifyContent={'flex-end'}
        alignItems="center"
      >
        <Body size="xs" medium color={'neutral1.1'}>
          {displayPercentage}
        </Body>
      </HStack>
    </HStack>
  )
}

const GrantGoalCard: React.FC<GrantGoalCardProps> = ({ goal, onSubscribe }) => {
  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const usdAmount = formatUsdAmount(goal.amountContributed)
  const satsAmount = formatSatsAmount(goal.amountContributed)

  return (
    <CardLayout p={6} height="100%" display="flex">
      <VStack align="stretch" spacing={4} flex={1}>
        <H2 size="xl">{goal.title}</H2>
        <Body color="neutral1.11" flex={1}>
          {goal.description}
        </Body>
        <VStack spacing={4} align="stretch">
          <GoalProgressBar width="100%" percentage={goal.progress} />
          <Body color="neutral1.11">
            {usdAmount} ({satsAmount})
          </Body>
          <Button onClick={onSubscribe} size="lg" variant="solid" colorScheme="primary1">
            {t('$5 / month')}
          </Button>
        </VStack>
      </VStack>
    </CardLayout>
  )
}

const GrantGoalCardSkeleton = () => {
  return (
    <CardLayout p={6} w="100%">
      <VStack align="stretch" spacing={4}>
        <SkeletonLayout height="32px" width="100%" />
        <SkeletonLayout height="60px" width="100%" />
        <SkeletonLayout height="24px" width="100%" borderRadius="44px" />
        <SkeletonLayout height="20px" width="150px" />
        <SkeletonLayout height="48px" width="100%" />
      </VStack>
    </CardLayout>
  )
}

export const GrantSubscriptionSection: React.FC = () => {
  const isMobile = useMobileMode()
  const isSubscribed = false // Replace with actual subscription state

  const { data, loading } = useProjectInProgressGoalsQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        projectId: GRANT_PROJECT_ID,
      },
    },
  })

  const { data: grantProjectData } = useGrantProjectQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: { id: GRANT_PROJECT_ID },
    },
  })

  const { data: grantStatisticsData } = useGrantStatisticsQuery()
  const totalSatsShared = grantStatisticsData?.grantStatistics.grantGuardiansFunding.contributedTotal

  const subscriberCount = grantProjectData?.projectGet?.subscribersCount

  console.log('data', data)

  const grantGoals = data?.projectGoals.inProgress || []

  const handleSubscribe = (grantGoal: string) => {
    // TODO: Implement subscription logic
  }

  return (
    <VStack
      p={6}
      spacing={6}
      align="stretch"
      w="100%"
      border="1px solid"
      borderColor="neutralAlpha.3"
      borderRadius={10}
    >
      <VStack align="start" spacing={2}>
        <H2 size="2xl" bold>
          {t('Monthly subscription going to Bitcoin projects')}
        </H2>
        <Body size="lg" color="neutral1.11">
          {t(
            'Make a contribution to a Geyser Grant, starting from as little as $5 per month. The funds are used to support Bitcoin projects through ',
          )}
          <Tooltip
            label="Community-Voting Grants let the community vote to decide how funds should be distributed."
            placement="top-start"
          >
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <Body as="span" borderBottom="1px dotted">
                {t('Community-Voting Grants')}
              </Body>
            </span>
          </Tooltip>
          {t(', all in full transparency.')}
        </Body>
      </VStack>

      <HStack spacing={2} flexWrap="wrap">
        <Body>{subscriberCount} monthly subscribers</Body>
        <Icon as={PiDotOutline} display={{ base: 'none', sm: 'block' }} />
        <Body>{Number(totalSatsShared || 0).toLocaleString('en-US')} sats shared from</Body>
        <ChakraLink as={Link} to="/guardians" textDecoration="underline">
          Geyser Guardians
        </ChakraLink>
      </HStack>

      <Box width="100%" overflow="auto" mx={isMobile ? '-24px' : 0}>
        <HStack
          spacing={6}
          width={isMobile ? 'max-content' : '100%'}
          alignItems="stretch"
          height="100%"
          px={isMobile ? 6 : 0}
        >
          {loading
            ? [1, 2, 3].map((i) => (
                <Box key={i} width={isMobile ? '300px' : 'auto'} flexShrink={0} flex={isMobile ? undefined : 1}>
                  <GrantGoalCardSkeleton />
                </Box>
              ))
            : grantGoals.map((goal) => (
                <Box
                  key={goal.title}
                  width={isMobile ? '250px' : 'auto'}
                  flexShrink={0}
                  flex={isMobile ? undefined : 1}
                >
                  <GrantGoalCard goal={goal} onSubscribe={() => handleSubscribe(goal.title)} />
                </Box>
              ))}
        </HStack>
      </Box>

      <CardLayout p={6}>
        <HStack justify="space-between">
          <Body>{t('Or simply donate with a one-off contribution towards the Grants')}</Body>
          <ContributeButton />
        </HStack>
      </CardLayout>

      {isSubscribed && (
        <CardLayout p={4} textAlign="center">
          <Body>
            {t('You are subscribed.')}{' '}
            <ChakraLink as={Link} to="/manage" color="blue.600">
              {t('Manage Subscription')}
            </ChakraLink>
          </Body>
        </CardLayout>
      )}
    </VStack>
  )
}
