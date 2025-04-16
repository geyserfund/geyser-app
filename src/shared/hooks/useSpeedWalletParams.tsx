/* eslint-disable camelcase */
import { useAtomValue } from 'jotai'

import { isSpeedWalletAppAtom, speedWalletParamsAtom } from '../state/speedWalletParamsAtom.ts'

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

export const useSpeedWalletParams = () => {
  const isSpeedWalletApp = useAtomValue(isSpeedWalletAppAtom)
  const walletParams = useAtomValue(speedWalletParamsAtom)

  const sendSpeedWalletData = ({ invoice, amount }: { invoice: string; amount: number }) => {
    const data = {
      version: '2022-10-15',
      account_id: walletParams?.accountId,
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
