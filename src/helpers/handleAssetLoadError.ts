import { DateTime } from 'luxon'

const CHUNK_LOAD_ERROR = 'ChunkLoadError'
const LOCAL_STORAGE_LAST_REFRESH_KEY = 'ChunkLoadError'
const ONE_MINUTE_IN_MILIS = 60 * 1000

export const handleAssetLoadError = (e: any) => {
  if (e?.name && e.name === CHUNK_LOAD_ERROR) {
    const refreshed = getRefreshStateFromLocalStorage()
    if (!refreshed) {
      storeRateToLocalStorage()
      window.location.reload()
    }
  }

  return {} as any
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
