import { describe, expect, it } from 'vitest'

import {
  allOrNothingGoalFormSchema,
  AON_GOAL_MAX_DURATION_IN_DAYS,
} from '../../../../../../../../src/modules/project/pages/projectCreation/views/fundingStrategy/allOrNothingGoalValidation.ts'

const validGoalForm = {
  amount: 210000,
  duration: AON_GOAL_MAX_DURATION_IN_DAYS,
}

describe('all-or-nothing goal validation', () => {
  it('accepts the maximum 75 day goal duration', async () => {
    await expect(allOrNothingGoalFormSchema.validate(validGoalForm)).resolves.toMatchObject({
      duration: AON_GOAL_MAX_DURATION_IN_DAYS,
    })
  })

  it('rejects goal durations longer than 75 days', async () => {
    await allOrNothingGoalFormSchema
      .validate({
        ...validGoalForm,
        duration: AON_GOAL_MAX_DURATION_IN_DAYS + 1,
      })
      .then(
        () => {
          throw new Error('Expected validation to reject')
        },
        (error) => {
          expect(error.path).toBe('duration')
          expect(error.params.max).toBe(AON_GOAL_MAX_DURATION_IN_DAYS)
        },
      )
  })
})
