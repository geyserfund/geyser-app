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
import React, { useState } from 'react'
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
  refetchProject: () => void
}

export const GoalDeleteModal = ({ isOpen, onClose, goal, refetch, refetchProject }: GoalDeleteModalProps) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const [deleteProjectGoal] = useMutation(MUTATION_DELETE_PROJECT_GOAL)

  const handleDelete = async (projectGoalId: bigint) => {
    try {
      await deleteProjectGoal({
        variables: {
          projectGoalId,
        },
      })
      refetch()
      refetchProject()
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
            ? {t('Deleting this milestone will result in losing all progress related to this goal.')}
          </Body2>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <VStack width="100%" alignItems="flex-start">
              <Text fontSize="16px" fontWeight="500">
                {t('Enter Goal Title')}
              </Text>
              <Input
                placeholder={t('Enter the full title of the goal to confirm its deletion')}
                value={inputValue}
                onChange={handleInputChange}
              />
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
