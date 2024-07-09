import { atom } from 'jotai'

import { ProjectAffiliateLinkFragment } from '../../../../../../types'

export const affiliateLinksAtom = atom<ProjectAffiliateLinkFragment[]>([])

export const activeAffiliateLinksAtom = atom((get) => get(affiliateLinksAtom).filter((link) => !link.disabled))
export const deactivatedAffiliateLinksAtom = atom((get) => get(affiliateLinksAtom).filter((link) => link.disabled))

export const addAffiliateLinkAtom = atom(null, (get, set, link: ProjectAffiliateLinkFragment) => {
  const allLinks = get(affiliateLinksAtom)
  const isExist = allLinks.some((l) => l.id === link.id)

  let newLinks = [] as ProjectAffiliateLinkFragment[]

  if (isExist) {
    newLinks = allLinks.map((l) => {
      if (l.id === link.id) {
        return link
      }

      return l
    })
  } else {
    newLinks = [...allLinks, link]
  }

  set(affiliateLinksAtom, newLinks)
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
