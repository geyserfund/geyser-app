import { atom, useAtom } from 'jotai'

export const profileSideNavAtom = atom({
  open: false,
})

const profileSideNavChangeAtom = atom(
  (get) => get(profileSideNavAtom).open,
  (get, set, value?: any) => {
    get(profileSideNavAtom)
    if (typeof value === 'boolean') {
      set(profileSideNavAtom, { open: value })
    } else {
      set(profileSideNavAtom, { open: !get(profileSideNavAtom).open })
    }
  },
)

export const useProfileSideNavAtom = () => useAtom(profileSideNavChangeAtom)
