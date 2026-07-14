import { describe, expect, it } from 'vitest'

import { getSelectedGroups, matchesNoiseGroup, noiseGroups, parseArgs } from '../../../../../scripts/sentry-ignore-noise.mjs'

const getGroup = (key: string) => {
  const group = noiseGroups.find((item) => item.key === key)

  if (!group) {
    throw new Error(`Missing group ${key}`)
  }

  return group
}

describe('sentry-ignore-noise helpers', () => {
  it('keeps dry-run mode by default', () => {
    expect(parseArgs([]).apply).toBe(false)
  })

  it('marks browser noise groups as ignored and fixed code groups as resolved', () => {
    expect(getGroup('tawk-parse').action).toBe('ignored')
    expect(getGroup('webln-no-provider').action).toBe('resolved')
    expect(getGroup('goals-dnd-fixed').action).toBe('resolved')
  })

  it('keeps broad network load cleanup out of the default apply set', () => {
    expect(getGroup('network-load').defaultEnabled).toBe(false)
    expect(getSelectedGroups([]).map((group) => group.key)).not.toContain('network-load')
    expect(getSelectedGroups(['network-load']).map((group) => group.key)).toEqual(['network-load'])
  })

  it('matches new cleanup groups against issue text', () => {
    expect(
      matchesNoiseGroup(
        {
          title: 'SyntaxError: failed to parse',
          culprit: 'app/6a45feba358/js/twk-chunk-common',
        },
        getGroup('tawk-parse'),
      ),
    ).toBe(true)

    expect(
      matchesNoiseGroup(
        {
          title: 'TypeError: i.scrollTo is not a function',
          culprit: 'assets/index.js',
        },
        getGroup('scrollto-fixed'),
      ),
    ).toBe(true)
  })
})
