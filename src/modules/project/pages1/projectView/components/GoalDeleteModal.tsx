import {
  Button,
  CloseButton,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '../../../../../shared/components/typography'
import { useProjectGoalDeleteMutation } from '../../../../../types'
import { useProjectContext } from '../../../context'
import { useGoalsModal } from '../hooks/useGoalsModal'

export const GoalDeleteModal = () => {
  const { t } = useTranslation()

  const { currentGoal, isGoalDeleteModalOpen, onGoalDeleteModalClose } = useGoalsModal()

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const { queryInProgressGoals } = useProjectContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (inputValue !== currentGoal?.title) {
      setError(t('Title must match exactly'))
    } else {
      setError('')
    }
  }, [inputValue, currentGoal?.title, t])

  const [deleteProjectGoal] = useProjectGoalDeleteMutation({
    onCompleted() {
      queryInProgressGoals()
      setInputValue('')
      onGoalDeleteModalClose()
    },
  })

  const { title } = currentGoal || { title: '' }

  const isConfirmDisabled = inputValue !== title

  if (!isGoalDeleteModalOpen) return null

  return (
    <Modal isCentered isOpen={isGoalDeleteModalOpen} onClose={onGoalDeleteModalClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader pb={2}>
          <HStack width="100%" alignItems={'center'} justifyContent="space-between">
            <Body size="md" bold dark>
              {t('Delete Goal')}
            </Body>
            <CloseButton aria-label="goal-delete-close" onClick={onGoalDeleteModalClose} />
          </HStack>

          <Body size="sm" light>
            {t('Are you sure you want to delete goal titled')}{' '}
            <Body size="sm" as={'span'} bold>
              {title}
            </Body>
            ? {t('Deleting this goal will result in losing all of its progress')}
          </Body>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <VStack width="100%" alignItems="flex-start">
              <Body medium>{t('Enter Goal Title')}</Body>
              <Input
                borderColor={error && 'secondary.red'}
                borderWidth={error && '2px'}
                _focus={{
                  borderColor: error && 'secondary.red',
                  borderWidth: error && '2px',
                }}
                placeholder={title}
                value={inputValue}
                onChange={handleInputChange}
              />
              {error && (
                <Body size="sm" color="error.9">
                  {error}
                </Body>
              )}
            </VStack>
            <HStack width="100%" justifyContent="space-between">
              <Button flexGrow={1} variant="outline" colorScheme="neutral1" onClick={onGoalDeleteModalClose}>
                {t('Cancel')}
              </Button>
              <Button
                flexGrow={1}
                variant="solid"
                colorScheme="error"
                onClick={() => deleteProjectGoal({ variables: { projectGoalId: currentGoal?.id } })}
                isDisabled={isConfirmDisabled}
              >
                {t('Confirm Delete')}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
