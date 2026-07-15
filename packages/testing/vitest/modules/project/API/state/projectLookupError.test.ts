import { describe, expect, it } from 'vitest'

import { isExpectedProjectLookupError } from '@/modules/project/API/useProjectAPI.ts'

describe('isExpectedProjectLookupError', () => {
  it('matches expected project lookup failures', () => {
    expect(isExpectedProjectLookupError(new Error('Project not found for id: 4246'))).toBe(true)
    expect(isExpectedProjectLookupError(new Error('Response not successful: Received status code 401'))).toBe(true)
    expect(isExpectedProjectLookupError(new Error('You do not have permission to view this project'))).toBe(true)
  })

  it('keeps unexpected errors visible', () => {
    expect(isExpectedProjectLookupError(new Error('Unexpected GraphQL failure'))).toBe(false)
  })
})
