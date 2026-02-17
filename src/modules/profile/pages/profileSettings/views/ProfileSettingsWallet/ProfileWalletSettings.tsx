import { Button, Flex, HStack, Input, InputGroup, InputRightElement, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useUserWalletForm } from '@/modules/profile/hooks/useUserWalletForm'
import { decryptMnemonic, getSeedWords } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm'
import { WalletResourceType } from '@/types'
import { useNotification } from '@/utils'

export const ProfileWalletSettings = () => {
  const toast = useNotification()
  const {
    connectionOption,
    setConnectionOption,
    lightningAddress,
    nwc,
    limits,
    handleConfirm,
    isLightningAddressInValid,
  } = useUserWalletForm()
  const setAccountPassword = useSetAtom(accountPasswordAtom)
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const seedWordsModal = useModal()

  useUserAccountKeys()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isDecryptingSeed, setIsDecryptingSeed] = useState(false)
  const [seedWords, setSeedWords] = useState<string[]>([])
  const [showSeedWords, setShowSeedWords] = useState(false)
  const [isSeedWordsView, setIsSeedWordsView] = useState(false)

  const handleCloseSeedWordsModal = () => {
    seedWordsModal.onClose()
    setPassword('')
    setShowPassword(false)
    setPasswordError(null)
    setSeedWords([])
    setShowSeedWords(false)
    setIsSeedWordsView(false)
  }

  const handleViewSeedWords = async () => {
    if (!userAccountKeys?.encryptedMnemonic) {
      toast.error({ title: t('Unable to find your account keys') })
      return
    }

    if (!password) {
      setPasswordError(t('Password is required'))
      return
    }

    setIsDecryptingSeed(true)
    setPasswordError(null)

    try {
      let words: string[] = []

      const mnemonic = await decryptMnemonic(userAccountKeys.encryptedMnemonic, password)
      words = getSeedWords('', mnemonic)
      setSeedWords(words)
      setShowSeedWords(false)
      setAccountPassword(password)
      setIsSeedWordsView(true)
    } catch (error) {
      setPasswordError(t('Invalid password'))
    } finally {
      setIsDecryptingSeed(false)
    }
  }

  const renderSeedWordsFeedback = () => (
    <>
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
    </>
  )

  const renderSeedWordsListView = () => (
    <VStack w="full" spacing={4} align="stretch">
      <VStack align="stretch" spacing={3}>
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
        {renderSeedWordsFeedback()}
      </VStack>
    </VStack>
  )

  const renderSeedWordsPasswordView = () => (
    <VStack w="full" spacing={4} align="stretch">
      <Body size="sm">
        {t('Enter your account password to view your seed words. Keep them private and store them in a secure place.')}
      </Body>

      <VStack align="stretch" spacing={2}>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('Enter your password')}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" variant="ghost" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? t('Hide') : t('Show')}
            </Button>
          </InputRightElement>
        </InputGroup>
        {passwordError ? (
          <Body size="sm" color="red.400">
            {passwordError}
          </Body>
        ) : null}
      </VStack>

      <Button
        size="md"
        colorScheme="primary1"
        onClick={handleViewSeedWords}
        isLoading={isDecryptingSeed}
        isDisabled={isDecryptingSeed}
      >
        {t('Show seed words')}
      </Button>
    </VStack>
  )

  return (
    <VStack p={8} spacing={8} overflowY="auto" align="flex-start" w="full">
      <H2>{t('Wallet Connection')}</H2>
      <VStack spacing={0} align="flex-start">
        <Body>{t('Connect a Lightning wallet to your account to receive refunds, ambassador payouts, etc.')}</Body>
        <Body>
          {t('NOTE: This is your profile wallet, to change your project wallet, please visit the project dashboard.')}
        </Body>
      </VStack>

      <WalletConnectionForm
        readOnly={false}
        connectionOption={connectionOption}
        setConnectionOption={setConnectionOption}
        lightningAddress={lightningAddress}
        nwc={nwc}
        limits={limits}
        resourceType={WalletResourceType.User}
        availableOptions={{ lightningAddress: true, node: false, nwc: true }}
        showPromoText={false}
      />

      <Flex w="full" justifyContent="flex-end">
        <Button
          w="full"
          size="md"
          colorScheme="primary1"
          onClick={handleConfirm}
          isDisabled={isLightningAddressInValid}
        >
          {t('Save')}
        </Button>
      </Flex>

      {userAccountKeys?.encryptedMnemonic ? (
        <VStack spacing={3} align="flex-start" w="full">
          <H2>{t('Recovery seed words')}</H2>
          <Body>
            {t(
              'These recovery words back up your Bitcoin wallet on Geyser. They are the only way to recover your funds if you lose access.',
            )}
          </Body>
          {renderSeedWordsFeedback()}
          <Button size="md" colorScheme="primary1" variant="outline" onClick={seedWordsModal.onOpen}>
            {t('View seed words')}
          </Button>
        </VStack>
      ) : null}

      <Modal isOpen={seedWordsModal.isOpen} onClose={handleCloseSeedWordsModal} title={t('View seed words')} size="md">
        {isSeedWordsView ? renderSeedWordsListView() : renderSeedWordsPasswordView()}
      </Modal>
    </VStack>
  )
}
