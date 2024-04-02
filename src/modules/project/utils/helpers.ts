import { FundingInput } from '../../../types'
import { toInt } from '../../../utils'
import { FundingStages, stageList } from '../funding/state/fundingStagesAtom'

export const findNextFundingStage = (currentState: FundingStages) => {
  const currentIndex = stageList.indexOf(currentState)
  const nextState = stageList[currentIndex + 1]

  if (nextState) {
    return nextState
  }

  return currentState
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
