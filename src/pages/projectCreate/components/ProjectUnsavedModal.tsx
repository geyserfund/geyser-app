import { Button, ModalProps, Text, VStack } from '@chakra-ui/react'

import { Modal } from '../../../components/layouts/Modal'
import { useUnsavedAlert } from '../../../hooks'
import { useModal, UseModalReturn } from '../../../hooks/useModal'

interface Props extends Omit<ModalProps, 'children'> {
  onLeave: (() => void) | null
  hasUnsaved: boolean
}

const ARE_YOU_SURE = `If you quit from this view your information will be unsaved. You may
                      want to save your work as a draft before leaving this view`

export type UseProjectUnsavedModalProps = Pick<Props, 'onLeave' | 'hasUnsaved'>

export const useProjectUnsavedModal = ({
  onLeave,
  hasUnsaved,
}: UseProjectUnsavedModalProps): UseProjectUnsavedModalProps &
  UseModalReturn => {
  const modal = useModal()

  return { ...modal, onLeave, hasUnsaved }
}

export const ProjectUnsavedModal = ({
  onLeave,
  hasUnsaved,
  ...props
}: Props) => {
  useUnsavedAlert(hasUnsaved)

  return (
    <Modal
      {...props}
      title={<Text variant="h3">Leave project creation</Text>}
      isOpen={props.isOpen && hasUnsaved}
    >
      <VStack w="100%" spacing={6} pt={1}>
        <Text>{ARE_YOU_SURE}</Text>
        <Button
          w="100%"
          variant="secondary"
          color="brand.secondaryRed"
          onClick={onLeave || undefined}
        >
          Leave without saving
        </Button>
      </VStack>
    </Modal>
  )
}
