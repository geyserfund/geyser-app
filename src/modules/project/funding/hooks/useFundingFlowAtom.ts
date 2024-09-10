import { useAtomValue } from 'jotai'

import { fundingFlowErrorAtom, fundingRequestErrorAtom, weblnErrorAtom } from '../state'
import { fundingInputAfterRequestAtom } from '../state/fundingFormAtom'

export const useFundingFlowAtom = () => {
  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const error = useAtomValue(fundingFlowErrorAtom)
  const fundingRequestErrored = useAtomValue(fundingRequestErrorAtom)
  const weblnErrored = useAtomValue(weblnErrorAtom)

  return {
    fundingInputAfterRequest,
    error,
    weblnErrored,
    fundingRequestErrored,
  }
}
