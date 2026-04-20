import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<string | null>(() => sessionStorage)

export const projectCreationReferrerHeroIdAtom = atomWithStorage<string | null>(
  'projectCreationReferrerHeroId',
  null,
  storage,
  { getOnInit: true },
)
