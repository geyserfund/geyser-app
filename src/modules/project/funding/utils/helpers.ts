import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1'

import { FundingInput } from '../../../../types'
import { toInt } from '../../../../utils'

export const validateFundingInput = (input: FundingInput) => {
  let isValid = false
  let error = 'cannot initiate funding without amount'

  if (
    (input.donationAmount && toInt(input.donationAmount) > 0) ||
    (input.orderInput && input.orderInput.items && input.orderInput.items.length > 0)
  ) {
    isValid = true
    error = ''
  }

  return { isValid, error }
}

export const generatePrivatePublicKeyPair = () => ECPairFactory(ecc).makeRandom()
