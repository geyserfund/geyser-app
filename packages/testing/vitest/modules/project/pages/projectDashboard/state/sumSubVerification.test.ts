import { describe, expect, it } from 'vitest'

import {
  getSumsubVerificationLevelName,
  isSuccessfulVerificationMessage,
} from '@/modules/project/pages/projectDashboard/views/wallet/components/SumSubVerification.tsx'
import { UserVerificationLevel } from '@/types/index.ts'

describe('SumSubVerification helpers', () => {
  it('ignores applicant status messages without review results', () => {
    expect(isSuccessfulVerificationMessage('idCheck.onApplicantStatusChanged', {}, UserVerificationLevel.Level_3)).toBe(
      false,
    )
  })

  it('accepts a green review answer for the matching verification level', () => {
    expect(
      isSuccessfulVerificationMessage(
        'idCheck.onApplicantStatusChanged',
        {
          reviewResult: { reviewAnswer: 'GREEN' },
          levelName: getSumsubVerificationLevelName(UserVerificationLevel.Level_2),
        },
        UserVerificationLevel.Level_2,
      ),
    ).toBe(true)
  })
})
