import { useAtomValue, useSetAtom } from 'jotai'

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
  setErrorStateAtom,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  setWarningStateAtom,
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

  const setErrorstate = useSetAtom(setErrorStateAtom)

  const setWarningstate = useSetAtom(setWarningStateAtom)

  const setTarget = useSetAtom(setFundFormTargetAtom)

  const setState = useSetAtom(setFundFormStateAtom)

  const resetRewards = useSetAtom(resetFundingFormRewardsAtom)

  const updateReward = useSetAtom(updateFundingFormRewardAtom)

  const updateSubscription = useSetAtom(updateFundingFormSubscriptionAtom)

  const resetForm = useSetAtom(resetFundingFormRewardsAtom)

  return {
    formState,
    project,
    hasSelectedRewards,
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
  }
}
