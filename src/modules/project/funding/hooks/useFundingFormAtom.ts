import { useAtomValue, useSetAtom } from 'jotai'

import {
  fundingFormHasRewardsAtom,
  fundingFormStateAtom,
  fundingOnchainAmountWarningAtom,
  fundingProjectAtom,
  isFundingInputAmountValidAtom,
  isFundingUserInfoValidAtom,
  resetFundingFormRewardsAtom,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  updateFundingFormRewardAtom,
} from '../state/fundingFormAtom'

export const useFundingFormAtom = () => {
  const formState = useAtomValue(fundingFormStateAtom)

  const project = useAtomValue(fundingProjectAtom)

  const hasSelectedRewards = useAtomValue(fundingFormHasRewardsAtom)

  const onChainAmountWarning = useAtomValue(fundingOnchainAmountWarningAtom)

  const isFundingInputAmountValid = useAtomValue(isFundingInputAmountValidAtom)

  const isFundingUserInfoValid = useAtomValue(isFundingUserInfoValidAtom)

  const setTarget = useSetAtom(setFundFormTargetAtom)

  const setState = useSetAtom(setFundFormStateAtom)

  const resetRewards = useSetAtom(resetFundingFormRewardsAtom)

  const updateReward = useSetAtom(updateFundingFormRewardAtom)

  const resetForm = useSetAtom(resetFundingFormRewardsAtom)

  return {
    formState,
    project,
    hasSelectedRewards,
    onChainAmountWarning,
    isFundingInputAmountValid,
    isFundingUserInfoValid,
    setTarget,
    setState,
    updateReward,
    resetForm,
    resetRewards,
  }
}
