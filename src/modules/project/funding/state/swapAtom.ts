import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { keyPairAtom } from './keyPairAtom'

export type SwapData = {
  id: string
  asset: string
  version: number
  claimPublicKey: string
  timeoutBlockHeight: number
  privateKey: string
  refundTx?: string
  swapTree: {
    claimLeaf: {
      version: number
      output: string
    }
    refundLeaf: {
      version: number
      output: string
    }
  }
}

type SwapDataStructure = { [key: string]: SwapData }

const currentSwapAtomId = atomWithStorage<string>('currentSwap', '')

const swapAtom = atomWithStorage<SwapDataStructure>('swapArray', {})

const swapParseAtom = atom(null, (get, set, swap: { json: string }) => {
  const keys = get(keyPairAtom)
  const swapData = get(swapAtom)
  const refundFile = JSON.parse(swap.json)
  refundFile.privateKey = keys?.privateKey?.toString('hex')
  set(currentSwapAtomId, refundFile.id) // Set the current id as current swap id
  set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
})

const currentSwapAtom = atom(
  (get) => {
    const currentSwapId = get(currentSwapAtomId)
    const swapData = get(swapAtom)
    const currentSwap = swapData[currentSwapId]
    if (currentSwap) {
      return currentSwap
    }
  },
  (get, set, data: SwapData) => {
    const currentSwapId = get(currentSwapAtomId)
    const swapData = get(swapAtom)
    swapData[currentSwapId] = data
    set(swapAtom, swapData)
  },
)

// Used for starting out the refund file
export const useParseResponseToSwapAtom = () => useSetAtom(swapParseAtom)

// For fetching and updating refund file
export const useRefundFileValue = () => useAtomValue(currentSwapAtom)
export const useRefundFileSet = () => useSetAtom(currentSwapAtom)

// Setting current swapId
export const useSetCurrentSwapId = () => useSetAtom(currentSwapAtomId)
