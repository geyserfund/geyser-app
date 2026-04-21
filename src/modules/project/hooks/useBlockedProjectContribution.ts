import type { MouseEvent } from 'react'
import { useCallback } from 'react'

import { ProjectFundingStrategy, useProjectWalletConfigurationContributionAttemptNotifyMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const WALLET_NOT_CONFIGURED_MESSAGE =
  'The wallet of this project is not configured and it cannot receive contributions. The creator has been notified.'

type ProjectContributionGate = {
  id: string | number
  rskEoa?: string | null
  fundingStrategy?: ProjectFundingStrategy | null
}

/** Blocks contributions for Take-It-All projects missing an RSK EOA and notifies the project creator when a contribution is attempted. */
export const useBlockedProjectContribution = (project?: ProjectContributionGate | null) => {
  const toast = useNotification()
  const [notifyCreator] = useProjectWalletConfigurationContributionAttemptNotifyMutation()

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
