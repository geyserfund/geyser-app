import { HStack } from '@chakra-ui/react'

import { NodeConnectionDetails } from '@/modules/project/components/NodeConnectionDetails.tsx'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { WalletConnectDetails } from '@/shared/constants/platform/wallet.ts'
import {
  LndConnectionDetailsPrivate,
  ProjectPageWalletFragment,
  ProjectWalletConnectionDetailsFragment,
} from '@/types/index.ts'

import { ConnectionOption } from '../../../hooks/useWalletForm.tsx'
import { WalletList } from './ConnectWalletModal.tsx'

type ConnectionDetailsProps = CardLayoutProps & {
  wallet?: Pick<ProjectPageWalletFragment, 'name'>
  walletConnectionDetails?: ProjectWalletConnectionDetailsFragment
}

export const ConnectionDetails = ({ wallet, walletConnectionDetails, ...props }: ConnectionDetailsProps) => {
  if (!walletConnectionDetails || !walletConnectionDetails.id) {
    return null
  }

  console.log(walletConnectionDetails)
  console.log(wallet)

  if (walletConnectionDetails.connectionDetails.__typename === WalletConnectDetails.LightningAddressConnectionDetails) {
    return (
      <ConnectionDetailsCard connectionOption={ConnectionOption.LIGHTNING_ADDRESS} {...props}>
        <Body size="sm" medium>
          {walletConnectionDetails.connectionDetails.lightningAddress}
        </Body>
      </ConnectionDetailsCard>
    )
  }

  if (walletConnectionDetails.connectionDetails.__typename === WalletConnectDetails.LndConnectionDetailsPrivate) {
    const nodeInput = walletConnectionDetails.connectionDetails as LndConnectionDetailsPrivate
    return (
      <ConnectionDetailsCard connectionOption={ConnectionOption.PERSONAL_NODE} {...props}>
        <NodeConnectionDetails
          projectWallet={{
            connectionDetails: {
              grpcPort: nodeInput.grpcPort ? nodeInput.grpcPort : 10009,
              hostname: nodeInput.hostname,
              lndNodeType: nodeInput.lndNodeType,
              macaroon: nodeInput.macaroon,
              pubkey: nodeInput.pubkey,
              tlsCertificate: nodeInput.tlsCertificate,
            },
            name: wallet?.name || '',
          }}
        />
      </ConnectionDetailsCard>
    )
  }

  if (walletConnectionDetails.connectionDetails.__typename === WalletConnectDetails.NWCConnectionDetailsPrivate) {
    return (
      <ConnectionDetailsCard connectionOption={ConnectionOption.NWC} {...props}>
        <Body size="sm" medium>
          {walletConnectionDetails.connectionDetails.nwcUrl}
        </Body>
      </ConnectionDetailsCard>
    )
  }

  return null
}

const ConnectionDetailsCard = ({
  connectionOption,
  children,
  ...props
}: {
  connectionOption: ConnectionOption
} & CardLayoutProps) => {
  const walletDetails = WalletList.find((wallet) => wallet.value === connectionOption)
  return (
    <CardLayout backgroundColor="neutral1.3" noborder w="full" {...props}>
      <HStack>
        {walletDetails?.icon}
        <Body bold>{walletDetails?.label}</Body>
      </HStack>
      {children}
    </CardLayout>
  )
}
