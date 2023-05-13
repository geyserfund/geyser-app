import { Button, ModalProps, Text, VStack } from '@chakra-ui/react'

import { Modal } from '../../../components/layouts/Modal'
import { useModal, UseModalReturn } from '../../../hooks/useModal'

interface Props extends Omit<ModalProps, 'children'> {
  onLeave(): void
}

export const useProjectUnsavedModal = (
  onLeave: () => void,
): Pick<Props, 'onLeave'> & UseModalReturn => {
  const modal = useModal()
  return { ...modal, onLeave }
}

export const ProjectUnsavedModal = ({ onLeave, ...props }: Props) => {
  return (
    <Modal title={<Text variant="h3">Leave project creation</Text>} {...props}>
      <VStack w="100%" spacing={6} pt={1}>
        <Text>
          If you quit from this view your information will be unsaved. You may
          want to save your work as a draft before leaving this view
        </Text>
        <Button
          w="100%"
          variant="secondary"
          color="brand.secondaryRed"
          onClick={onLeave}
        >
          Leave without saving
        </Button>
      </VStack>
    </Modal>
  )
}
