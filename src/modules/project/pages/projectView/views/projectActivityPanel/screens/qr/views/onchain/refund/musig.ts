import { Transaction } from 'bitcoinjs-lib'
import { Taptree } from 'bitcoinjs-lib/src/types'
import { Musig, RefundDetails, TaprootUtils } from 'boltz-core'
import { Buffer } from 'buffer'
import { ECPairInterface } from 'ecpair'

import { secp } from './helpers'
import { generateRandomBytes } from './utils'

export const createMusig = (ourKeys: ECPairInterface, theirPublicKey: Buffer) => {
  return new Musig(secp, ourKeys, generateRandomBytes(), [
    // The key of Boltz always comes first
    theirPublicKey,
    ourKeys.publicKey,
  ])
}

export const tweakMusig = (musig: Musig, tree: Taptree) => TaprootUtils.tweakMusig(musig, tree)

export const hashForWitnessV1 = (inputs: RefundDetails[], tx: Transaction, index: number, leafHash?: Buffer) => {
  return TaprootUtils.hashForWitnessV1(inputs as RefundDetails[], tx as Transaction, index, leafHash)
}
