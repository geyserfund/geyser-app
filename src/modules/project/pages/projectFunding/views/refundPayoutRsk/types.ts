import { SwapData as FundingSwapData } from '@/modules/project/funding/state/swapAtom.ts'

/** PayoutMethod enum for selecting Lightning vs On-Chain payout */
export enum PayoutMethod {
  Lightning = 'LIGHTNING',
  OnChain = 'ON_CHAIN',
}

export type PayoutFlowSwapData = FundingSwapData & {
  swapId?: string
  paymentId?: string | number
}
