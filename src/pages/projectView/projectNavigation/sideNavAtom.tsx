import { atom, useAtom } from 'jotai'

const sideNarbarAtom = atom({
  open: false,
})

export const useSideNavbarAtom = () => useAtom(sideNarbarAtom)
