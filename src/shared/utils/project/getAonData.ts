import { t } from 'i18next'
import { DateTime } from 'luxon'

import { ProjectAonGoalForLandingPageFragment, ProjectAonGoalStatus } from '@/types/index.ts'

const CREATOR_CLAIM_DAYS = 30
const CONTRIBUTOR_CLAIM_DAYS = 60

export const aonProjectTimeLeft = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays' | 'status'> | null,
) => {
  if (
    !aonGoal ||
    !aonGoal.deployedAt ||
    !aonGoal.goalDurationInDays ||
    aonGoal.status === ProjectAonGoalStatus.Claimed
  ) {
    return null
  }

  const launchDate = DateTime.fromMillis(aonGoal.deployedAt)
  const aonEndDate = launchDate.plus({ days: aonGoal.goalDurationInDays })

  return getTimeLeft(aonEndDate)
}

export const getAonFailedClaimDeadline = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays'> | null,
) => {
  if (!aonGoal || !aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(aonGoal.deployedAt)
  const aonFailedClaimEndDate = launchDate.plus({ days: aonGoal.goalDurationInDays + CONTRIBUTOR_CLAIM_DAYS })

  return getTimeLeft(aonFailedClaimEndDate)
}

export const getAonUnClaimedClaimDeadline = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays'> | null,
) => {
  if (!aonGoal || !aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(aonGoal.deployedAt)
  const aonSuccessCreatorNotClaimedClaimEndDate = launchDate.plus({
    days: aonGoal.goalDurationInDays + CREATOR_CLAIM_DAYS + CONTRIBUTOR_CLAIM_DAYS,
  })

  return getTimeLeft(aonSuccessCreatorNotClaimedClaimEndDate)
}

export const getTimeLeft = (aonEndDate: DateTime) => {
  const currentDateTime = DateTime.now()

  if (currentDateTime >= aonEndDate) {
    return null
  }

  const duration = aonEndDate.diff(currentDateTime, ['days', 'hours', 'minutes', 'seconds']).toObject()
  const days = Math.floor(duration.days || 0)
  const hours = Math.floor(duration.hours || 0)
  const minutes = Math.floor(duration.minutes || 0)
  const seconds = Math.floor(duration.seconds || 0)

  if (days > 0) {
    return { value: days, label: days === 1 ? t('day left') : t('days left') }
  }

  if (hours > 0) {
    return { value: hours, label: hours === 1 ? t('hour left') : t('hours left') }
  }

  if (minutes > 0) {
    return { value: minutes, label: minutes === 1 ? t('minute left') : t('minutes left') }
  }

  if (seconds > 0) {
    return { value: seconds, label: seconds === 1 ? t('second left') : t('seconds left') }
  }

  return null // No time left
}
