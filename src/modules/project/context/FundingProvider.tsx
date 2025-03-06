import { useAtomValue, useSetAtom } from 'jotai'
import React, { PropsWithChildren, useEffect } from 'react'

import { useProjectGoalsAPI } from '../API/useProjectGoalsAPI'
import { useProjectRewardsAPI } from '../API/useProjectRewardsAPI'
import { useProjectSubscriptionsAPI } from '../API/useProjectSubscriptionsAPI'
import { useResetFundingFlow } from '../funding/hooks/useResetFundingFlow'
import { FundingProject, resetFundingFormAtom } from '../funding/state/fundingFormAtom'
import { projectAtom } from '../state/projectAtom'

interface FundingProviderProps extends PropsWithChildren {
  project: FundingProject
}

// Used if the project context is not available
export const FundingProvider = ({ children, project }: FundingProviderProps) => {
  const resetFundingForm = useSetAtom(resetFundingFormAtom)
  const resetFundingFlow = useResetFundingFlow()

  useEffect(() => {
    return () => {
      console.log('==================================')
      console.log('========FUNDING FLOW RESET===========')
      console.log('==================================')
      resetFundingFlow()
      resetFundingForm()
    }
  }, [project, resetFundingFlow, resetFundingForm])

  return <>{children}</>
}

/** Used if the project context is available */
export const FundingProviderWithProjectContext: React.FC<PropsWithChildren> = ({ children }) => {
  /** Initialize rewards if they have not been initialized yet */
  useProjectRewardsAPI(true)
  useProjectSubscriptionsAPI(true)
  useProjectGoalsAPI(true)

  const project = useAtomValue(projectAtom)

  return <FundingProvider project={project}>{children}</FundingProvider>
}
