import { atom, useAtom } from 'jotai'

import { EntryFragment } from '../../types'

export const entryAtom = atom({} as EntryFragment)
export const useEntryAtom = () => useAtom(entryAtom)
