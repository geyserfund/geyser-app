import { Button, UseModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'

import { useAuthContext } from '../../../context'
import { Modal } from '../../../shared/components/layouts'

export const LogoutConfirmationModal = ({ ...modalProps }: UseModalProps) => {
  const { t } = useTranslation()
  const { logout, isAnonymous } = useAuthContext()

  if (isAnonymous) {
    return null
  }

  return (
    <Modal {...modalProps} title={<H3 size="lg">{t('About to logout')}</H3>} isOpen={modalProps.isOpen}>
      <VStack w="100%" spacing={6} pt={1}>
        <Body>{t('You are about to logout of your account')}</Body>
        <Button
          w="100%"
          variant="outline"
          colorScheme="error"
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
