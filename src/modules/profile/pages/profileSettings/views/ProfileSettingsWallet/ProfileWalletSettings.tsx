import { Button, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  ConfigureUserWalletModal,
  hasConfiguredUserWallet,
} from '@/modules/profile/pages/profileSettings/components/ConfigureUserWalletModal.tsx'
import { MIN_BITCOIN_PAYOUT_SATS_FORMATTED } from '@/modules/project/constants/payout.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

import { RootstockAddressCard } from './RootstockAddressCard.tsx'
import { ResetAccountPasswordSection } from './ResetAccountPasswordSection.tsx'
import { SeedWordsSection } from './SeedWordsSection.tsx'
import { UserWalletWithdrawRsk } from './UserWalletWithdrawRsk.tsx'
import { useUserWalletWithdrawState } from './useUserWalletWithdrawState.ts'
import { WithdrawableFundsCard } from './WithdrawableFundsCard.tsx'

const ConfigureWalletPrompt = ({ onConfigure }: { onConfigure: () => void }) => (
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
        <Button size="sm" colorScheme="blue" variant="soft" flexShrink={0} onClick={onConfigure}>
          {t('Configure your user wallet')}
        </Button>
      </HStack>
    </Feedback>
  </VStack>
)

export const ProfileWalletSettings = () => {
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const configureWalletModal = useDisclosure()
  const userWalletWithdrawModal = useDisclosure()

  useUserAccountKeys()

  const hasWalletConfigured = hasConfiguredUserWallet(userAccountKeys)
  const rskAddress = userAccountKeys?.rskKeyPair?.address || ''

  const withdrawState = useUserWalletWithdrawState({ rskAddress, hasWalletConfigured })

  return (
    <VStack p={8} spacing={8} overflowY="auto" align="flex-start" w="full">
      <H2>{t('User wallet')}</H2>
      <Body>{t('Configure your internal Geyser wallet to receive affiliate payouts and handle refunds.')}</Body>

      {hasWalletConfigured ? (
        <VStack spacing={6} align="flex-start" w="full">
          <RootstockAddressCard address={userAccountKeys?.rskKeyPair?.address} />
          <VStack spacing={1} align="flex-start" w="full">
            <Body size="sm" medium>
              {t('User wallet derivation path')}
            </Body>
            <Body size="sm" color="neutral1.10" wordBreak="break-all">
              {userAccountKeys?.rskKeyPair?.derivationPath || t('Unavailable')}
            </Body>
          </VStack>
          <WithdrawableFundsCard
            withdrawableSats={withdrawState.withdrawableSats}
            withdrawableUsd={withdrawState.withdrawableUsd}
            isWithdrawableLoading={withdrawState.isWithdrawableLoading}
            isWithdrawStateLoading={withdrawState.isWithdrawStateLoading}
            isBelowMinimumWithdrawal={withdrawState.isBelowMinimumWithdrawal}
            hasActiveWithdraw={withdrawState.hasActiveWithdraw}
            canWithdraw={withdrawState.canWithdraw}
            withdrawButtonLabel={withdrawState.withdrawButtonLabel}
            minimumSats={MIN_BITCOIN_PAYOUT_SATS_FORMATTED}
            onOpenWithdrawModal={userWalletWithdrawModal.onOpen}
          />
          <SeedWordsSection />
          <ResetAccountPasswordSection />
        </VStack>
      ) : (
        <ConfigureWalletPrompt onConfigure={configureWalletModal.onOpen} />
      )}

      <ConfigureUserWalletModal isOpen={configureWalletModal.isOpen} onClose={configureWalletModal.onClose} />

      <UserWalletWithdrawRsk
        isOpen={userWalletWithdrawModal.isOpen}
        onClose={userWalletWithdrawModal.onClose}
        rskAddress={rskAddress}
        onCompleted={withdrawState.refetchAll}
      />
    </VStack>
  )
}
