import { FundingStages, stageList } from './state/fundingStagesAtom'

export const findNextFundingStage = (currentState: FundingStages) => {
  const currentIndex = stageList.indexOf(currentState)
  const nextState = stageList[currentIndex + 1]

  if (nextState) {
    return nextState
  }

  return currentState
}
