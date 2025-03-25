import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { resetFundingFormAtom } from '../state/fundingFormAtom.ts'
import { selectedGoalIdAtom } from '../state/selectedGoalAtom.ts'
import { useResetContribution } from './useResetContribution.ts'

/** Resets the whole funding flow, including forms and contribution state */
export const useResetFundingFlow = () => {
  const resetContribution = useResetContribution()

  const setProjectGoalId = useSetAtom(selectedGoalIdAtom)
  const resetFundingForm = useSetAtom(resetFundingFormAtom)

  const resetFundingFlow = useCallback(() => {
    setProjectGoalId(null)
    resetFundingForm()
    resetContribution()
  }, [setProjectGoalId, resetFundingForm, resetContribution])

  return resetFundingFlow
}
