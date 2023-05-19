import { Button, Text, UseModalProps, VStack } from '@chakra-ui/react'

import { Modal } from '../../../components/layouts/Modal'
import { useAuthContext } from '../../../context'

export const LogoutConfirmationModal = ({ ...modalProps }: UseModalProps) => {
  const { logout, isAnonymous } = useAuthContext()

  if (isAnonymous) {
    return null
  }

  return (
    <Modal
      {...modalProps}
      title={<Text variant="h3">About to logout</Text>}
      isOpen={modalProps.isOpen}
    >
      <VStack w="100%" spacing={6} pt={1}>
        <Text>You are about to logout of your account</Text>
        <Button
          w="100%"
          variant="secondary"
          color="brand.secondaryRed"
          onClick={() => {
            logout()
            modalProps.onClose()
          }}
        >
          Logout
        </Button>
      </VStack>
    </Modal>
  )
}
