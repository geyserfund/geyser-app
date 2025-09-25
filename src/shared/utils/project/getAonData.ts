import { t } from 'i18next'
import { DateTime } from 'luxon'

import { ProjectState } from '@/modules/project/state/projectAtom.ts'

export const aonProjectTimeLeft = (project: Pick<ProjectState, 'launchedAt' | 'aonGoalDurationInDays'>) => {
  if (!project.launchedAt || !project.aonGoalDurationInDays) {
    return null
  }

  const launchDate = DateTime.fromMillis(project.launchedAt)
  const aonEndDate = launchDate.plus({ days: project.aonGoalDurationInDays })
  const currentDateTime = DateTime.now()

  if (currentDateTime >= aonEndDate) {
    return null // Time is up, don't show the component
  }

  const duration = aonEndDate.diff(currentDateTime, ['days', 'hours', 'minutes', 'seconds']).toObject()
  const days = Math.floor(duration.days || 0)
  const hours = Math.floor(duration.hours || 0)
  const minutes = Math.floor(duration.minutes || 0)
  const seconds = Math.floor(duration.seconds || 0)

  // Show the largest available time unit
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

export const getAonGoalPercentage = (project: Pick<ProjectState, 'aonGoalInSats' | 'balance'>) => {
  return project.aonGoalInSats ? Math.round((project.balance / project.aonGoalInSats) * 100) : 0
}
