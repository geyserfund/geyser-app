import { describe, expect, it } from 'vitest'

import { canScrollTo } from '@/utils/tools/useScrollToTop.ts'

describe('canScrollTo', () => {
  it('returns true only for scrollable objects', () => {
    expect(canScrollTo({ scrollTo: () => undefined } as Element & { scrollTo: Window['scrollTo'] })).toBe(true)
    expect(canScrollTo(document.createElement('div'))).toBe(false)
    expect(canScrollTo(null)).toBe(false)
  })
})
