import { atom } from 'jotai'

export const isWidgetAtom = atom(false)

export const resetIsWidgetAtom = atom(null, (get, set) => {
  set(isWidgetAtom, false)
})
