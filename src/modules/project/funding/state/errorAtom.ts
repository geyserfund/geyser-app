import { atom } from 'jotai'

export type FundingFlowGraphQLError = {
  code?: string
  maxAmount?: number
  minAmount?: number
  message?: string
}

export const fundingFlowErrorAtom = atom<FundingFlowGraphQLError | undefined>(undefined)

export const weblnErrorAtom = atom(false)

export const fundingRequestErrorAtom = atom(false)

export const swapError = atom<Error | null>(null)

export const resetFundingErrorAtom = atom(null, (get, set) => {
  set(fundingFlowErrorAtom, undefined)
  set(weblnErrorAtom, false)
  set(fundingRequestErrorAtom, false)
  set(swapError, null)
})
