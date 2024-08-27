import { useAtomValue, useSetAtom } from 'jotai'

import {
  fundingFormErrorAtom,
  fundingFormHasRewardsAtom,
  fundingFormStateAtom,
  fundingOnchainAmountWarningAtom,
  fundingProjectAtom,
  isFundingInputAmountValidAtom,
  isFundingUserInfoValidAtom,
  resetFundingFormRewardsAtom,
  setErrorStateAtom,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  setResourceAtom,
  updateFundingFormRewardAtom,
} from '../state/fundingFormAtom'

export const useFundingFormAtom = () => {
  const formState = useAtomValue(fundingFormStateAtom)

  const project = useAtomValue(fundingProjectAtom)

  const hasSelectedRewards = useAtomValue(fundingFormHasRewardsAtom)

  const onChainAmountWarning = useAtomValue(fundingOnchainAmountWarningAtom)

  const isFundingInputAmountValid = useAtomValue(isFundingInputAmountValidAtom)

  const isFundingUserInfoValid = useAtomValue(isFundingUserInfoValidAtom)

  const fundingFormError = useAtomValue(fundingFormErrorAtom)

  const setErrorstate = useSetAtom(setErrorStateAtom)

  const setTarget = useSetAtom(setFundFormTargetAtom)

  const setState = useSetAtom(setFundFormStateAtom)

  const setResource = useSetAtom(setResourceAtom)

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
    fundingFormError,
    setErrorstate,
    setTarget,
    setState,
    setResource,
    updateReward,
    resetForm,
    resetRewards,
  }
}
