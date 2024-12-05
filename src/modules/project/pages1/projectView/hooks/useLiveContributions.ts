import { useApolloClient } from '@apollo/client'
import { useSetAtom } from 'jotai'

import { updateProjectBalanceCache } from '@/modules/project/API/cache/projectBodyCache'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { addContributionAtom, addContributorAtom } from '@/modules/project/state/contributionsAtom'
import { addFundingTxToInProgressGoalsAtom } from '@/modules/project/state/goalsAtom'
import { useFundingTxStatusUpdatedSubscription } from '@/types'
import { convertSatsToCents, toInt } from '@/utils'

export const useLiveContributions = () => {
  const { project, partialUpdateProject } = useProjectAtom()

  const client = useApolloClient()

  const addContribution = useSetAtom(addContributionAtom)
  const addContributor = useSetAtom(addContributorAtom)
  const addFundingTxToInProgressGoals = useSetAtom(addFundingTxToInProgressGoalsAtom)

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

      if (!fundingTx) return
      const updateValues = {
        balance: project.balance ? project.balance + toInt(fundingTx?.amount) : fundingTx?.amount,
        balanceUsdCent:
          fundingTx?.amount && project.balanceUsdCent
            ? project.balanceUsdCent +
              convertSatsToCents({ sats: fundingTx?.amount, bitcoinQuote: fundingTx?.bitcoinQuote })
            : 0,
        fundingTxsCount: project.fundingTxsCount ? project.fundingTxsCount + 1 : 1,
        fundersCount:
          project.fundersCount && !(fundingTx?.funder.timesFunded && fundingTx?.funder.timesFunded > 1)
            ? project.fundersCount + 1
            : project.fundersCount,
      }

      // Updates project balance cache so that it is the latest value
      updateProjectBalanceCache(client, { projectName: project.name, ...updateValues })

      partialUpdateProject(updateValues)

      addContribution(fundingTx)
      addContributor(fundingTx)
      addFundingTxToInProgressGoals(fundingTx)
    },
  })
}
