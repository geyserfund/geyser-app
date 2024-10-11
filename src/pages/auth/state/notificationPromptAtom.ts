import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isNotificationPromptAtomModalOpenAtom = atom<boolean>(false)
export const notificationPromptAtomOnCloseActionAtom = atom<(() => void) | null>(null)

export const dontAskNotificationAgainAtom = atomWithStorage('dontAskNotificationPrompt', false)
