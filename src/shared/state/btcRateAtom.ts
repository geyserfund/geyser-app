import { atom } from 'jotai'

/** Atom for storing the USD rate for 1 SATOSHI */
export const btcRateAtom = atom(0)

/** Atom for storing USD rate for 1 BTC */
export const usdRateAtom = atom(0)
