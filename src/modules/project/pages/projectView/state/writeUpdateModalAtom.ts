import { atom } from 'jotai'

/** Whether the Write Update composer modal is open */
export const writeUpdateModalOpenAtom = atom(false)

/** The postId to pre-fill when editing an existing draft, or null for a new post */
export const writeUpdateModalPostIdAtom = atom<string | null>(null)
