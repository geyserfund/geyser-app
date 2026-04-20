import { describe, expect, it } from 'vitest'

import { formatHeadTitle, resolveCanonicalUrl } from '../../../../../../../../src/config/headUtils.ts'

describe('head utils', () => {
  it('adds the brand suffix when the title does not include Geyser', () => {
    expect(formatHeadTitle('Impact Funds')).toBe('Impact Funds | Geyser')
  })

  it('does not duplicate the brand suffix when the title already includes Geyser', () => {
    expect(formatHeadTitle('Geyser Impact Funds')).toBe('Geyser Impact Funds')
  })

  it('uses the provided canonical URL when available', () => {
    expect(resolveCanonicalUrl('https://geyser.fund/fundraisers', 'https://geyser.fund/custom')).toBe(
      'https://geyser.fund/custom',
    )
  })

  it('falls back to the page URL when canonical URL is not provided', () => {
    expect(resolveCanonicalUrl('https://geyser.fund/fundraisers')).toBe('https://geyser.fund/fundraisers')
  })
})
