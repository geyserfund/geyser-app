import { t } from 'i18next'
import { DateTime } from 'luxon'

import { ProjectAonGoalForLandingPageFragment } from '@/types/index.ts'

export const aonProjectTimeLeft = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'deployedAt' | 'goalDurationInDays'> | null,
) => {
  if (!aonGoal || !aonGoal.deployedAt || !aonGoal.goalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(aonGoal.deployedAt)
  const aonEndDate = launchDate.plus({ days: aonGoal.goalDurationInDays })

  return getTimeLeft(aonEndDate)
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

export const getAonGoalPercentage = (
  aonGoal?: Pick<ProjectAonGoalForLandingPageFragment, 'goalAmount' | 'balance'> | null,
) => {
  if (!aonGoal || !aonGoal?.goalAmount || !aonGoal.balance) {
    return 0
  }

  return Math.round((aonGoal.balance / aonGoal.goalAmount) * 100)
}
