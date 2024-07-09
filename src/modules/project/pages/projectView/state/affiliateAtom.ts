import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DateTime } from 'luxon'

export type ProjectAffiliateAtomType = {
  dateTime: number
  projectName: string
  refId: string
}

export const projectAffiliateAtom = atomWithStorage<ProjectAffiliateAtomType[]>('affiliateId', [])

export const addProjectAffiliateAtom = atom(null, (get, set, affiliate: Omit<ProjectAffiliateAtomType, 'dateTime'>) => {
  const allProjectAffiliates = get(projectAffiliateAtom)

  const isExist = allProjectAffiliates.some((r) => r.projectName === affiliate.projectName)
  const dateTime = DateTime.now().toMillis()

  const currentProjectAffiliate = { ...affiliate, dateTime }

  let newProjectAffiliate = [] as ProjectAffiliateAtomType[]

  if (isExist) {
    newProjectAffiliate = allProjectAffiliates.map((r) => {
      if (r.projectName === affiliate.projectName) {
        return currentProjectAffiliate
      }

      return r
    })
  } else {
    newProjectAffiliate = [...allProjectAffiliates, currentProjectAffiliate]
  }

  set(projectAffiliateAtom, newProjectAffiliate)
})
