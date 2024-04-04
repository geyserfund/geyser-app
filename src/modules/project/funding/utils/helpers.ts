import { FundingInput } from '../../../../types'
import { toInt } from '../../../../utils'
import { FundingStages, stageList } from '../state/fundingStagesAtom'

export const findNextFundingStage = (currentStage: FundingStages) => {
  const currentIndex = stageList.indexOf(currentStage)
  const nextState = stageList[currentIndex + 1]

  if (nextState) {
    return nextState
  }

  return currentStage
}

export const validateFundingInput = (input: FundingInput) => {
  let isValid = false
  let error = 'cannot initiate funding without amount'

  if (
    (input.donationAmount && toInt(input.donationAmount) > 0) ||
    (input.orderInput && input.orderInput.items && input.orderInput.items.length > 0)
  ) {
    isValid = true
    error = ''
  }

  return { isValid, error }
}
