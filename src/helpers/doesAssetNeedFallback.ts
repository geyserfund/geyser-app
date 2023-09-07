import { DateTime } from 'luxon'

const FAILED_FETCH_ERROR = 'Failed to fetch dynamically imported module'
const CHUNK_LOAD_ERROR = 'ChunkLoadError'
const LOCAL_STORAGE_LAST_REFRESH_KEY = 'ChunkLoadError'
const ONE_MINUTE_IN_MILIS = 60 * 1000

export const doesAssetNeedFallback = (e: any): boolean => {
  if (
    (e?.name && e.name === CHUNK_LOAD_ERROR) ||
    (e?.message && e.message.includes(FAILED_FETCH_ERROR))
  ) {
    const refreshed = getRefreshStateFromLocalStorage()
    if (!refreshed) {
      storeRateToLocalStorage()
      window.location.reload()
      return false
    }
  }

  return true
}

const getRefreshStateFromLocalStorage = () => {
  const values = localStorage.getItem(LOCAL_STORAGE_LAST_REFRESH_KEY)
  const timeLineMilis = values ? Number(values) : 0
  const now = DateTime.local().toMillis()

  let refreshed = false

  if (timeLineMilis && now - timeLineMilis < ONE_MINUTE_IN_MILIS) {
    refreshed = true
  }

  return refreshed
}

const storeRateToLocalStorage = () => {
  const newDate = DateTime.local().toMillis()

  localStorage.setItem(LOCAL_STORAGE_LAST_REFRESH_KEY, `${newDate}`)
}
