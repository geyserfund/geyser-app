import { createStore } from 'jotai'
import { beforeEach, describe, expect, it } from 'vitest'

import { projectCreationReferrerHeroIdAtom } from '../../../../../../../../src/shared/state/projectReferralAtom.ts'
import { referrerHeroIdAtom } from '../../../../../../../../src/shared/state/referralAtom.ts'

describe('projectCreationReferrerHeroIdAtom', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('keeps launch referral state separate from contribution referral state', () => {
    const store = createStore()

    store.set(referrerHeroIdAtom, 'contribution-referrer')
    store.set(projectCreationReferrerHeroIdAtom, 'project-referrer')

    expect(store.get(referrerHeroIdAtom)).toBe('contribution-referrer')
    expect(store.get(projectCreationReferrerHeroIdAtom)).toBe('project-referrer')
  })

  it('can be cleared after project creation completes', () => {
    const store = createStore()

    store.set(projectCreationReferrerHeroIdAtom, 'project-referrer')
    store.set(projectCreationReferrerHeroIdAtom, null)

    expect(store.get(projectCreationReferrerHeroIdAtom)).toBeNull()
  })
})
