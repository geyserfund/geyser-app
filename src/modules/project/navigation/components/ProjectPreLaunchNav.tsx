import { Button, HStack, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { DateTime, Duration } from 'luxon'
import { useEffect, useState } from 'react'
import { PiInfo } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useMobileMode } from '@/utils/index.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { FOLLOWERS_NEEDED } from '../../pages1/projectView/views/body/components/PrelaunchFollowButton.tsx'
import { isProjectOwnerAtom } from '../../state/projectAtom.ts'
import { BackButton } from './BackButton.tsx'

const formatTimeValue = (value: number): string => {
  // Ensure value is non-negative and round down
  return String(Math.max(0, Math.floor(value))).padStart(2, '0')
}

/** Format time remaining based on device type and duration */
const getFormattedTime = (timeLeft: Duration | null, isMobile: boolean): string => {
  if (isMobile) {
    if (timeLeft === null) return `-- ${t('left')}`
    if (timeLeft.days > 0) return `${formatTimeValue(timeLeft.days)}d ${t('left')}`
    if (timeLeft.hours > 0) return `${formatTimeValue(timeLeft.hours)}hr ${t('left')}`
    return `${formatTimeValue(timeLeft.minutes)}min ${t('left')}`
  }

  return timeLeft
    ? `${formatTimeValue(timeLeft.days)}d : ${formatTimeValue(timeLeft.hours)}hr : ${formatTimeValue(
        timeLeft.minutes,
      )}min`
    : '--d : --hr : --min'
}

/** Render status message based on project state */
const StatusMessage = ({
  enoughFollowers,
  isTimeUp,
  isMobile,
  formattedTime,
}: {
  enoughFollowers: boolean
  isTimeUp: boolean
  isMobile: boolean
  formattedTime: string
}) => {
  if (enoughFollowers) {
    return (
      <Body size={{ base: 'md', lg: 'lg' }} bold>
        {isMobile ? `- ${t('Ready')}` : `- ${t('Ready to launch')}`}
      </Body>
    )
  }

  if (isTimeUp && !enoughFollowers) {
    return (
      <Body size={{ base: 'md', lg: 'lg' }} bold>
        {t('Time is up: this project did not reach 21 followers in a month.')}
      </Body>
    )
  }

  return (
    <Body size={{ base: 'md', lg: 'lg' }} bold>
      {isMobile
        ? `: ${formattedTime} ${t('to get 21 followers')}`
        : `- ${formattedTime} ${t('left to get to 21 followers')}`}
    </Body>
  )
}

export const ProjectPreLaunchNav = () => {
  const { project } = useProjectAtom()
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)
  const isMobile = Boolean(useMobileMode())
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
  const hasEnoughFollowers = Boolean(project?.followersCount && project?.followersCount >= FOLLOWERS_NEEDED)
  const showLaunchButton = hasEnoughFollowers && Boolean(isProjectOwner)

  return (
    <HStack align="stretch" spacing={4} w="full">
      <BackButton to={getPath('discoveryLaunchpad')} ariaLabel={t('Back to Launchpad')} height="44px" />
      <Feedback
        variant={hasEnoughFollowers ? FeedBackVariant.SUCCESS : FeedBackVariant.WARNING}
        noIcon
        height="44px"
        paddingY={0}
        paddingRight={0.5}
        alignItems="center"
        flex="1"
      >
        <HStack
          w="full"
          alignItems="center"
          justifyContent={showLaunchButton ? 'space-between' : 'center'}
          spacing={4}
          px={2}
        >
          <HStack flexGrow={1} justifyContent={'center'}>
            <Body
              as={Link}
              to={getPath('discoveryLaunchpad')}
              size={{ base: 'md', lg: 'lg' }}
              bold
              textDecoration={'underline'}
            >
              {isMobile ? `${t('Launchpad')}` : `${t('Project in Launchpad')}`}
            </Body>

            <StatusMessage
              enoughFollowers={hasEnoughFollowers}
              isTimeUp={isTimeUp}
              isMobile={isMobile}
              formattedTime={formattedTime}
            />

            <PopOverInfo />
          </HStack>
          {showLaunchButton && (
            <Button
              as={Link}
              maxWidth="400px"
              flex="1"
              to={getPath('launchProjectWallet', project?.id)}
              variant="solid"
              colorScheme="primary1"
              size="lg"
            >
              {t('Launch now')}
            </Button>
          )}
        </HStack>
      </Feedback>
    </HStack>
  )
}

const PopOverInfo = () => {
  const isMobile = Boolean(useMobileMode())
  return (
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
  )
}
