import { useMutation } from '@apollo/client'
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdCloseCircle } from 'react-icons/io'

import { Body2 } from '../../../../../../../components/typography'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { MUTATION_DELETE_PROJECT_GOAL } from '../../../../../../../graphql/mutations/goals'
import { ProjectGoal } from '../../../../../../../types'

type GoalDeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  goal: ProjectGoal | null | undefined
  refetch: () => void
}

export const GoalDeleteModal = ({ isOpen, onClose, goal, refetch }: GoalDeleteModalProps) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (inputValue !== goal?.title) {
      setError(t('Title must match exactly'))
    } else {
      setError('')
    }
  }, [inputValue, goal?.title, t])

  const [deleteProjectGoal] = useMutation(MUTATION_DELETE_PROJECT_GOAL)

  const handleDelete = async (projectGoalId: bigint) => {
    try {
      await deleteProjectGoal({
        variables: {
          projectGoalId,
        },
      })
      refetch()
      setInputValue('')
      onClose()
    } catch (error) {
      console.error('Error deleting project goal:', error)
    }
  }

  const { title } = goal || { title: '' }

  const isConfirmDisabled = inputValue !== title

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader pb={2}>
          <HStack width="100%" alignItems={'center'} justifyContent="space-between">
            <Text color="neutral.700" fontWeight={700} fontSize={16}>
              {t('Delete Goal')}
            </Text>
            <IconButtonComponent
              icon={<IoMdCloseCircle color="neutral.700" fontSize={20} />}
              onClick={onClose}
              variant="ghost"
              aria-label="Close"
            />
          </HStack>

          <Body2 color="neutral.700" fontSize={14} fontWeight={400}>
            {t('Are you sure you want to delete goal titled')}{' '}
            <Text as={'span'} fontWeight="bold">
              {title}
            </Text>
            ? {t('Deleting this goal will result in losing all of its progress')}
          </Body2>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <VStack width="100%" alignItems="flex-start">
              <Text fontSize="16px" fontWeight="500">
                {t('Enter Goal Title')}
              </Text>
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
                <Text fontSize={'14px'} fontWeight={4000} color="secondary.red">
                  {error}
                </Text>
              )}
            </VStack>
            <HStack width="100%" justifyContent="space-between">
              <Button flexGrow={1} variant="secondary" onClick={onClose}>
                {t('Cancel')}
              </Button>
              <Button
                flexGrow={1}
                variant="primary"
                bg="secondary.red"
                color="neutral.0"
                _hover={{ bg: 'secondary.red', color: 'neutral.0' }}
                onClick={() => handleDelete(goal?.id)}
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
