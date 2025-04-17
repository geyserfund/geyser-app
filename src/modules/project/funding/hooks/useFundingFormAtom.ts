import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

import {
  fundingFiatSwapAmountWarningAtom,
  fundingFormErrorAtom,
  fundingFormHasRewardsAtom,
  fundingFormStateAtom,
  fundingFormWarningAtom,
  fundingOnchainAmountWarningAtom,
  fundingProjectAtom,
  isFundingInputAmountValidAtom,
  isFundingUserInfoValidAtom,
  resetFundingFormRewardsAtom,
  rewardsCostAtoms,
  setErrorStateAtom,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  setWarningStateAtom,
  subscriptionCostAtoms,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
  updateFundingFormRewardAtom,
  updateFundingFormSubscriptionAtom,
} from '../state/fundingFormAtom'

export const useFundingFormAtom = () => {
  const formState = useAtomValue(fundingFormStateAtom)

  const project = useAtomValue(fundingProjectAtom)

  const hasSelectedRewards = useAtomValue(fundingFormHasRewardsAtom)

  const onChainAmountWarning = useAtomValue(fundingOnchainAmountWarningAtom)

  const fiatSwapAmountWarning = useAtomValue(fundingFiatSwapAmountWarningAtom)

  const isFundingInputAmountValid = useAtomValue(isFundingInputAmountValidAtom)

  const isFundingUserInfoValid = useAtomValue(isFundingUserInfoValidAtom)

  const fundingFormError = useAtomValue(fundingFormErrorAtom)

  const fundingFormWarning = useAtomValue(fundingFormWarningAtom)

  const rewardsCosts = useAtomValue(rewardsCostAtoms)
  const subscriptionCosts = useAtomValue(subscriptionCostAtoms)
  const tip = useAtomValue(tipAtoms)
  const totalSats = useAtomValue(totalAmountSatsAtom)
  const totalUsdCent = useAtomValue(totalAmountUsdCentAtom)

  const setErrorstate = useSetAtom(setErrorStateAtom)

  const setWarningstate = useSetAtom(setWarningStateAtom)

  const setTarget = useSetAtom(setFundFormTargetAtom)

  const setState = useSetAtom(setFundFormStateAtom)

  const resetRewards = useSetAtom(resetFundingFormRewardsAtom)

  const updateReward = useSetAtom(updateFundingFormRewardAtom)

  const updateSubscription = useSetAtom(updateFundingFormSubscriptionAtom)

  const resetForm = useSetAtom(resetFundingFormRewardsAtom)

  const setGeyserTipPercent = useCallback(
    (percent: number) => {
      setState('geyserTipPercent', percent)
    },
    [setState],
  )

  return {
    formState,
    project,
    hasSelectedRewards,
    rewardsCosts,
    subscriptionCosts,
    tip,
    totalSats,
    totalUsdCent,
    onChainAmountWarning,
    fiatSwapAmountWarning,
    isFundingInputAmountValid,
    isFundingUserInfoValid,
    fundingFormError,
    fundingFormWarning,
    setErrorstate,
    setWarningstate,
    setTarget,
    setState,
    updateReward,
    updateSubscription,
    resetForm,
    resetRewards,
    setGeyserTipPercent,
  }
}
