import { Box, Circle, CircularProgress, HStack, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSwipeable } from 'react-swipeable'

import { SkeletonLayout } from '../../../../../../../../../shared/components/layouts'
import { Body } from '../../../../../../../../../shared/components/typography'
import { ProjectGoalCurrency } from '../../../../../../../../../types'
import { commaFormatted, removeProjectAmountException } from '../../../../../../../../../utils'
import { centsToDollars } from '../../../../../../../../../utils'
import { useGoalsAtom, useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { useProjectDefaultGoal } from '../../../hooks/useProjectDefaultGoal'

enum BalanceView {
  Goal = 'goal',
  Total = 'total',
}

export function ProjectBalanceDisplay() {
  const { t } = useTranslation()

  const { project, loading } = useProjectAtom()
  const { inProgressGoals } = useGoalsAtom()

  const { defaultGoalId, balanceUsdCent, balance } = project

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
  const removeBalance = removeProjectAmountException(project?.name)
  const hasGoal = Boolean(defaultGoalId)
  const hasTotalBalance = Boolean(balance && balanceUsdCent) && !removeBalance

  const [currentView, setCurrentView] = useState<BalanceView>(hasGoal ? BalanceView.Goal : BalanceView.Total)

  const isTotalView = currentView === BalanceView.Total

  useEffect(() => {
    if (!loading) {
      setCurrentView(hasGoal ? BalanceView.Goal : BalanceView.Total)
    }
  }, [loading, hasGoal])

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

  const renderGoalValue = useCallback(() => {
    if (!priorityGoal) {
      if (isTotalView) {
        return null
      }

      return <SkeletonLayout height="90px" width="100%" />
    }

    const percentage = (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
    return (
      <HStack
        width="100%"
        spacing={4}
        as={motion.div}
        px={isTotalView ? 6 : 0}
        position={isTotalView ? 'absolute' : undefined}
        animate={{ opacity: !isTotalView ? 1 : 0 }}
      >
        <CircularProgress
          capIsRound
          value={circularPercentage}
          size="96px"
          thickness="10px"
          color={'primary1.9'}
          trackColor="neutral1.3"
        />
        <VStack
          flex="1"
          spacing={0}
          width="100%"
          px={2}
          alignItems={circularPercentage === undefined ? 'center' : 'start'}
        >
          {priorityGoal.currency === ProjectGoalCurrency.Usdcent ? (
            <Body size="2xl" bold dark>
              <Body as="span" muted medium>
                {'$'}
              </Body>
              {priorityGoal.amountContributed ? commaFormatted(centsToDollars(priorityGoal.amountContributed)) : 0}
            </Body>
          ) : (
            <Body size="2xl" bold dark>
              {priorityGoal.amountContributed ? commaFormatted(priorityGoal.amountContributed) : 0}
              <Body as="span" muted medium>
                {' sats'}
              </Body>
            </Body>
          )}
          <Body size="md" dark display="inline">
            {priorityGoal.currency === ProjectGoalCurrency.Btcsat
              ? `${formattedUsdAmount()}`
              : `${formattedSatsAmount()}`}
            <Body as="span" light>
              {` (${percentage.toFixed(1)}%) ${t('contributed towards goal')}: `}
            </Body>
            {priorityGoal.title}
          </Body>
        </VStack>
      </HStack>
    )
  }, [priorityGoal, formattedUsdAmount, formattedSatsAmount, t, circularPercentage, isTotalView])

  const renderProjectTotalValue = useCallback(() => {
    return (
      <VStack
        w="100%"
        display="flex"
        alignItems="center"
        as={motion.div}
        position={!isTotalView ? 'absolute' : undefined}
        animate={{ opacity: isTotalView ? 1 : 0 }}
      >
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Body size="2xl" bold dark>
            {commaFormatted(balance ?? 0)}
            <Body as="span" muted medium>
              {' Sats'}
            </Body>
          </Body>

          <Body size="md" light display="inline">
            <Body as="span" dark medium>
              {formattedTotalUsdAmount()}
            </Body>
            {` ${t('contributed in total')} `}
          </Body>
        </Box>
      </VStack>
    )
  }, [balance, formattedTotalUsdAmount, t, isTotalView])

  const DotIndicator = () => {
    return (
      <HStack width="100%" justifyContent="center" spacing={1}>
        <Circle size="12px" bg={!isTotalView ? 'neutral.600' : 'neutral.200'} />
        <Circle size="12px" bg={isTotalView ? 'neutral.600' : 'neutral.200'} />
      </HStack>
    )
  }

  if (loading) {
    return <SkeletonLayout height="90px" width="100%" />
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
      {...handlers}
    >
      <VStack height={'128px'} justifyContent={'center'}>
        {renderProjectTotalValue()}
        {renderGoalValue()}
      </VStack>

      {hasGoal && hasTotalBalance && <DotIndicator />}
    </VStack>
  )
}
