import { useAtomValue } from 'jotai'

import { fundingFlowErrorAtom, fundingRequestErrorAtom, weblnErrorAtom } from '../state'

export const useFundingFlowAtom = () => {
  const error = useAtomValue(fundingFlowErrorAtom)
  const fundingRequestErrored = useAtomValue(fundingRequestErrorAtom)
  const weblnErrored = useAtomValue(weblnErrorAtom)

  return {
    error,
    weblnErrored,
    fundingRequestErrored,
  }
}
