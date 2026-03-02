import { useQuery } from '@apollo/client'
import { Box, BoxProps, Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { QUERY_ACELERANDO_VIP_LEADERBOARD } from '@/modules/discovery/graphql/queries/giveawayQuery'
import { GiveawayCountdown } from '@/modules/discovery/pages/giveaway/components/GiveawayCountdown'
import { AcelerandoVipLeaderboardQueryData } from '@/modules/discovery/pages/giveaway/types'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

const REFRESH_INTERVAL_MS = 60_000

export const GiveawayBanner = (props: BoxProps) => {
  const { data, loading } = useQuery<AcelerandoVipLeaderboardQueryData>(QUERY_ACELERANDO_VIP_LEADERBOARD, {
    pollInterval: REFRESH_INTERVAL_MS,
    notifyOnNetworkStatusChange: true,
  })
  const leaderboard = data?.acelerandoVipLeaderboard

  return (
    <Box w="full" position="relative" overflow="hidden" borderRadius="xl" {...props}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage="linear-gradient(120deg, rgba(27, 9, 57, 0.86) 12%, rgba(43, 14, 91, 0.62) 64%, rgba(25, 8, 57, 0.8) 100%), url('/images/acelerando-bitcoin-banner.webp')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />

      <HStack
        position="relative"
        p={{ base: 5, md: 6 }}
        spacing={{ base: 4, md: 8 }}
        justify="space-between"
        align="center"
        flexWrap="wrap"
      >
        <VStack alignItems="flex-start" spacing={1} flex={1} minW="200px">
          <H3 color="white">VIP Ticket Giveaway: Acelerando Bitcoin 2026 Conference</H3>
          <Body size="sm" color="whiteAlpha.800">
            We&apos;re giving 3 VIP tickets to the top contributors on Geyser. Ends May 30.
          </Body>
          <Box pt={2}>
            <Button
              as={Link}
              to={getPath('giveawayAcelerandoVip')}
              bg="white"
              color="gray.900"
              _hover={{ bg: 'whiteAlpha.900' }}
              size="sm"
              fontWeight="semibold"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              View giveaway
            </Button>
          </Box>
        </VStack>

        <Box flexShrink={0}>
          <GiveawayCountdown
            compact
            isLoading={loading && !leaderboard}
            startAt={leaderboard?.startAt}
            endAt={leaderboard?.endAt}
            timezone={leaderboard?.timezone}
          />
        </Box>
      </HStack>
    </Box>
  )
}
