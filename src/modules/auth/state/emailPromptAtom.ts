import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { authUserAtom } from './authAtom'

export type EmailPromptVariant = 'default' | 'mandatory_after_login'

export const isEmailPromptModalOpenAtom = atom<boolean>(false)
export const emailPromptOnCloseActionAtom = atom<(() => void) | null>(null)
export const emailPromptVariantAtom = atom<EmailPromptVariant>('default')

export const dontAskAgainAtom = atomWithStorage('dontAskAgain', false)

export const shouldPromptAtom = atom((get) => {
  const user = get(authUserAtom)
  const dontAskAgain = get(dontAskAgainAtom)
  return Boolean(user.id && !user.email && !dontAskAgain)
})
