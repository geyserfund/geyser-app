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

const formatTimeValue = (value: number): string => {
  // Ensure value is non-negative and round down
  return String(Math.max(0, Math.floor(value))).padStart(2, '0')
}

export const ProjectPreLaunchNav = () => {
  const { project } = useProjectAtom()

  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

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

  const enoughFollowers = project?.followersCount && project?.followersCount >= FOLLOWERS_NEEDED

  return (
    <Feedback
      variant={enoughFollowers ? FeedBackVariant.SUCCESS : FeedBackVariant.WARNING}
      noIcon
      height="44px"
      paddingY={0}
      paddingRight={0.5}
      alignItems="center"
    >
      <HStack
        w="full"
        alignItems="center"
        justifyContent={enoughFollowers && isProjectOwner ? 'space-between' : 'center'}
        spacing={2}
      >
        <HStack>
          <Body
            as={Link}
            to={getPath('discoveryLaunchpad')}
            size={{ base: 'md', lg: 'lg' }}
            bold
            textDecoration={'underline'}
          >
            {isMobile ? `${t('Launchpad')}` : `${t('Project in Launchpad')}`}
          </Body>
          {enoughFollowers ? (
            <Body size={{ base: 'md', lg: 'lg' }} bold>
              {isMobile ? `- ${t('Ready')}` : `- ${t('Ready to launch')}`}
            </Body>
          ) : (
            <Body size={{ base: 'md', lg: 'lg' }} bold>
              {isMobile
                ? `: ${formattedTime} ${t('to get 21 followers')}`
                : `- ${formattedTime} ${t('left to get to 21 followers')}`}
            </Body>
          )}
          <PopOverInfo />
        </HStack>
        {enoughFollowers && isProjectOwner && (
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
  )
}

const PopOverInfo = () => {
  const isMobile = useMobileMode()
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
