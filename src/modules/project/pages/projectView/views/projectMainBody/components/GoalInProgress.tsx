import { Box, BoxProps, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'

import { DollarIconCircled, SatoshiIconCircled } from '../../../../../../../components/icons'
import { Body1, Caption, H3 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { useBTCConverter } from '../../../../../../../helpers'
import { ProjectGoal, ProjectGoalCurrency, ProjectGoalStatus } from '../../../../../../../types'
import { Satoshis, USDCents } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { commaFormatted } from '../../../../../../../utils'

type Props = {
  goal: ProjectGoal
  isEditing?: boolean
  onOpenGoalModal: (goal: ProjectGoal) => void
}

export const GoalInProgress = ({ goal, isEditing = false, onOpenGoalModal }: Props) => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

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

  const renderActionButton = () => {
    if (!isEditing && goal.status === ProjectGoalStatus.InProgress) {
      return (
        <Button
          variant="primary"
          padding={'3px 15px'}
          size={'md'}
          onClick={handleContribute}
          width={isMobile ? '100%' : '192px'}
        >
          {t('Contribute')}
        </Button>
      )
    }

    if (isEditing && !isMobile) {
      return (
        <IconButtonComponent
          aria-label="is-editing-goal"
          noBorder
          variant="ghost"
          onClick={handleEditGoal}
          icon={<MdModeEdit fontSize="18px" />}
        />
      )
    }

    if (isEditing && isMobile) {
      return <></>
    }
  }

  const handleContribute = () => {
    console.log('Contribute')
  }

  const handleEditGoal = () => {
    onOpenGoalModal(goal)
  }

  return (
    <VStack display="flex" alignItems="flex-start" width="100%" gap={1}>
      <HStack
        display="flex"
        alignItems={'center'}
        justifyContent={isMobile ? 'space-between' : 'flex-start'}
        minHeight="40px"
        width="100%"
      >
        <H3 fontSize="18px" fontWeight={600}>
          {goal.title}
        </H3>
        {isEditing && isMobile && (
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
        <Body1 fontSize="14px" fontWeight={400}>
          {goal.description}
        </Body1>
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
          <GoalProgressBar
            width="100%"
            bg={percentage > 0 ? 'neutral.900' : 'neutral.400'}
            percentage={percentage}
            captionColor={percentage > 0 ? 'neutral.0' : 'neutral.900'}
          />
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
          </HStack>
        </VStack>

        <Box
          display="flex"
          alignItems="start"
          justifyContent="center"
          minWidth="100px"
          height="100%"
          width={isMobile ? '100%' : '192px'}
        >
          {renderActionButton()}
        </Box>
      </Box>
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
