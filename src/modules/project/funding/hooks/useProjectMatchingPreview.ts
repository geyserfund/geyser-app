import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom'

import { calculateProjectMatchingPreview } from '../../matching/utils/projectMatching'
import { subscriptionCostAtoms } from '../state/fundingFormAtom'
import { useFundingFormAtom } from './useFundingFormAtom'

export const useProjectMatchingPreview = () => {
  const { formState, project } = useFundingFormAtom()
  const subscriptionCosts = useAtomValue(subscriptionCostAtoms)
  const bitcoinQuote = useAtomValue(bitcoinQuoteAtom)

  return useMemo(
    () =>
      calculateProjectMatchingPreview({
        activeMatching: project.activeMatching,
        bitcoinQuote,
        fundingMode: formState.fundingMode,
        donationAmountSats: formState.donationAmount,
        donationAmountUsdCent: formState.donationAmountUsdCent,
        rewardsCostSats: 0,
        rewardsCostUsdCents: 0,
        subscriptionCostSats: subscriptionCosts.sats,
        subscriptionCostUsdCents: subscriptionCosts.usdCents,
      }),
    [
      bitcoinQuote,
      formState.donationAmount,
      formState.donationAmountUsdCent,
      formState.fundingMode,
      project.activeMatching,
      subscriptionCosts.sats,
      subscriptionCosts.usdCents,
    ],
  )
}
