import { Box, HStack, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCurrencyBtc, PiCurrencyDollar } from 'react-icons/pi'

import { Body } from '../../../../../../../shared/components/typography'
import { useCurrencyFormatter } from '../../../../../../../shared/utils/hooks/useCurrencyFormatter'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../../../types'
import { useCustomTheme } from '../../../../../../../utils'

type GoalTargetProps = {
  goal: ProjectGoal
  of?: boolean
}

export const GoalTarget = ({ goal, of }: GoalTargetProps) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const formattedTargetAmount = formatAmount(goal.targetAmount, goal.currency)

  const targetUsdAmount = formatUsdAmount(goal.targetAmount)
  const targetSatsAmount = formatSatsAmount(goal.targetAmount)

  return (
    <HStack spacing={1}>
      <Body size="sm" muted>
        {of ? ` ${t('of')}: ` : ''}
        <Body as="span" size="sm" dark>
          {formattedTargetAmount}{' '}
        </Body>
        {goal.currency === ProjectGoalCurrency.Btcsat ? `(${targetUsdAmount})` : `(${targetSatsAmount})`}{' '}
      </Body>
      {goal.currency === ProjectGoalCurrency.Btcsat ? (
        <Tooltip px={4} py={1} label={t('This goal is denominated in Bitcoin')}>
          <Box>
            <PiCurrencyBtc color={colors.amber[11]} />
          </Box>
        </Tooltip>
      ) : (
        <Tooltip px={4} py={1} label={t('This goal is denominated in US Dollars')}>
          <Box>
            <PiCurrencyDollar color={colors.amber[11]} />
          </Box>
        </Tooltip>
      )}
    </HStack>
  )
}
