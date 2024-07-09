import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DateTime } from 'luxon'

export type RefferalAtomType = {
  dateTime: number
  projectName: string
  refId: string
}

export const refferalAtom = atomWithStorage<RefferalAtomType[]>('affiliateId', [])

export const addRefferalAtom = atom(null, (get, set, affiliate: Omit<RefferalAtomType, 'dateTime'>) => {
  const allRefferals = get(refferalAtom)

  const isExist = allRefferals.some((r) => r.projectName === affiliate.projectName)
  const dateTime = DateTime.now().toMillis()

  const currentRefferal = { ...affiliate, dateTime }

  let newRefferals = [] as RefferalAtomType[]

  if (isExist) {
    newRefferals = allRefferals.map((r) => {
      if (r.projectName === affiliate.projectName) {
        return currentRefferal
      }

      return r
    })
  } else {
    newRefferals = [...allRefferals, currentRefferal]
  }

  set(refferalAtom, newRefferals)
})
