import { captureException } from '@sentry/react'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useCreateWalletMutation,
  useProjectPageWalletsLazyQuery,
  useProjectWalletConnectionDetailsLazyQuery,
  useUpdateWalletMutation,
} from '../../../types'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { walletAtom, walletConnectionDetailsAtom, walletLoadingAtom } from '../state/walletAtom'
import { useCustomMutation } from './custom/useCustomMutation'

/** Fetch project wallet for project context */
/**
 * Query, Create, Update project wallet for current Project context
 * @param load - Load wallet on mount
 */
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

  const [createWallet, createWalletOptions] = useCustomMutation(useCreateWalletMutation, {
    onCompleted(data) {
      if (data.walletCreate) {
        setWalletConnectionDetails(data.walletCreate)
      }
    },
  })

  const [updateWallet, updateWalletOptions] = useUpdateWalletMutation({
    onCompleted(data) {
      if (data.walletUpdate) {
        setWalletConnectionDetails(data.walletUpdate)
      }
    },
  })

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
    updateWallet: {
      execute: updateWallet,
      ...updateWalletOptions,
    },
  }
}
