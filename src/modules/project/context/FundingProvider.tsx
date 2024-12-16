import { useAtomValue, useSetAtom } from 'jotai'
import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'

import { FundingInput, FundingTxFragment, WalletLimitsFragment } from '../../../types'
import { useProjectGoalsAPI } from '../API/useProjectGoalsAPI'
import { useProjectRewardsAPI } from '../API/useProjectRewardsAPI'
import { useProjectSubscriptionsAPI } from '../API/useProjectSubscriptionsAPI'
import { useResetFundingFlow } from '../funding/hooks/useResetFundingFlow'
import { FundingFlowGraphQLError } from '../funding/state'
import { FundingProject, resetFundingFormAtom } from '../funding/state/fundingFormAtom'
import { projectAtom, ProjectState } from '../state/projectAtom'

type FundingContextProps = {
  fundingRequestErrored: Error | boolean
  fundingRequestLoading: boolean
  requestFunding: (input: FundingInput) => Promise<void>
  refetchFundingFlow: () => void
  retryFundingFlow: () => void
  resetFundingFlow: () => void
  fundingTx: Omit<FundingTxFragment, 'funder'>
  error?: FundingFlowGraphQLError
  weblnErrored: boolean
  hasWebLN: boolean
  project?: Partial<ProjectState> | null // Partial Project context, for usage inside fundingFlow, Only useful when ProjctProvider is not used
  limits?: WalletLimitsFragment | null
  projectGoalId?: string | null
}

interface FundingProviderProps extends PropsWithChildren {
  project: FundingProject
}

export const FundingContext = createContext<FundingContextProps>({} as FundingContextProps)

export const useFundingContext = () => useContext(FundingContext)

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
