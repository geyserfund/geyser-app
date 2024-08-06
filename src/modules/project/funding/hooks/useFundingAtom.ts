import { useAtomValue } from 'jotai'

import { fundingFlowErrorAtom, fundingRequestErrorAtom } from '../state'
import { fundingInputWithSwapKeysAtom } from '../state/fundingFormAtom'

export const useFundingAtom = () => {
  const fundingInputWithSwapKeys = useAtomValue(fundingInputWithSwapKeysAtom)

  const fundingFlowError = useAtomValue(fundingFlowErrorAtom)
  const fundingRequestErrored = useAtomValue(fundingRequestErrorAtom)

  return { error: fundingFlowError, fundingInputWithSwapKeys, fundingRequestErrored }
}
