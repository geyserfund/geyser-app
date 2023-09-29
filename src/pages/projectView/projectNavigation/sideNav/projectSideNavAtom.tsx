import { atom, useAtom } from 'jotai'

const projectSideNavAtom = atom({
  open: false,
})

const projectSideNavChangeAtom = atom(
  (get) => get(projectSideNavAtom).open,
  (get, set, value?: any) => {
    get(projectSideNavAtom)
    if (typeof value === 'boolean') {
      set(projectSideNavAtom, { open: value })
    } else {
      set(projectSideNavAtom, { open: !get(projectSideNavAtom).open })
    }
  },
)

export const useProjectSideNavAtom = () => useAtom(projectSideNavChangeAtom)
