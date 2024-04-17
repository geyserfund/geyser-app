import { atom, useAtom, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import {
  paymentMethodAtom,
  PaymentMethods,
} from '../../pages/projectView/views/projectActivityPanel/screens/qr/states/paymentMethodAtom'
import {
  OnChainStatus,
  onChainStatusAtom,
} from '../../pages/projectView/views/projectActivityPanel/screens/qr/views/onchain/states/onChainStatus'
import { findNextFundingStage, generatePrivatePublicKeyPair } from '../utils/helpers'
import { keyPairAtom } from './keyPairAtom'
import { pollingFundingTxAtom, subscriptionActiveAtom } from './pollingFundingTx'

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

// This effect is used to reset the subscriptionActiveAtom, pollingFundingTxAtom, paymentMethodAtom, and onChainStatusAtom
export const fundingStageAtomEffect = atomEffect((get, set) => {
  const currentState = get(fundingStageAtom)
  if (currentState !== FundingStages.started) {
    // reset subscription & polling
    set(subscriptionActiveAtom, false)
    set(pollingFundingTxAtom, 0)

    // reset subscription method
    set(paymentMethodAtom, PaymentMethods.lightning)
    set(onChainStatusAtom, OnChainStatus.prompt)

    // reset key pair
    const keyPair = generatePrivatePublicKeyPair()
    set(keyPairAtom, keyPair)
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
