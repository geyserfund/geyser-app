import { useApolloClient } from '@apollo/client'

// import { useState } from 'react'
import { updateProjectBalanceCache } from '@/modules/project/API/cache/projectBodyCache'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useFundingTxStatusUpdatedSubscription } from '@/types'
import { convertSatsToCents } from '@/utils'

export const useLiveContributions = () => {
  const { project, partialUpdateProject } = useProjectAtom()

  const client = useApolloClient()

  //   const [fundingActivity, setFundingActivity] = useState<FundingTxFragment>()

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
      //   setFundingActivity(fundingTx)

      const updateValues = {
        balance: fundingTx?.amount,
        balanceUsdCent: fundingTx?.amount
          ? convertSatsToCents({ sats: fundingTx?.amount, bitcoinQuote: fundingTx?.bitcoinQuote })
          : 0,
        fundingTxsCount: project.fundingTxsCount ? project.fundingTxsCount + 1 : 1,
        fundersCount:
          project.fundersCount && !(fundingTx?.funder.timesFunded && fundingTx?.funder.timesFunded > 1)
            ? project.fundersCount + 1
            : project.fundersCount,
      }

      updateProjectBalanceCache(client, { projectName: project.name, ...updateValues })

      partialUpdateProject(updateValues)
    },
  })
}
