import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { IoMdCloseCircle } from 'react-icons/io'

import {
  ControlledGoalAmount,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextInput,
} from '../../../../../../../components/inputs'
import { Body2 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { ProjectGoal, ProjectGoalCurrency, ProjectGoalStatus } from '../../../../../../../types'
import { useProjectGoalForm } from '../../../../projectView/hooks/useProjectGoalForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  goal?: ProjectGoal | null
  projectId: string
  refetch: () => void
  openDeleteModal?: (goal: ProjectGoal) => void
}

const denominationOptions = [
  { value: ProjectGoalCurrency.Btcsat, label: 'Bitcoin' },
  { value: ProjectGoalCurrency.Usdcent, label: 'USD' },
]

export const GoalModal = ({ isOpen, onClose, goal, projectId, refetch, openDeleteModal }: Props) => {
  const { t } = useTranslation()

  const { control, handleSubmit, loading, watch, errors, enableSubmit } = useProjectGoalForm(
    goal || null,
    projectId,
    onClose,
    refetch,
  )
  const isCompleted = goal && goal.status === ProjectGoalStatus.Completed

  const renderActions = () => {
    return (
      <VStack width="100%">
        {goal && (
          <HStack width="100%">
            <Button
              flexGrow={1}
              variant="primary"
              bg="secondary.red"
              color="neutral.0"
              onClick={() => openDeleteModal && openDeleteModal(goal)}
            >
              {t('Delete Goal')}
            </Button>
          </HStack>
        )}
        {!goal || goal.status === ProjectGoalStatus.InProgress ? (
          <HStack width="100%">
            <Button flexGrow={1} variant="secondary" onClick={onClose}>
              {t('Back')}
            </Button>{' '}
            <Button flexGrow={1} variant="primary" isLoading={loading} type="submit" isDisabled={!enableSubmit}>
              {t('Confirm')}
            </Button>
          </HStack>
        ) : (
          <></>
        )}
      </VStack>
    )
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="8px" bg="neutral.0" pb={3}>
          <ModalHeader pb={2}>
            <HStack width="100%" alignItems={'center'} justifyContent="space-between">
              <Text color="neutral.700" fontWeight={700} fontSize={16}>
                {goal ? t('Edit goal') : t('Create goal')}
              </Text>
              <IconButtonComponent
                icon={<IoMdCloseCircle color="neutral.700" fontSize={20} />}
                onClick={onClose}
                variant="ghost"
                aria-label="Close"
              />
            </HStack>

            <Body2 color="neutral.700" fontSize={14} fontWeight={400}>
              {t(
                'Goals are a great way to motivate and inspire others to donate by showing what happens when a certain threshold is reached',
              )}
            </Body2>
          </ModalHeader>

          <ModalBody>
            <form style={{ width: '100%', height: '100%' }} onSubmit={handleSubmit}>
              <VStack width="100%" alignItems="flex-start" gap={5}>
                <ControlledTextInput
                  control={control}
                  name="title"
                  placeholder="Your goal title"
                  label={t('Goal Title')}
                  isDisabled={Boolean(isCompleted)}
                  error={errors.title?.message}
                />
                <ControlledTextArea
                  control={control}
                  name="description"
                  placeholder="Description"
                  label={t('Description')}
                  isDisabled={Boolean(isCompleted)}
                  error={errors.description?.message}
                />
                <ControlledGoalAmount
                  control={control}
                  name="targetAmount"
                  label={t('Goal Amount')}
                  currency={watch('currency') as ProjectGoalCurrency}
                  isDisabled={Boolean(isCompleted)}
                  error={errors.targetAmount?.message}
                />

                <ControlledSelect
                  control={control}
                  name="currency"
                  label={t('Denomination')}
                  options={denominationOptions}
                  description={t('Denominate your goal in Bitcoin or USD')}
                  defaultValue={ProjectGoalCurrency.Usdcent}
                  isDisabled={Boolean(goal?.hasReceivedContribution)}
                />
                <HStack mt={4} width="100%" justifyContent="space-between">
                  {renderActions()}
                </HStack>
              </VStack>
            </form>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
