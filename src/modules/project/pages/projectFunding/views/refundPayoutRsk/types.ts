import { SwapData as FundingSwapData } from '@/modules/project/funding/state/swapAtom.ts'

/** PayoutMethod enum for selecting Lightning, On-Chain, or Rootstock native payout */
export enum PayoutMethod {
  Lightning = 'LIGHTNING',
  OnChain = 'ON_CHAIN',
  Rootstock = 'ROOTSTOCK',
}

export type PayoutFlowSwapData = FundingSwapData & {
  swapId?: string
  paymentId?: string | number
}
