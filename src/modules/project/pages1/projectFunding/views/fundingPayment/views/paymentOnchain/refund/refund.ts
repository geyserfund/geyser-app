import { Transaction } from 'bitcoinjs-lib'
import { detectSwap, OutputType, RefundDetails, SwapTreeSerializer, TaprootUtils } from 'boltz-core'
import { Buffer } from 'buffer'
import { ECPairInterface } from 'ecpair'

import { broadcastTransaction, getFeeEstimations, getPartialRefundSignature } from './api'
import {
  decodeAddress,
  DecodedAddress,
  getConstructRefundTransaction,
  parseBlindingKey,
  parsePrivateKey,
  setup,
} from './helpers'
import { createMusig, hashForWitnessV1 } from './musig'

export const refundJsonKeys = ['id', 'asset', 'privateKey']
export const refundJsonKeysLiquid = refundJsonKeys.concat('blindingKey')

const refundTaproot = async (
  swap: any,
  lockupTx: Transaction,
  privateKey: ECPairInterface,
  decodedAddress: DecodedAddress,
  fees: number,
) => {
  const boltzPublicKey = Buffer.from(swap.claimPublicKey, 'hex')
  const musig = createMusig(privateKey, boltzPublicKey)
  const tree = SwapTreeSerializer.deserializeSwapTree(swap.swapTree)
  const tweakedKey = TaprootUtils.tweakMusig(musig, tree.tree)
  const swapOutput = detectSwap(tweakedKey, lockupTx)

  console.log('checking swap output', lockupTx)

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

  const boltzSig = await getPartialRefundSignature(swap.id, Buffer.from(musig.getPublicNonce()), claimTx, 0)

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
