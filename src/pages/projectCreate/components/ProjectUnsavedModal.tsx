import { Button, Text, VStack } from '@chakra-ui/react'

import { Modal } from '../../../components/layouts/Modal'
import { useUnsavedAlert } from '../../../hooks'
import { useModal, UseModalReturn } from '../../../hooks/useModal'

interface Props extends Omit<UseModalReturn<{ onLeave(): void }>, 'children'> {
  hasUnsaved: boolean
}

const ARE_YOU_SURE = `If you quit from this view your information will be unsaved. You may
                      want to save your work as a draft before leaving this view`

export type UseProjectUnsavedModalProps = Pick<Props, 'hasUnsaved'>

export const useProjectUnsavedModal = ({
  hasUnsaved,
}: UseProjectUnsavedModalProps): UseProjectUnsavedModalProps &
  UseModalReturn<{ onLeave(): void }> => {
  const modal = useModal<{ onLeave(): void }>()

  return { ...modal, hasUnsaved }
}

export const ProjectUnsavedModal = ({ hasUnsaved, ...modalProps }: Props) => {
  useUnsavedAlert(hasUnsaved)

  return (
    <Modal
      {...modalProps}
      title={<Text variant="h3">Leave project creation</Text>}
      isOpen={modalProps.isOpen && hasUnsaved}
    >
      <VStack w="100%" spacing={6} pt={1}>
        <Text>{ARE_YOU_SURE}</Text>
        <Button
          w="100%"
          variant="secondary"
          color="secondary.red"
          onClick={modalProps.props.onLeave || undefined}
        >
          Leave without saving
        </Button>
      </VStack>
    </Modal>
  )
}
