import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

import { Modal } from '../../../components/layouts/Modal'
import { UseModalReturn } from '../../../hooks/useModal'

export const DeleteProjectModal = ({
  onConfirm,
  isLoading,
  ...props
}: UseModalReturn & { onConfirm(): void; isLoading: boolean }) => {
  const [checked, setChecked] = useState(false)

  return (
    <Modal title="Delete Project" {...props}>
      <VStack spacing={4}>
        <Text variant="body2" color="neutral.600">
          By deleting this project you will loose all data associated to this
          project including descriptions, photos, entries, and rewards.
        </Text>
        <Alert>
          <AlertIcon />
          <Text>
            This action is irreversible. You will not be able to view or access
            this project or project data any longer.
          </Text>
        </Alert>
        <Checkbox
          w="100%"
          checked={checked}
          onChange={() => setChecked((current) => !current)}
        >
          <Text variant="body2">
            Confirm that you want to delete the project
          </Text>
        </Checkbox>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading || !checked}
          w="100%"
          variant="primary"
          onClick={() => onConfirm()}
        >
          Confirm
        </Button>
      </VStack>
    </Modal>
  )
}
