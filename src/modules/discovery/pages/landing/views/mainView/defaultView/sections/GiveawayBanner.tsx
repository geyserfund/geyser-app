import { Box, BoxProps, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { GiveawayCountdown } from '@/modules/discovery/pages/giveaway/components/GiveawayCountdown'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useAcelerandoVipLeaderboardQuery } from '@/types'

const REFRESH_INTERVAL_MS = 60_000

/** Displays the giveaway promotional banner on the discovery landing page. */
export const GiveawayBanner = (props: BoxProps) => {
  const { data, loading } = useAcelerandoVipLeaderboardQuery({
    pollInterval: REFRESH_INTERVAL_MS,
    notifyOnNetworkStatusChange: true,
  })
  const leaderboard = data?.acelerandoVipLeaderboard
  const endDateLabel = leaderboard?.endAt
    ? new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        timeZone: leaderboard?.timezone ?? 'UTC',
      }).format(new Date(leaderboard.endAt))
    : t('soon')
  const ctaButtonBg = useColorModeValue('white', 'neutral1.2')
  const ctaButtonHoverBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const ctaButtonColor = useColorModeValue('gray.900', 'neutral1.12')
  const giveawayPath = getPath('giveawayAcelerandoVip')

  return (
    <Box
      as={Link}
      to={giveawayPath}
      w="full"
      display="block"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      role="group"
      _hover={{ textDecoration: 'none' }}
      {...props}
    >
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
            {t("We're giving 3 VIP tickets to the top contributors on Geyser. Ends {{endDate}}.", {
              endDate: endDateLabel,
            })}
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
            <HStack
              bg={ctaButtonBg}
              color={ctaButtonColor}
              _groupHover={{ bg: ctaButtonHoverBg }}
              borderRadius="md"
              h="32px"
              px={3}
              fontWeight="semibold"
              spacing={1}
            >
              {t('View giveaway')}
              <Icon as={PiArrowRight} />
            </HStack>
          </HStack>
          <Box pt={2} display={{ base: 'none', md: 'block' }}>
            <HStack
              as="span"
              bg={ctaButtonBg}
              color={ctaButtonColor}
              _groupHover={{ bg: ctaButtonHoverBg }}
              borderRadius="md"
              h="32px"
              px={3}
              fontWeight="semibold"
              spacing={1}
            >
              {t('View giveaway')}
              <Icon as={PiArrowRight} />
            </HStack>
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
