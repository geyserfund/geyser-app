import { TxOutput } from 'bitcoinjs-lib'
import { Taptree } from 'bitcoinjs-lib/src/types'

export type Tapleaf = {
  output: Buffer
  version: number
}

export type SwapTree = {
  tree: Taptree
  claimLeaf: Tapleaf
  refundLeaf: Tapleaf
}

export type LiquidSwapTree = SwapTree & { covenantClaimLeaf?: Tapleaf }

export enum OutputType {
  Bech32 = 0,
  Compatibility = 1,
  Legacy = 2,
  Taproot = 3,
}

export type Error = {
  message: string
  code: string
}

export type ScriptElement = Buffer | number | string

export type TransactionOutput = {
  txHash: Buffer
  vout: number
  type: OutputType
} & TxOutput
