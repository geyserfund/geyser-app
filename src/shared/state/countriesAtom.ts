import { atom } from 'jotai'

import { Country } from '@/types'

export const countriesAtom = atom<Country[]>([])

export const countriesLoadingAtom = atom(true)
