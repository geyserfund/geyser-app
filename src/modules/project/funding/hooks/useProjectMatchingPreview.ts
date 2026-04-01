import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom'

import { useFundingFormAtom } from './useFundingFormAtom'
import { rewardsCostAtoms, subscriptionCostAtoms } from '../state/fundingFormAtom'
import { calculateProjectMatchingPreview } from '../../matching/utils/projectMatching'

export const useProjectMatchingPreview = () => {
  const { formState, project } = useFundingFormAtom()
  const rewardsCosts = useAtomValue(rewardsCostAtoms)
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
        rewardsCostSats: rewardsCosts.sats,
        rewardsCostUsdCents: rewardsCosts.usdCents,
        subscriptionCostSats: subscriptionCosts.sats,
        subscriptionCostUsdCents: subscriptionCosts.usdCents,
      }),
    [bitcoinQuote, formState.donationAmount, formState.donationAmountUsdCent, formState.fundingMode, project.activeMatching, rewardsCosts.sats, rewardsCosts.usdCents, subscriptionCosts.sats, subscriptionCosts.usdCents],
  )
}
