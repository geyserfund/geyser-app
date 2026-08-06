export const getRootstockExplorerTxUrl = (txId: string) => {
  return `https://rootstock.blockscout.com/tx/${txId}`
}

export const getRootstockExplorerAddressUrl = (address: string) => {
  return `https://rootstock.blockscout.com/address/${address}`
}

export const ROOTSTOCK_COMPATIBLE_WALLETS_URL = 'https://dev.rootstock.io/dev-tools/wallets/'
