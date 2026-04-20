import { Button, Checkbox, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  decryptMnemonic,
  decryptSeedPayload,
  getSeedWords,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import type { UserAccountKeysFragment } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

type ConfigureUserWalletModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfigured?: () => void
}

type WalletAccountKeysState = Pick<UserAccountKeysFragment, 'encryptedMnemonic'> & {
  rskKeyPair?: {
    address: string
    publicKey: string
    derivationPath: string
  } | null
}

export const hasConfiguredUserWallet = (accountKeys?: WalletAccountKeysState | null) =>
  Boolean(accountKeys?.rskKeyPair?.address && accountKeys?.rskKeyPair?.publicKey)

export const ConfigureUserWalletModal = ({
  isOpen,
  onClose,
  onConfigured,
}: ConfigureUserWalletModalProps) => {
  const toast = useNotification()
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const storedPassword = useAtomValue(accountPasswordAtom)

  useUserAccountKeys()

  const [seedWords, setSeedWords] = useState<string[]>([])
  const [showSeedWords, setShowSeedWords] = useState(false)
  const [seedWordsSaved, setSeedWordsSaved] = useState(false)
  const [isPreparingSeedWords, setIsPreparingSeedWords] = useState(false)

  const resetState = () => {
    setSeedWords([])
    setShowSeedWords(false)
    setSeedWordsSaved(false)
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  const importantContent = useMemo(
    () => (
      <Feedback variant={FeedBackVariant.WARNING} noIcon>
        <Body size="sm">
          <Body as="span" bold size="sm">
            {t('Important')}
          </Body>
          {': '}
          {t(
            "this password is required to access your Geyser wallet. Store it somewhere safe, like a password manager. We can't recover it for you.",
          )}
        </Body>
      </Feedback>
    ),
    [],
  )

  const passwordCopy = useMemo(
    () => ({
      titles: {
        create: t('Configure your user wallet'),
        confirm: t('Confirm your password'),
        recover: t('Recover your account password'),
      },
      introText: {
        create: t('Enter an account password. This will be used to generate keys for your user wallet.'),
        confirm: t('Enter the password you previously configured to access your user wallet.'),
      },
      introSize: {
        create: 'sm' as const,
        confirm: 'sm' as const,
      },
      importantContent,
      showFeedback: false,
      hidePasswordLabel: true,
    }),
    [importantContent],
  )

  const handlePasswordComplete = async (data?: UserAccountKeysFragment) => {
    const password = currentForm.getValues?.('password') || storedPassword || ''
    const encryptedSeed = data?.encryptedSeed || userAccountKeys?.encryptedSeed
    const encryptedMnemonic = data?.encryptedMnemonic || userAccountKeys?.encryptedMnemonic

    if (!encryptedSeed || !password) {
      toast.error({ title: t('Missing wallet setup data') })
      return
    }

    setIsPreparingSeedWords(true)

    try {
      const decryptedSeedPayload = await decryptSeedPayload(encryptedSeed, password)

      let nextSeedWords: string[] = []
      if (encryptedMnemonic) {
        const mnemonic = await decryptMnemonic(encryptedMnemonic, password)
        nextSeedWords = getSeedWords('', mnemonic)
      }

      if (nextSeedWords.length === 0) {
        nextSeedWords = getSeedWords(decryptedSeedPayload.seed, decryptedSeedPayload.mnemonic)
      }

      setSeedWords(nextSeedWords)
    } catch (_error) {
      toast.error({ title: t('Failed to prepare your wallet backup words') })
    } finally {
      setIsPreparingSeedWords(false)
    }
  }

  const { renderForm, currentForm, titles } = useAccountPasswordForm({
    onComplete: handlePasswordComplete,
    isCreator: true,
    copy: passwordCopy,
  })

  const handleSeedWordsContinue = () => {
    onConfigured?.()
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={seedWords.length > 0 ? t('Save your seed words') : titles}
      size="md"
    >
      {seedWords.length > 0 ? (
        <VStack w="full" spacing={5} align="stretch">
          <Body>
            {t(
              'These recovery words back up your Bitcoin wallet on Geyser. They are the only way to recover your funds if you lose access.',
            )}
          </Body>

          <Feedback variant={FeedBackVariant.WARNING}>
            <Body size="sm">
              {t(
                'Store them somewhere secure and offline, like a paper backup. Never share them. Anyone with these words can access your Bitcoin.',
              )}
            </Body>
          </Feedback>

          <Feedback variant={FeedBackVariant.INFO}>
            <Body size="sm">
              {t('These recovery words store your Bitcoin on the Rootstock sidechain or on base-chain.')}
            </Body>
          </Feedback>

          <VStack w="full" align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Body medium>{t('Recovery words')}</Body>
              <Button size="sm" variant="soft" colorScheme="primary1" onClick={() => setShowSeedWords((prev) => !prev)}>
                {showSeedWords ? t('Hide words') : t('Show words')}
              </Button>
            </HStack>

            <SimpleGrid w="full" columns={{ base: 2, md: 3 }} spacing={2}>
              {seedWords.map((word, index) => (
                <HStack key={`${word}-${index}`} borderWidth="1px" borderColor="neutral1.4" borderRadius="md" p={2}>
                  <Body size="sm" muted>
                    {index + 1}.
                  </Body>
                  <Body size="sm">{showSeedWords ? word : '••••••••'}</Body>
                </HStack>
              ))}
            </SimpleGrid>

            <Checkbox
              colorScheme="primary1"
              isChecked={seedWordsSaved}
              onChange={(event) => setSeedWordsSaved(event.target.checked)}
            >
              <Body size="sm">{t('I stored my seed words somewhere secure.')}</Body>
            </Checkbox>
          </VStack>

          <Button colorScheme="primary1" size="lg" onClick={handleSeedWordsContinue} isDisabled={!seedWordsSaved}>
            {t('Continue')}
          </Button>
        </VStack>
      ) : (
        <VStack as="form" w="full" spacing={6} onSubmit={currentForm.onSubmit}>
          {renderForm()}
          <Button
            width="200px"
            size="lg"
            colorScheme="primary1"
            type="submit"
            isLoading={Boolean(currentForm.isSubmitting || currentForm.formState?.isSubmitting || isPreparingSeedWords)}
          >
            {t('Continue')}
          </Button>
        </VStack>
      )}
    </Modal>
  )
}
