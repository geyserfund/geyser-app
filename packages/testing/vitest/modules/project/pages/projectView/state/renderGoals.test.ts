import { describe, expect, it } from 'vitest'

import { shouldReorderGoals } from '@/modules/project/pages/projectView/views/goals/common/RenderGoals.tsx'

describe('shouldReorderGoals', () => {
  it('returns false when drag end has no target', () => {
    expect(shouldReorderGoals({ active: { id: '1' } as never, over: null })).toBe(false)
  })

  it('returns true when active and target ids differ', () => {
    expect(shouldReorderGoals({ active: { id: '1' } as never, over: { id: '2' } as never })).toBe(true)
  })
})
