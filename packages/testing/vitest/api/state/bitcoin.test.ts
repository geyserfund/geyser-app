import { afterEach, describe, expect, it, vi } from 'vitest'

import { fetchBitcoinRates } from '@/api/bitcoin.ts'

describe('fetchBitcoinRates', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns zero when all public quote providers fail', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'))

    await expect(fetchBitcoinRates({ currency: 'usd' })).resolves.toBe(0)
  })
})
