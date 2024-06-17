import { ECPairInterface } from 'ecpair'
import { atom, useAtomValue, useSetAtom } from 'jotai'

export const keyPairAtom = atom<ECPairInterface | null>(null)
// Remove these
export const useSetKeyPairAtom = () => useSetAtom(keyPairAtom)
export const useKeyPairAtomValue = () => useAtomValue(keyPairAtom)
