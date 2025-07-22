import { atom } from 'jotai'

import { UserAccountKeysFragment } from '@/types/index.ts'

export const fundingUserAccountKeysAtom = atom<UserAccountKeysFragment>()
