import { atom } from 'jotai'

import { ProjectPageWalletFragment } from '../../../types'

/** Wallet for the Project in context */
export const walletAtom = atom<ProjectPageWalletFragment | undefined>(undefined)

/** Loading state for the wallet, defaults to true */
export const walletLoadingAtom = atom(true)
