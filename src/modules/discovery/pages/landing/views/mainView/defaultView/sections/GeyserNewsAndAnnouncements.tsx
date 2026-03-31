import { Box, Button, HStack, IconButton, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useAcelerandoVipLeaderboardQuery } from '@/types/index.ts'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const ACELERANDO_ANNOUNCEMENT_IMAGE_URL = '/images/acelerando-bitcoin-banner.webp'
const GUARDIANS_ANNOUNCEMENT_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/ad-and-announcement-banners/Legend%20guardian.png'
const TWITTER_ANNOUNCEMENT_IMAGE_URL = 'https://pbs.twimg.com/media/HCAkLUmaMAQhj5E?format=jpg&name=large'
const TWITTER_ANNOUNCEMENT_LINK_URL = 'https://x.com/geyserfund/status/2026664217634549904'
const YOUTUBE_VIDEO_ONE_URL = 'https://www.youtube.com/watch?v=e5PTRMz27vA'
const YOUTUBE_VIDEO_TWO_URL = 'https://www.youtube.com/watch?v=i6FIvDddrdw'
const YOUTUBE_VIDEO_ONE_THUMBNAIL_URL = 'https://img.youtube.com/vi/e5PTRMz27vA/hqdefault.jpg'
const YOUTUBE_VIDEO_TWO_THUMBNAIL_URL = 'https://img.youtube.com/vi/i6FIvDddrdw/hqdefault.jpg'

type AnnouncementCardProps = {
  description: string
  eyebrow: string
  footer: ReactNode
  href?: string
  imagePosition?: { base: string; lg: string }
  imageUrl: string
  title: string
  to?: string
}

const AnnouncementCard = ({
  description,
  eyebrow,
  footer,
  href,
  imagePosition,
  imageUrl,
  title,
  to,
}: AnnouncementCardProps) => {
  const navigate = useNavigate()
  const borderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const cardBackground = useColorModeValue('utils.pbg', 'neutral1.3')
  const descriptionColor = 'neutralAlpha.11'
  const eyebrowBackground = useColorModeValue('utils.pbg', 'neutral1.2')
  const eyebrowColor = useColorModeValue('neutral1.11', 'neutral1.12')

  const handleNavigate = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    if (to) {
      navigate(to)
    }
  }

  return (
    <VStack
      width="100%"
      height="100%"
      alignItems="start"
      spacing={0}
      backgroundColor={cardBackground}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="12px"
      boxShadow="sm"
      cursor="pointer"
      overflow="hidden"
      role="group"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleNavigate()
        }
      }}
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s ease"
    >
      <Box width="100%" padding={2}>
        <Box width="100%" position="relative">
          <ImageWithReload
            src={imageUrl}
            alt={title}
            width="100%"
            aspectRatio={1.45}
            borderRadius="8px"
            objectFit="cover"
            objectPosition={imagePosition}
          />
          <HStack
            position="absolute"
            left={4}
            bottom={4}
            backgroundColor={eyebrowBackground}
            borderRadius="md"
            paddingX={2}
            paddingY={1}
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            maxWidth="calc(100% - 32px)"
          >
            <Body size="xs" medium color={eyebrowColor} isTruncated>
              {eyebrow}
            </Body>
          </HStack>
        </Box>
      </Box>

      <VStack width="100%" alignItems="start" spacing={3} paddingX={4} paddingTop={1} paddingBottom={4}>
        <H3 size="md" medium width="100%" noOfLines={2}>
          {title}
        </H3>
        <Body
          size="md"
          color={descriptionColor}
          width="100%"
          noOfLines={3}
          lineHeight="1.4"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          {description}
        </Body>
        <Box width="100%" marginTop="auto">
          {footer}
        </Box>
      </VStack>
    </VStack>
  )
}

/** Landing section surfacing Geyser-managed announcements in the standard card layout. */
export const GeyserNewsAndAnnouncements = () => {
  const { data, error, loading, refetch } = useAcelerandoVipLeaderboardQuery()
  const accentColor = useColorModeValue('primary1.11', 'primary1.9')
  const mutedTextColor = 'neutralAlpha.11'
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)

  const giveawayEndDate = data?.acelerandoVipLeaderboard?.endAt
    ? (() => {
        const parsedDate = DateTime.fromISO(data.acelerandoVipLeaderboard.endAt)

        return parsedDate.isValid ? parsedDate.toFormat('dd LLL, yyyy') : undefined
      })()
    : undefined

  useEffect(() => {
    const element = scrollContainerRef.current

    if (!element) {
      return
    }

    const updateScrollState = () => {
      setHasOverflow(element.scrollWidth > element.clientWidth + 1)
      setCanScrollLeft(element.scrollLeft > 0)
      setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
    }

    updateScrollState()

    element.addEventListener('scroll', updateScrollState)

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(element)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [])

  const announcementCards = useMemo(() => {
    const giveawayFooter = (() => {
      if (loading && !giveawayEndDate) {
        return <Skeleton height="20px" width="140px" borderRadius="md" />
      }

      if (error) {
        return (
          <HStack spacing={3} alignItems="center" flexWrap="wrap">
            <Body size="sm" color={mutedTextColor}>
              {t('Giveaway timing unavailable')}
            </Body>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="primary1"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                refetch().catch(() => undefined)
              }}
            >
              {t('Retry')}
            </Button>
          </HStack>
        )
      }

      return (
        <Body size="sm" color={accentColor} medium>
          {giveawayEndDate ? t('Ends {{date}}', { date: giveawayEndDate }) : t('View giveaway')}
        </Body>
      )
    })()

    return [
      {
        description: t('Enter for a chance to win a VIP ticket to the Acelerando Bitcoin 2026 conference.'),
        eyebrow: t('Announcement'),
        footer: giveawayFooter,
        imagePosition: { base: '62% center', lg: 'center' },
        imageUrl: ACELERANDO_ANNOUNCEMENT_IMAGE_URL,
        title: t('VIP Ticket Giveaway: Acelerando Bitcoin 2026'),
        to: getPath('giveawayAcelerandoVip'),
      },
      {
        description: t('Wear the mission, fund the future, and browse the latest Geyser Guardians merch.'),
        eyebrow: t('Merch'),
        footer: (
          <Body size="sm" color={accentColor} medium>
            {t('Browse the collection')}
          </Body>
        ),
        imagePosition: { base: '80% 66%', lg: '78% 72%' },
        imageUrl: GUARDIANS_ANNOUNCEMENT_IMAGE_URL,
        title: t('Geyser Guardians Merch'),
        to: getPath('guardians'),
      },
      {
        description: t('Read the latest Geyser announcement shared on X.'),
        eyebrow: t('News'),
        footer: (
          <Body size="sm" color={accentColor} medium>
            {t('Read on X')}
          </Body>
        ),
        href: TWITTER_ANNOUNCEMENT_LINK_URL,
        imageUrl: TWITTER_ANNOUNCEMENT_IMAGE_URL,
        title: t('Latest Announcement from Geyser'),
      },
      {
        description: t('Watch the latest featured Geyser conversation on YouTube.'),
        eyebrow: t('Video'),
        footer: (
          <Body size="sm" color={accentColor} medium>
            {t('Watch on YouTube')}
          </Body>
        ),
        href: YOUTUBE_VIDEO_ONE_URL,
        imageUrl: YOUTUBE_VIDEO_ONE_THUMBNAIL_URL,
        title: t('Featured Geyser Video'),
      },
      {
        description: t('Catch another recent Geyser video update on YouTube.'),
        eyebrow: t('Video'),
        footer: (
          <Body size="sm" color={accentColor} medium>
            {t('Watch on YouTube')}
          </Body>
        ),
        href: YOUTUBE_VIDEO_TWO_URL,
        imageUrl: YOUTUBE_VIDEO_TWO_THUMBNAIL_URL,
        title: t('More from Geyser on YouTube'),
      },
    ]
  }, [accentColor, error, giveawayEndDate, loading, refetch])

  const scrollCards = (direction: 'left' | 'right') => {
    const element = scrollContainerRef.current

    if (!element) {
      return
    }

    element.scrollBy({
      left: direction === 'left' ? -element.clientWidth : element.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <ProjectRowLayout
      id="landing-geyser-news-announcements"
      title={t('News & Announcements')}
      scrollMarginTop={{ base: '110px', lg: '140px' }}
      width="100%"
      rightContent={
        hasOverflow ? (
          <HStack spacing={2}>
            <IconButton
              aria-label={t('Scroll news cards left')}
              icon={<PiArrowLeft />}
              variant="ghost"
              colorScheme="neutral1"
              color="utils.text"
              onClick={() => scrollCards('left')}
              isDisabled={!canScrollLeft}
              _disabled={{
                background: 'transparent',
                color: 'neutral1.8',
                cursor: 'default',
                opacity: 1,
              }}
            />
            <IconButton
              aria-label={t('Scroll news cards right')}
              icon={<PiArrowRight />}
              variant="ghost"
              colorScheme="neutral1"
              color="utils.text"
              onClick={() => scrollCards('right')}
              isDisabled={!canScrollRight}
              _disabled={{
                background: 'transparent',
                color: 'neutral1.8',
                cursor: 'default',
                opacity: 1,
              }}
            />
          </HStack>
        ) : undefined
      }
    >
      <Box
        ref={scrollContainerRef}
        width="100%"
        overflowX="auto"
        overflowY="hidden"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          display="grid"
          gridAutoFlow="column"
          gridAutoColumns={{ base: '85vw', md: '420px', lg: 'calc((100% - 4rem) / 3)' }}
          gap={{ base: 6, lg: 8 }}
          width="100%"
          paddingBottom={1}
        >
          {announcementCards.map((card) => (
            <Box key={card.title} width="100%" minWidth={0}>
              <AnnouncementCard {...card} />
            </Box>
          ))}
        </Box>
      </Box>
    </ProjectRowLayout>
  )
}
