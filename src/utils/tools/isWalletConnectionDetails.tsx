import { WalletConnectDetails } from '../../constants'
import { Wallet } from '../../types'

export const isWalletLightning = (projectWallet: Wallet) => {
  if (
    projectWallet.connectionDetails.__typename ===
    WalletConnectDetails.LightningAddressConnectionDetails
  ) {
    return true
  }

  return false
}

export const isWalletNode = (projectWallet: Wallet) => {
  if (
    projectWallet.connectionDetails.__typename ===
    WalletConnectDetails.LndConnectionDetailsPrivate
  ) {
    return true
  }

  return false
}
