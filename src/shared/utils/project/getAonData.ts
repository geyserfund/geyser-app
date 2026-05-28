import { t } from 'i18next'
import { DateTime } from 'luxon'

import { ProjectAonGoalForLandingPageFragment, ProjectAonGoalStatus } from '@/types/index.ts'

const CREATOR_CLAIM_DAYS = 30
const CONTRIBUTOR_CLAIM_DAYS = 60
const HOURS_IN_DAY = 24
const HOUR_DISPLAY_THRESHOLD = 2 * HOURS_IN_DAY

export const AON_DEADLINE_DISPLAY_BUFFER_MINUTES = 10

export type TimeLeftUnit = 'day' | 'hour' | 'minute' | 'second'

export type TimeLeft = {
  value: number
  label: string
  unit: TimeLeftUnit
}

type AonGoalDeadlineFields = Pick<
  ProjectAonGoalForLandingPageFragment,
  'deployedAt' | 'endsAt' | 'goalDurationInDays' | 'status'
>

export const aonProjectTimeLeft = (
  aonGoal?: AonGoalDeadlineFields | null,
): TimeLeft | null => {
  if (!aonGoal || aonGoal.status === ProjectAonGoalStatus.Claimed) {
    return null
  }

  const userFacingDeadline = getAonGoalUserFacingDeadline(aonGoal)

  if (!userFacingDeadline) {
    return null
  }

  return getTimeLeft(userFacingDeadline)
}

export const getAonGoalDeadline = (aonGoal?: AonGoalDeadlineFields | null): DateTime | null => {
  if (!aonGoal) {
    return null
  }

  if (aonGoal.endsAt) {
    return DateTime.fromMillis(Number(aonGoal.endsAt))
  }

  if (!aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(Number(aonGoal.deployedAt))
  return launchDate.plus({ days: aonGoal.goalDurationInDays })
}

export const getAonGoalUserFacingDeadline = (aonGoal?: AonGoalDeadlineFields | null): DateTime | null => {
  const deadline = getAonGoalDeadline(aonGoal)

  if (!deadline) {
    return null
  }

  return deadline.minus({ minutes: AON_DEADLINE_DISPLAY_BUFFER_MINUTES })
}

export const getFormattedAonGoalUserFacingDeadline = (aonGoal?: AonGoalDeadlineFields | null): string | null => {
  const deadline = getAonGoalUserFacingDeadline(aonGoal)

  if (!deadline) {
    return null
  }

  return deadline.toLocaleString(DateTime.DATETIME_MED)
}

export const getAonFailedClaimDeadline = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays'> | null,
) => {
  if (!aonGoal || !aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(Number(aonGoal.deployedAt))
  const aonFailedClaimEndDate = launchDate.plus({ days: aonGoal.goalDurationInDays + CONTRIBUTOR_CLAIM_DAYS })

  return getTimeLeft(aonFailedClaimEndDate)
}

export const getAonCreatorClaimDeadline = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays'> | null,
) => {
  if (!aonGoal || !aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(Number(aonGoal.deployedAt))
  const aonCreatorClaimEndDate = launchDate.plus({ days: aonGoal.goalDurationInDays + CREATOR_CLAIM_DAYS })

  return getTimeLeft(aonCreatorClaimEndDate)
}

export const getAonUnClaimedClaimDeadline = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays'> | null,
) => {
  if (!aonGoal || !aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(Number(aonGoal.deployedAt))
  const aonSuccessCreatorNotClaimedClaimEndDate = launchDate.plus({
    days: aonGoal.goalDurationInDays + CREATOR_CLAIM_DAYS + CONTRIBUTOR_CLAIM_DAYS,
  })

  return getTimeLeft(aonSuccessCreatorNotClaimedClaimEndDate)
}

export const getTimeLeft = (aonEndDate: DateTime): TimeLeft | null => {
  const currentDateTime = DateTime.now()

  if (currentDateTime >= aonEndDate) {
    return null
  }

  const totalHours = Math.floor(aonEndDate.diff(currentDateTime, 'hours').hours)
  const duration = aonEndDate.diff(currentDateTime, ['days', 'hours', 'minutes', 'seconds']).toObject()
  const days = Math.floor(duration.days || 0)
  const hours = totalHours < HOUR_DISPLAY_THRESHOLD ? totalHours : Math.floor(duration.hours || 0)
  const minutes = Math.floor(duration.minutes || 0)
  const seconds = Math.floor(duration.seconds || 0)

  if (totalHours >= HOUR_DISPLAY_THRESHOLD && days > 0) {
    return { value: days, label: days === 1 ? t('day left') : t('days left'), unit: 'day' }
  }

  if (hours > 0) {
    return { value: hours, label: hours === 1 ? t('hour left') : t('hours left'), unit: 'hour' }
  }

  if (minutes > 0) {
    return { value: minutes, label: minutes === 1 ? t('minute left') : t('minutes left'), unit: 'minute' }
  }

  if (seconds > 0) {
    return { value: seconds, label: seconds === 1 ? t('second left') : t('seconds left'), unit: 'second' }
  }

  return null // No time left
}
