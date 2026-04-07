import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

import {
  canUseRecurringFundingAtom,
  fundingFiatSwapAmountWarningAtom,
  fundingFormErrorAtom,
  fundingFormHasRewardsAtom,
  fundingFormStateAtom,
  fundingFormWarningAtom,
  fundingModeAtom,
  fundingOnchainAmountWarningAtom,
  fundingProjectAtom,
  guardianBadgesCostAtoms,
  isFundingInputAmountValidAtom,
  isFundingUserInfoValidAtom,
  isMembershipFundingModeAtom,
  isOneTimeFundingModeAtom,
  isRecurringDonationModeAtom,
  resetFundingFormAtom,
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
  const fundingMode = useAtomValue(fundingModeAtom)
  const isOneTimeFundingMode = useAtomValue(isOneTimeFundingModeAtom)
  const isRecurringDonationMode = useAtomValue(isRecurringDonationModeAtom)
  const isMembershipFundingMode = useAtomValue(isMembershipFundingModeAtom)
  const canUseRecurringFunding = useAtomValue(canUseRecurringFundingAtom)

  const onChainAmountWarning = useAtomValue(fundingOnchainAmountWarningAtom)

  const fiatSwapAmountWarning = useAtomValue(fundingFiatSwapAmountWarningAtom)

  const isFundingInputAmountValid = useAtomValue(isFundingInputAmountValidAtom)

  const isFundingUserInfoValid = useAtomValue(isFundingUserInfoValidAtom)

  const fundingFormError = useAtomValue(fundingFormErrorAtom)

  const fundingFormWarning = useAtomValue(fundingFormWarningAtom)

  const rewardsCosts = useAtomValue(rewardsCostAtoms)
  const subscriptionCosts = useAtomValue(subscriptionCostAtoms)
  const tip = useAtomValue(tipAtoms)
  const guardianBadgesCosts = useAtomValue(guardianBadgesCostAtoms)
  const totalSats = useAtomValue(totalAmountSatsAtom)
  const totalUsdCent = useAtomValue(totalAmountUsdCentAtom)

  const setErrorstate = useSetAtom(setErrorStateAtom)

  const setWarningstate = useSetAtom(setWarningStateAtom)

  const setTarget = useSetAtom(setFundFormTargetAtom)

  const setState = useSetAtom(setFundFormStateAtom)

  const resetRewards = useSetAtom(resetFundingFormRewardsAtom)

  const updateReward = useSetAtom(updateFundingFormRewardAtom)

  const updateSubscription = useSetAtom(updateFundingFormSubscriptionAtom)

  const resetForm = useSetAtom(resetFundingFormAtom)

  const setGeyserTipPercent = useCallback(
    (percent: number) => {
      setState('geyserTipPercent', percent)
    },
    [setState],
  )

  return {
    formState,
    fundingMode,
    project,
    hasSelectedRewards,
    isOneTimeFundingMode,
    isRecurringDonationMode,
    isMembershipFundingMode,
    canUseRecurringFunding,
    rewardsCosts,
    subscriptionCosts,
    tip,
    guardianBadgesCosts,
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
