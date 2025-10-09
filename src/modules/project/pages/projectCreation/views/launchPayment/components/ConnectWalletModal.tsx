import { Button, ButtonProps, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'

import { BoltIcon } from '@/components/icons/index.tsx'
import { NodeIcon } from '@/components/icons/svg/NodeIcon.tsx'
import { NWCIcon } from '@/components/icons/svg/NWCIcon.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UseModalReturn } from '@/shared/hooks/useModal.tsx'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ConnectionOption } from '../../../hooks/useWalletForm.tsx'
import { WalletConnectionForm, WalletConnectionFormProps } from './WalletConnectionForm.tsx'

export const WalletList = [
  {
    icon: <BoltIcon boxSize="30px" />,
    label: t('Lightning Address'),
    value: ConnectionOption.LIGHTNING_ADDRESS,
  },
  {
    icon: <NodeIcon boxSize="30px" />,
    label: t('Lightning Node'),
    value: ConnectionOption.PERSONAL_NODE,
  },
  {
    icon: <NWCIcon boxSize="20px" />,
    label: t('Nostr Wallet Connect'),
    value: ConnectionOption.NWC,
  },
]

export const ConnectWalletModal = ({
  continueButtonProps,
  walletFormProps,
  modalProps,
}: {
  continueButtonProps: ButtonProps
  walletFormProps: WalletConnectionFormProps
  modalProps: UseModalReturn
}) => {
  const { connectionOption, setConnectionOption } = walletFormProps

  const [walletSelected, setWalletSelected] = useState<boolean>(false)
  const handleSelectWallet = (connectionOption: ConnectionOption) => {
    setConnectionOption(connectionOption)
    setWalletSelected(true)
  }

  const handleClose = () => {
    setWalletSelected(false)
    modalProps.onClose()
  }

  const modalTitle = useMemo(() => {
    if (!walletSelected) {
      return t('Pick a wallet type')
    }

    if (connectionOption === ConnectionOption.LIGHTNING_ADDRESS) {
      return t('Connect your Lightning wallet')
    }

    if (connectionOption === ConnectionOption.PERSONAL_NODE) {
      return t('Connect your Lightning node')
    }

    if (connectionOption === ConnectionOption.NWC) {
      return t('Connect your Nostr wallet')
    }

    return t('Pick a wallet type')
  }, [walletSelected, connectionOption])

  return (
    <Modal
      {...modalProps}
      onClose={handleClose}
      size={'lg'}
      title={modalTitle}
      bodyProps={{ paddingTop: 4, paddingX: 0 }}
    >
      {walletSelected ? (
        <VStack
          w="full"
          h="full"
          alignItems={'start'}
          gap={8}
          paddingY={4}
          paddingX={standardPadding}
          maxHeight="calc(100vh - 150px)"
          overflowY="auto"
        >
          <WalletConnectionForm {...walletFormProps} />
          <HStack w="full">
            <Button size="lg" w={'full'} variant="solid" colorScheme="primary1" {...continueButtonProps}>
              {t('Continue')}
            </Button>
          </HStack>
        </VStack>
      ) : (
        <VStack w="full" h="full" alignItems={'start'} gap={4} paddingTop={4} paddingX={standardPadding}>
          {WalletList.map((wallet) => (
            <SelectWalletButton
              key={wallet.value}
              icon={wallet.icon}
              label={wallet.label}
              isSelected={connectionOption === wallet.value}
              onClick={() => handleSelectWallet(wallet.value)}
            />
          ))}
        </VStack>
      )}
    </Modal>
  )
}

type SelectWalletButtonProps = {
  icon: React.ReactNode
  label: string
  isSelected: boolean
} & ButtonProps

const SelectWalletButton = ({ icon, label, isSelected, ...props }: SelectWalletButtonProps) => {
  return (
    <Button
      size="lg"
      height="64px"
      w="full"
      borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
      variant="outline"
      _hover={{ borderColor: 'primary1.9' }}
      {...props}
    >
      <HStack w="full" justifyContent="start" gap={4}>
        {icon}
        <Body size="lg" medium>
          {label}
        </Body>
      </HStack>
    </Button>
  )
}
