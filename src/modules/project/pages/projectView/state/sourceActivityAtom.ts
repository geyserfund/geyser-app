import { atom } from 'jotai'

import { FundingResourceType } from '@/types/index.ts'

export const sourceResourceAtom = atom<{
  resourceId: string
  resourceType: FundingResourceType | undefined
}>({
  resourceId: '',
  resourceType: undefined,
})

export const resetSourceResourceAtom = atom(null, (_, set) => {
  set(sourceResourceAtom, {
    resourceId: '',
    resourceType: undefined,
  })
})
