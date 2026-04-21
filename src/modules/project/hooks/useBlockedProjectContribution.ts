import { gql, useMutation } from '@apollo/client'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'

import { ProjectFundingStrategy } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const WALLET_NOT_CONFIGURED_MESSAGE =
  'The wallet of this project is not configured and it cannot receive contributions. The creator has been notified.'

const MUTATION_PROJECT_WALLET_CONFIGURATION_CONTRIBUTION_ATTEMPT_NOTIFY = gql`
  mutation ProjectWalletConfigurationContributionAttemptNotify($input: ProjectWalletConfigurationContributionAttemptNotifyInput!) {
    projectWalletConfigurationContributionAttemptNotify(input: $input) {
      success
      message
    }
  }
`

type ProjectContributionGate = {
  id: string | number
  rskEoa?: string | null
  fundingStrategy?: ProjectFundingStrategy | null
}

export const useBlockedProjectContribution = (project?: ProjectContributionGate | null) => {
  const toast = useNotification()
  const [notifyCreator] = useMutation(MUTATION_PROJECT_WALLET_CONFIGURATION_CONTRIBUTION_ATTEMPT_NOTIFY)

  const isContributionBlocked = Boolean(
    project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && !project?.rskEoa,
  )

  const handleBlockedContribution = useCallback(
    (event?: Pick<MouseEvent, 'preventDefault' | 'stopPropagation'>) => {
      if (!project || !isContributionBlocked) return false

      event?.preventDefault()
      event?.stopPropagation()

      toast.error({ title: WALLET_NOT_CONFIGURED_MESSAGE })

      notifyCreator({
        variables: {
          input: {
            projectId: project.id,
          },
        },
      }).catch(() => undefined)

      return true
    },
    [isContributionBlocked, notifyCreator, project, toast],
  )

  return { isContributionBlocked, handleBlockedContribution }
}
