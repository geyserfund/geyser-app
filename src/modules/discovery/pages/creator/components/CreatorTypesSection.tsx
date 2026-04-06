import { Box, Grid, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  FaBolt,
  FaCalendarAlt,
  FaCode,
  FaFilm,
  FaHeart,
  FaMicrophone,
  FaPenFancy,
  FaQuoteLeft,
  FaRocket,
  FaVideo,
} from 'react-icons/fa'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const FILM_IMAGE_URL =
  'https://images.unsplash.com/photo-1758788506109-8ed33e99d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBkb2N1bWVudGFyeSUyMGNhbWVyYSUyMHNob290aW5nfGVufDF8fHx8MTc3NTA2NTAyOHww&ixlib=rb-4.1.0&q=80&w=900'
const PODCAST_IMAGE_URL =
  'https://images.unsplash.com/photo-1668606144327-837f2d8eac94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwbWljcm9waG9uZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzUwMTU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=900'
const CODE_IMAGE_URL =
  'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwc291cmNlJTIwZGV2ZWxvcGVyJTIwY29kaW5nJTIwbGFwdG9wfGVufDF8fHx8MTc3NTA2NTAyOXww&ixlib=rb-4.1.0&q=80&w=900'
const STARTUP_IMAGE_URL =
  'https://images.unsplash.com/photo-1758873268933-e0765262e58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMG9mZmljZSUyMGNvbGxhYm9yYXRpb24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzUwNjUwMzZ8MA&ixlib=rb-4.1.0&q=80&w=900'
const WRITER_IMAGE_URL =
  'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0ZXIlMjBhdXRob3IlMjBib29rJTIwd3JpdGluZyUyMGRlc2slMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NzUwNjUwMzV8MA&ixlib=rb-4.1.0&q=80&w=900'
const SOCIAL_IMAGE_URL =
  'https://images.unsplash.com/photo-1595702700955-dbbc28a59da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBjYXVzZSUyMHByb3Rlc3QlMjBhY3RpdmlzbSUyMHBlb3BsZSUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NTA2NTAzOHww&ixlib=rb-4.1.0&q=80&w=900'
const EVENT_IMAGE_URL =
  'https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzc3Jvb3RzJTIwY29tbXVuaXR5JTIwb3JnYW5pemluZyUyMGV2ZW50JTIwcGVvcGxlfGVufDF8fHx8MTc3NTA2NTAzMHww&ixlib=rb-4.1.0&q=80&w=900'
const CONTENT_IMAGE_URL =
  'https://images.unsplash.com/photo-1617899516937-54fb61f7d3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHlvdXR1YmVyJTIwZmlsbWluZyUyMHNldHVwfGVufDF8fHx8MTc3NTA2NTAzNXww&ixlib=rb-4.1.0&q=80&w=900'
const BITCOIN_IMAGE_URL =
  'https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGdsb3dpbmclMjBuZXVyYWx8ZW58MXx8fHwxNzc1MDY1MDM0fDA&ixlib=rb-4.1.0&q=80&w=900'

const INTERVAL_MS = 10000

type CreatorTypeCategory = {
  id: string
  name: string
  icon: IconType
  color: string
  imageUrl: string
  shortDescription: string
  longDescription: string
  testimonial: {
    quote: string
    author: string
    role: string
    initials: string
  }
  stats: string[]
}

const withAlpha = (hexColor: string, alpha: number) => {
  const color = hexColor.trim().replace('#', '')

  if (color.length !== 6) {
    return `rgba(255, 255, 255, ${alpha})`
  }

  const red = Number.parseInt(color.slice(0, 2), 16)
  const green = Number.parseInt(color.slice(2, 4), 16)
  const blue = Number.parseInt(color.slice(4, 6), 16)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

type CategoryCardProps = {
  category: CreatorTypeCategory
  isActive: boolean
  onClick: () => void
  panelBackground: string
  borderColor: string
  textColor: string
  mutedTextColor: string
}

const SideCard = ({
  category,
  isActive,
  onClick,
  panelBackground,
  borderColor,
  textColor,
  mutedTextColor,
}: CategoryCardProps) => {
  return (
    <motion.div>
      <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
        <Box
          as="button"
          type="button"
          onClick={onClick}
          aria-label={t('Show {{name}}', { name: category.name })}
          w="full"
          textAlign="left"
          display="flex"
          alignItems="center"
          gap={3}
          px={3.5}
          py={3}
          borderRadius="14px"
          bg={isActive ? withAlpha(category.color, 0.08) : panelBackground}
          borderWidth={isActive ? '1.5px' : '1px'}
          borderColor={isActive ? withAlpha(category.color, 0.38) : borderColor}
          boxShadow={
            isActive
              ? `0 0 20px ${withAlpha(category.color, 0.13)}, 0 4px 16px rgba(0,0,0,0.12)`
              : '0 2px 8px rgba(0,0,0,0.06)'
          }
          transition="background-color 0.35s, border-color 0.35s, box-shadow 0.35s"
          position="relative"
          overflow="hidden"
          _focusVisible={{ outline: '2px solid', outlineColor: 'primary1.8', outlineOffset: '2px' }}
        >
          <Box
            flexShrink={0}
            w="32px"
            h="32px"
            borderRadius="9px"
            bg={withAlpha(category.color, 0.12)}
            borderWidth="1px"
            borderColor={withAlpha(category.color, 0.21)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={category.color}
          >
            <Icon as={category.icon} boxSize={4} />
          </Box>

          <Box minW={0}>
            <Body
              size="sm"
              fontWeight={700}
              lineHeight={1.2}
              color={isActive ? category.color : textColor}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {category.name}
            </Body>
            <Body
              size="xs"
              mt={0.5}
              color={mutedTextColor}
              lineHeight={1.3}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {category.shortDescription}
            </Body>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  )
}

/** Interactive creator category section for the /creator page "Who it's for" experience. */
export const CreatorTypesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(Date.now())

  const sectionBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const sectionBorderColor = useColorModeValue('neutral1.6', 'neutral1.5')
  const panelBackground = useColorModeValue('var(--chakra-colors-white)', 'var(--chakra-colors-neutral1-3)')
  const panelBorderColor = useColorModeValue('var(--chakra-colors-neutral1-6)', 'var(--chakra-colors-neutral1-5)')
  const panelTextColor = useColorModeValue('var(--chakra-colors-neutral1-12)', 'var(--chakra-colors-neutral1-11)')
  const panelMutedTextColor = useColorModeValue('var(--chakra-colors-neutral1-10)', 'var(--chakra-colors-neutral1-9)')
  const headingAccentColor = useColorModeValue('primary1.9', 'primary1.8')
  const introTextColor = useColorModeValue('neutral1.10', 'neutral1.9')
  const centerCardShadow = useColorModeValue('0 32px 80px rgba(0,0,0,0.18)', '0 32px 80px rgba(0,0,0,0.55)')

  const categories: CreatorTypeCategory[] = [
    {
      id: 'filmmakers',
      name: t('Filmmakers'),
      icon: FaFilm,
      color: '#ff6b6b',
      imageUrl: FILM_IMAGE_URL,
      shortDescription: t('Stories that deserve a wide audience'),
      longDescription: t(
        'Filmmakers come to Geyser to fund documentaries, shorts, and features with direct community backing while keeping full creative control',
      ),
      testimonial: {
        quote: t(
          'Within two weeks, 200 people from 14 countries were backing my project. I had no idea there was an audience out there waiting for this story',
        ),
        author: 'Maria S.',
        role: t('Documentary Filmmaker, Brazil'),
        initials: 'MS',
      },
      stats: [t('200+ backers in 14 days'), t('14 countries reached'), t('Fully funded')],
    },
    {
      id: 'podcasters',
      name: t('Podcasters'),
      icon: FaMicrophone,
      color: '#ffd93d',
      imageUrl: PODCAST_IMAGE_URL,
      shortDescription: t('Long-form conversations with loyal listeners'),
      longDescription: t(
        'Podcasters use Geyser to fund new seasons, upgrade production, and host live events while listeners directly back the show',
      ),
      testimonial: {
        quote: t(
          'My listeners wanted more episodes and a way to contribute. Geyser gave them that. We funded three months of production in under two weeks',
        ),
        author: 'James T.',
        role: t('Independent Podcast Host, Kenya'),
        initials: 'JT',
      },
      stats: [t('3 months funded'), t('500+ listeners backed'), t('No ads required')],
    },
    {
      id: 'opensource',
      name: t('Open Source Builders'),
      icon: FaCode,
      color: '#6bcb77',
      imageUrl: CODE_IMAGE_URL,
      shortDescription: t('Infrastructure built for everyone'),
      longDescription: t(
        'Open-source developers fund their work through communities that understand why it matters and depend on these tools',
      ),
      testimonial: {
        quote: t(
          'I trained the first open-source Bitcoin AI model through a Geyser campaign. The community backed the mission before a single line of code was written',
        ),
        author: 'Aleks S.',
        role: t('Open Source Developer, Bitcoin Community'),
        initials: 'AS',
      },
      stats: [t('Community-funded R&D'), t('Transparent milestones'), t('Global contributors')],
    },
    {
      id: 'content-creators',
      name: t('Content Creators'),
      icon: FaVideo,
      color: '#00f5dc',
      imageUrl: CONTENT_IMAGE_URL,
      shortDescription: t('Videos, channels, and creative worlds'),
      longDescription: t(
        'YouTubers, streamers, and independent media creators build sustainable channels through direct community support',
      ),
      testimonial: {
        quote: t(
          'I spent two years building an audience before I could monetize. Geyser let me skip the ad game and fund the channel through the people who actually watch',
        ),
        author: 'Leo M.',
        role: t('Independent Creator, Philippines'),
        initials: 'LM',
      },
      stats: [t('Direct fan support'), t('Own your channel'), t('No algorithm dependency')],
    },
    {
      id: 'writers',
      name: t('Writers'),
      icon: FaPenFancy,
      color: '#fb923c',
      imageUrl: WRITER_IMAGE_URL,
      shortDescription: t('Books, essays, and journalism'),
      longDescription: t(
        'Authors, journalists, and essayists fund projects before publication and build committed readerships from the first draft',
      ),
      testimonial: {
        quote: t(
          'I funded my first book before finishing the manuscript. The backers gave me deadlines, accountability, and a launch community all at once',
        ),
        author: 'Priya R.',
        role: t('Author and Journalist, India'),
        initials: 'PR',
      },
      stats: [t('Pre-launch readership'), t('No publisher needed'), t('Funded 3 months early')],
    },
    {
      id: 'social-causes',
      name: t('Social Causes'),
      icon: FaHeart,
      color: '#f472b6',
      imageUrl: SOCIAL_IMAGE_URL,
      shortDescription: t('Movements powered by shared belief'),
      longDescription: t(
        'Organizers and advocates find communities that share their conviction, and momentum builds naturally from aligned support',
      ),
      testimonial: {
        quote: t(
          'We launched a Bitcoin education initiative for underserved communities. Supporters came from 30 countries. The funding gave the program a full year of runway',
        ),
        author: 'Anita P.',
        role: t('Educator and Advocate, Africa'),
        initials: 'AP',
      },
      stats: [t('30 countries reached'), t('12-month runway funded'), t('Ongoing supporter base')],
    },
    {
      id: 'events',
      name: t('Event Organizers'),
      icon: FaCalendarAlt,
      color: '#34d399',
      imageUrl: EVENT_IMAGE_URL,
      shortDescription: t('Gatherings that build lasting communities'),
      longDescription: t(
        'Event organizers pre-fund meetups, conferences, and gatherings so community commitment happens before logistics',
      ),
      testimonial: {
        quote: t(
          'We funded a sold-out Bitcoin meetup series across three cities. The campaign ran for 10 days. We are now planning the fourth city',
        ),
        author: 'Carlos V.',
        role: t('Community Organizer, Mexico City'),
        initials: 'CV',
      },
      stats: [t('3 cities, 10 days'), t('Sold out before launch'), t('Recurring community')],
    },
    {
      id: 'bitcoin',
      name: t('Bitcoin Communities'),
      icon: FaBolt,
      color: '#f59e0b',
      imageUrl: BITCOIN_IMAGE_URL,
      shortDescription: t('Builders shaping the open financial future'),
      longDescription: t(
        'Bitcoin developers, educators, and advocates fund their work with aligned communities that understand the mission',
      ),
      testimonial: {
        quote: t(
          'Building on Bitcoin meant building with people who get it. Geyser was the only place where our campaign and our values were in the same room',
        ),
        author: 'Kofi A.',
        role: t('Bitcoin Developer, Ghana'),
        initials: 'KA',
      },
      stats: [t('Bitcoin-native payments'), t('Mission-aligned community'), t('No fiat friction')],
    },
    {
      id: 'startups',
      name: t('Startups'),
      icon: FaRocket,
      color: '#a78bfa',
      imageUrl: STARTUP_IMAGE_URL,
      shortDescription: t('Early ideas finding their first community'),
      longDescription: t(
        'Early-stage founders validate ideas with the people most likely to care, turning campaigns into first product feedback loops',
      ),
      testimonial: {
        quote: t(
          'We raised our first $40K from the exact users we were building for. They gave us feedback before launch that changed the product entirely',
        ),
        author: 'Yana K.',
        role: t('Founder, Estonia'),
        initials: 'YK',
      },
      stats: [t('First $40K from users'), t('Product feedback pre-launch'), t('Community-validated')],
    },
  ]

  const categoryCount = categories.length

  useEffect(() => {
    startTimeRef.current = Date.now()
    setProgress(0)

    const intervalId = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % categoryCount)
    }, INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, categoryCount])

  useEffect(() => {
    startTimeRef.current = Date.now()

    const progressIntervalId = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100))
    }, 40)

    return () => window.clearInterval(progressIntervalId)
  }, [activeIndex])

  const activeCategory = categories[activeIndex] ?? categories[0]

  if (!activeCategory) {
    return null
  }

  return (
    <Box
      as="section"
      w="full"
      py={{ base: 16, lg: 24 }}
      bg={sectionBackground}
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor={sectionBorderColor}
    >
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 8, lg: 12 }}>
          <VStack align="center" spacing={3} textAlign="center" maxW="760px" mx="auto">
            <Body
              size="sm"
              color={headingAccentColor}
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              {t("Who it's for")}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('Every kind of creator is welcome here')}
            </H2>
            <Body size="md" color={introTextColor}>
              {t(
                'From a filmmaker with a story to tell, to a developer shipping open-source tools, this is for anyone with a vision and a community to serve',
              )}
            </Body>
          </VStack>

          <Grid
            templateColumns={{ base: '1fr', lg: '320px minmax(0, 1fr)' }}
            gap={{ base: 4, lg: 6 }}
            alignItems="start"
          >
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: '1fr' }} gap={2.5}>
              {categories.map((category, index) => (
                <SideCard
                  key={category.id}
                  category={category}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  panelBackground={panelBackground}
                  borderColor={panelBorderColor}
                  textColor={panelTextColor}
                  mutedTextColor={panelMutedTextColor}
                />
              ))}
            </Grid>

            <VStack align="stretch" spacing={4}>
              <Box
                position="relative"
                minH={{ base: '460px', lg: '480px' }}
                borderRadius="24px"
                overflow="hidden"
                borderWidth="1px"
                borderColor={panelBorderColor}
                boxShadow={`${centerCardShadow}, 0 0 0 1px ${withAlpha(activeCategory.color, 0.09)}`}
                transition="box-shadow 0.5s ease"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`creator-type-image-${activeIndex}`}
                    src={activeCategory.imageUrl}
                    alt={activeCategory.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                    }}
                  />
                </AnimatePresence>

                <Box
                  position="absolute"
                  inset={0}
                  background="linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.92) 100%)"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`creator-type-tint-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(ellipse at 30% 80%, ${withAlpha(
                        activeCategory.color,
                        0.13,
                      )} 0%, transparent 60%)`,
                    }}
                  />
                </AnimatePresence>

                <VStack
                  position="relative"
                  zIndex={2}
                  h="full"
                  minHeight="480px"
                  align="stretch"
                  spacing={0}
                  justifyContent="flex-end"
                  px={{ base: 5, lg: 8 }}
                  pt={7}
                  pb={4}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`creator-type-content-${activeIndex}`}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <H3
                        as="h3"
                        size={{ base: 'xl', lg: '3xl' }}
                        bold
                        color="white"
                        lineHeight={1.1}
                        letterSpacing="-0.02em"
                        mb={1}
                      >
                        {activeCategory.name}
                      </H3>
                      <Body size="sm" lineHeight={1.65} color="whiteAlpha.800" mb={5} maxW="520px">
                        {activeCategory.longDescription}
                      </Body>

                      <HStack spacing={2} flexWrap="wrap" mb={5.5}>
                        {activeCategory.stats.map((stat) => (
                          <Box
                            key={stat}
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontSize="11px"
                            fontWeight={600}
                            color={activeCategory.color}
                            backgroundColor={withAlpha(activeCategory.color, 0.1)}
                            borderWidth="1px"
                            borderColor={withAlpha(activeCategory.color, 0.25)}
                            letterSpacing="0.03em"
                          >
                            {stat}
                          </Box>
                        ))}
                      </HStack>
                    </motion.div>
                  </AnimatePresence>

                  <Box mt={6} h="3px" bg="whiteAlpha.200" borderRadius="2px">
                    <motion.div
                      key={`creator-type-progress-${activeIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.08, ease: 'linear' }}
                      style={{ height: '100%', borderRadius: 2, backgroundColor: activeCategory.color }}
                    />
                  </Box>

                  <HStack justify="center" spacing={1.5} py={4.5}>
                    {categories.map((category, index) => (
                      <Box
                        key={category.id}
                        as="button"
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={t('Show {{name}}', { name: category.name })}
                        aria-current={activeIndex === index ? 'true' : undefined}
                        w={activeIndex === index ? '20px' : '6px'}
                        h="6px"
                        borderRadius="3px"
                        bg={activeIndex === index ? activeCategory.color : 'whiteAlpha.500'}
                        border="none"
                        p={0}
                        cursor="pointer"
                        transition="all 0.3s ease"
                        _focusVisible={{ outline: '2px solid', outlineColor: 'primary1.8', outlineOffset: '2px' }}
                      />
                    ))}
                  </HStack>
                </VStack>
              </Box>

              <Box
                borderRadius="16px"
                borderWidth="1px"
                borderColor={panelBorderColor}
                backgroundColor={panelBackground}
                px={{ base: 4, lg: 5 }}
                py={{ base: 4, lg: 4.5 }}
              >
                <HStack align="start" spacing={3.5}>
                  <Box
                    flexShrink={0}
                    w="38px"
                    h="38px"
                    borderRadius="full"
                    bg={withAlpha(activeCategory.color, 0.18)}
                    borderWidth="1.5px"
                    borderColor={withAlpha(activeCategory.color, 0.38)}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="12px"
                    fontWeight={700}
                    color={activeCategory.color}
                    mt={0.5}
                  >
                    {activeCategory.testimonial.initials}
                  </Box>

                  <Box flex={1}>
                    <Box color={activeCategory.color} opacity={0.75} mb={1.5}>
                      <Icon as={FaQuoteLeft} boxSize={3.5} />
                    </Box>
                    <Body size="sm" lineHeight={1.55} color={panelTextColor} fontStyle="italic" mb={2}>
                      &ldquo;{activeCategory.testimonial.quote}&rdquo;
                    </Body>
                    <Body size="xs" fontWeight={600} color={panelMutedTextColor}>
                      {t('{{author}} - {{role}}', {
                        author: activeCategory.testimonial.author,
                        role: activeCategory.testimonial.role,
                      })}
                    </Body>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Grid>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
