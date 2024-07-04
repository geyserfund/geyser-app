import { atom } from 'jotai'

export const isEmailPromptModalOpenAtom = atom<boolean>(false)
export const emailPromptOnCloseActionAtom = atom<(() => void) | null>(null)
