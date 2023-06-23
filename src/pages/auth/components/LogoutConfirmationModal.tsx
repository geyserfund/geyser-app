import { Button, Text, UseModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../components/layouts'
import { useAuthContext } from '../../../context'

export const LogoutConfirmationModal = ({ ...modalProps }: UseModalProps) => {
  const { t } = useTranslation()
  const { logout, isAnonymous } = useAuthContext()

  if (isAnonymous) {
    return null
  }

  return (
    <Modal
      {...modalProps}
      title={<Text variant="h3">{t('About to logout')}</Text>}
      isOpen={modalProps.isOpen}
    >
      <VStack w="100%" spacing={6} pt={1}>
        <Text>{t('You are about to logout of your account')}</Text>
        <Button
          w="100%"
          variant="secondary"
          color="secondary.red"
          onClick={() => {
            logout()
            modalProps.onClose()
          }}
        >
          {t('Logout')}
        </Button>
      </VStack>
    </Modal>
  )
}
