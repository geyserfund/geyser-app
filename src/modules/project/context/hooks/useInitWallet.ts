import { ApolloQueryResult } from '@apollo/client'
import { captureException } from '@sentry/react'
import { useSetAtom } from 'jotai'

import { Exact, ProjectPageWalletsQuery, UniqueProjectQueryInput, useProjectPageWalletsQuery } from '../../../../types'
import { walletAtom, walletLoadingAtom } from '../../state/walletAtom'

type UseInitWalletProps = {
  /** The id of the project */
  projectId: string | number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitWalletReturn = {
  /** Refetch wallet for the Project in context */
  refetchProjectWallet: (
    variables?:
      | Partial<
          Exact<{
            where: UniqueProjectQueryInput
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<ProjectPageWalletsQuery>>
}

/** Fetch project wallet for project context */
export const useInitWallet = ({ projectId, skip }: UseInitWalletProps): UseInitWalletReturn => {
  const setWallet = useSetAtom(walletAtom)
  const setWalletLoading = useSetAtom(walletLoadingAtom)

  const { refetch: refetchProjectWallet } = useProjectPageWalletsQuery({
    fetchPolicy: 'network-only',
    skip: !projectId || skip,
    notifyOnNetworkStatusChange: true,
    variables: {
      where: {
        id: projectId,
      },
    },
    onError(error) {
      setWalletLoading(false)
      captureException(error)
    },
    onCompleted(data) {
      setWalletLoading(false)
      if (data?.projectGet?.wallets[0]) {
        setWallet(data?.projectGet?.wallets[0])
      }
    },
  })

  return {
    refetchProjectWallet,
  }
}
