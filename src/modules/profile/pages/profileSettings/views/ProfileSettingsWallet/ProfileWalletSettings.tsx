import { useQuery } from '@apollo/client'
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  SimpleGrid,
  Skeleton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  QUERY_USER_WALLET_WITHDRAW_ACTIVE,
  QUERY_USER_WALLET_WITHDRAW_LATEST,
} from '@/modules/profile/graphql/userWalletWithdraw.ts'
import {
  ConfigureUserWalletModal,
  hasConfiguredUserWallet,
} from '@/modules/profile/pages/profileSettings/components/ConfigureUserWalletModal.tsx'
import { MIN_BITCOIN_PAYOUT_USD } from '@/modules/project/constants/payout.ts'
import { decryptMnemonic, getSeedWords } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { getRootstockExplorerAddressUrl } from '@/shared/utils/external/rootstock.ts'
import { useNotification } from '@/utils'

import { UserWalletWithdrawRsk } from './UserWalletWithdrawRsk.tsx'

export const ProfileWalletSettings = () => {
  const toast = useNotification()
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setAccountPassword = useSetAtom(accountPasswordAtom)
  const configureWalletModal = useDisclosure()
  const userWalletWithdrawModal = useDisclosure()
  const seedWordsModal = useModal()

  useUserAccountKeys()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isDecryptingSeed, setIsDecryptingSeed] = useState(false)
  const [seedWords, setSeedWords] = useState<string[]>([])
  const [showSeedWords, setShowSeedWords] = useState(false)
  const [isSeedWordsView, setIsSeedWordsView] = useState(false)

  const hasWalletConfigured = hasConfiguredUserWallet(userAccountKeys)
  const rskAddress = userAccountKeys?.rskKeyPair?.address || ''
  const { getUSDCentsAmount } = useBTCConverter()
  const {
    withdrawable,
    isLoading: isWithdrawableLoading,
    refetch: refetchWithdrawable,
  } = usePrismWithdrawable({ rskAddress })
  const {
    data: activeUserWalletWithdrawData,
    loading: isActiveUserWalletWithdrawLoading,
    refetch: refetchActiveUserWalletWithdraw,
  } = useQuery(QUERY_USER_WALLET_WITHDRAW_ACTIVE, {
    fetchPolicy: 'cache-and-network',
    skip: !hasWalletConfigured,
  })
  const {
    data: latestUserWalletWithdrawData,
    loading: isLatestUserWalletWithdrawLoading,
    refetch: refetchLatestUserWalletWithdraw,
  } = useQuery(QUERY_USER_WALLET_WITHDRAW_LATEST, {
    fetchPolicy: 'cache-and-network',
    skip: !hasWalletConfigured,
  })
  const withdrawableSats = withdrawable ? withdrawable / 10000000000n : 0n
  const withdrawableUsd = getUSDCentsAmount(withdrawableSats) / 100
  const isBelowMinimumWithdrawal = withdrawableUsd > 0 && withdrawableUsd < MIN_BITCOIN_PAYOUT_USD
  const activeUserWalletWithdraw = activeUserWalletWithdrawData?.userWalletWithdrawActive?.userWalletWithdraw
  const latestUserWalletWithdraw = latestUserWalletWithdrawData?.userWalletWithdrawLatest?.userWalletWithdraw
  const latestUserWalletWithdrawPayment = [...(latestUserWalletWithdraw?.payments ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0]
  const hasRetryableUserWalletWithdraw =
    latestUserWalletWithdraw?.status === 'FAILED' && latestUserWalletWithdrawPayment?.status === 'REFUNDED'
  const hasActiveUserWalletWithdraw = Boolean(
    activeUserWalletWithdraw && ['PENDING', 'PROCESSING'].includes(activeUserWalletWithdraw.status),
  )
  const canWithdraw =
    withdrawableUsd >= MIN_BITCOIN_PAYOUT_USD || hasActiveUserWalletWithdraw || hasRetryableUserWalletWithdraw
  const isUserWalletWithdrawStateLoading = isActiveUserWalletWithdrawLoading || isLatestUserWalletWithdrawLoading
  const withdrawButtonLabel = hasActiveUserWalletWithdraw
    ? t('Continue')
    : hasRetryableUserWalletWithdraw
    ? t('Retry')
    : t('Withdraw')

  const handleUserWalletWithdrawCompleted = () => {
    refetchWithdrawable()
    refetchActiveUserWalletWithdraw()
    refetchLatestUserWalletWithdraw()
  }

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
      const mnemonic = await decryptMnemonic(userAccountKeys.encryptedMnemonic, password)
      setSeedWords(getSeedWords('', mnemonic))
      setShowSeedWords(false)
      setAccountPassword(password)
      setIsSeedWordsView(true)
    } catch (_error) {
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
      <H2>{t('User wallet')}</H2>
      <Body>{t('Configure your internal Geyser wallet to receive affiliate payouts and handle refunds.')}</Body>

      {hasWalletConfigured ? (
        <VStack spacing={6} align="flex-start" w="full">
          <VStack spacing={2} align="flex-start" w="full">
            <Body size="md" medium color="neutral1.11">
              {t('Rootstock address')}
            </Body>
            <Box w="full" px={4} py={3} borderWidth="1px" borderColor="neutral1.6" borderRadius="xl" bg="neutral1.1">
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems={{ base: 'flex-start', md: 'center' }}
                flexDirection={{ base: 'column', md: 'row' }}
                spacing={3}
              >
                <Body size="md" color="neutral1.11" overflowWrap="anywhere" flex={1} fontFamily="mono" medium>
                  {userAccountKeys?.rskKeyPair?.address}
                </Body>
                {userAccountKeys?.rskKeyPair?.address ? (
                  <Button
                    as={ChakraLink}
                    href={getRootstockExplorerAddressUrl(userAccountKeys.rskKeyPair.address)}
                    isExternal
                    size="sm"
                    variant="soft"
                    colorScheme="blue"
                    flexShrink={0}
                  >
                    {t('View on Rootstock explorer')}
                  </Button>
                ) : null}
              </HStack>
            </Box>
          </VStack>

          <VStack spacing={3} align="flex-start" w="full">
            <Body size="md" medium color="neutral1.11">
              {t('Withdrawable funds')}
            </Body>
            <Box w="full" px={4} py={3} borderWidth="1px" borderColor="neutral1.6" borderRadius="xl" bg="neutral1.1">
              <VStack w="full" align="stretch" spacing={3}>
                <Skeleton isLoaded={!isWithdrawableLoading}>
                  <HStack justifyContent="space-between" alignItems={{ base: 'flex-start', md: 'center' }}>
                    <VStack align="flex-start" spacing={1}>
                      <Body size="lg" medium color="neutral1.12">
                        {t('{{amount}} sats', { amount: withdrawableSats.toLocaleString() })}
                      </Body>
                      <Body size="sm" color="neutral1.10">
                        {t('≈ {{amount}} USD', { amount: `$${withdrawableUsd.toFixed(2)}` })}
                      </Body>
                    </VStack>
                    <Button
                      size="sm"
                      colorScheme="primary1"
                      isDisabled={!canWithdraw || isWithdrawableLoading || isUserWalletWithdrawStateLoading}
                      isLoading={isUserWalletWithdrawStateLoading}
                      onClick={userWalletWithdrawModal.onOpen}
                    >
                      {withdrawButtonLabel}
                    </Button>
                  </HStack>
                </Skeleton>
                {isBelowMinimumWithdrawal ? (
                  <Body size="sm" color="neutral1.9">
                    {t('{{amount}} USD minimum required before withdrawals are enabled.', {
                      amount: MIN_BITCOIN_PAYOUT_USD,
                    })}
                  </Body>
                ) : null}
              </VStack>
            </Box>
          </VStack>

          {userAccountKeys?.encryptedMnemonic ? (
            <VStack spacing={4} align="flex-start" w="full">
              <H2 size="md">{t('Recovery seed words')}</H2>
              <Body size="md" color="neutral1.10" maxW="4xl">
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
        </VStack>
      ) : (
        <VStack spacing={4} align="flex-start" w="full">
          <Feedback variant={FeedBackVariant.INFO} noIcon>
            <HStack
              w="full"
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', md: 'center' }}
              flexDirection={{ base: 'column', md: 'row' }}
              spacing={3}
            >
              <Body size="sm">{t('Configure your wallet so you can receive affiliate payouts.')}</Body>
              <Button size="sm" colorScheme="blue" variant="soft" flexShrink={0} onClick={configureWalletModal.onOpen}>
                {t('Configure your user wallet')}
              </Button>
            </HStack>
          </Feedback>
        </VStack>
      )}

      <ConfigureUserWalletModal isOpen={configureWalletModal.isOpen} onClose={configureWalletModal.onClose} />

      <UserWalletWithdrawRsk
        isOpen={userWalletWithdrawModal.isOpen}
        onClose={userWalletWithdrawModal.onClose}
        rskAddress={rskAddress}
        onCompleted={handleUserWalletWithdrawCompleted}
      />

      <Modal isOpen={seedWordsModal.isOpen} onClose={handleCloseSeedWordsModal} title={t('View seed words')} size="md">
        {isSeedWordsView ? renderSeedWordsListView() : renderSeedWordsPasswordView()}
      </Modal>
    </VStack>
  )
}
