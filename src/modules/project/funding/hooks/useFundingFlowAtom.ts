import { useAtomValue } from 'jotai'

import { fundingFlowErrorAtom, fundingRequestErrorAtom, weblnErrorAtom } from '../state'
import { fundingInputWithSwapKeysAtom } from '../state/fundingFormAtom'

export const useFundingFlowAtom = () => {
  const fundingInputWithSwapKeys = useAtomValue(fundingInputWithSwapKeysAtom)
  const error = useAtomValue(fundingFlowErrorAtom)
  const fundingRequestErrored = useAtomValue(fundingRequestErrorAtom)
  const weblnErrored = useAtomValue(weblnErrorAtom)

  return {
    fundingInputWithSwapKeys,
    error,
    weblnErrored,
    fundingRequestErrored,
  }
}
