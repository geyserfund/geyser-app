import { atomWithStorage } from 'jotai/utils'
import { createJSONStorage } from 'jotai/utils'

/**
 * Stores the first referring heroId encountered during the current browser session.
 * Uses sessionStorage to ensure it's cleared when the session ends.
 */

const storage = createJSONStorage<string | null>(() => sessionStorage)

export const referrerHeroIdAtom = atomWithStorage<string | null>(
  'referrerHeroId', // Key in sessionStorage
  null, // Initial value
  storage, // Pass the storage implementation directly
  { getOnInit: true }, // getOnInit needs to be in the options object
)
