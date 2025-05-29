import { Button, Flex, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useUserWalletForm } from '@/modules/profile/hooks/useUserWalletForm'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm'
import { WalletResourceType } from '@/types'

export const ProfileWalletSettings = () => {
  const {
    connectionOption,
    setConnectionOption,
    lightningAddress,
    nwc,
    limits,
    handleConfirm,
    isLightningAddressInValid,
  } = useUserWalletForm()

  return (
    <VStack p={8} spacing={8} overflowY="auto" align="flex-start" w="full">
      <H2>{t('Wallet Connection')}</H2>
      <Body>{t('Connect a Lightning wallet to your account to receive refunds, ambassador payouts, etc.')}</Body>

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
    </VStack>
  )
}
