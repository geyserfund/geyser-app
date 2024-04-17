import { atom, useAtom, useAtomValue } from 'jotai'

import { FundingMutationResponse } from '../../../../types'
import { keyPairAtom } from './keyPairAtom'

export type SwapData = FundingMutationResponse['swap']

const swapAtom = atom<SwapData | null>(null)
export const useSwapAtom = () => useAtom(swapAtom)

const refundFileAtom = atom((get) => {
  const swap = get(swapAtom)
  const keys = get(keyPairAtom)

  const refundFile = JSON.parse(swap?.json || '')

  refundFile.privateKey = keys?.privateKey?.toString('hex')

  return refundFile
})

export const useRefundFileValue = () => useAtomValue(refundFileAtom)
