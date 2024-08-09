import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import { fundingStageAtom, FundingStages, refundedSwapDataAtom } from '@/modules/project/funding/state'
import { pollingFundingTxAtom, subscriptionActiveAtom } from '@/modules/project/funding/state/pollingFundingTx'

import { paymentMethodAtom, PaymentMethods } from '../../../state/paymentMethodAtom'

export enum OnChainStatus {
  prompt = 'PROMPT',
  awaiting = 'AWAITING',
  processing = 'PROCESSING',
  success = 'SUCCESS',
  refund = 'REFUND',
}

export const onChainStatusAtom = atom(OnChainStatus.prompt)

export const useOnChainStatusValue = () => useAtomValue(onChainStatusAtom)

const goToOnChainRefundAtom = atom(null, (get, set) => {
  set(onChainStatusAtom, OnChainStatus.refund)
})
export const useGoToOnChainRefund = () => useSetAtom(goToOnChainRefundAtom)

const goToNextonChainStatusAtom = atom(null, (get, set) => {
  const current = get(onChainStatusAtom)

  if (current === OnChainStatus.prompt) {
    set(onChainStatusAtom, OnChainStatus.awaiting)
  } else if (current === OnChainStatus.awaiting) {
    set(onChainStatusAtom, OnChainStatus.processing)
  }
})

export const useGoToNextOnChainStatus = () => useSetAtom(goToNextonChainStatusAtom)

const onChainStatusEffectAtom = atomEffect((get, set) => {
  const currentFundingStage = get(fundingStageAtom)

  const paymentMethod = get(paymentMethodAtom)
  const currentOnChainState = get(onChainStatusAtom)

  if (currentFundingStage !== FundingStages.started) {
    set(onChainStatusAtom, OnChainStatus.prompt)
    set(refundedSwapDataAtom, undefined)
  }

  // Stop polling and subscription when user gets to the refund screen, if onChain is selected.
  if (paymentMethod === PaymentMethods.onChain && currentOnChainState === OnChainStatus.refund) {
    // reset subscription & polling
    set(subscriptionActiveAtom, false)
    set(pollingFundingTxAtom, 0)
  }
})
export const useOnChainStatusEffect = () => useAtom(onChainStatusEffectAtom)

/** This atom is used to track if the refund file has been downloaded */
export const onChainRefundDownloadedAtom = atom(false)
