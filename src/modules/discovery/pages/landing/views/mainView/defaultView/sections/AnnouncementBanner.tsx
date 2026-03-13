import { Box, BoxProps, Button, HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { startTransition, useEffect, useState } from 'react'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { GiveawayCountdown } from '@/modules/discovery/pages/giveaway/components/GiveawayCountdown'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useAcelerandoVipLeaderboardQuery } from '@/types'

const GIVEAWAY_REFRESH_INTERVAL_MS = 60_000
const ROTATION_INTERVAL_MS = 8_000
const ANNOUNCEMENT_COUNT = 2
const GUARDIANS_ANNOUNCEMENT_BACKGROUND_URL =
  'https://storage.googleapis.com/geyser-media/ad-and-announcement-banners/Legend%20guardian.png'

/** Displays rotating landing-page announcements for active campaigns and programs. */
export const AnnouncementBanner = (props: BoxProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { data, error, loading, refetch } = useAcelerandoVipLeaderboardQuery({
    pollInterval: GIVEAWAY_REFRESH_INTERVAL_MS,
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % ANNOUNCEMENT_COUNT)
      })
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [])

  const leaderboard = data?.acelerandoVipLeaderboard
  const giveawayCtaBg = useColorModeValue('white', 'neutral1.2')
  const giveawayCtaHoverBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const giveawayCtaColor = useColorModeValue('gray.900', 'neutral1.12')
  const secondaryButtonColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900')
  const giveawayPath = getPath('giveawayAcelerandoVip')
  const guardiansPath = getPath('guardians')

  return (
    <Box w="full" position="relative" {...props}>
      <Box display="grid" w="full">
        <AnnouncementSlide
          isActive={activeIndex === 0}
          backgroundImage="linear-gradient(120deg, rgba(27, 9, 57, 0.86) 12%, rgba(43, 14, 91, 0.62) 64%, rgba(25, 8, 57, 0.8) 100%), url('/images/acelerando-bitcoin-banner.webp')"
        >
          <VStack alignItems="flex-start" spacing={2} flex={1} minW="220px">
            <Body size="xs" color="whiteAlpha.800" textTransform="uppercase" letterSpacing="0.14em" fontWeight={700}>
              {t('Announcement')}
            </Body>
            <H3 color="white" textShadow="0 1px 12px rgba(0,0,0,0.3)">
              {t('VIP Ticket Giveaway: Acelerando Bitcoin 2026 Conference')}
            </H3>

            <HStack pt={2} spacing={3} flexWrap="wrap" align="center">
              <Button
                as={Link}
                to={giveawayPath}
                bg={giveawayCtaBg}
                color={giveawayCtaColor}
                fontWeight={600}
                _hover={{ bg: giveawayCtaHoverBg, textDecoration: 'none', transform: 'translateY(-1px)' }}
                transition="all 0.2s ease"
                rightIcon={<Icon as={PiArrowRight} />}
                tabIndex={activeIndex === 0 ? undefined : -1}
              >
                {t('View giveaway')}
              </Button>
              {error ? (
                <Button
                  variant="ghost"
                  size="sm"
                  color={secondaryButtonColor}
                  onClick={() => void refetch()}
                  tabIndex={activeIndex === 0 ? undefined : -1}
                >
                  {t('Retry leaderboard')}
                </Button>
              ) : (
                <Box display={{ base: 'block', md: 'none' }}>
                  <GiveawayCountdown
                    compact
                    isLoading={loading && !leaderboard}
                    startAt={leaderboard?.startAt}
                    endAt={leaderboard?.endAt}
                    timezone={leaderboard?.timezone}
                  />
                </Box>
              )}
            </HStack>
          </VStack>

          <Box flexShrink={0} display={{ base: 'none', md: 'block' }}>
            {error ? (
              <Body size="sm" color="whiteAlpha.800">
                {t('Live leaderboard unavailable')}
              </Body>
            ) : (
              <GiveawayCountdown
                compact
                isLoading={loading && !leaderboard}
                startAt={leaderboard?.startAt}
                endAt={leaderboard?.endAt}
                timezone={leaderboard?.timezone}
              />
            )}
          </Box>
        </AnnouncementSlide>

        <AnnouncementSlide
          isActive={activeIndex === 1}
          backgroundImage={`url(${GUARDIANS_ANNOUNCEMENT_BACKGROUND_URL})`}
          backgroundPosition={{ base: '62% 66%', md: 'center 72%' }}
        >
          <VStack alignItems="flex-start" spacing={2} flex={1} minW="220px" position="relative">
            <Text
              fontSize="xs"
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="0.14em"
              bgGradient="linear(to-r, #00C7AD, #EDA000, #FB8876)"
              bgClip="text"
            >
              {t('Geyser Guardians')}
              {' · '}
              {t('Merch')}
            </Text>
            <H3 color="white" textShadow="0 1px 12px rgba(0,0,0,0.3)">
              {t('Wear the mission. Fund the future.')}
            </H3>

            <HStack pt={2} spacing={3} flexWrap="wrap" align="center">
              <Button
                as={Link}
                to={guardiansPath}
                bg={giveawayCtaBg}
                color={giveawayCtaColor}
                fontWeight={600}
                _hover={{ bg: giveawayCtaHoverBg, textDecoration: 'none', transform: 'translateY(-1px)' }}
                transition="all 0.2s ease"
                rightIcon={<Icon as={PiArrowRight} />}
                tabIndex={activeIndex === 1 ? undefined : -1}
              >
                {t('Browse the Guardian Merch')}
              </Button>
            </HStack>
          </VStack>
        </AnnouncementSlide>
      </Box>

      <HStack position="absolute" right={{ base: 5, md: 6 }} bottom={4} spacing={2} zIndex={2}>
        {Array.from({ length: ANNOUNCEMENT_COUNT }).map((_, index) => (
          <Box
            key={index}
            h="6px"
            w={activeIndex === index ? '24px' : '6px'}
            borderRadius="full"
            bg={activeIndex === index ? 'white' : 'whiteAlpha.500'}
            transition="width 0.3s ease, background-color 0.3s ease"
          />
        ))}
      </HStack>
    </Box>
  )
}

type AnnouncementSlideProps = BoxProps & {
  isActive: boolean
}

const AnnouncementSlide = ({
  isActive,
  children,
  backgroundImage,
  backgroundPosition,
  ...props
}: AnnouncementSlideProps) => {
  return (
    <Box
      gridArea="1 / 1"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      aria-hidden={!isActive}
      opacity={isActive ? 1 : 0}
      transform={isActive ? 'translateY(0)' : 'translateY(8px) scale(0.985)'}
      transition="opacity 0.7s ease, transform 0.7s ease"
      pointerEvents={isActive ? 'auto' : 'none'}
      boxShadow="0 2px 20px rgba(0,0,0,0.15)"
      {...props}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage={backgroundImage}
        backgroundPosition={backgroundPosition ?? 'center'}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />

      {/* Subtle inner border shine */}
      <Box
        position="absolute"
        inset={0}
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.100"
        pointerEvents="none"
        zIndex={1}
      />

      <HStack
        position="relative"
        p={{ base: 5, md: 6 }}
        spacing={{ base: 4, md: 8 }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        flexWrap="wrap"
        minH={{ base: '208px', md: '182px' }}
        zIndex={1}
      >
        {children}
      </HStack>
    </Box>
  )
}
