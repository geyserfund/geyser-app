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

export async function refund(
  swap: any,
  refundAddress: string,
  transactionToRefund: { hex: string; timeoutBlockHeight: number },
) {
  console.log('starting to refund swap', swap)

  const output = decodeAddress(refundAddress)
  console.log('refunding swap: ', swap.id)
  await setup()

  const resFees = await getFeeEstimations()
  const fees = resFees.BTC || 0
  swap.fees = fees

  const tx = Transaction.fromHex(transactionToRefund.hex)
  const privateKey = parsePrivateKey(swap.privateKey)

  console.log('checking tx after bslib stuff happened to it: ', tx)
  console.log('checking privateKey after ecpair stuff happened to it: ', tx)

  let refundTransaction: Transaction

  if (swap.version === OutputType.Taproot) {
    console.log('gone into the rufundTaproot')

    refundTransaction = await refundTaproot(swap, tx, privateKey, output, fees)
  } else {
    const redeemScript = Buffer.from(swap.redeemScript, 'hex')
    console.log('redeemScript', redeemScript)
    const swapOutput = detectSwap(redeemScript, tx)
    console.log('swapOutput', swapOutput)

    const constructRefundTransaction = getConstructRefundTransaction()
    refundTransaction = constructRefundTransaction(
      [
        {
          ...swapOutput,
          txHash: tx.getHash(),
          redeemScript,
          keys: privateKey,
          blindingPrivateKey: parseBlindingKey(swap),
        } as RefundDetails,
      ],
      output.script,
      transactionToRefund.timeoutBlockHeight,
      fees,
      true, // rbf
    )
  }

  console.log('refundTransaction', refundTransaction.toHex())

  const res = await broadcastTransaction(refundTransaction.toHex())
  console.log('refund result:', res)
  if (res.id) {
    swap.refundTx = res.id
    return swap
  }

  return res
}
