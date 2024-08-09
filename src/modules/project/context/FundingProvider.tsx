import { useAtomValue, useSetAtom } from 'jotai'
import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'

import {
  FundingInput,
  FundingTxFragment,
  ProjectPageWalletFragment,
  ProjectRewardFragment,
  WalletLimitsFragment,
} from '../../../types'
import { useProjectRewardsAPI } from '../API/useProjectRewardsAPI'
import { useResetFundingFlow } from '../funding/hooks/useResetFundingFlow'
import { FundingFlowGraphQLError } from '../funding/state'
import { FundingProject, fundingProjectAtom, resetFundingFormAtom } from '../funding/state/fundingFormAtom'
import { projectAtom, ProjectState } from '../state/projectAtom'
import { rewardsAtom } from '../state/rewardsAtom'
import { walletAtom } from '../state/walletAtom'

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
  wallet?: ProjectPageWalletFragment
  rewards: ProjectRewardFragment[]
}

export const FundingContext = createContext<FundingContextProps>({} as FundingContextProps)

export const useFundingContext = () => useContext(FundingContext)

// Used if the project context is not available
export const FundingProvider = ({ children, project, wallet, rewards }: FundingProviderProps) => {
  const resetFundingForm = useSetAtom(resetFundingFormAtom)
  const resetFundingFlow = useResetFundingFlow()
  const setFundingProject = useSetAtom(fundingProjectAtom)

  useEffect(() => {
    setFundingProject({ ...project, wallet, rewards })
    return () => {
      console.log('==================================')
      console.log('========FUNDING FLOW RESET===========')
      console.log('==================================')
      resetFundingFlow()
      resetFundingForm()
    }
  }, [project, wallet, rewards, resetFundingFlow, resetFundingForm, setFundingProject])

  return <>{children}</>
}

/** Used if the project context is available */
export const FundingProviderWithProjectContext: React.FC<PropsWithChildren> = ({ children }) => {
  /** Initialize rewards if they have not been initialized yet */
  useProjectRewardsAPI(true)

  const project = useAtomValue(projectAtom)
  const wallet = useAtomValue(walletAtom)
  const rewards = useAtomValue(rewardsAtom)

  return (
    <FundingProvider project={project} wallet={wallet} rewards={rewards}>
      {children}
    </FundingProvider>
  )
}
