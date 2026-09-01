import * as ecc from '@bitcoinerlab/secp256k1'
import { ECPairFactory } from 'ecpair'

import { ContributionCreateInput } from '@/types/generated/graphql.ts'

import { toInt } from '../../../../utils/unitConversion/typeConversion'

export const validateFundingInput = (input: ContributionCreateInput) => {
  let isValid = false
  let error = 'cannot initiate funding without amount'

  if (input.donationAmount && toInt(input.donationAmount) > 0) {
    isValid = true
    error = ''
  }

  return { isValid, error }
}

export const generatePrivatePublicKeyPair = () => ECPairFactory(ecc).makeRandom()
