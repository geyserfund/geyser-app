import { Box, Circle, CircularProgress, HStack, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'

import { SkeletonLayout } from '../../../../../../../../../shared/components/layouts'
import { Body } from '../../../../../../../../../shared/components/typography'
import { ProjectGoalCurrency } from '../../../../../../../../../types'
import { commaFormatted, isPrelaunch, removeProjectAmountException } from '../../../../../../../../../utils'
import { useGoalsAtom, useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { USD_CENTS_AMOUNT_TO_GO_LIVE } from '../../../components/PrelaunchFollowButton.tsx'
import { useProjectDefaultGoal } from '../../../hooks/useProjectDefaultGoal'

enum BalanceView {
  Goal = 'goal',
  Total = 'total',
  PreLaunch = 'preLaunch',
}

export const TiaProjectBalanceDisplay = () => {
  const { project, loading } = useProjectAtom()
  const { inProgressGoals, goalsLoading } = useGoalsAtom()

  const { defaultGoalId, balanceUsdCent, balance } = project

  const { formatAmount } = useCurrencyFormatter()

  const { priorityGoal, formattedUsdAmount, formattedTotalUsdAmount, formattedSatsAmount } = useProjectDefaultGoal({
    defaultGoalId,
    balanceUsdCent,
    inProgressGoals,
  })

  const usdCentsAmount = project.balanceUsdCent ?? 0

  const amountUsdCentsToGoLive = USD_CENTS_AMOUNT_TO_GO_LIVE - usdCentsAmount

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
  const isGoalView = currentView === BalanceView.Goal
  const isPreLaunchView = currentView === BalanceView.PreLaunch

  const hasPreLaunch = isPrelaunch(project.status)

  useEffect(() => {
    if (!loading) {
      if (hasPreLaunch) {
        setCurrentView(BalanceView.PreLaunch)
      } else {
        setCurrentView(hasGoal ? BalanceView.Goal : BalanceView.Total)
      }
    }
  }, [loading, hasGoal, hasPreLaunch])

  const toggleTotalProject = () => {
    setCurrentView((current) => {
      if (current === BalanceView.PreLaunch) {
        if (hasTotalBalance) {
          return BalanceView.Total
        }

        if (hasGoal) {
          return BalanceView.Goal
        }

        return BalanceView.PreLaunch
      }

      if (current === BalanceView.Goal) {
        if (hasPreLaunch) {
          return BalanceView.PreLaunch
        }

        if (hasTotalBalance) {
          return BalanceView.Total
        }

        return BalanceView.Goal
      }

      if (current === BalanceView.Total) {
        if (hasGoal) {
          return BalanceView.Goal
        }

        if (hasPreLaunch) {
          return BalanceView.PreLaunch
        }

        return BalanceView.Total
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
    if (goalsLoading || !priorityGoal) {
      return null
    }

    const percentage = (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
    return (
      <HStack
        width="100%"
        spacing={4}
        as={motion.div}
        px={!isGoalView ? 6 : 0}
        position={!isGoalView ? 'absolute' : undefined}
        opacity={isTotalView ? 1 : 0}
        animate={{ opacity: isGoalView ? 1 : 0 }}
      >
        <CircularProgress
          capIsRound
          value={circularPercentage && circularPercentage > 10 ? circularPercentage : 10}
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
              {priorityGoal.amountContributed ? formatAmount(priorityGoal.amountContributed, 'USDCENT') : 0}
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
  }, [
    priorityGoal,
    formattedUsdAmount,
    formattedSatsAmount,
    formatAmount,
    circularPercentage,
    isGoalView,
    goalsLoading,
    isTotalView,
  ])

  const renderProjectTotalValue = useCallback(() => {
    return (
      <VStack
        w="100%"
        display="flex"
        alignItems="center"
        as={motion.div}
        px={!isTotalView ? 6 : 0}
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
  }, [balance, formattedTotalUsdAmount, isTotalView])

  const renderProjectPreLaunchValue = useCallback(() => {
    if (!hasPreLaunch) {
      return null
    }

    return (
      <HStack
        width="100%"
        spacing={4}
        as={motion.div}
        px={!isPreLaunchView ? 6 : 0}
        position={!isPreLaunchView ? 'absolute' : undefined}
        animate={{ opacity: isPreLaunchView ? 1 : 0 }}
      >
        <CircularProgress
          capIsRound
          value={usdCentsAmount ?? 0}
          min={0}
          max={USD_CENTS_AMOUNT_TO_GO_LIVE}
          size="96px"
          thickness="10px"
          color={'primary1.9'}
          trackColor="neutral1.3"
        />
        <VStack flex="1" spacing={0} width="100%" px={2} alignItems={'start'}>
          <Body size="2xl" bold dark>
            {formatAmount(usdCentsAmount, 'USDCENT') ?? 0}{' '}
            <Body as="span" size="md" light>
              {t(`raised`)}
            </Body>
          </Body>

          <Body size="2xl" dark bold display="inline">
            {formatAmount(amountUsdCentsToGoLive, 'USDCENT')}{' '}
            <Body as="span" size="md" light>
              {t(`more to go live.`)}
            </Body>
          </Body>
        </VStack>
      </HStack>
    )
  }, [usdCentsAmount, amountUsdCentsToGoLive, isPreLaunchView, hasPreLaunch, formatAmount])

  const DotIndicator = () => {
    return (
      <HStack width="100%" justifyContent="center" spacing={1}>
        {hasPreLaunch && <Circle size="12px" bg={isPreLaunchView ? 'neutral.600' : 'neutral.200'} />}
        {hasGoal && <Circle size="12px" bg={isGoalView ? 'neutral.600' : 'neutral.200'} />}
        {hasTotalBalance && <Circle size="12px" bg={isTotalView ? 'neutral.600' : 'neutral.200'} />}
      </HStack>
    )
  }

  if (loading) {
    return <SkeletonLayout height="90px" width="100%" />
  }

  if (!hasGoal && !hasTotalBalance && !hasPreLaunch) {
    return null
  }

  const shouldShowDotIndicator =
    (hasGoal && hasTotalBalance) || (hasPreLaunch && hasTotalBalance) || (hasGoal && hasPreLaunch)

  return (
    <VStack
      w="100%"
      onClick={toggleTotalProject}
      _hover={{
        cursor: hasGoal && hasTotalBalance ? 'pointer' : 'default',
      }}
      minHeight="128px"
      {...handlers}
    >
      <VStack height={'128px'} justifyContent={'center'}>
        {renderProjectTotalValue()}
        {renderGoalValue()}
        {renderProjectPreLaunchValue()}
      </VStack>

      {shouldShowDotIndicator && <DotIndicator />}
    </VStack>
  )
}
