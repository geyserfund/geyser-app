import { afterEach, describe, expect, it } from 'vitest'

import {
  generateSeedHexForUser,
  isBrowserCryptoAvailable,
  isWebAssemblyAvailable,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'

describe('keyGenerationHelper capabilities', () => {
  const cryptoDescriptor = Object.getOwnPropertyDescriptor(window, 'crypto')

  afterEach(() => {
    if (cryptoDescriptor) {
      Object.defineProperty(window, 'crypto', cryptoDescriptor)
    }
  })

  it('does not require WebAssembly for module capability checks', () => {
    expect(typeof isWebAssemblyAvailable()).toBe('boolean')
  })

  it('reports browser crypto support from window crypto APIs', () => {
    expect(isBrowserCryptoAvailable()).toBe(Boolean(window.crypto?.getRandomValues && window.crypto?.subtle))
  })

  it('throws a deterministic unsupported-browser error when crypto is unavailable', () => {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      value: undefined,
    })

    expect(() => generateSeedHexForUser()).toThrow('Crypto key generation is not supported in this browser')
  })
})
