import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { authUserAtom } from './authAtom'

export const isNotificationPromptAtomModalOpenAtom = atom<boolean>(false)
export const notificationPromptAtomOnCloseActionAtom = atom<(() => void) | null>(null)

export const dontAskAgainAtom = atomWithStorage('dontAskNotificationPrompt', false)

export const shouldPromptAtom = atom((get) => {
  const user = get(authUserAtom)
  const dontAskAgain = get(dontAskAgainAtom)
  return user.id && !user.email && !dontAskAgain
})
