import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback } from 'react'

import { useUserWalletForm } from '@/modules/profile/hooks/useUserWalletForm'
import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm'
import { CreateWalletInput, useCreateWalletMutation, WalletResourceType } from '@/types'
import { useNotification } from '@/utils'

export const ProfileWalletSettings = () => {
  const { toast } = useNotification()
  const [createWallet] = useCreateWalletMutation()

  const handleSubmit = useCallback(
    async (input: CreateWalletInput | null) => {
      if (!input) {
        toast({
          title: t('Wallet creation failed'),
          description: t('Please provide valid wallet connection details'),
          status: 'error',
        })
        return
      }

      try {
        const { data } = await createWallet({
          variables: { input },
        })

        if (data?.walletCreate) {
          toast({
            title: t('Wallet connected successfully'),
            status: 'success',
          })
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : t('Unknown error occurred')
        toast({
          title: t('Wallet creation failed'),
          description: errorMessage,
          status: 'error',
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
    <Box p={8} w="full">
      <VStack spacing={8} align="flex-start" w="full">
        <Heading size="md">{t('Wallet Connection')}</Heading>
        <Text>{t('Connect a Lightning wallet to your account to receive refunds, ambassador payouts, etc.')}</Text>

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
    </Box>
  )
}
