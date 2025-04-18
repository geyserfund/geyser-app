import { atom } from 'jotai'

import { Country } from '@/types'

export const countriesAtom = atom<Country[]>([])
