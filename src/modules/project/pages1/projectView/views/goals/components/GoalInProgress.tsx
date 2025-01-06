import { Box, BoxProps, Button, HStack, IconButton, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { useTranslation } from 'react-i18next'
import { PiDotsSix, PiNotePencil, PiStarFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout,  CardLayoutProps} from '@/shared/components/layouts/CardLayout'
import { getPath } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'

import { Body } from '../../../../../../../shared/components/typography'
import { ProjectGoalCurrency, ProjectGoalFragment } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { CreatorEditButton } from '../../body/components'
import { GoalContributeButton } from './GoalContributeButton'
import { GoalTarget } from './GoalTarget'

type Props = {
  goal: ProjectGoalFragment
  isEditing?: boolean
  onOpenGoalModal: (goal: ProjectGoalFragment) => void
  isPriorityGoal?: boolean
  listeners?: any
  goalView?: boolean
} & CardLayoutProps

export const GoalInProgress = ({
  goal,
  isEditing = false,
  onOpenGoalModal,
  listeners,
  isPriorityGoal,
  goalView = false,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()
  const isMobile = useMobileMode()

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const percentage = (goal.amountContributed / goal.targetAmount) * 100

  const formattedAmountContributed = formatAmount(goal.amountContributed, goal.currency)
  const usdAmount = formatUsdAmount(goal.amountContributed)
  const satsAmount = formatSatsAmount(goal.amountContributed)

  const renderActionButton = () => {
    if (!isEditing && !isProjectOwner) {
      return (
        <GoalContributeButton isPriorityGoal={isPriorityGoal} projectGoalId={goal.id}>
          {t('Contribute')}
        </GoalContributeButton>
      )
    }

    if (isEditing && !isMobile) {
      return (
        <Button
          w="full"
          aria-label="is-editing-goal"
          variant="solid"
          colorScheme="neutral1"
          size="sm"
          onClick={handleEditGoal}
        >
          {t('Edit')}
        </Button>
      )
    }

    if (isEditing && isMobile) {
      return <></>
    }
  }

  const handleEditGoal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onOpenGoalModal(goal)
  }

  return (
    <CardLayout
      dense
      width="100%"
      gap={'10px'}
      background="utils.pbg"
      padding={goalView ? 0 : 6}
      noborder={goalView}
      flexDirection="row"
      {...rest}
    >
      {isEditing && listeners && (
        <VStack display="flex" height="100%" alignItems="center" justifyContent="flex-start" pt={1}>
          <DragHandle listeners={listeners} />
        </VStack>
      )}
      <VStack
        {...(!goalView && !isEditing
          ? {
              as: Link,
              to: getPath('projectGoalView', project?.name, goal.id),
            }
          : {})}
        display="flex"
        alignItems="flex-start"
        width="100%"
        height="100%"
        spacing={0}
      >
        <HStack
          display="flex"
          alignItems={'center'}
          justifyContent={{ base: 'space-between', lg: 'flex-start' }}
          width="100%"
        >
          <HStack w="full" justifyContent={'space-between'} alignItems="start">
            <HStack w="full" justifyContent={'start'} alignItems="center">
              {goal.emojiUnifiedCode && (
                <Box display="flex" justifyContent="center" width="24px" height="34px">
                  <Emoji size={24} unified={goal.emojiUnifiedCode} emojiStyle={EmojiStyle.NATIVE} />
                </Box>
              )}
              <Body size="md" medium dark>
                {goal.title}
              </Body>
              {isPriorityGoal && (
                <Tooltip
                  px={4}
                  py={2}
                  label={t(
                    'This is the default goal. Contributions will be directed here unless contributors decide to fund another goal. Once this goal is completed, the next goal in line will automatically become the default goal.',
                  )}
                >
                  <HStack
                    h="24px"
                    w="24px"
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'6px'}
                    bg={'amber.3'}
                    color="amber.11"
                  >
                    <PiStarFill />
                  </HStack>
                </Tooltip>
              )}
            </HStack>

            {goalView && isProjectOwner && <CreatorEditButton onClick={handleEditGoal} />}
          </HStack>

          {isEditing && isMobile && (
            <IconButton
              aria-label="is-editing-goal"
              variant="ghost"
              colorScheme="neutral1"
              size="sm"
              onClick={handleEditGoal}
              icon={<PiNotePencil />}
            />
          )}
        </HStack>
        <Body size="sm" medium dark pb={2}>
          {goal.description}
        </Body>
        <Stack flexDirection={{ base: 'column', lg: 'row' }} alignItems="center" width="100%" gap={{ base: 2, lg: 5 }}>
          <VStack width="100%">
            <GoalProgressBar width="100%" percentage={percentage} />
            <HStack w="full" justifyContent={'space-between'}>
              <Body size="sm" dark bold>
                {formattedAmountContributed}{' '}
                <Body as="span" size="sm" muted>
                  {goal.currency === ProjectGoalCurrency.Btcsat ? `(${usdAmount})` : `(${satsAmount})`}
                </Body>
              </Body>

              <GoalTarget goal={goal} of />
            </HStack>
          </VStack>
          {!(isProjectOwner && !isEditing) && (
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
          )}
        </Stack>
      </VStack>
    </CardLayout>
  )
}

const GoalProgressBar = ({
  percentage,
}: Pick<BoxProps, 'width' | 'bg'> & {
  percentage: number
}) => {
  const isMobile = useMobileMode()

  const displayPercentage =
    percentage === 0 ? '0%' : isMobile ? `${Math.round(percentage)}%` : `${percentage.toFixed(0)}%`

  return (
    <HStack width="100%" height="24px" justifyContent="flex-start" borderRadius="44px" bg="neutral1.3">
      <HStack
        p={'5px'}
        width={`${percentage}%`}
        minWidth="30px"
        height="24px"
        bgColor={'neutral1.11'}
        borderRadius="44px"
        justifyContent={'flex-end'}
        alignItems="center"
      >
        <Body size="xs" medium color={'neutral1.1'}>
          {displayPercentage}
        </Body>
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
      width="24px"
      height="24px"
      bg="neutral1.2"
      borderRadius="6px"
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
      <PiDotsSix
        style={{ transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
        className="drag-icon"
        color="neutral1.9"
      />
    </Box>
  )
}
