import { atom, useAtom, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import { findNextFundingStage } from '../../utils/helpers'
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

export const fundingStageAtomEffect = atomEffect((get, set) => {
  const currentState = get(fundingStageAtom)
  if (currentState !== FundingStages.started) {
    set(subscriptionActiveAtom, false)
    set(pollingFundingTxAtom, 0)
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
