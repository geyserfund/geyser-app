import { captureException } from '@sentry/react'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { useProjectGoalsAPI } from '../API/useProjectGoalsAPI'
import { useProjectRewardsAPI } from '../API/useProjectRewardsAPI'
import { useProjectSubscriptionsAPI } from '../API/useProjectSubscriptionsAPI'
import { useResetFundingFlow } from '../funding/hooks/useResetFundingFlow'
import { FundingProject } from '../funding/state/fundingFormAtom'
import { partialUpdateProjectAtom, projectAtom } from '../state/projectAtom'
import { useProjectActiveMatchingGetLazyQuery } from '../../../types'

interface FundingProviderProps extends PropsWithChildren {
  project: FundingProject
}

// Used if the project context is not available
export const FundingProvider = ({ children, project }: FundingProviderProps) => {
  const resetFundingFlow = useResetFundingFlow()
  const previousProjectKeyRef = useRef<string | null>(project.id ? String(project.id) : project.name)

  useEffect(() => {
    return () => {
      resetFundingFlow()
    }
  }, [resetFundingFlow])

  useEffect(() => {
    const currentProjectKey = project.id ? String(project.id) : project.name
    if (
      previousProjectKeyRef.current &&
      currentProjectKey &&
      previousProjectKeyRef.current !== currentProjectKey
    ) {
      resetFundingFlow()
    }

    previousProjectKeyRef.current = currentProjectKey
  }, [project.id, project.name, resetFundingFlow])

  return <>{children}</>
}

/** Used if the project context is available */
export const FundingProviderWithProjectContext: React.FC<PropsWithChildren> = ({ children }) => {
  /** Initialize rewards if they have not been initialized yet */
  useProjectRewardsAPI(true)
  useProjectSubscriptionsAPI(true)
  useProjectGoalsAPI(true)

  const location = useLocation()
  const project = useAtomValue(projectAtom)
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)
  const [queryProjectActiveMatching] = useProjectActiveMatchingGetLazyQuery()

  useEffect(() => {
    const isFundingRoute = location.pathname.includes('/funding')

    if (!isFundingRoute || (!project.id && !project.name)) {
      return
    }

    queryProjectActiveMatching({
      variables: {
        where: { id: project.id || undefined, name: project.name || undefined },
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      onCompleted(activeMatchingData) {
        if (activeMatchingData?.projectGet) {
          partialUpdateProject({ activeMatching: activeMatchingData.projectGet.activeMatching })
        }
      },
      onError(error) {
        captureException(error, {
          tags: {
            'project-matching': 'projectGet.activeMatching',
            'error.on': 'funding route refresh',
          },
        })
      },
    })
  }, [location.pathname, partialUpdateProject, project.id, project.name, queryProjectActiveMatching])

  return <FundingProvider project={project}>{children}</FundingProvider>
}
