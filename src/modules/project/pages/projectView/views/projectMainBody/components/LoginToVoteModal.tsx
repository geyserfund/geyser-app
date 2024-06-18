import { Box, Button, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../../../../../components/layouts'
import { AuthModal } from '../../../../../../../components/molecules'

type LoginToVoteModalProps = {
  isOpen: boolean
  onClose: () => void
  onContribute: () => void
}

export const LoginToVoteModal = ({ isOpen, onClose, onContribute }: LoginToVoteModalProps) => {
  const { t } = useTranslation()

  const { isOpen: isAuthModalOpen, onOpen: onAuthModalOpen, onClose: onAuthModalClose } = useDisclosure()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={t('Login for your vote to count')}>
        <VStack py={4} px={4} gap={10} w="full">
          <Box w="full">
            <Text>
              {t(
                "Make sure to login before contributing otherwise your contribution won't be counted as votes in the grant.",
              )}
            </Text>
          </Box>
          <VStack w="full">
            <Button
              variant="primary"
              size="md"
              w="full"
              onClick={() => {
                onAuthModalOpen()
                onClose()
              }}
            >
              {t('Login')}
            </Button>
            <Button
              onClick={() => {
                onContribute()
                onClose()
              }}
              variant="secondary"
              size="md"
              w="full"
            >
              {t('Contribute without login')}
            </Button>
          </VStack>
        </VStack>
      </Modal>
      <AuthModal
        title={t('Login to vote')}
        description={t('You need to login to vote for this community voting grant. ')}
        isOpen={isAuthModalOpen}
        onClose={onAuthModalClose}
        showLightning={false}
      />
    </>
  )
}