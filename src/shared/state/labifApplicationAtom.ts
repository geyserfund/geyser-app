import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage<boolean>(() => sessionStorage)

/** True only while the creator started this project from a LABIF application. */
export const labifApplicationAtom = atomWithStorage<boolean>('labifApplicationProject', false, storage, {
  getOnInit: true,
})
