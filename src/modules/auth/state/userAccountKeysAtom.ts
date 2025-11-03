import { atom } from 'jotai'

import { AccountKeys } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { UserAccountKeysFragment } from '@/types/index.ts'

export const userAccountKeysAtom = atom<UserAccountKeysFragment>()

export const userAccountKeyPairAtom = atom<Pick<AccountKeys, 'privateKey' | 'publicKey'>>()
