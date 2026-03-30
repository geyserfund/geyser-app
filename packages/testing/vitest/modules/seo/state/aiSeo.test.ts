import { describe, expect, it } from 'vitest'

import { AI_SEO_SITE_ORIGIN, getAiSeoPageContent } from '../../../../../../../../src/shared/constants/platform/aiSeo.ts'

describe('ai seo content mapping', () => {
  it('returns rich default metadata aligned to the platform narrative', () => {
    const content = getAiSeoPageContent('default')

    expect(content.title.toLowerCase()).toContain('bitcoin')
    expect(content.description.toLowerCase()).toContain('humanitarian')
    expect(content.keywords.toLowerCase()).toContain('bitcoin crowdfunding')
    expect(content.about.length).toBeGreaterThan(0)
  })

  it('uses the expected site origin for absolute SEO URLs', () => {
    expect(AI_SEO_SITE_ORIGIN).toBe('https://geyser.fund')
  })
})
