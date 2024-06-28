import { LazyQueryExecFunction } from '@apollo/client'
import { captureException } from '@sentry/react'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  Exact,
  ProjectPageWalletsQuery,
  UniqueProjectQueryInput,
  useProjectPageWalletsLazyQuery,
} from '../../../../types'
import { walletAtom, walletLoadingAtom } from '../../state/walletAtom'

type UseInitWalletProps = {
  /** The id of the project */
  projectId: string | number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitWalletReturn = {
  /** Query wallet for the Project in context */
  queryProjectWallet: LazyQueryExecFunction<
    ProjectPageWalletsQuery,
    Exact<{
      where: UniqueProjectQueryInput
    }>
  >
}

/** Fetch project wallet for project context */
export const useInitWallet = ({ projectId, skip }: UseInitWalletProps): UseInitWalletReturn => {
  const setWallet = useSetAtom(walletAtom)
  const setWalletLoading = useSetAtom(walletLoadingAtom)

  const [queryProjectWallet] = useProjectPageWalletsLazyQuery({
    fetchPolicy: 'network-only',
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

  useEffect(() => {
    if (projectId && !skip) {
      queryProjectWallet()
    }
  }, [projectId, skip, queryProjectWallet])

  return {
    queryProjectWallet,
  }
}
