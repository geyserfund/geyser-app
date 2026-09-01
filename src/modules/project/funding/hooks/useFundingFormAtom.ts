import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  canUseRecurringFundingAtom,
  fundingFiatSwapAmountWarningAtom,
  fundingFormErrorAtom,
  fundingFormStateAtom,
  fundingFormWarningAtom,
  fundingModeAtom,
  fundingOnchainAmountWarningAtom,
  fundingProjectAtom,
  FundingUserInfoError,
  FundingUserInfoValidationState,
  fundingUserInfoValidationStateAtom,
  guardianBadgesCostAtoms,
  isFundingInputAmountValidAtom,
  isMembershipFundingModeAtom,
  isOneTimeFundingModeAtom,
  isRecurringDonationModeAtom,
  resetFundingFormAtom,
  setErrorStateAtom,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  setWarningStateAtom,
  subscriptionCostAtoms,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
  updateFundingFormSubscriptionAtom,
} from '../state/fundingFormAtom'

export const useFundingFormAtom = () => {
  const { t } = useTranslation()

  const formState = useAtomValue(fundingFormStateAtom)

  const project = useAtomValue(fundingProjectAtom)

  const fundingMode = useAtomValue(fundingModeAtom)
  const isOneTimeFundingMode = useAtomValue(isOneTimeFundingModeAtom)
  const isRecurringDonationMode = useAtomValue(isRecurringDonationModeAtom)
  const isMembershipFundingMode = useAtomValue(isMembershipFundingModeAtom)
  const canUseRecurringFunding = useAtomValue(canUseRecurringFundingAtom)

  const onChainAmountWarning = useAtomValue(fundingOnchainAmountWarningAtom)

  const fiatSwapAmountWarning = useAtomValue(fundingFiatSwapAmountWarningAtom)

  const isFundingInputAmountValid = useAtomValue(isFundingInputAmountValidAtom)

  const fundingUserInfoValidationState = useAtomValue(fundingUserInfoValidationStateAtom)

  const isFundingUserInfoValid = useMemo(() => {
    switch (fundingUserInfoValidationState) {
      case FundingUserInfoValidationState.RECURRING_EMAIL_REQUIRED:
        return {
          title: t('Email is required for recurring payments.'),
          description: t('Please enter an email.'),
          error: FundingUserInfoError.EMAIL,
          valid: false,
        }
      case FundingUserInfoValidationState.SUBSCRIPTION_EMAIL_REQUIRED:
        return {
          title: t('Email is required when subscribing to updates.'),
          description: t('Please enter an email.'),
          error: FundingUserInfoError.EMAIL,
          valid: false,
        }
      case FundingUserInfoValidationState.INVALID_EMAIL:
        return {
          title: t('A valid email is required.'),
          description: t('Please enter a valid email.'),
          error: FundingUserInfoError.EMAIL,
          valid: false,
        }
      case FundingUserInfoValidationState.VALID:
      default:
        return { title: '', description: '', error: '', valid: true }
    }
  }, [fundingUserInfoValidationState, t])

  const fundingFormError = useAtomValue(fundingFormErrorAtom)

  const fundingFormWarning = useAtomValue(fundingFormWarningAtom)

  const subscriptionCosts = useAtomValue(subscriptionCostAtoms)
  const tip = useAtomValue(tipAtoms)
  const guardianBadgesCosts = useAtomValue(guardianBadgesCostAtoms)
  const totalSats = useAtomValue(totalAmountSatsAtom)
  const totalUsdCent = useAtomValue(totalAmountUsdCentAtom)

  const setErrorstate = useSetAtom(setErrorStateAtom)

  const setWarningstate = useSetAtom(setWarningStateAtom)

  const setTarget = useSetAtom(setFundFormTargetAtom)

  const setState = useSetAtom(setFundFormStateAtom)

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
    isOneTimeFundingMode,
    isRecurringDonationMode,
    isMembershipFundingMode,
    canUseRecurringFunding,
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
    updateSubscription,
    resetForm,
    setGeyserTipPercent,
  }
}
