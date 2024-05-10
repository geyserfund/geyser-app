import { Box, CircularProgress, HStack, Text, VStack } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { H1 } from '../../../../../../../../../components/typography'
import { numberWithCommas } from '../../../../../../../../../utils'
import { useProjectContext } from '../../../../../../../context'
import { useProjectGoals } from '../../../../../hooks/useProjectGoals'
import { BalanceDisplayButton } from '../components/BalanceDisplayButton'

export function ProjectBalanceDisplay() {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  const { priorityGoal } = useProjectGoals()

  const circularPercentage = useMemo(() => {
    if (priorityGoal) {
      return (priorityGoal.amountContributed / priorityGoal.targetAmount) * 100
    }
  }, [priorityGoal])

  const renderCircularProgress = useCallback(() => {
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

  const getMilestoneValue = useCallback(() => {
    if (priorityGoal) {
      const percentage = Math.ceil((priorityGoal.amountContributed / priorityGoal.targetAmount) * 100)
      return (
        <Box color="neutral.600" w="100%">
          <Text color="neutral.600" fontWeight={400} display="inline">
            <Text as="span" color="neutral.900" fontWeight={500}>
              ${priorityGoal.amountContributed}
            </Text>{' '}
            {`(${percentage}%) ${t(' contributed towards goal ')}`}
            <Text as="span" color="neutral.900" fontWeight={500}>
              {priorityGoal.title}
            </Text>
          </Text>{' '}
        </Box>
      )
    }

    return null
  }, [priorityGoal, t])

  const toggleTotalProject = () => {
    console.log('toggleTotalProject')
  }

  return (
    <HStack w="100%" padding={3} justifyContent="start" _hover={{ cursor: 'pointer' }} onClick={toggleTotalProject}>
      {renderCircularProgress()}

      <VStack
        flex="1"
        spacing={0}
        width="100%"
        px={2}
        alignItems={circularPercentage === undefined ? 'center' : 'start'}
      >
        <H1 fontSize="35px">
          {numberWithCommas(project?.balance ?? 0)}{' '}
          <Text as="span" color="neutral.600" fontWeight={500} fontSize="32px">
            sats
          </Text>
        </H1>
        {getMilestoneValue()}
      </VStack>
    </HStack>
  )
}
