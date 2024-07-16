import { useAtomValue } from 'jotai'
import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'

import { useFundingFormState, UseFundingFormStateReturn } from '../../../shared/hooks'
import { FundingInput, FundingTxFragment, ProjectRewardFragment, WalletLimitsFragment } from '../../../types'
import { useFundingFlow } from '../funding/hooks/useFundingFlow'
import { FundingFlowGraphQLError } from '../funding/state'
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
  fundForm: UseFundingFormStateReturn
  projectGoalId?: string | null
}

interface FundingProviderProps extends PropsWithChildren {
  project?: Partial<ProjectState> | null
  limits?: WalletLimitsFragment | null
  rewards?: ProjectRewardFragment[] | null
}

export const FundingContext = createContext<FundingContextProps>({} as FundingContextProps)

export const useFundingContext = () => useContext(FundingContext)

// Used if the project context is not available
export const FundingProvider = ({ children, project, limits, rewards }: FundingProviderProps) => {
  const fundingFlow = useFundingFlow({ project })

  const fundForm = useFundingFormState({
    rewards: rewards || undefined,
    rewardCurrency: project && project.rewardCurrency ? project.rewardCurrency : undefined,
    walletLimits: limits?.contribution || ({} as any),
  })

  useEffect(() => {
    return () => {
      fundingFlow.resetFundingFlow()
      fundForm.resetForm()
    }
  }, [])

  return (
    <FundingContext.Provider value={{ ...fundingFlow, project, limits, fundForm }}>{children}</FundingContext.Provider>
  )
}

// Used if the project context is available
export const FundingProviderWithProjectContext: React.FC<PropsWithChildren> = ({ children }) => {
  const project = useAtomValue(projectAtom)
  const wallet = useAtomValue(walletAtom)
  const rewards = useAtomValue(rewardsAtom)

  return (
    <FundingProvider project={project} limits={wallet?.limits} rewards={rewards}>
      {children}
    </FundingProvider>
  )
}
