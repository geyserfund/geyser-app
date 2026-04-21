import { t } from 'i18next'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'

import {
  Project,
  ProjectFundingStrategy,
  useProjectWalletConfigurationContributionAttemptNotifyMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

type ProjectContributionGate = Pick<Project, 'id' | 'rskEoa' | 'fundingStrategy'>

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

      toast.error({
        title: t(
          'The wallet of this project is not configured and it cannot receive contributions. The creator has been notified.',
        ),
      })

      notifyCreator({
        variables: {
          input: {
            projectId: project.id,
          },
        },
      }).catch((error) => {
        console.error('Failed to notify creator about blocked contribution attempt', { projectId: project.id, error })
      })

      return true
    },
    [isContributionBlocked, notifyCreator, project, toast],
  )

  return { isContributionBlocked, handleBlockedContribution }
}
