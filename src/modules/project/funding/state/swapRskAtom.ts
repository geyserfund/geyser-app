import { atom } from 'jotai'

import { AccountKeys } from '../../forms/accountPassword/keyGenerationHelper.ts'

export const rskAccountKeysAtom = atom<AccountKeys>()

export const resetRskAccountKeysAtom = atom(null, (get, set) => {
  set(rskAccountKeysAtom, undefined)
})
