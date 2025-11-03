import { Button, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiPencil, PiPlus } from 'react-icons/pi'

import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI.ts'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { CreateWalletInput } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { useWalletForm } from '../../../hooks/useWalletForm.tsx'
import { ConnectionDetails } from './ConnectionDetails.tsx'
import { ConnectWalletModal } from './ConnectWalletModal.tsx'

export const ConnectWallet = () => {
  const connectWalletModal = useModal()

  const toast = useNotification()

  const { loading } = useProjectAtom()
  const { wallet, walletConnectionDetails } = useWalletAtom()
  const { createWallet, updateWallet } = useProjectWalletAPI()

  const handleNext = (createWalletInput: CreateWalletInput | null) => {
    if (wallet?.id) {
      if (isFormDirty()) {
        updateWallet.execute({
          variables: {
            input: {
              feePercentage: createWalletInput?.feePercentage,
              lightningAddressConnectionDetailsInput: createWalletInput?.lightningAddressConnectionDetailsInput,
              lndConnectionDetailsInput: createWalletInput?.lndConnectionDetailsInput,
              nwcConnectionDetailsInput: createWalletInput?.nwcConnectionDetailsInput,
              name: createWalletInput?.name,
              id: wallet.id,
            },
          },
          onCompleted() {
            toast.success({
              title: t('Wallet updated successfully'),
            })
            connectWalletModal.onClose()
          },
          onError() {
            toast.error({
              title: t('Error updating wallet'),
            })
          },
        })
      }

      return
    }

    if (createWalletInput) {
      createWallet.execute({
        variables: { input: createWalletInput },
        onCompleted() {
          toast.success({
            title: t('Wallet created successfully'),
          })
          connectWalletModal.onClose()
        },
        onError() {
          toast.error({
            title: 'Error creating wallet',
          })
        },
      })
    }
  }

  const {
    handleConfirm,
    isFormDirty,
    connectionOption,
    lightningAddress,
    node,
    nwc,
    setConnectionOption,
    fee,
    limits,
    createWalletInput,
    isLightningAddressInValid,
  } = useWalletForm({
    onSubmit: handleNext,
  })

  const isContinueButtonLoading = lightningAddress.evaluating || loading || createWallet.loading || updateWallet.loading

  const isWalletIncomplete = !createWalletInput

  const isContinueButtonDisabled = isWalletIncomplete || isLightningAddressInValid || !isFormDirty()

  return (
    <>
      <FieldContainer
        title={t('Connect your wallet')}
        subtitle={t('Configure the wallet where funds from your project will be sent to.')}
        gap={2}
      >
        <ConnectionDetails marginTop={4} wallet={wallet} walletConnectionDetails={walletConnectionDetails} />
        <Button
          size="lg"
          height="64px"
          leftIcon={wallet?.id ? <Icon as={PiPencil} /> : <Icon as={PiPlus} />}
          variant="outline"
          width="full"
          marginTop={4}
          onClick={connectWalletModal.onOpen}
        >
          {wallet?.id ? t('Update wallet') : t('Connect a wallet')}
        </Button>
      </FieldContainer>
      {connectWalletModal.isOpen && (
        <ConnectWalletModal
          walletFormProps={{
            connectionOption,
            setConnectionOption,
            lightningAddress,
            node,
            fee,
            limits,
            nwc,
          }}
          continueButtonProps={{
            isLoading: isContinueButtonLoading,
            isDisabled: isContinueButtonDisabled,
            onClick: handleConfirm,
          }}
          modalProps={connectWalletModal}
        />
      )}
    </>
  )
}
