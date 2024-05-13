import { CheckCircleIcon } from '@chakra-ui/icons'
import { BoxProps, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { DollarIconCircled, SatoshiIconCircled } from '../../../../../../../components/icons'
import { Body1, Caption, H3 } from '../../../../../../../components/typography'
import { useBTCConverter } from '../../../../../../../helpers'
import { ProjectGoal, ProjectGoalCurrency, ProjectGoalStatus } from '../../../../../../../types'
import { Satoshis, USDCents } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { commaFormatted } from '../../../../../../../utils'

type Props = {
  goal: ProjectGoal
}

export const Goal = ({ goal }: Props) => {
  const { t } = useTranslation()

  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const percentage = (goal.amountContributed / goal.targetAmount) * 100

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

  const handleContribute = () => {
    console.log('Contribute')
  }

  return (
    <VStack display="flex" alignItems="flex-start" width="100%" gap={1}>
      <HStack display="flex" alignItems="flex-start" width="100%">
        <H3>{goal.title}</H3>
      </HStack>
      <HStack display="flex" alignItems="flex-start" width="100%">
        <Body1>{goal.description}</Body1>
      </HStack>
      {goal.status === ProjectGoalStatus.InProgress && (
        <HStack display="flex" alignItems="center" width="100%" gap={10}>
          <GoalProgressBar
            width="100%"
            bg={percentage > 0 ? 'primary.900' : 'neutral.400'}
            percentage={percentage}
            captionColor={percentage > 0 ? 'neutral.0' : 'neutral.900'}
          />

          <Button variant="primary" padding={'3px 15px'} size={'md'} onClick={handleContribute}>
            {t('Contribute')}
          </Button>
        </HStack>
      )}
      <HStack display="flex" alignItems="flex-start" justifyContent="space-between" width="100%">
        <Body1 bold>
          {goal.amountContributed > 0 ? commaFormatted(goal.amountContributed) : '0'}{' '}
          {goal.currency === ProjectGoalCurrency.Btcsat ? ' sats ' : ' $ '}
          <Text as="span" color="neutral.600" fontWeight={500}>
            {goal.currency === ProjectGoalCurrency.Btcsat ? `(${formattedUsdAmount()})` : `(${formattedSatsAmount()})`}
          </Text>
        </Body1>
        {goal.status === ProjectGoalStatus.InProgress ? (
          <HStack display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
            <Body1>
              {' of '}
              <Body1 as="span" bold>
                {commaFormatted(goal.targetAmount)} {goal.currency === ProjectGoalCurrency.Btcsat ? ' sats ' : ' $ '}
              </Body1>
              <Text as="span" color="neutral.600" fontWeight={500}>
                {goal.currency === ProjectGoalCurrency.Btcsat
                  ? `(${formattedUsdAmount()})`
                  : `(${formattedSatsAmount()})`}{' '}
                {'goal'}
              </Text>
            </Body1>
            {goal.currency === ProjectGoalCurrency.Btcsat ? <SatoshiIconCircled /> : <DollarIconCircled />}
          </HStack>
        ) : (
          <HStack display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
            <CheckCircleIcon color={'primary.500'} />
            <Body1 bold>
              {t('Completed')}{' '}
              <Text as="span" color="neutral.600" fontWeight={500}>
                {'on'} {goal.createdAt}
              </Text>
            </Body1>
          </HStack>
        )}
      </HStack>
    </VStack>
  )
}

const GoalProgressBar = ({
  bg,
  percentage,
  captionColor,
}: Pick<BoxProps, 'width' | 'bg'> & {
  percentage: number
  captionColor: string
}) => {
  const isMobile = useMobileMode()

  return (
    <HStack width="100%" justifyContent="flex-start">
      <HStack width="100%" height="32px" justifyContent="flex-start" borderRadius="44px" bg="neutral.100">
        <HStack
          p={'5px'}
          width={`${percentage}%`}
          minWidth="60px"
          height="32px"
          bg={bg}
          borderRadius="44px"
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <Caption fontSize={'14px'} bold color={captionColor}>
            {isMobile ? Math.round(percentage) : percentage.toFixed(1)}%
          </Caption>
        </HStack>
      </HStack>
    </HStack>
  )
}
