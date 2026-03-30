import { describe, expect, it } from 'vitest'

import { buildCollectionPageJsonLd, getAbsoluteSeoUrl } from '../../../../../../../../src/shared/utils/seo.ts'

describe('collection json-ld builder', () => {
  it('builds collection schema with item list URLs', () => {
    const json = buildCollectionPageJsonLd({
      name: 'Geyser Campaigns',
      description: 'Campaign discovery page',
      path: '/campaigns',
      items: [{ name: 'Fundraisers', path: '/fundraisers' }],
    })

    const schema = JSON.parse(json)

    expect(schema['@type']).toBe('CollectionPage')
    expect(schema.url).toBe('https://geyser.fund/campaigns')
    expect(schema.mainEntity.itemListElement[0].url).toBe('https://geyser.fund/fundraisers')
  })

  it('returns absolute URLs from relative paths', () => {
    expect(getAbsoluteSeoUrl('/impact-funds')).toBe('https://geyser.fund/impact-funds')
  })
})
