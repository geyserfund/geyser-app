import { Box, BoxProps, Button, HStack, Icon, VStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { GiveawayCountdown } from '@/modules/discovery/pages/giveaway/components/GiveawayCountdown'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useAcelerandoVipLeaderboardQuery } from '@/types'

const REFRESH_INTERVAL_MS = 60_000

export const GiveawayBanner = (props: BoxProps) => {
  const { data, loading } = useAcelerandoVipLeaderboardQuery({
    pollInterval: REFRESH_INTERVAL_MS,
    notifyOnNetworkStatusChange: true,
  })
  const leaderboard = data?.acelerandoVipLeaderboard
  const ctaButtonBg = useColorModeValue('white', 'neutral1.2')
  const ctaButtonHoverBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const ctaButtonColor = useColorModeValue('gray.900', 'neutral1.12')

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
        align={{ base: 'flex-start', md: 'center' }}
        flexWrap="wrap"
      >
        <VStack alignItems="flex-start" spacing={1} flex={1} minW="200px">
          <H3 color="white">{t('VIP Ticket Giveaway: Acelerando Bitcoin 2026 Conference')}</H3>
          <Body size="sm" color="whiteAlpha.800" display={{ base: 'none', md: 'block' }}>
            {t("We're giving 3 VIP tickets to the top contributors on Geyser. Ends May 30.")}
          </Body>
          <HStack
            pt={2}
            w="full"
            display={{ base: 'flex', md: 'none' }}
            justify="space-between"
            align="center"
            spacing={3}
          >
            <Box flexShrink={0}>
              <GiveawayCountdown
                compact
                isLoading={loading && !leaderboard}
                startAt={leaderboard?.startAt}
                endAt={leaderboard?.endAt}
                timezone={leaderboard?.timezone}
              />
            </Box>
            <Button
              as={Link}
              to={getPath('giveawayAcelerandoVip')}
              bg={ctaButtonBg}
              color={ctaButtonColor}
              _hover={{ bg: ctaButtonHoverBg }}
              size="sm"
              fontWeight="semibold"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {t('View giveaway')}
            </Button>
          </HStack>
          <Box pt={2} display={{ base: 'none', md: 'block' }}>
            <Button
              as={Link}
              to={getPath('giveawayAcelerandoVip')}
              bg={ctaButtonBg}
              color={ctaButtonColor}
              _hover={{ bg: ctaButtonHoverBg }}
              size="sm"
              fontWeight="semibold"
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {t('View giveaway')}
            </Button>
          </Box>
        </VStack>

        <Box flexShrink={0} display={{ base: 'none', md: 'block' }}>
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
