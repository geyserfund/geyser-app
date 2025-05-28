import { Button, Flex, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback } from 'react'

import { useUserWalletForm } from '@/modules/profile/hooks/useUserWalletForm'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm'
import { CreateWalletInput, useCreateWalletMutation, WalletResourceType } from '@/types'
import { useNotification } from '@/utils'

export const ProfileWalletSettings = () => {
  const toast = useNotification()
  const [createWallet] = useCreateWalletMutation()

  const handleSubmit = useCallback(
    async (input: CreateWalletInput | null) => {
      if (!input) {
        toast.error({
          title: t('Wallet creation failed'),
          description: t('Please provide valid wallet connection details'),
        })
        return
      }

      try {
        const { data } = await createWallet({
          variables: { input },
        })

        if (data?.walletCreate) {
          toast.success({
            title: t('Wallet connected successfully'),
          })
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : t('Unknown error occurred')
        toast.error({
          title: t('Wallet creation failed'),
          description: errorMessage,
        })
      }
    },
    [createWallet, toast],
  )

  const {
    connectionOption,
    setConnectionOption,
    lightningAddress,
    nwc,
    limits,
    handleConfirm,
    isLightningAddressInValid,
  } = useUserWalletForm({
    onSubmit: handleSubmit,
  })

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
