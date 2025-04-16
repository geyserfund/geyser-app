import { atom } from 'jotai'

import { UserTaxProfileFragment } from '@/types/index.ts'

export const userTaxProfileAtom = atom<UserTaxProfileFragment | null>(null)
