import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

import { Body } from '@/shared/components/typography'


type GiveawayCountdownProps = {
  startAt?: string
  endAt?: string
  timezone?: string
  isLoading?: boolean
  compact?: boolean
}

type TimeSegment = { value: number; label: string }

const getSegments = (millisecondsRemaining: number): TimeSegment[] => {
  const totalSeconds = Math.max(0, Math.floor(millisecondsRemaining / 1000))
  return [
    { value: Math.floor(totalSeconds / 86400), label: 'Days' },
    { value: Math.floor((totalSeconds % 86400) / 3600), label: 'Hours' },
    { value: Math.floor((totalSeconds % 3600) / 60), label: 'Min' },
    { value: totalSeconds % 60, label: 'Sec' },
  ]
}

const CountdownDigit = ({ value, label, compact }: TimeSegment & { compact?: boolean }) => (
  <VStack spacing={compact ? 0.5 : 1} minW={compact ? '40px' : { base: '56px', md: '72px' }}>
    <Box
      px={compact ? 2 : { base: 3, md: 4 }}
      py={compact ? 1.5 : { base: 2, md: 3 }}
      bg="whiteAlpha.200"
      backdropFilter="blur(8px)"
      borderRadius={compact ? 'lg' : 'xl'}
      textAlign="center"
      w="full"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Body bold fontSize={compact ? 'lg' : { base: '2xl', md: '4xl' }} lineHeight={1} color="white">
        {String(value).padStart(2, '0')}
      </Body>
    </Box>
    <Body
      size="2xs"
      color="whiteAlpha.700"
      textTransform="uppercase"
      letterSpacing="wider"
      fontWeight="medium"
      fontSize={compact ? '2xs' : 'xs'}
    >
      {label}
    </Body>
  </VStack>
)

export const GiveawayCountdown = ({ startAt, endAt, timezone, isLoading, compact }: GiveawayCountdownProps) => {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const segments = useMemo(() => {
    if (!endAt) return getSegments(0)
    return getSegments(new Date(endAt).getTime() - now)
  }, [endAt, now])

  if (isLoading) {
    return (
      <HStack spacing={compact ? 2 : 4} justify="center">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`cd-skel-${i}`} h={compact ? '44px' : '72px'} w={compact ? '40px' : '72px'} borderRadius={compact ? 'lg' : 'xl'} />
        ))}
      </HStack>
    )
  }

  if (!startAt || !endAt || !timezone) {
    return null
  }

  return (
    <HStack spacing={compact ? 1.5 : { base: 2, md: 3 }} aria-live="polite" aria-label="Countdown to giveaway end">
      {segments.map((seg) => (
        <CountdownDigit key={seg.label} {...seg} compact={compact} />
      ))}
    </HStack>
  )
}
