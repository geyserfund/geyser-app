import { Box, Circle, CircularProgress, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { H1 } from '../../../../../../../../../components/typography'
import { ProjectGoalCurrency } from '../../../../../../../../../types'
import { numberWithCommas } from '../../../../../../../../../utils'
import { centsToDollars } from '../../../../../../../../../utils'
import { useProjectDefaultGoal } from '../hooks/useProjectDefaultGoal'

export function ProjectBalanceDisplay() {
  const { t } = useTranslation()

  const { priorityGoal, project, formattedUsdAmount, formattedTotalUsdAmount, formattedSatsAmount, loading } =
    useProjectDefaultGoal()

  const [showTotalProject, setShowTotalProject] = useState(!project?.defaultGoalId)

  const toggleTotalProject = () => {
    if (project?.defaultGoalId) {
      setShowTotalProject(!showTotalProject)
    }
  }

  const circularPercentage = useMemo(() => {
    if (priorityGoal) {
      return (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
    }
  }, [priorityGoal])

  const renderCircularProgress = useCallback(() => {
    if (loading) {
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
  }, [circularPercentage, priorityGoal, loading])

  const getGoalValue = useCallback(() => {
    if (loading) {
      return <Skeleton height="90px" width="100%" />
    }

    if (priorityGoal) {
      const percentage = (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
      return (
        <>
          <HStack w="100%" display="flex" justifyContent="start" alignItems="center">
            <H1 fontSize="35px">
              {priorityGoal.currency === ProjectGoalCurrency.Usdcent && (
                <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
                  {'$'}
                </Text>
              )}

              {numberWithCommas(centsToDollars(priorityGoal.amountContributed) ?? 0)}

              {priorityGoal.currency === ProjectGoalCurrency.Btcsat && (
                <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
                  {' sats'}
                </Text>
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
  }, [priorityGoal, formattedUsdAmount, formattedSatsAmount, t, loading])

  const getProjectTotalValue = useCallback(() => {
    if (loading) {
      return <Skeleton height="90px" width="100%" />
    }

    return (
      <VStack w="100%" display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <H1 fontSize="35px">
            {numberWithCommas(project?.balance ?? 0)}
            <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
              {' sats'}
            </Text>
          </H1>

          <Text color="neutral.600" fontWeight={400} display="inline">
            <Text as="span" color="neutral.900" fontWeight={500}>
              {formattedTotalUsdAmount()}
            </Text>
            {t(' Contributed in total ')}
          </Text>
        </Box>
      </VStack>
    )
  }, [project?.balance, formattedTotalUsdAmount, t, loading])

  const DotIndicator = () => {
    if (loading) {
      return <Skeleton height="20px" width="20px" />
    }

    return (
      <HStack width="100%" justifyContent="center" spacing={1} pb={2}>
        <Circle size="12px" bg={!showTotalProject ? 'neutral.600' : 'neutral.200'} />
        <Circle size="12px" bg={showTotalProject ? 'neutral.600' : 'neutral.200'} />
      </HStack>
    )
  }

  return (
    <VStack
      w="100%"
      onClick={toggleTotalProject}
      _hover={{
        cursor: project?.defaultGoalId ? 'pointer' : 'default',
      }}
      p={2}
    >
      <HStack w="100%" justifyContent="start" minHeight={120}>
        {!showTotalProject ? renderCircularProgress() : null}

        <VStack
          flex="1"
          spacing={0}
          width="100%"
          px={2}
          alignItems={circularPercentage === undefined ? 'center' : 'start'}
        >
          {showTotalProject ? getProjectTotalValue() : getGoalValue()}
        </VStack>
      </HStack>
      {priorityGoal && <DotIndicator />}
    </VStack>
  )
}
