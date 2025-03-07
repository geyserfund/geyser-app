import { useApolloClient } from '@apollo/client'
import { useSetAtom } from 'jotai'

import { updateProjectBalanceCache } from '@/modules/project/API/cache/projectBodyCache'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { addContributionAtom, addContributorAtom } from '@/modules/project/state/contributionsAtom'
import { addContributionToInProgressGoalsAtom } from '@/modules/project/state/goalsAtom'
import { useProjectContributionSubscription } from '@/types/index.ts'
import { convertSatsToCents, toInt } from '@/utils'

export const useLiveContributions = () => {
  const { project, partialUpdateProject } = useProjectAtom()

  const client = useApolloClient()

  const addContribution = useSetAtom(addContributionAtom)
  const addContributor = useSetAtom(addContributorAtom)
  const addContributionToInProgressGoals = useSetAtom(addContributionToInProgressGoalsAtom)

  const skipSubscription = !project.id

  useProjectContributionSubscription({
    variables: {
      input: {
        projectId: project.id || undefined,
      },
    },
    skip: skipSubscription,
    onData(options) {
      const contribution = options.data.data?.contributionStatusUpdated.contribution

      if (!contribution) return
      const updateValues = {
        balance: project.balance ? project.balance + toInt(contribution?.amount) : contribution?.amount,
        balanceUsdCent:
          contribution?.amount && project.balanceUsdCent
            ? project.balanceUsdCent +
              convertSatsToCents({ sats: contribution?.amount, bitcoinQuote: contribution?.bitcoinQuote })
            : 0,
        contributionsCount: project.contributionsCount ? project.contributionsCount + 1 : 1,
        fundersCount:
          project.fundersCount && !(contribution?.funder.timesFunded && contribution?.funder.timesFunded > 1)
            ? project.fundersCount + 1
            : project.fundersCount,
      }

      // Updates project balance cache so that it is the latest value
      updateProjectBalanceCache(client, { projectName: project.name, ...updateValues })

      partialUpdateProject(updateValues)

      addContribution(contribution)
      addContributor(contribution)
      addContributionToInProgressGoals(contribution)
    },
  })
}
