import { Transaction } from 'bitcoinjs-lib'
import { Taptree } from 'bitcoinjs-lib/src/types'
import { Musig, RefundDetails, TaprootUtils } from 'boltz-core'
import { Buffer } from 'buffer'
import { ECPairInterface } from 'ecpair'

import { secp } from './helpers'
import { generateRandomBytes } from './utils'

export const createMusig = (privateKey: ECPairInterface, boltzPublicKey: Buffer) => {
  try {
    const musig = new Musig(secp, privateKey, generateRandomBytes(), [
      // The key of Boltz always comes first
      boltzPublicKey,
      privateKey.publicKey,
    ])
    return musig
  } catch (error) {
    console.error('Error creating Musig', error)
    return null
  }
}

export const tweakMusig = (musig: Musig, tree: Taptree) => TaprootUtils.tweakMusig(musig, tree)

export const hashForWitnessV1 = (inputs: RefundDetails[], tx: Transaction, index: number, leafHash?: Buffer) => {
  return TaprootUtils.hashForWitnessV1(inputs as RefundDetails[], tx as Transaction, index, leafHash)
}
