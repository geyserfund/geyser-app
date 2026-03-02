import { Box, Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { PiArrowRight, PiMapPinBold } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions'
import { standardPadding } from '@/shared/styles'
import type { AcelerandoVipLeaderboardResponse } from '../types.ts'
import { formatDateTimeWithTimezone } from '../utils.ts'

import { GiveawayCountdown } from './GiveawayCountdown.tsx'

type GiveawayHeroProps = {
  leaderboard?: AcelerandoVipLeaderboardResponse
  leaderboardLoading: boolean
  backgroundImage: string
}

export const GiveawayHero = ({ leaderboard, leaderboardLoading, backgroundImage }: GiveawayHeroProps) => {
  const hasDates = leaderboard?.startAt && leaderboard?.endAt && leaderboard?.timezone

  return (
    <Box w="100%" position="relative" overflow="hidden" ml="50%" transform="translateX(-50%)" borderRadius={'xl'}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage={backgroundImage}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />

      <Box
        position="relative"
        w="full"
        maxWidth={`${dimensions.maxWidth}px`}
        mx="auto"
        paddingX={standardPadding}
        pt={{ base: 12, md: 20 }}
        pb={{ base: 4, md: 8 }}
      >
        <VStack align="stretch" spacing={6} maxW="100%">
          <HStack spacing={2}>
            <Icon as={PiMapPinBold} boxSize={4} color="whiteAlpha.700" />
            <Body
              size="sm"
              color="whiteAlpha.700"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Bitcoin-only conference &middot; Paraguay
            </Body>
          </HStack>

          <VStack align="stretch" spacing={3}>
            <H2 size="3xl" bold lineHeight={1.1} color="white">
              Win a VIP Ticket to Acelerando Bitcoin 2026 in Paraguay
            </H2>
            <Body size="lg" color="whiteAlpha.800">
              We&apos;re partnering with Acelerando Bitcoin to give away 3 VIP conference passes to the top
              contributors on Geyser. Contribute to any project and climb the leaderboard before May 30.
            </Body>
          </VStack>

          <HStack spacing={4} pt={2} flexWrap="wrap" align="center">
            <Box flex={1}>
              <GiveawayCountdown
                isLoading={leaderboardLoading && !leaderboard}
                startAt={leaderboard?.startAt}
                endAt={leaderboard?.endAt}
                timezone={leaderboard?.timezone}
              />
            </Box>
            <HStack spacing={3} flexShrink={0} flexWrap="wrap" justify="flex-end">
              <Button
                as="a"
                href="https://acelerandobitcoin.com/"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                color="white"
                borderColor="whiteAlpha.400"
                _hover={{ bg: 'whiteAlpha.100', borderColor: 'whiteAlpha.600' }}
              >
                About the conference
              </Button>
              <Button
                as={RouterLink}
                to={getPath('projectDiscovery')}
                bg="white"
                color="gray.900"
                _hover={{ bg: 'whiteAlpha.900' }}
                size="lg"
                fontWeight="semibold"
                rightIcon={<Icon as={PiArrowRight} />}
              >
                Start contributing
              </Button>
            </HStack>
          </HStack>
        </VStack>

        {hasDates && (
          <Body size="xs" color="whiteAlpha.500" textAlign="center" pt={4}>
            {formatDateTimeWithTimezone(leaderboard!.startAt, leaderboard!.timezone)} &ndash;{' '}
            {formatDateTimeWithTimezone(leaderboard!.endAt, leaderboard!.timezone)}
          </Body>
        )}
      </Box>
    </Box>
  )
}
