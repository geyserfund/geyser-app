import { ECPairInterface } from 'ecpair'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'

import {
  BitcoinQuote,
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  Maybe,
} from '../../../../types'
import { rskAccountKeysAtom } from './swapRskAtom.ts'
export type SwapContributionInfo = {
  projectId?: number
  projectTitle?: Maybe<string>
  reference?: Maybe<string>
  bitcoinQuote?: Maybe<BitcoinQuote>
  datetime?: number
  contributionId?: number
}

/** Base type containing common fields across all swap types */
type BaseSwapData = {
  id: string
  bip21?: string
  amount?: number
  fees?: number
  contributionInfo?: SwapContributionInfo
  privateKey?: string
  publicKey?: string
  address?: string
  refundTx?: string
  preimageHash?: string
  preimageHex?: string
  type?: RefundFileType
}

export type SwapData =
  | (BaseSwapData & {
      // Type for Submarine swaps (version === 3)
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
    })
  | (BaseSwapData & {
      // Type for BTC -> RSK chain swaps (version !== 3)
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
    })
  | (BaseSwapData & {
      // Type for RSK -> BTC swaps (version !== 3)
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
    })

type SwapDataStructure = { [key: string]: SwapData }

export const keyPairAtom = atom<ECPairInterface | null>(null)

/** Hold the swap Id for the Funding Tx in progress */
export const currentSwapIdAtom = atom<string>('')

export const currentLightningToRskSwapIdAtom = atom<string>('')
export const currentOnChainToRskSwapIdAtom = atom<string>('')

/** Holds all of the swap refund files */
export const swapAtom = atomWithStorage<SwapDataStructure>('swapArray', {})

export const enum RefundFileType {
  ON_CHAIN_TO_LIGHTNING = 'ON_CHAIN_TO_LIGHTNING',
  ON_CHAIN_TO_RSK = 'ON_CHAIN_TO_RSK',
  LIGHTNING_TO_RSK = 'LIGHTNING_TO_RSK',
}

/** Parses swap json received with Contribution and stores it in swapAtom, also sets currentSwapId */
export const parseSwapAtom = atom(
  null,
  (
    get,
    set,
    swap: ContributionOnChainSwapPaymentDetailsFragment,
    contributionInfo?: SwapContributionInfo,
    accountKeys?: { publicKey: string; address: string; privateKey: string },
  ) => {
    const userAccountKeyPair = get(userAccountKeyPairAtom)
    const keys = get(keyPairAtom)

    const swapData = get(swapAtom)
    const refundFile = JSON.parse(swap.swapJson)
    refundFile.privateKey =
      accountKeys?.privateKey || userAccountKeyPair?.privateKey || keys?.privateKey?.toString('hex')
    refundFile.publicKey = accountKeys?.publicKey || userAccountKeyPair?.publicKey || keys?.publicKey?.toString('hex')
    refundFile.address = accountKeys?.address

    refundFile.contributionInfo = contributionInfo
    refundFile.type = RefundFileType.ON_CHAIN_TO_LIGHTNING

    set(currentSwapIdAtom, refundFile.id) // Set the current id as current swap id
    set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
  },
)

export const parseOnChainToRskSwapAtom = atom(
  null,
  (
    get,
    set,
    swap: ContributionOnChainToRskSwapPaymentDetailsFragment,
    contributionInfo?: SwapContributionInfo,
    accountKeys?: { publicKey: string; address: string; privateKey: string },
  ) => {
    const userAccountKeyPair = get(userAccountKeyPairAtom)
    const userAccountKeys = get(userAccountKeysAtom)
    const rskKeyPair = get(rskAccountKeysAtom)

    const swapData = get(swapAtom)
    const refundFile = JSON.parse(swap.swapJson)

    refundFile.privateKey = accountKeys?.privateKey || userAccountKeyPair?.privateKey || rskKeyPair?.privateKey
    refundFile.address = accountKeys?.address || userAccountKeys?.rskKeyPair.address || rskKeyPair?.address
    refundFile.publicKey = accountKeys?.publicKey || userAccountKeyPair?.publicKey || rskKeyPair?.publicKey

    refundFile.contributionInfo = contributionInfo
    refundFile.type = RefundFileType.ON_CHAIN_TO_RSK

    set(currentSwapIdAtom, refundFile.id)
    set(currentOnChainToRskSwapIdAtom, refundFile.id)
    set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
  },
)

export const parseLightningToRskSwapAtom = atom(
  null,
  (
    get,
    set,
    swap: ContributionLightningToRskSwapPaymentDetailsFragment,
    contributionInfo?: SwapContributionInfo,
    accountKeys?: { publicKey: string; address: string; privateKey: string },
  ) => {
    const userAccountKeyPair = get(userAccountKeyPairAtom)
    const userAccountKeys = get(userAccountKeysAtom)
    const rskKeyPair = get(rskAccountKeysAtom)

    const swapData = get(swapAtom)
    const refundFile = JSON.parse(swap.swapJson)

    refundFile.privateKey = accountKeys?.privateKey || userAccountKeyPair?.privateKey || rskKeyPair?.privateKey
    refundFile.address = accountKeys?.address || userAccountKeys?.rskKeyPair.address || rskKeyPair?.address
    refundFile.publicKey = accountKeys?.publicKey || userAccountKeyPair?.publicKey || rskKeyPair?.publicKey

    refundFile.contributionInfo = contributionInfo
    refundFile.type = RefundFileType.LIGHTNING_TO_RSK

    set(currentSwapIdAtom, refundFile.id)
    set(currentLightningToRskSwapIdAtom, refundFile.id)
    set(swapAtom, { [refundFile.id]: refundFile, ...swapData })
  },
)

/** Gets and sets an entry in swap atom based on currentSwapId */
export const currentSwapAtom = atom(
  (get) => {
    const currentSwapId = get(currentSwapIdAtom)
    const swapData = get(swapAtom)
    const currentSwap = swapData[currentSwapId]
    if (currentSwap) {
      return currentSwap
    }
  },
  (get, set, data: SwapData, swapId?: string) => {
    const currentSwapId = get(currentSwapIdAtom)
    const swapData = get(swapAtom)
    swapData[swapId || currentSwapId] = data
    set(swapAtom, swapData)
  },
)

/** Add swap data refund file to swapAtom */
export const addSwapAtom = atom(null, (get, set, data: SwapData) => {
  const swapData = get(swapAtom)
  swapData[data.id] = data
  set(swapAtom, swapData)
})

/** Remove swap data from swapAtom */
export const removeRefundedSwapAtom = atom(null, (get, set, swapId: string) => {
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
