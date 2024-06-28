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
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdCloseCircle } from 'react-icons/io'

import {
  ControlledEmojiInput,
  ControlledGoalAmount,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextInput,
} from '../../../../../../../shared/components/controlledInput'
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
  openDeleteModal: (goal: ProjectGoal | null | undefined) => void
}

const denominationOptions = [
  { value: ProjectGoalCurrency.Btcsat, label: 'Bitcoin' },
  { value: ProjectGoalCurrency.Usdcent, label: 'USD' },
]

export const GoalModal = ({ isOpen, onClose, goal, projectId, refetch, openDeleteModal }: Props) => {
  const { t } = useTranslation()

  const { control, handleSubmit, loading, watch, errors, enableSubmit, setValue } = useProjectGoalForm(
    goal || null,
    projectId,
    onClose,
    refetch,
  )
  const isCompleted = goal && goal.status === ProjectGoalStatus.Completed

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  const handleOpenDeleteModal = () => {
    onClose()
    openDeleteModal(goal)
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
        {goal && (
          <HStack width="100%">
            <Button flexGrow={1} variant="primary" bg="secondary.red" color="neutral.0" onClick={handleOpenDeleteModal}>
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
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
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
                {t('Inspire your followers to contribute to specific objectives.')}
              </Body2>
            </ModalHeader>

            <ModalBody>
              <form style={{ width: '100%', height: '100%' }} onSubmit={handleSubmit}>
                <VStack width="100%" alignItems="flex-start" gap={5}>
                  <VStack width="100%" alignItems="flex-start">
                    <HStack width="100%" alignItems="center" justifyContent="flex-start">
                      <Text fontSize="16px" fontWeight="500">
                        {t('Goal Title')}
                      </Text>
                    </HStack>
                    <HStack width="100%" alignItems="flex-start" justifyContent="flex-start">
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
    </>
  )
}
