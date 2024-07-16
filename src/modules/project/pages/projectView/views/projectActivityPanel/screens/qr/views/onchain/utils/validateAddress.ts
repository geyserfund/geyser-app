import { Network, validate } from 'bitcoin-address-validation'

import { __production__, __staging__ } from '../../../../../../../../../../../shared/constants'

export const validateBitcoinAddress = (address: string) => {
  if (__production__) {
    return validate(address, Network.mainnet)
  }

  return validate(address, Network.regtest)
}
