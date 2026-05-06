import { DateTime, Settings } from 'luxon'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  AON_DEADLINE_DISPLAY_BUFFER_MINUTES,
  aonProjectTimeLeft,
  getAonGoalDeadline,
  getAonGoalUserFacingDeadline,
  getTimeLeft,
} from '@/shared/utils/project/getAonData.ts'
import { ProjectAonGoalStatus } from '@/types/index.ts'

const NOW = DateTime.fromISO('2026-05-05T12:00:00.000Z', { zone: 'utc' })

const createAonGoal = (
  overrides: {
    deployedAt?: number
    endsAt?: number
    goalDurationInDays?: number
    status?: ProjectAonGoalStatus
  } = {},
) => ({
  deployedAt: NOW.minus({ days: 1 }).toMillis(),
  endsAt: NOW.plus({ days: 5 }).toMillis(),
  goalDurationInDays: 10,
  status: ProjectAonGoalStatus.Active,
  ...overrides,
})

describe('getAonData', () => {
  beforeEach(() => {
    Settings.now = () => NOW.toMillis()
  })

  afterEach(() => {
    Settings.now = () => Date.now()
  })

  it('shows days when at least 48 hours remain', () => {
    const timeLeft = getTimeLeft(NOW.plus({ hours: 48 }))

    expect(timeLeft).toMatchObject({ value: 2, unit: 'day' })
  })

  it('shows hours when less than 48 hours remain', () => {
    const timeLeft = getTimeLeft(NOW.plus({ hours: 47, minutes: 59 }))

    expect(timeLeft).toMatchObject({ value: 47, unit: 'hour' })
  })

  it('shows minutes when less than 1 hour remains', () => {
    const timeLeft = getTimeLeft(NOW.plus({ minutes: 59, seconds: 59 }))

    expect(timeLeft).toMatchObject({ value: 59, unit: 'minute' })
  })

  it('uses a user-facing AON deadline 10 minutes before the actual deadline', () => {
    const actualDeadline = NOW.plus({ days: 3 })
    const userFacingDeadline = getAonGoalUserFacingDeadline(createAonGoal({ endsAt: actualDeadline.toMillis() }))

    expect(userFacingDeadline?.toMillis()).toBe(
      actualDeadline.minus({ minutes: AON_DEADLINE_DISPLAY_BUFFER_MINUTES }).toMillis(),
    )
  })

  it('prefers endsAt over deployedAt plus goalDurationInDays', () => {
    const endsAt = NOW.plus({ days: 4 })
    const deployedAt = NOW.minus({ days: 1 })
    const goal = createAonGoal({
      deployedAt: deployedAt.toMillis(),
      endsAt: endsAt.toMillis(),
      goalDurationInDays: 10,
    })

    expect(getAonGoalDeadline(goal)?.toMillis()).toBe(endsAt.toMillis())
    expect(getAonGoalUserFacingDeadline(goal)?.toMillis()).toBe(
      endsAt.minus({ minutes: AON_DEADLINE_DISPLAY_BUFFER_MINUTES }).toMillis(),
    )
  })

  it('falls back to deployedAt plus goalDurationInDays when endsAt is missing', () => {
    const deployedAt = NOW.minus({ days: 1 })
    const goal = createAonGoal({
      deployedAt: deployedAt.toMillis(),
      endsAt: undefined,
      goalDurationInDays: 10,
    })

    expect(getAonGoalDeadline(goal)?.toMillis()).toBe(deployedAt.plus({ days: 10 }).toMillis())
  })

  it('returns no active time left for claimed or expired AON goals', () => {
    const claimedGoal = createAonGoal({ status: ProjectAonGoalStatus.Claimed })
    const expiredGoal = createAonGoal({
      endsAt: NOW.plus({ minutes: AON_DEADLINE_DISPLAY_BUFFER_MINUTES - 1 }).toMillis(),
    })

    expect(aonProjectTimeLeft(claimedGoal)).toBeNull()
    expect(aonProjectTimeLeft(expiredGoal)).toBeNull()
  })
})
