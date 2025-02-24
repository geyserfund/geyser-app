/* eslint-disable camelcase */
import { useSearchParams } from 'react-router-dom'

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

export const useSpeedWalletParams = () => {
  const [searchParams] = useSearchParams()

  const isSpeedWalletApp = window.navigator.userAgent.includes('Speed Wallet')

  const walletParams: WalletParams = {
    accountId: searchParams.get(SEARCH_PARAM_KEYS.accountId) ?? '',
    paymentAddress: searchParams.get(SEARCH_PARAM_KEYS.paymentAddress) ?? '',
    balanceBtc: searchParams.get(SEARCH_PARAM_KEYS.balanceBtc) ?? '0',
    balanceUsdt: searchParams.get(SEARCH_PARAM_KEYS.balanceUsdt) ?? '0',
    language: searchParams.get(SEARCH_PARAM_KEYS.language) ?? 'en',
  }

  const sendSpeedWalletData = ({ invoice, amount }: { invoice: string; amount: number }) => {
    const data = {
      version: '2022-10-15',
      account_id: walletParams.accountId,
      data: {
        amount,
        currency: 'SATS',
        target_currency: 'SATS',
        deposit_address: invoice,
        note: 'Payment for geyser via Speed Wallet',
      },
    }

    const url = JSON.stringify(data)

    if (window.Android) {
      window.Android.postMessage(url)
    } else if (window.webkit?.messageHandlers?.iosInterface) {
      window.webkit.messageHandlers.iosInterface.postMessage(url)
    } else if (window.parent) {
      window.parent.postMessage(url, '*')
    } else {
      window.postMessage(url, '*')
    }
  }

  return { isSpeedWalletApp, walletParams, sendSpeedWalletData }
}
