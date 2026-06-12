import { Button, HStack, Link, VStack, useDisclosure } from '@chakra-ui/react'
import { t } from 'i18next'

import {
  RecoverPasswordForm,
  useRecoverPasswordForm,
} from '@/modules/project/forms/accountPassword/components/RecoverPasswordForm.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { GuideUrl } from '@/shared/constants/platform/url.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useNotification } from '@/utils/index.ts'

export const ResetAccountPasswordSection = () => {
  const resetPasswordModal = useDisclosure()
  const toast = useNotification()

  const recoverPasswordForm = useRecoverPasswordForm(() => {
    toast.success({ title: t('Account password reset') })
    resetPasswordModal.onClose()
  })

  const handleClose = () => {
    recoverPasswordForm.reset()
    resetPasswordModal.onClose()
  }

  return (
    <VStack spacing={4} align="flex-start" w="full">
      <VStack spacing={2} align="flex-start" w="full">
        <H2 size="md">{t('Reset account password')}</H2>
        <Body size="sm" color="neutral1.10" maxW="4xl">
          {t('Resetting your account password creates a new seed and rotates project wallet addresses where possible.')}
          <Body as="span" size="sm" bold color="neutral1.10">
            {' '}
            {t(
              'Funds on addresses tied to the old password are not moved automatically and will need to be recovered from an external wallet using your old seed. View how in ',
            )}
            <Link href={GuideUrl} isExternal textDecoration="underline">
              {t('this guide')}
            </Link>
            {'.'}
          </Body>
        </Body>
      </VStack>

      <Feedback variant={FeedBackVariant.WARNING}>
        <Body size="sm">
          {t(
            'Only reset your password if you understand that funds tied to the current password may become inaccessible without an old seed/password backup. Pending project payments may also block the reset until they settle.',
          )}
        </Body>
      </Feedback>

      <HStack w="full" justify="flex-start">
        <Button size="md" colorScheme="primary1" variant="outline" onClick={resetPasswordModal.onOpen}>
          {t('Reset account password')}
        </Button>
      </HStack>

      <Modal
        isOpen={resetPasswordModal.isOpen}
        onClose={handleClose}
        title={t('Reset account password')}
        size="xl"
        contentProps={{ maxW: { base: 'calc(100vw - 24px)', lg: '960px' } }}
        bodyProps={{ maxH: 'calc(100vh - 160px)', overflowY: 'auto', alignItems: 'stretch' }}
      >
        <VStack as="form" w="full" spacing={6} align="stretch" onSubmit={recoverPasswordForm.onSubmit}>
          <RecoverPasswordForm control={recoverPasswordForm.control} />
          <Button
            width={{ base: 'full', md: '200px' }}
            size="lg"
            colorScheme="primary1"
            type="submit"
            alignSelf="flex-end"
            isLoading={Boolean(recoverPasswordForm.isSubmitting || recoverPasswordForm.formState.isSubmitting)}
          >
            {t('Reset password')}
          </Button>
        </VStack>
      </Modal>
    </VStack>
  )
}
