import { atom } from 'jotai'

import { ProjectAffiliateLinkFragment } from '../../../../../../types'

export const affiliateLinksAtom = atom<ProjectAffiliateLinkFragment[]>([])

export const activeAffiliateLinksAtom = atom((get) => get(affiliateLinksAtom).filter((link) => !link.disabled))
export const deactivatedAffiliateLinksAtom = atom((get) => get(affiliateLinksAtom).filter((link) => link.disabled))

export const addAffiliateLinkAtom = atom(null, (get, set, link: ProjectAffiliateLinkFragment) => {
  set(affiliateLinksAtom, (prev) => [...prev, link])
})

export const disableAffiliateLinkAtom = atom(null, (get, set, id: number) => {
  set(affiliateLinksAtom, (prev) =>
    prev.map((link) => {
      if (link.id === id) {
        return { ...link, disabled: true }
      }

      return link
    }),
  )
})
