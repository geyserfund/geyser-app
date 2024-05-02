import zkp, { Secp256k1ZKP } from '@vulpemventures/secp256k1-zkp'
import { address, networks } from 'bitcoinjs-lib'
import { constructRefundTransaction, RefundDetails, targetFee } from 'boltz-core'
// import { init } from 'boltz-core/dist/lib/liquid'
import { ECPairInterface } from 'ecpair'

import { __production__, __staging__ } from '../../../../../../../../../../../constants'
import { ECPair } from './ecpair'

export let secp: Secp256k1ZKP

export const setup = async () => {
  secp = await zkp()
  // init(secp)
}

export const getConstructRefundTransaction = () => {
  return (
    refundDetails: RefundDetails[],
    outputScript: Buffer,
    timeoutBlockHeight: number,
    feePerVbyte: number,
    isRbf: boolean,
  ) =>
    targetFee(feePerVbyte, (fee) =>
      constructRefundTransaction(refundDetails as any[], outputScript, timeoutBlockHeight, fee, isRbf),
    )
}

export const getNetwork = () => {
  const networkValue = __production__ ? 'bitcoin' : 'regtest'

  return networks[networkValue]
}

export type DecodedAddress = { script: Buffer; blindingKey?: Buffer }

export const decodeAddress = (addr: string): DecodedAddress => {
  const currentNetwork = getNetwork()

  const script = address.toOutputScript(addr, currentNetwork)

  return {
    script,
  }
}

export const parsePrivateKey = (privateKey: string): ECPairInterface => {
  try {
    const currentNetwork = getNetwork()
    return ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network: currentNetwork })
  } catch (e) {
    // When the private key is not HEX, we try to decode it as WIF
    return ECPair.fromWIF(privateKey)
  }
}

export const parseBlindingKey = (swap: { blindingKey: string | undefined }) => {
  return swap.blindingKey ? Buffer.from(swap.blindingKey, 'hex') : undefined
}
