import { Transaction } from 'bitcoinjs-lib'
import { detectSwap, Musig, OutputType, RefundDetails, SwapTreeSerializer, TaprootUtils } from 'boltz-core'
import { Buffer } from 'buffer'
import { ECPairInterface } from 'ecpair'

import {
  broadcastTransaction,
  getClaimDetails,
  getClaimForSignatureChain,
  getFeeEstimations,
  getPartialRefundSignature,
  getPartialRefundSignatureChain,
  PartialSignature,
} from './api'
import {
  decodeAddress,
  DecodedAddress,
  getConstructRefundTransaction,
  parseBlindingKey,
  parsePrivateKey,
  setup,
} from './helpers'
import { createMusig, hashForWitnessV1 } from './musig'
import { getBoltzPublicKey, getSwapTree } from './utils.ts'

export const refundJsonKeys = ['id', 'asset', 'privateKey']
export const refundJsonKeysLiquid = refundJsonKeys.concat('blindingKey')

const refundTaproot = async (
  swap: any,
  lockupTx: Transaction,
  privateKey: ECPairInterface,
  decodedAddress: DecodedAddress,
  fees: number,
) => {
  const boltzPublicKey = Buffer.from(getBoltzPublicKey(swap), 'hex')
  const musig = createMusig(privateKey, boltzPublicKey)
  if (!musig) {
    throw new Error('Failed to create Musig')
  }

  const tree = SwapTreeSerializer.deserializeSwapTree(getSwapTree(swap))

  if (!tree) {
    throw new Error('Failed to deserialize swap tree')
  }

  const tweakedKey = TaprootUtils.tweakMusig(musig, tree.tree)

  if (!tweakedKey) {
    throw new Error('Failed to tweak Musig')
  }

  const swapOutput = detectSwap(tweakedKey, lockupTx)

  if (!swapOutput) {
    throw new Error('Failed to detect swap')
  }

  const details = [
    {
      ...swapOutput,
      keys: privateKey,
      cooperative: true,
      type: OutputType.Taproot,
      txHash: lockupTx.getHash(),
      blindingPrivateKey: parseBlindingKey(swap),
    } as RefundDetails,
  ]

  const constructRefundTransaction = getConstructRefundTransaction()
  const claimTx = constructRefundTransaction(details, decodedAddress.script, 0, fees, true)

  let boltzSig: PartialSignature

  if (swap.version === 3) {
    boltzSig = await getPartialRefundSignature(swap.id, Buffer.from(musig.getPublicNonce()), claimTx, 0)
  } else if (swap.lockupDetails.serverPublicKey) {
    boltzSig = await getPartialRefundSignatureChain(swap.id, Buffer.from(musig.getPublicNonce()), claimTx, 0)
  } else {
    boltzSig = await getClaimForSignatureChain(
      swap.id,
      Buffer.from(musig.getPublicNonce()),
      claimTx,
      0,
      swap.preimageHex,
    )
  }

  musig.aggregateNonces([[boltzPublicKey, boltzSig.pubNonce]])
  musig.initializeSession(hashForWitnessV1(details, claimTx, 0))
  musig.signPartial()
  musig.addPartial(boltzPublicKey, boltzSig.signature)

  if (claimTx.ins[0]) {
    claimTx.ins[0].witness = [musig.aggregatePartials()]
  }

  return claimTx
}

export async function refund(swap: any, refundAddress: string, transactionToRefund: { hex: string }) {
  const output = decodeAddress(refundAddress)

  await setup()

  const resFees = await getFeeEstimations()
  const fees = resFees.BTC || 0
  swap.fees = fees

  const tx = Transaction.fromHex(transactionToRefund.hex)
  const privateKey = parsePrivateKey(swap.privateKey)

  const refundTransaction = await refundTaproot(swap, tx, privateKey, output, fees)

  const res = await broadcastTransaction(refundTransaction.toHex())
  if (res.id) {
    swap.refundTx = res.id
    return swap
  }

  return res
}
