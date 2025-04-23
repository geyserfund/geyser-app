import { HStack, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime, Duration } from 'luxon'
import { useEffect, useState } from 'react'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useMobileMode } from '@/utils/index.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'

const formatTimeValue = (value: number): string => {
  // Ensure value is non-negative and round down
  return String(Math.max(0, Math.floor(value))).padStart(2, '0')
}

export const ProjectPreLaunchNav = () => {
  const { project } = useProjectAtom()

  const isMobile = useMobileMode()

  const [timeLeft, setTimeLeft] = useState<Duration | null>(null)

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
        clearInterval(intervalId)
      } else {
        setTimeLeft(remaining)
      }
    }

    updateCountdown()
    const intervalId = setInterval(updateCountdown, 60000)

    return () => clearInterval(intervalId)
  }, [project?.preLaunchedAt])

  let formattedTime: string
  if (isMobile) {
    if (timeLeft === null) {
      formattedTime = '--'
    } else if (timeLeft.days > 0) {
      formattedTime = `${formatTimeValue(timeLeft.days)}d`
    } else if (timeLeft.hours > 0) {
      formattedTime = `${formatTimeValue(timeLeft.hours)}hr`
    } else {
      formattedTime = `${formatTimeValue(timeLeft.minutes)}min`
    }

    formattedTime += ` ${t('left')}`
  } else {
    formattedTime = timeLeft
      ? `${formatTimeValue(timeLeft.days)}d : ${formatTimeValue(timeLeft.hours)}hr : ${formatTimeValue(
          timeLeft.minutes,
        )}min`
      : '--d : --hr : --min'
  }

  return (
    <Feedback variant={FeedBackVariant.WARNING} noIcon height="44px" paddingY={0} alignItems="center">
      <HStack w="full" alignItems="center" justifyContent="center" spacing={2}>
        <Body size={{ base: 'md', lg: 'lg' }} bold>
          {isMobile
            ? `${t('Launchpad')}: ${formattedTime} ${t('to get 21 followers')}`
            : `${t('Project in Launchpad')} - ${formattedTime} ${t('left to get to 21 followers')}`}
        </Body>
        <Popover trigger={isMobile ? 'click' : 'hover'}>
          <PopoverTrigger>
            <HStack h="full" alignItems="center">
              <Icon as={PiInfo} />
            </HStack>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody maxWidth="300px">
              <Body size="sm" dark>
                {t(
                  'This project needs to reach 21 followers to begin receiving contributions. Share this project on social media to help launch it.',
                )}
              </Body>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Feedback>
  )
}
