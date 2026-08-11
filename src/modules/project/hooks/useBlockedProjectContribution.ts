import { t } from 'i18next'
import type { MouseEvent } from 'react'
import { useCallback, useRef } from 'react'

import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import {
  Project,
  ProjectFundingStrategy,
  useProjectWalletConfigurationContributionAttemptNotifyMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

type ProjectContributionGate = Pick<Project, 'id' | 'rskEoa' | 'fundingStrategy'> & {
  isRecoverableGrant?: boolean | null
  paymentMethods?: {
    fiat?: {
      stripe?: unknown
    } | null
  } | null
  directPaymentDetails?: {
    btcAddress?: string | null
    lightningAddress?: string | null
  } | null
}

/** Blocks contributions for Take-It-All projects missing an RSK EOA, except Stripe-configured projects during the Boltz contingency. */
export const useBlockedProjectContribution = (project?: ProjectContributionGate | null) => {
  const toast = useNotification()
  const [notifyCreator] = useProjectWalletConfigurationContributionAttemptNotifyMutation()
  const notifiedProjectIdsRef = useRef<Set<string>>(new Set())

  const hasStripePaymentMethod = Boolean(project?.paymentMethods?.fiat?.stripe)
  const hasDirectPaymentDetails = Boolean(
    project?.directPaymentDetails?.btcAddress || project?.directPaymentDetails?.lightningAddress,
  )
  const managedRecoverableGrant = Boolean(project && isManagedRecoverableGrantProject(project))
  const isContributionBlocked = Boolean(
    project?.fundingStrategy === ProjectFundingStrategy.TakeItAll &&
      !project?.rskEoa &&
      !managedRecoverableGrant &&
      !(TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && (hasStripePaymentMethod || hasDirectPaymentDetails)),
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
