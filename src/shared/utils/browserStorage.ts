/** Safely reads a localStorage value in browsers that may block storage access. */
export const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Safely writes a localStorage value in browsers that may block storage access. */
export const setLocalStorageItem = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}
