import { Box, Circle, CircularProgress, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSwipeable } from 'react-swipeable'

import { H1 } from '../../../../../../../../../components/typography'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../../../../../types'
import { commaFormatted } from '../../../../../../../../../utils'
import { centsToDollars } from '../../../../../../../../../utils'
import { useProjectDefaultGoal } from '../hooks/useProjectDefaultGoal'

type Props = {
  removeBalance?: boolean
  defaultGoalId: string | null
  balance: number | null
  balanceUsdCent: number | null
  inProgressGoals: ProjectGoal[] | null | undefined
}

enum BalanceView {
  Goal = 'goal',
  Total = 'total',
}

export function ProjectBalanceDisplay({
  removeBalance,
  defaultGoalId,
  balance,
  balanceUsdCent,
  inProgressGoals,
}: Props) {
  const { t } = useTranslation()

  const { priorityGoal, formattedUsdAmount, formattedTotalUsdAmount, formattedSatsAmount } = useProjectDefaultGoal({
    defaultGoalId,
    balanceUsdCent,
    inProgressGoals,
  })

  const handlers = useSwipeable({
    onSwiped() {
      toggleTotalProject()
    },
  })

  const hasGoal = Boolean(defaultGoalId)
  const hasTotalBalance = Boolean(balance && balanceUsdCent && !removeBalance)

  const [currentView, setCurrentView] = useState<BalanceView>(hasGoal ? BalanceView.Goal : BalanceView.Total)

  const isTotalView = currentView === BalanceView.Total

  const toggleTotalProject = () => {
    setCurrentView((current) => {
      if (current === BalanceView.Goal && hasTotalBalance) {
        return BalanceView.Total
      }

      if (current === BalanceView.Total && hasGoal) {
        return BalanceView.Goal
      }

      return current
    })
  }

  const circularPercentage = useMemo(() => {
    if (priorityGoal) {
      return (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
    }
  }, [priorityGoal])

  const renderCircularProgress = useCallback(() => {
    if (!priorityGoal) {
      return <Skeleton borderRadius="50%" height="116px" width="116px" />
    }

    if (priorityGoal) {
      return (
        <CircularProgress
          capIsRound
          value={circularPercentage}
          size="116px"
          thickness="16px"
          color={'primary.400'}
          trackColor="neutral.200"
        />
      )
    }

    return null
  }, [circularPercentage, priorityGoal])

  const getGoalValue = useCallback(() => {
    if (!priorityGoal) {
      return <Skeleton height="90px" width="100%" />
    }

    if (priorityGoal) {
      const percentage = (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
      return (
        <>
          <HStack w="100%" display="flex" justifyContent="start" alignItems="center">
            <H1 fontSize="35px">
              {priorityGoal.currency === ProjectGoalCurrency.Usdcent && (
                <>
                  <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
                    {'$'}
                  </Text>
                  {priorityGoal.amountContributed ? commaFormatted(centsToDollars(priorityGoal.amountContributed)) : 0}
                </>
              )}

              {priorityGoal.currency === ProjectGoalCurrency.Btcsat && (
                <>
                  {priorityGoal.amountContributed ? commaFormatted(priorityGoal.amountContributed) : 0}
                  <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
                    {' sats'}
                  </Text>
                </>
              )}
            </H1>
          </HStack>

          <Box color="neutral.600" w="100%">
            <Text color="neutral.600" fontWeight={400} display="inline">
              <Text as="span" color="neutral.900" fontWeight={500}>
                {priorityGoal.currency === ProjectGoalCurrency.Btcsat
                  ? `${formattedUsdAmount()}`
                  : `${formattedSatsAmount()}`}
              </Text>{' '}
              {`(${percentage.toFixed(1)}%) ${t(' contributed towards goal ')}`}
              <Text as="span" color="neutral.900" fontWeight={500}>
                {priorityGoal.title}
              </Text>
            </Text>{' '}
          </Box>
        </>
      )
    }

    return null
  }, [priorityGoal, formattedUsdAmount, formattedSatsAmount, t])

  const getProjectTotalValue = useCallback(() => {
    if (!balance) {
      return <Skeleton height="90px" width="100%" />
    }

    return (
      <VStack w="100%" display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <H1 fontSize="35px">
            {commaFormatted(balance ?? 0)}
            <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
              {' sats'}
            </Text>
          </H1>

          <Text color="neutral.600" fontWeight={400} display="inline">
            <Text as="span" color="neutral.900" fontWeight={500}>
              {formattedTotalUsdAmount()}
            </Text>
            {t(' contributed in total ')}
          </Text>
        </Box>
      </VStack>
    )
  }, [balance, formattedTotalUsdAmount, t])

  const DotIndicator = () => {
    return (
      <HStack width="100%" justifyContent="center" spacing={1} pb={2}>
        <Circle size="12px" bg={!isTotalView ? 'neutral.600' : 'neutral.200'} />
        <Circle size="12px" bg={isTotalView ? 'neutral.600' : 'neutral.200'} />
      </HStack>
    )
  }

  if (!hasGoal && !hasTotalBalance) {
    return null
  }

  return (
    <VStack
      w="100%"
      onClick={toggleTotalProject}
      _hover={{
        cursor: hasGoal && hasTotalBalance ? 'pointer' : 'default',
      }}
      p={2}
      {...handlers}
    >
      <HStack w="100%" justifyContent="start" minHeight={120}>
        {!isTotalView ? renderCircularProgress() : null}

        <VStack
          flex="1"
          spacing={0}
          width="100%"
          px={2}
          alignItems={circularPercentage === undefined ? 'center' : 'start'}
        >
          {isTotalView ? getProjectTotalValue() : getGoalValue()}
        </VStack>
      </HStack>
      {hasGoal && hasTotalBalance && <DotIndicator />}
    </VStack>
  )
}
