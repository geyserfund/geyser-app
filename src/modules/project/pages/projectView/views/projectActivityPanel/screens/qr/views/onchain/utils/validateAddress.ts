import { Network, validate } from 'bitcoin-address-validation'

import { __production__, __staging__ } from '../../../../../../../../../../../constants'

export const validateBitcoinAddress = (address: string) => {
  if (__production__) {
    return validate(address, Network.mainnet)
  }

  if (__staging__) {
    return validate(address, Network.testnet)
  }

  return validate(address, Network.regtest)
}
