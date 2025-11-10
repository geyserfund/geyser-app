import { ECPairInterface } from 'ecpair'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { userAccountKeyPairAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'

import {
  BitcoinQuote,
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  Maybe,
} from '../../../../types'
import { rskAccountKeysAtom } from './swapRskAtom.ts'
export type SwapContributionInfo = {
  projectTitle?: Maybe<string>
  reference?: Maybe<string>
  bitcoinQuote?: Maybe<BitcoinQuote>
  datetime?: number
}

export type SwapData =
  | {
      // Type for Submarine swaps (version === 3)
      id: string
      asset: string
      version: number
      claimPublicKey: string
      timeoutBlockHeight: number
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
      bip21?: string
      amount?: number
      fees?: number
      contributionInfo?: SwapContributionInfo
      privateKey?: string
      refundTx?: string
      preimageHash?: string
      preimageHex?: string
    }
  | {
      // Type for BTC -> RSK chain swaps (version !== 3)
      id: string
      referralId?: string
      version?: number
      claimDetails: {
        refundAddress: string
        amount: number
        lockupAddress: string
        timeoutBlockHeight: number
      }
      lockupDetails: {
        serverPublicKey: string
        amount: number
        lockupAddress: string
        timeoutBlockHeight: number
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
        bip21?: string
      }
      bip21?: string

      amount?: number
      fees?: number
      contributionInfo?: SwapContributionInfo
      privateKey?: string
      refundTx?: string
      preimageHash?: string
      preimageHex?: string
    }
  | {
      // Type for RSK -> BTC swaps (version !== 3)
      id: string
      referralId?: string
      version?: number
      lockupDetails: {
        claimAddress: string
        amount: number
        lockupAddress: string
        timeoutBlockHeight: number
      }
      claimDetails: {
        serverPublicKey: string
        amount: number
        lockupAddress: string
        timeoutBlockHeight: number
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
      bip21?: string
      amount?: number
      fees?: number
      contributionInfo?: SwapContributionInfo
      privateKey?: string
      refundTx?: string
      preimageHash?: string
      preimageHex?: string
    }

type SwapDataStructure = { [key: string]: SwapData }

export const keyPairAtom = atom<ECPairInterface | null>(null)

/** Hold the swap Id for the Funding Tx in progress */
export const currentSwapIdAtom = atom<string>('')

/** Holds all of the swap refund files */
export const swapAtom = atomWithStorage<SwapDataStructure>('swapArray', {})

/** Parses swap json received with Contribution and stores it in swapAtom, also sets currentSwapId */
export const parseSwapAtom = atom(
  null,
  (get, set, swap: ContributionOnChainSwapPaymentDetailsFragment, contributionInfo?: SwapContributionInfo) => {
    const userAccountKeyPair = get(userAccountKeyPairAtom)
    const keys = get(keyPairAtom)

    console.log('keys', keys)
    console.log('userAccountKeyPair', userAccountKeyPair)

    const swapData = get(swapAtom)
    const refundFile = JSON.parse(swap.swapJson)
    refundFile.privateKey = userAccountKeyPair?.privateKey || keys?.privateKey?.toString('hex')

    refundFile.contributionInfo = contributionInfo

    set(currentSwapIdAtom, refundFile.id) // Set the current id as current swap id
    set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
  },
)

export const parseOnChainToRskSwapAtom = atom(
  null,
  (get, set, swap: ContributionOnChainToRskSwapPaymentDetailsFragment, contributionInfo?: SwapContributionInfo) => {
    const userAccountKeyPair = get(userAccountKeyPairAtom)
    const rskKeyPair = get(rskAccountKeysAtom)

    const swapData = get(swapAtom)
    const refundFile = JSON.parse(swap.swapJson)

    refundFile.privateKey = userAccountKeyPair?.privateKey || rskKeyPair?.privateKey

    refundFile.contributionInfo = contributionInfo

    set(currentSwapIdAtom, refundFile.id) // Set the current id as current swap id
    set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
  },
)
export const parseLightningToRskSwapAtom = atom(
  null,
  (get, set, swap: ContributionLightningToRskSwapPaymentDetailsFragment, contributionInfo?: SwapContributionInfo) => {
    const userAccountKeyPair = get(userAccountKeyPairAtom)
    const rskKeyPair = get(rskAccountKeysAtom)

    const swapData = get(swapAtom)
    const refundFile = JSON.parse(swap.swapJson)

    refundFile.privateKey = userAccountKeyPair?.privateKey || rskKeyPair?.privateKey

    refundFile.contributionInfo = contributionInfo

    set(currentSwapIdAtom, refundFile.id) // Set the current id as current swap id
    set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
  },
)

/** Gets and sets an entry in swap atom based on currentSwapId */
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

/** Add swap data refund file to swapAtom */
const addSwapAtom = atom(null, (get, set, data: SwapData) => {
  const swapData = get(swapAtom)
  swapData[data.id] = data
  set(swapAtom, swapData)
})

/** Remove swap data from swapAtom */
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

// For fetching and updating refund file
export const useRefundFileValue = () => useAtomValue(currentSwapAtom)
export const useRefundFileAdd = () => useSetAtom(addSwapAtom)
export const useRemoveRefundFile = () => useSetAtom(removeRefundedSwapAtom)

export const refundedSwapDataAtom = atom<SwapData | undefined>(undefined)
export const useRefundedSwapData = () => useAtom(refundedSwapDataAtom)

/** Reset the currentSwapID and refundedSwapData */
export const resetCurrentSwapAndRefundedDataAtom = atom(null, (get, set) => {
  set(currentSwapIdAtom, '')
  set(refundedSwapDataAtom, undefined)
})

export const resetKeyPairAtom = atom(null, (get, set) => {
  set(keyPairAtom, null)
})
