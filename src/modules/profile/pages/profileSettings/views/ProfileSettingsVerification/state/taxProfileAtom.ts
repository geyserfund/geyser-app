import { atom } from 'jotai'

import { LegalEntityType, UserTaxProfileFragment } from '@/types/index.ts'

export const userTaxProfileAtom = atom<UserTaxProfileFragment>({
  legalEntityType: LegalEntityType.Person,
} as UserTaxProfileFragment)
