import { Box, BoxProps, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'

import { DollarIconCircled, SatoshiIconCircled } from '../../../../../../../components/icons'
import { Body1, Caption, H3 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { ProjectGoal, ProjectGoalCurrency, ProjectGoalStatus } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { useCurrencyFormatter } from '../../../hooks/useCurrencyFormatter'
import { GoalContributeButton } from './GoalContributeButton'

type Props = {
  goal: ProjectGoal
  isEditing?: boolean
  onOpenGoalModal: (goal: ProjectGoal) => void
}

export const GoalInProgress = ({ goal, isEditing = false, onOpenGoalModal }: Props) => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const percentage = (goal.amountContributed / goal.targetAmount) * 100

  const formattedTargetAmount = formatAmount(goal.targetAmount, goal.currency)
  const formattedAmountContributed = formatAmount(goal.amountContributed, goal.currency)
  const targetUsdAmount = formatUsdAmount(goal.targetAmount)
  const targetSatsAmount = formatSatsAmount(goal.targetAmount)
  const usdAmount = formatUsdAmount(goal.amountContributed)
  const satsAmount = formatSatsAmount(goal.amountContributed)

  const renderActionButton = () => {
    if (!isEditing && goal.status === ProjectGoalStatus.InProgress) {
      return <GoalContributeButton projectGoalId={goal.id}>{t('Contribute')}</GoalContributeButton>
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

  const handleEditGoal = () => {
    onOpenGoalModal(goal)
  }

  return (
    <VStack display="flex" alignItems="flex-start" width="100%" gap={1}>
      <HStack
        display="flex"
        alignItems={'center'}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
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
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems="center"
        width="100%"
        gap={{ base: 2, lg: 10 }}
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
              {goal.amountContributed > 0 ? formattedAmountContributed : '0'}{' '}
              {goal.currency === ProjectGoalCurrency.Btcsat ? ' sats ' : ' $ '}
              <Text as="span" color="neutral.600" fontWeight={500}>
                {goal.currency === ProjectGoalCurrency.Btcsat ? `(${usdAmount})` : `(${satsAmount})`}
              </Text>
            </Body1>
            <HStack display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
              <Body1>
                {' of '}
                <Body1 as="span" bold>
                  {formattedTargetAmount} {goal.currency === ProjectGoalCurrency.Btcsat ? ' sats ' : ' $ '}
                </Body1>
                <Text as="span" color="neutral.600" fontWeight={500}>
                  {goal.currency === ProjectGoalCurrency.Btcsat ? `(${targetUsdAmount})` : `(${targetSatsAmount})`}{' '}
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
          justifyContent={isEditing ? 'flex-end' : 'center'}
          minWidth="100px"
          height="100%"
          width={{ base: '100%', lg: '192px' }}
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
