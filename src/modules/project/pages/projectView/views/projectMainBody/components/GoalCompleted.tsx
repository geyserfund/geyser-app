import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'

import { Body1, H3 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { useBTCConverter } from '../../../../../../../helpers'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../../../types'
import { Satoshis, USDCents } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { commaFormatted } from '../../../../../../../utils'
import { getFormattedDate } from '../../../../../../../utils'

type Props = {
  goal: ProjectGoal
  isEditing?: boolean
  onOpenGoalModal: (goal: ProjectGoal) => void
}

export const GoalCompleted = ({ goal, isEditing = false, onOpenGoalModal }: Props) => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const formattedUsdAmount = useCallback(() => {
    const amount = getUSDAmount(goal?.amountContributed as Satoshis)
    if (amount < 1) return '0 $'
    return `$${commaFormatted(Math.round(amount))}`
  }, [getUSDAmount, goal?.amountContributed])

  const formattedSatsAmount = useCallback(() => {
    const amount = getSatoshisFromUSDCents(goal?.amountContributed as USDCents)
    if (amount < 1) return '0 sats'
    return `${commaFormatted(Math.round(amount))} sats`
  }, [getSatoshisFromUSDCents, goal?.amountContributed])

  const handleEditGoal = () => {
    console.log('open edit goal modal', goal)
  }

  return (
    <VStack display="flex" alignItems="flex-start" width="100%" gap={1}>
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
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems="center"
        width="100%"
        gap={isMobile ? 2 : 10}
      >
        <VStack width="100%">
          <HStack display="flex" alignItems="flex-start" justifyContent="space-between" width="100%">
            <Body1 bold>
              {goal.amountContributed > 0 ? commaFormatted(goal.amountContributed) : '0'}{' '}
              {goal.currency === ProjectGoalCurrency.Btcsat ? ' sats ' : ' $ '}
              <Text as="span" color="neutral.600" fontWeight={500}>
                {goal.currency === ProjectGoalCurrency.Btcsat
                  ? `(${formattedUsdAmount()})`
                  : `(${formattedSatsAmount()})`}
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
