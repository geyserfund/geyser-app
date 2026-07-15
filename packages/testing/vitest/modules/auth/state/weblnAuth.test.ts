import { afterEach, describe, expect, it, vi } from 'vitest'

import { requestWebLNUrlAuth, WEBLN_ENABLE_ERROR, type WebLNAuthProvider } from '@/modules/auth/utils/weblnAuth.ts'

const setWebLNProvider = (webln?: Partial<WebLNAuthProvider>) => {
  Object.defineProperty(window, 'webln', {
    configurable: true,
    value: webln,
  })
}

describe('requestWebLNUrlAuth', () => {
  afterEach(() => {
    Reflect.deleteProperty(window, 'webln')
  })

  it('returns false when no WebLN provider is available', async () => {
    await expect(requestWebLNUrlAuth('lnurl-auth')).resolves.toBe(false)
  })

  it('returns true when WebLN auth succeeds', async () => {
    setWebLNProvider({
      enable: vi.fn().mockResolvedValue(undefined),
      lnurl: vi.fn().mockResolvedValue({ status: 'OK' }),
    })

    await expect(requestWebLNUrlAuth('lnurl-auth')).resolves.toBe(true)
  })

  it('throws the WebLN enable error when the provider rejects', async () => {
    setWebLNProvider({
      enable: vi.fn().mockRejectedValue(new Error('blocked')),
      lnurl: vi.fn(),
    })

    await expect(requestWebLNUrlAuth('lnurl-auth')).rejects.toThrow(WEBLN_ENABLE_ERROR)
  })
})
