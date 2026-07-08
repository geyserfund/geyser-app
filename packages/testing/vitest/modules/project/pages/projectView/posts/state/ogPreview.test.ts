import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  fetchOgPreviewData,
  resetOgPreviewCacheForTests,
} from '@/modules/project/pages/projectView/views/posts/hooks/useOgPreview.ts'

describe('fetchOgPreviewData', () => {
  afterEach(() => {
    resetOgPreviewCacheForTests()
    vi.restoreAllMocks()
  })

  it('dedupes in-flight requests for the same URL', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          status: 'success',
          data: {
            title: 'Title',
            url: 'https://example.com/article',
          },
        }),
    } as Response)

    const [first, second] = await Promise.all([
      fetchOgPreviewData('https://example.com/article'),
      fetchOgPreviewData('https://example.com/article'),
    ])

    expect(first.title).toBe('Title')
    expect(second.title).toBe('Title')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('returns cached data after the first successful request', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          status: 'success',
          data: {
            title: 'Cached',
            url: 'https://example.com/cached',
          },
        }),
    } as Response)

    await fetchOgPreviewData('https://example.com/cached')
    await fetchOgPreviewData('https://example.com/cached')

    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
