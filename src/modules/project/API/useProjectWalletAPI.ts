import { captureException } from '@sentry/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useCreateWalletMutation,
  useProjectPageWalletsLazyQuery,
  useProjectWalletConnectionDetailsLazyQuery,
} from '../../../types'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { projectAtom } from '../state/projectAtom'
import { walletAtom, walletConnectionDetailsAtom, walletLoadingAtom } from '../state/walletAtom'
import { useCustomMutation } from './custom/useCustomMutation'

/** Fetch project wallet for project context */
export const useProjectWalletAPI = (load?: boolean) => {
  const setWallet = useSetAtom(walletAtom)
  const setWalletLoading = useSetAtom(walletLoadingAtom)
  const setWalletConnectionDetails = useSetAtom(walletConnectionDetailsAtom)

  const { project, loading } = useProjectAtom()

  const [queryProjectWallet, queryProjectWalletOptions] = useProjectPageWalletsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: project.id,
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

  const [queryProjectWalletConnectionDetails, queryProjectWalletConnectionDetailsOptions] =
    useProjectWalletConnectionDetailsLazyQuery({
      fetchPolicy: 'network-only',
      variables: {
        where: {
          id: project.id,
        },
      },
      onCompleted(data) {
        if (data?.projectGet?.wallets[0]) {
          setWalletConnectionDetails(data?.projectGet?.wallets[0])
        }
      },
    })

  const [createWallet, createWalletOptions] = useCustomMutation(useCreateWalletMutation)

  useEffect(() => {
    if (project.id && !loading && load) {
      queryProjectWallet()
    }
  }, [project.id, loading, load, queryProjectWallet])

  return {
    queryProjectWallet: {
      execute: queryProjectWallet,
      ...queryProjectWalletOptions,
    },
    queryProjectWalletConnectionDetails: {
      execute: queryProjectWalletConnectionDetails,
      ...queryProjectWalletConnectionDetailsOptions,
    },
    createWallet: {
      execute: createWallet,
      ...createWalletOptions,
    },
  }
}
