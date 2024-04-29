import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { BitcoinQuote, Maybe } from '../../../../types'
import { keyPairAtom } from './keyPairAtom'

export type SwapContributionInfo = {
  projectTitle?: Maybe<string>
  reference?: Maybe<string>
  amount?: number
  bitcoinQuote?: Maybe<BitcoinQuote>
  datetime?: number
}

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
  contributionInfo?: SwapContributionInfo
  fees?: number
}

type SwapDataStructure = { [key: string]: SwapData }

export const currentSwapIdAtom = atom<string>('')

export const swapAtom = atomWithStorage<SwapDataStructure>('swapArray', {})

const swapParseAtom = atom(null, (get, set, swap: { json: string }, contributionInfo?: SwapContributionInfo) => {
  const keys = get(keyPairAtom)
  const swapData = get(swapAtom)
  const refundFile = JSON.parse(swap.json)
  refundFile.privateKey = keys?.privateKey?.toString('hex')

  refundFile.contributionInfo = contributionInfo

  set(currentSwapIdAtom, refundFile.id) // Set the current id as current swap id
  set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
})

const currentSwapAtom = atom(
  (get) => {
    const currentSwapId = get(currentSwapIdAtom)
    const swapData = get(swapAtom)
    const currentSwap = swapData[currentSwapId]
    if (currentSwap) {
      return currentSwap
    }
  },
  (get, set, data: SwapData) => {
    const currentSwapId = get(currentSwapIdAtom)
    const swapData = get(swapAtom)
    swapData[currentSwapId] = data
    set(swapAtom, swapData)
  },
)

const addSwapAtom = atom(null, (get, set, data: SwapData) => {
  const swapData = get(swapAtom)
  swapData[data.id] = data
  set(swapAtom, swapData)
})

const removeRefundedSwapAtom = atom(null, (get, set, swapId: string) => {
  const swapData = get(swapAtom)
  const newSwapData = {} as SwapDataStructure
  Object.values(swapData).map((swapItem) => {
    if (swapItem.id !== swapId) {
      newSwapData[swapItem.id] = swapItem
    }
  })
  set(currentSwapIdAtom, '')
  set(swapAtom, newSwapData)
})

// Used for starting out the refund file
export const useParseResponseToSwapAtom = () => useSetAtom(swapParseAtom)

// For fetching and updating refund file
export const useRefundFileValue = () => useAtomValue(currentSwapAtom)
export const useRefundFileAdd = () => useSetAtom(addSwapAtom)
export const useRemoveRefundFile = () => useSetAtom(removeRefundedSwapAtom)

// Setting current swapId
export const useSetCurrentSwapId = () => useSetAtom(currentSwapIdAtom)

export const refundedSwapDataAtom = atom<SwapData | undefined>(undefined)
export const useRefundedSwapData = () => useAtom(refundedSwapDataAtom)
