import { atom } from 'jotai'

export type WalletParams = {
  accountId: string
  paymentAddress: string
  balanceBtc: string
  balanceUsdt: string
  language: string
}

export const speedWalletParamsAtom = atom<WalletParams>()

export const isSpeedWalletAppAtom = atom<boolean>(false)
