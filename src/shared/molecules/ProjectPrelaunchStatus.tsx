import { t } from 'i18next'
import { DateTime, Duration } from 'luxon'
import { useEffect, useState } from 'react'

import { USD_CENTS_AMOUNT_TO_GO_LIVE } from '@/modules/project/pages1/projectView/views/body/components/PrelaunchFollowButton.tsx'
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
  project: Pick<ProjectState, 'preLaunchExpiresAt' | 'balanceUsdCent' | 'paidLaunch'>
  onlyTimeLeft?: boolean
}) => {
  const isMobile = useMobileMode()

  const [timeLeft, setTimeLeft] = useState<Duration | null>(null)
  const [isTimeUp, setIsTimeUp] = useState(false)

  useEffect(() => {
    if (!project?.preLaunchExpiresAt) {
      setTimeLeft(null)
      return
    }

    let intervalId: NodeJS.Timeout | null = null

    const endTime = DateTime.fromMillis(project.preLaunchExpiresAt)

    const updateCountdown = () => {
      const now = DateTime.now()
      const remaining = endTime.diff(now, ['days', 'hours', 'minutes'])

      if (remaining.valueOf() <= 0) {
        setTimeLeft(Duration.fromMillis(0)) // Set to zero duration
        setIsTimeUp(true)
        if (intervalId) {
          clearInterval(intervalId)
        }
      } else {
        setTimeLeft(remaining)
      }
    }

    updateCountdown()
    intervalId = setInterval(updateCountdown, 60000)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [project?.preLaunchExpiresAt])

  const formattedTime = getFormattedTime(timeLeft, isMobile)
  const hasEnoughFunds = Boolean(project?.balanceUsdCent && project?.balanceUsdCent >= USD_CENTS_AMOUNT_TO_GO_LIVE)

  if (hasEnoughFunds) {
    return (
      <Body size={{ base: 'md', lg: 'lg' }} bold>
        {onlyTimeLeft ? '' : '- '}
        {isMobile ? `${t('Ready')} 🎉` : `${t('Ready to launch')} 🎉`}
      </Body>
    )
  }

  if (isTimeUp && !hasEnoughFunds) {
    return (
      <Body size={{ base: 'md', lg: 'lg' }} bold>
        {t('Time is up: this project did not raise $210 in 7 days.')}
      </Body>
    )
  }

  return (
    <Body size={{ base: 'md', lg: 'lg' }} bold>
      {onlyTimeLeft
        ? `Time left: ${formattedTime}`
        : isMobile
        ? `: ${formattedTime} ${t('to raise $210')}`
        : `- ${formattedTime} ${t('left to raise $210 & launch')}`}
    </Body>
  )
}
