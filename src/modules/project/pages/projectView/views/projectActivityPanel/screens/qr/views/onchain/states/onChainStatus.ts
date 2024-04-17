import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import { fundingStageAtom, FundingStages } from '../../../../../../../../../funding/state'

export enum OnChainStatus {
  prompt = 'PROMPT',
  awaiting = 'AWAITING',
  processing = 'PROCESSING',
  success = 'SUCCESS',
  refund = 'REFUND',
}

export const onChainStatusAtom = atom(OnChainStatus.prompt)

export const useOnChainStatusValue = () => useAtomValue(onChainStatusAtom)
export const useOnChainStatusSet = () => useSetAtom(onChainStatusAtom)

const goToNextonChainStatusAtom = atom(null, (get, set) => {
  const current = get(onChainStatusAtom)

  if (current === OnChainStatus.prompt) {
    set(onChainStatusAtom, OnChainStatus.awaiting)
  } else if (current === OnChainStatus.awaiting) {
    set(onChainStatusAtom, OnChainStatus.processing)
  }
})

export const useGoToNextOnChainStatus = () => useSetAtom(goToNextonChainStatusAtom)

export const onChainStatusEffectAtom = atomEffect((get, set) => {
  const currentFundingStage = get(fundingStageAtom)
  if (currentFundingStage !== FundingStages.started) {
    set(onChainStatusAtom, OnChainStatus.prompt)
  }
})
