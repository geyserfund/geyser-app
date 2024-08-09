import { atom, useAtom, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import {
  OnChainStatus,
  onChainStatusAtom,
} from '../../pages1/projectFunding/views/fundingPayment/views/paymentOnchain/states'
import { findNextFundingStage, generatePrivatePublicKeyPair } from '../utils/helpers'
import { keyPairAtom } from './keyPairAtom'
import { pollingFundingTxAtom, subscriptionActiveAtom } from './pollingFundingTx'
import { currentSwapIdAtom, refundedSwapDataAtom } from './swapAtom'

export enum FundingStages {
  loading = 'loading',
  initial = 'initial',
  form = 'form',
  started = 'started',
  completed = 'completed',
  canceled = 'canceled',
}

export const stageList: FundingStages[] = Object.keys(FundingStages).map(
  (key) => FundingStages[key as keyof typeof FundingStages],
)

export const fundingStageAtomInitialValue = FundingStages.initial
export const fundingStageAtom = atom<FundingStages>(fundingStageAtomInitialValue)

export const setNextFundingStageAtom = atom(null, (get, set) => {
  const currentState = get(fundingStageAtom)
  const nextState = findNextFundingStage(currentState)
  set(fundingStageAtom, nextState)
})

/** This effect is used to reset the subscriptionActiveAtom, pollingFundingTxAtom, paymentMethodAtom, and onChainStatusAtom */
export const fundingStageAtomEffect = atomEffect((get, set) => {
  const currentState = get(fundingStageAtom)

  if (currentState !== FundingStages.started) {
    // reset subscription & polling
    set(subscriptionActiveAtom, false)
    set(pollingFundingTxAtom, 0)

    // reset subscription method
    set(onChainStatusAtom, OnChainStatus.prompt)

    // reset key pair
    const keyPair = generatePrivatePublicKeyPair()
    set(keyPairAtom, keyPair)

    // reset current swap id
    set(currentSwapIdAtom, '')
    set(refundedSwapDataAtom, undefined)
  }
})

export const resetFundingStageAtom = atom(null, (get, set) => {
  set(fundingStageAtom, fundingStageAtomInitialValue)
})

export const useFundingStage = () => {
  const [fundingStage, setFundingStage] = useAtom(fundingStageAtom)
  const setNextFundingStage = useSetAtom(setNextFundingStageAtom)
  const resetFundingStage = useSetAtom(resetFundingStageAtom)

  return {
    fundingStage,
    setFundingStage,
    setNextFundingStage,
    resetFundingStage,
  }
}
