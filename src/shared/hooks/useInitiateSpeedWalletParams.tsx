import { useSetAtom } from 'jotai'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { isSpeedWalletAppAtom, speedWalletParamsAtom } from '@/shared/state/speedWalletParamsAtom'

declare global {
  interface Window {
    Android?: {
      postMessage: (data: unknown) => void
    }
    webkit?: {
      messageHandlers?: {
        iosInterface: {
          postMessage: (data: unknown) => void
        }
      }
    }
  }
}

type WalletParams = {
  accountId: string
  paymentAddress: string
  balanceBtc: string
  balanceUsdt: string
  language: string
}

type SearchParamKeys = {
  [K in keyof WalletParams]: string
}

const SEARCH_PARAM_KEYS: SearchParamKeys = {
  accountId: 'acct',
  paymentAddress: 'p_add',
  balanceBtc: 'bal_btc',
  balanceUsdt: 'bal_usdt',
  language: 'lang',
} as const

export const useInitiateSpeedWalletParams = () => {
  const [searchParams] = useSearchParams()

  const isSpeedWalletApp = window.navigator.userAgent.includes('Speed Wallet')

  const [walletParams, setWalletParams] = useAtom(speedWalletParamsAtom)
  const setIsSpeedWalletApp = useSetAtom(isSpeedWalletAppAtom)

  useEffect(() => {
    if (searchParams && !walletParams) {
      const currentWalletParams: WalletParams = {
        accountId: searchParams.get(SEARCH_PARAM_KEYS.accountId) ?? '',
        paymentAddress: searchParams.get(SEARCH_PARAM_KEYS.paymentAddress) ?? '',
        balanceBtc: searchParams.get(SEARCH_PARAM_KEYS.balanceBtc) ?? '0',
        balanceUsdt: searchParams.get(SEARCH_PARAM_KEYS.balanceUsdt) ?? '0',
        language: searchParams.get(SEARCH_PARAM_KEYS.language) ?? 'en',
      }
      setWalletParams(currentWalletParams)
    }
  }, [searchParams, setWalletParams, walletParams])

  useEffect(() => {
    setIsSpeedWalletApp(isSpeedWalletApp)
  }, [isSpeedWalletApp, setIsSpeedWalletApp])
}
