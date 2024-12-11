import { atom } from 'jotai'

import { ProfileOrderFragment } from '@/types'

export const userOrdersAtom = atom<ProfileOrderFragment[]>([])
