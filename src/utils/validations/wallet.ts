import { LightningAddressConnectionDetails, User, Wallet } from '../../types'

export const getUserLightningAddress = (user?: User) => {
  const connectionDetails = (
    user?.wallet?.connectionDetails.__typename ===
    'LightningAddressConnectionDetails'
      ? user.wallet?.connectionDetails
      : {}
  ) as LightningAddressConnectionDetails
  return connectionDetails.lightningAddress || ''
}

export const getPossibleWalletPubkey = (
  wallet: Pick<Wallet, 'connectionDetails'> | undefined,
): string | undefined => {
  if (wallet && wallet.connectionDetails) {
    if (
      wallet.connectionDetails.__typename === 'LndConnectionDetailsPublic' ||
      wallet.connectionDetails.__typename === 'LndConnectionDetailsPrivate'
    ) {
      return wallet.connectionDetails.pubkey
    }
  }
}
