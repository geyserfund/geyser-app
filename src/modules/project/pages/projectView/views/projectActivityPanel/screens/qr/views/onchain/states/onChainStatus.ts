import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import { fundingStageAtom, FundingStages } from '../../../../../../../../../funding/state'

export enum OnChainStatus {
  prompt = 'PROMPT',
  awaiting = 'AWAITING',
  processing = 'PROCESSING',
}

export const onchainStatusAtom = atom(OnChainStatus.prompt)

export const useOnchainStausValue = () => useAtomValue(onchainStatusAtom)

const goToNextOnChainStatusAtom = atom(null, (get, set) => {
  const current = get(onchainStatusAtom)

  if (current === OnChainStatus.prompt) {
    set(onchainStatusAtom, OnChainStatus.awaiting)
  } else if (current === OnChainStatus.awaiting) {
    set(onchainStatusAtom, OnChainStatus.processing)
  }
})

export const useGoToNextOnChainStatus = () => useSetAtom(goToNextOnChainStatusAtom)

export const onChainStatusEffectAtom = atomEffect((get, set) => {
  const currentFundingStage = get(fundingStageAtom)
  if (currentFundingStage !== FundingStages.started) {
    set(onchainStatusAtom, OnChainStatus.prompt)
  }
})
