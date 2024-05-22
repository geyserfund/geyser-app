import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'

import { Body1, H3 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../../../types'
import { getFormattedDate } from '../../../../../../../utils'
import { useCurrencyFormatter } from '../../../hooks/useCurrencyFormatter'

type Props = {
  goal: ProjectGoal
  isEditing?: boolean
  onOpenGoalModal: (goal: ProjectGoal) => void
}

export const GoalCompleted = ({ goal, isEditing = false, onOpenGoalModal }: Props) => {
  const { t } = useTranslation()

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const formattedAmountContributed = formatAmount(goal.amountContributed, goal.currency)
  const usdAmount = formatUsdAmount(goal.amountContributed)
  const satsAmount = formatSatsAmount(goal.amountContributed)
  const handleEditGoal = () => {
    onOpenGoalModal(goal)
  }

  return (
    <VStack display="flex" alignItems="flex-start" width="100%" gap={'5px'}>
      <HStack display="flex" alignItems={'center'} justifyContent={'space-between'} minHeight="40px" width="100%">
        <H3>{goal.title}</H3>
        {isEditing && (
          <IconButtonComponent
            aria-label="is-editing-goal"
            noBorder
            variant="ghost"
            onClick={handleEditGoal}
            icon={<MdModeEdit fontSize="18px" />}
          />
        )}
      </HStack>
      <HStack display="flex" alignItems="flex-start" width="100%">
        <Body1>{goal.description}</Body1>
      </HStack>
      <HStack display="flex" alignItems="flex-start" width="100%"></HStack>
      <Box
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems="center"
        width="100%"
        gap={{ base: 2, lg: 10 }}
      >
        <VStack width="100%">
          <HStack display="flex" alignItems="flex-start" justifyContent="space-between" width="100%">
            <Body1 bold>
              {formattedAmountContributed}{' '}
              <Text as="span" color="neutral.600" fontWeight={500}>
                {goal.currency === ProjectGoalCurrency.Btcsat ? `(${usdAmount})` : `(${satsAmount})`}
              </Text>
            </Body1>
            <HStack display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
              <CheckCircleIcon color={'primary.500'} />
              <Body1 bold>
                {t('Completed')}{' '}
                <Text as="span" color="neutral.600" fontWeight={500}>
                  {'on'} {getFormattedDate(goal.completedAt)}
                </Text>
              </Body1>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}
