import { Box, BoxProps, HStack, Text, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'

import { DollarIconCircled, SatoshiIconCircled } from '../../../../../../../components/icons'
import { DefaultGoalIcon } from '../../../../../../../components/icons/svg/DefaultGoalIcon'
import { DragAndDropIcon } from '../../../../../../../components/icons/svg/DragAndDropIcon'
import { Body1, Caption, H3 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { Tooltip } from '../../../../../../../components/ui/Tooltip'
import { ProjectGoal, ProjectGoalCurrency, ProjectGoalStatus } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { useCurrencyFormatter } from '../../../hooks/useCurrencyFormatter'
import { GoalContributeButton } from './GoalContributeButton'

type Props = {
  goal: ProjectGoal
  isEditing?: boolean
  onOpenGoalModal: (goal: ProjectGoal) => void
  isPriorityGoal?: boolean
  listeners: any
}

export const GoalInProgress = ({ goal, isEditing = false, onOpenGoalModal, listeners, isPriorityGoal }: Props) => {
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
    <HStack width="100%" gap={'10px'} bg="neutral.0">
      {isEditing && (
        <VStack display="flex" height="100%" alignItems="center" justifyContent="flex-start">
          <DragHandle listeners={listeners} />
        </VStack>
      )}
      <VStack display="flex" alignItems="flex-start" width="100%" height="100%" gap={'5px'}>
        <HStack
          display="flex"
          alignItems={'center'}
          justifyContent={{ base: 'space-between', lg: 'flex-start' }}
          width="100%"
        >
          <HStack>
            {goal.emojiUnifiedCode && (
              <Box width="24px" height="40px">
                <Emoji size={24} unified={goal.emojiUnifiedCode} emojiStyle={EmojiStyle.NATIVE} />
              </Box>
            )}
            <H3 fontSize="18px" fontWeight={600}>
              {goal.title}
            </H3>
          </HStack>

          {isPriorityGoal && (
            <Tooltip
              px={4}
              py={2}
              content={
                <Text fontSize={12}>
                  {t(
                    'This is your default goal. Contributions will be directed here unless contributors decide to fund another goal. Once this goal is completed, the next goal in line will automatically become the default goal.',
                  )}
                </Text>
              }
            >
              <DefaultGoalIcon color="neutral.700" />
            </Tooltip>
          )}
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
          <Body1 fontSize="14px" fontWeight={400} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {goal.description}
          </Body1>
        </HStack>
        <Box
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems="center"
          width="100%"
          gap={{ base: 2, lg: 5 }}
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
                {formattedAmountContributed}{' '}
                <Text as="span" color="neutral.600" fontWeight={500}>
                  {goal.currency === ProjectGoalCurrency.Btcsat ? `(${usdAmount})` : `(${satsAmount})`}
                </Text>
              </Body1>
              <HStack display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
                <Body1>
                  {' of '}
                  <Body1 as="span" bold>
                    {formattedTargetAmount}{' '}
                  </Body1>
                  <Text as="span" color="neutral.600" fontWeight={500}>
                    {goal.currency === ProjectGoalCurrency.Btcsat ? `(${targetUsdAmount})` : `(${targetSatsAmount})`}{' '}
                    {'goal'}
                  </Text>
                </Body1>
              </HStack>
              {goal.currency === ProjectGoalCurrency.Btcsat ? (
                <Tooltip px={4} py={1} content={<Text fontSize={12}>{t('This goal is denominated in Bitcoin')}</Text>}>
                  <SatoshiIconCircled />
                </Tooltip>
              ) : (
                <Tooltip
                  px={4}
                  py={1}
                  content={<Text fontSize={12}>{t('This goal is denominated in US Dollars')}</Text>}
                >
                  <DollarIconCircled />
                </Tooltip>
              )}
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
    </HStack>
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

  const displayPercentage =
    percentage === 0 ? '0%' : isMobile ? `${Math.round(percentage)}%` : `${percentage.toFixed(1)}%`

  return (
    <HStack width="100%" justifyContent="flex-start" py={'2px'}>
      <HStack width="100%" height="28px" justifyContent="flex-start" borderRadius="44px" bg="neutral.100">
        <HStack
          p={'5px'}
          width={`${percentage}%`}
          minWidth="60px"
          height="28px"
          bg={bg}
          borderRadius="44px"
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <Caption fontSize={'16px'} bold color={captionColor}>
            {displayPercentage}
          </Caption>
        </HStack>
      </HStack>
    </HStack>
  )
}

const DragHandle = ({ listeners }: { listeners: any }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="40px"
      height="40px"
      bg="neutral.100"
      borderRadius="8px"
      cursor="grab"
      transition="transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
      _hover={{
        transform: 'scale(1.05)',
        '.drag-icon': {
          transform: 'scale(1.2)',
        },
      }}
      {...listeners}
    >
      <DragAndDropIcon
        sx={{ transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
        className="drag-icon"
        color="neutral.600"
      />
    </Box>
  )
}
