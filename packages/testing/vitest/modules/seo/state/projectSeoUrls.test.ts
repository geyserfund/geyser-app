import { describe, expect, it } from 'vitest'

import {
  getProjectPostViewUrl,
  getProjectUrl,
} from '../../../../../../../../src/modules/project/tools/generateProjectJsonLD.ts'

describe('project seo url helpers', () => {
  it('builds canonical project URLs', () => {
    expect(getProjectUrl('geyser-project')).toBe('https://geyser.fund/project/geyser-project')
  })

  it('builds canonical post view URLs using the posts/view route', () => {
    expect(getProjectPostViewUrl('geyser-project', 123)).toBe(
      'https://geyser.fund/project/geyser-project/posts/view/123',
    )
  })
})
