import { atomWithStorage } from 'jotai/utils'
import { createJSONStorage } from 'jotai/utils'

/**
 * Stores the first referring heroId encountered during the current browser session.
 * Uses sessionStorage to ensure it's cleared when the session ends.
 */

const storage = createJSONStorage<string | null>(() => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
      key: () => null,
      length: 0,
    } as Storage
  }

  return window.sessionStorage
})

export const referrerHeroIdAtom = atomWithStorage<string | null>(
  'referrerHeroId', // Key in sessionStorage
  null, // Initial value
  storage, // Pass the storage implementation directly
  { getOnInit: typeof window !== 'undefined' }, // Avoid storage read on server import
)
