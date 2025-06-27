import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ControlledEmojiInput,
  ControlledGoalAmount,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextInput,
} from '../../../../../shared/components/controlledInput'
import { Body } from '../../../../../shared/components/typography'
import { CloseButton } from '../../../../../shared/molecules'
import { ProjectGoalCurrency, ProjectGoalStatus } from '../../../../../types'
import { useProjectAtom } from '../../../hooks/useProjectAtom'
import { useGoalsModal } from '../hooks/useGoalsModal'
import { useProjectGoalForm } from '../hooks/useProjectGoalForm'
import { GoalDeleteModal } from './GoalDeleteModal.tsx'

const denominationOptions = [
  { value: ProjectGoalCurrency.Btcsat, label: 'Bitcoin' },
  { value: ProjectGoalCurrency.Usdcent, label: 'USD' },
]

export const GoalModal = ({ onGoalCreated }: { onGoalCreated?: () => void }) => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const { currentGoal, isGoalModalOpen, onGoalModalClose, onGoalDeleteModalOpen } = useGoalsModal()

  const { control, handleSubmit, loading, watch, errors, enableSubmit, setValue } = useProjectGoalForm({
    goal: currentGoal,
    projectId: project.id,
    onClose: onGoalModalClose,
    onGoalCreated,
  })
  const isCompleted = currentGoal && currentGoal.status === ProjectGoalStatus.Completed

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  const handleOpenDeleteModal = () => {
    onGoalModalClose()
    onGoalDeleteModalOpen()
  }

  const handleOpenEmojiPicker = () => {
    setIsEmojiPickerOpen(true)
  }

  const handleEmojiClick = (emoji: any) => {
    setValue('emojiUnifiedCode', emoji.unified, { shouldDirty: true })
    setIsEmojiPickerOpen(false)
  }

  const renderActions = () => {
    return (
      <VStack width="100%">
        {currentGoal && (
          <HStack width="100%">
            <Button flexGrow={1} variant="solid" colorScheme="error" onClick={handleOpenDeleteModal}>
              {t('Delete Goal')}
            </Button>
          </HStack>
        )}
        {!currentGoal || currentGoal.status === ProjectGoalStatus.InProgress ? (
          <HStack width="100%">
            <Button flexGrow={1} variant="outline" colorScheme="netural1" onClick={onGoalModalClose}>
              {t('Back')}
            </Button>{' '}
            <Button
              flexGrow={1}
              variant="solid"
              colorScheme="primary1"
              isLoading={loading}
              type="submit"
              isDisabled={!enableSubmit}
            >
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
    <>
      <Modal isCentered isOpen={isGoalModalOpen} onClose={onGoalModalClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={0}>
          <Box borderRadius="8px" bg="utils.pbg" pb={3}>
            <ModalHeader pb={2}>
              <HStack width="100%" alignItems={'center'} justifyContent="space-between">
                <Body bold dark>
                  {currentGoal ? t('Edit goal') : t('Create goal')}
                </Body>
                <CloseButton aria-label="goal-add-edit-close" onClick={onGoalModalClose} />
              </HStack>

              <Body size="sm" light>
                {t('Inspire your followers to contribute to specific objectives.')}
              </Body>
            </ModalHeader>

            <ModalBody>
              <form style={{ width: '100%', height: '100%' }} onSubmit={handleSubmit}>
                <VStack width="100%" alignItems="flex-start" gap={5}>
                  <VStack width="100%" alignItems="flex-start">
                    <HStack width="100%" alignItems="center" justifyContent="flex-start">
                      <Body size="md" medium dark>
                        {t('Goal Title')}
                      </Body>
                    </HStack>
                    <HStack width="100%" alignItems="start" justifyContent="flex-start">
                      <ControlledEmojiInput
                        control={control}
                        name="emojiUnifiedCode"
                        onOpenEmojiPicker={handleOpenEmojiPicker}
                        isDisabled={Boolean(isCompleted)}
                      />
                      <ControlledTextInput
                        control={control}
                        name="title"
                        placeholder="Episode 21 with Hal Finney"
                        label={''}
                        isDisabled={Boolean(isCompleted)}
                        error={errors.title?.message}
                      />
                    </HStack>
                  </VStack>

                  <ControlledTextArea
                    control={control}
                    name="description"
                    placeholder="We will release this episode following the completion of this goal, this is a great one"
                    label={t('Description')}
                    isDisabled={Boolean(isCompleted)}
                    error={errors.description?.message}
                  />
                  <ControlledGoalAmount
                    control={control}
                    name="targetAmount"
                    label={t('Goal Amount')}
                    placeholder="0"
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
                    isDisabled={Boolean(currentGoal?.hasReceivedContribution)}
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

      <Modal
        motionPreset="none"
        isCentered
        size="sm"
        isOpen={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={0}>
          <ModalBody>
            <EmojiPicker
              previewConfig={{ showPreview: false }}
              onEmojiClick={handleEmojiClick}
              emojiStyle={EmojiStyle.NATIVE}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <GoalDeleteModal />
    </>
  )
}
