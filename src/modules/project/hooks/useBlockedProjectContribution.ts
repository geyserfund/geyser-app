import { t } from 'i18next'
import type { MouseEvent } from 'react'
import { useCallback, useRef } from 'react'

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
  const notifiedProjectIdsRef = useRef<Set<string>>(new Set())

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

      const projectId = project.id
      if (notifiedProjectIdsRef.current.has(projectId)) {
        return true
      }
      notifiedProjectIdsRef.current.add(projectId)

      notifyCreator({
        variables: {
          input: {
            projectId,
          },
        },
      }).catch((error) => {
        notifiedProjectIdsRef.current.delete(projectId)
        console.error('Failed to notify creator about blocked contribution attempt', { projectId, error })
      })

      return true
    },
    [isContributionBlocked, notifyCreator, project, toast],
  )

  return { isContributionBlocked, handleBlockedContribution }
}
