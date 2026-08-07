import { Network, validate } from 'bitcoin-address-validation'

import { __production__ } from '@/shared/constants'

export const validateBitcoinAddress = (address: string) => {
  if (__production__) {
    return validate(address, Network.mainnet)
  }

  return validate(address, Network.regtest)
}

/** Direct creator payment details must always be a Bitcoin mainnet address, including local development. */
export const validateBitcoinMainnetAddress = (address: string) => validate(address, Network.mainnet)
