import { convertSatsToCents } from '@/utils'

import { useFundingTxStatusUpdatedSubscription } from '../../../../types'
import { useProjectAtom } from '../../hooks/useProjectAtom'

export const useProjectFundingActivitySubscription = () => {
  const { project, partialUpdateProject } = useProjectAtom()

  const skipSubscription = !project.id

  useFundingTxStatusUpdatedSubscription({
    variables: {
      input: {
        projectId: project.id || undefined,
      },
    },
    skip: skipSubscription,
    onData(options) {
      const fundingTx = options.data.data?.fundingTxStatusUpdated.fundingTx
      if (fundingTx) {
        const usdCents = convertSatsToCents({ sats: fundingTx.amount, bitcoinQuote: fundingTx.bitcoinQuote })
        partialUpdateProject({
          balance: project.balance + fundingTx.amount,
          balanceUsdCent: project.balanceUsdCent + usdCents,
        })
      }
    },
  })
}
