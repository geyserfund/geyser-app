import { atom } from 'jotai'

import { ProjectPageWalletFragment, ProjectWalletConnectionDetailsFragment } from '../../../types'

/** Wallet for the Project in context */
export const walletAtom = atom<ProjectPageWalletFragment | undefined>(undefined)

/** Wallet connection details for updating and displaying wallet information */
export const walletConnectionDetailsAtom = atom<ProjectWalletConnectionDetailsFragment | undefined>(undefined)

/** Loading state for the wallet, defaults to true */
export const walletLoadingAtom = atom(true)

/** Reset all real-atoms in this file to it's initial State */
export const walletAtomReset = atom(null, (get, set) => {
  set(walletAtom, undefined)
  set(walletConnectionDetailsAtom, undefined)
  set(walletLoadingAtom, true)
})
