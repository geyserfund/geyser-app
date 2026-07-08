import { describe, expect, it, vi } from 'vitest'

import { getLocalStorageItem, setLocalStorageItem } from '@/shared/utils/browserStorage.ts'

describe('browserStorage', () => {
  it('reads and writes localStorage when storage is available', () => {
    expect(setLocalStorageItem('safe-storage-test', 'stored')).toBe(true)
    expect(getLocalStorageItem('safe-storage-test')).toBe('stored')
  })

  it('returns fallback values when localStorage throws', () => {
    const getItemSpy = vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })

    expect(getLocalStorageItem('blocked-storage-test')).toBeNull()
    expect(setLocalStorageItem('blocked-storage-test', 'stored')).toBe(false)

    getItemSpy.mockRestore()
    setItemSpy.mockRestore()
  })
})
