import { t } from 'i18next'
import { DateTime, Duration } from 'luxon'
import { useEffect, useState } from 'react'

import { FOLLOWERS_NEEDED } from '@/modules/project/pages1/projectView/views/body/components/PrelaunchFollowButton.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useMobileMode } from '@/utils/index.ts'

import { ProjectState } from '../../modules/project/state/projectAtom.ts'

const formatTimeValue = (value: number): string => {
  // Ensure value is non-negative and round down
  return String(Math.max(0, Math.floor(value))).padStart(2, '0')
}

/** Format time remaining based on device type and duration */
const getFormattedTime = (timeLeft: Duration | null, isMobile?: boolean): string => {
  if (isMobile) {
    if (timeLeft === null) return `-- ${t('left')}`
    if (timeLeft.days > 0) return `${formatTimeValue(timeLeft.days)}d ${t('left')}`
    if (timeLeft.hours > 0) return `${formatTimeValue(timeLeft.hours)}hr ${t('left')}`
    return `${formatTimeValue(timeLeft.minutes)}min ${t('left')}`
  }

  return timeLeft ? `${formatTimeValue(timeLeft.days)}d : ${formatTimeValue(timeLeft.hours)}hr` : '--d : --hr'
}

/** Render status message based on project state */
export const ProjectPrelaunchStatus = ({
  project,
  onlyTimeLeft = false,
}: {
  project: Pick<ProjectState, 'preLaunchedAt' | 'followersCount' | 'paidLaunch'>
  onlyTimeLeft?: boolean
}) => {
  const isMobile = useMobileMode()

  const [timeLeft, setTimeLeft] = useState<Duration | null>(null)
  const [isTimeUp, setIsTimeUp] = useState(false)

  useEffect(() => {
    if (!project?.preLaunchedAt) {
      setTimeLeft(null)
      return
    }

    const launchTime = DateTime.fromMillis(project.preLaunchedAt)
    const endTime = launchTime.plus({ days: 30 })

    const updateCountdown = () => {
      const now = DateTime.now()
      const remaining = endTime.diff(now, ['days', 'hours', 'minutes'])

      if (remaining.valueOf() <= 0) {
        setTimeLeft(Duration.fromMillis(0)) // Set to zero duration
        setIsTimeUp(true)
        clearInterval(intervalId)
      } else {
        setTimeLeft(remaining)
      }
    }

    updateCountdown()
    const intervalId = setInterval(updateCountdown, 60000)

    return () => clearInterval(intervalId)
  }, [project?.preLaunchedAt])

  const formattedTime = getFormattedTime(timeLeft, isMobile)
  const hasEnoughFollowers =
    Boolean(project?.followersCount && project?.followersCount >= FOLLOWERS_NEEDED) || Boolean(project?.paidLaunch)

  if (hasEnoughFollowers) {
    return (
      <Body size={{ base: 'md', lg: 'lg' }} bold>
        {onlyTimeLeft ? '' : '- '}
        {isMobile ? `${t('Ready')} 🎉` : `${t('Ready to launch')} 🎉`}
      </Body>
    )
  }

  if (isTimeUp && !hasEnoughFollowers) {
    return (
      <Body size={{ base: 'md', lg: 'lg' }} bold>
        {t('Time is up: this project did not reach 21 followers in a month.')}
      </Body>
    )
  }

  return (
    <Body size={{ base: 'md', lg: 'lg' }} bold>
      {onlyTimeLeft
        ? `Time left: ${formattedTime}`
        : isMobile
        ? `: ${formattedTime} ${t('to 21 followers')}`
        : `- ${formattedTime} ${t('left to get to 21 follows & launch')}`}
    </Body>
  )
}
