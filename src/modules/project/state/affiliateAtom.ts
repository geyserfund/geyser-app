import { atom } from 'jotai'
import { DateTime } from 'luxon'

import { ProjectAffiliateLinkFragment } from '../../../types'

/** project affiliate links for the project in context  */
export const affiliateLinksAtom = atom<ProjectAffiliateLinkFragment[]>([])

/** active affiliate links for the project in context  */
export const activeAffiliateLinksAtom = atom((get) => get(affiliateLinksAtom).filter((link) => !link.disabled))
/** deactivated affiliate links for the project in context  */
export const deactivatedAffiliateLinksAtom = atom((get) => get(affiliateLinksAtom).filter((link) => link.disabled))

/** add or update affilaite links */
export const addUpdateAffiliateLinkAtom = atom(null, (get, set, link: ProjectAffiliateLinkFragment) => {
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

/** disable an affiliate link */
export const disableAffiliateLinkAtom = atom(null, (get, set, id: number) => {
  set(affiliateLinksAtom, (prev) =>
    prev.map((link) => {
      if (link.id === id) {
        return { ...link, disabled: true, disabledAt: DateTime.now().toMillis() }
      }

      return link
    }),
  )
})

/** Reset all real-atoms in this file to it's initial State */
export const affiliateAtomReset = atom(null, (get, set) => {
  set(affiliateLinksAtom, [])
})
