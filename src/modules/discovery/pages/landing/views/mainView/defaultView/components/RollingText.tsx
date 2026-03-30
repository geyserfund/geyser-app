import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const PHRASE_KEYS = ['support each other', 'fund what matters', 'make ideas happen'] as const

const LINE_HEIGHT = 52
const STEP_SECONDS = 3
const TRANSITION_SECONDS = 0.6
const TOTAL_SECONDS = STEP_SECONDS * PHRASE_KEYS.length

const STEP_PCT = 100 / PHRASE_KEYS.length
const TRANS_PCT = (TRANSITION_SECONDS / TOTAL_SECONDS) * 100
const PAUSE_PCT = STEP_PCT - TRANS_PCT

const KEYFRAMES = {
  '0%': { transform: 'translate3d(0, 0, 0)' },
  [`${PAUSE_PCT.toFixed(2)}%`]: { transform: 'translate3d(0, 0, 0)' },
  [`${STEP_PCT.toFixed(2)}%`]: { transform: `translate3d(0, -${LINE_HEIGHT}px, 0)` },
  [`${(STEP_PCT + PAUSE_PCT).toFixed(2)}%`]: { transform: `translate3d(0, -${LINE_HEIGHT}px, 0)` },
  [`${(2 * STEP_PCT).toFixed(2)}%`]: { transform: `translate3d(0, -${2 * LINE_HEIGHT}px, 0)` },
  [`${(2 * STEP_PCT + PAUSE_PCT).toFixed(2)}%`]: { transform: `translate3d(0, -${2 * LINE_HEIGHT}px, 0)` },
  '100%': { transform: `translate3d(0, -${3 * LINE_HEIGHT}px, 0)` },
}

const ANIMATION_NAME = 'rolling-text'

/** Builds the phrase array for a strip lane, adding a duplicate first item for seamless looping. */
const getStripPhrases = (offset: number): string[] => {
  const items = PHRASE_KEYS.map(
    (_, i) => PHRASE_KEYS[(i + offset + PHRASE_KEYS.length) % PHRASE_KEYS.length] ?? PHRASE_KEYS[0],
  )

  return [...items, items[0] ?? PHRASE_KEYS[0]]
}

const FONT_SIZE = { base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }

/** Vertically rolling text carousel driven by CSS keyframes for GPU-accelerated smoothness. */
export const RollingText = () => {
  const { t } = useTranslation()
  const mutedColor = useColorModeValue('neutral1.9', 'neutral1.7')

  const centerPhrases = getStripPhrases(0)
  const topPhrases = getStripPhrases(-1)
  const bottomPhrases = getStripPhrases(1)

  const stripSx = {
    backfaceVisibility: 'hidden',
    [`@keyframes ${ANIMATION_NAME}`]: KEYFRAMES,
  }

  const animation = `${ANIMATION_NAME} ${TOTAL_SECONDS}s cubic-bezier(0.4, 0, 0.2, 1) infinite`

  /** Phrase-only animated strip, clipped to one line height */
  const PhraseStrip = ({
    phrases,
    color,
    fontWeight,
    fontStyle,
  }: {
    phrases: string[]
    color?: string
    fontWeight?: number
    fontStyle?: string
  }) => (
    <Box overflow="hidden" height={`${LINE_HEIGHT}px`}>
      <Box animation={animation} willChange="transform" sx={stripSx}>
        {phrases.map((phrase, i) => (
          <Box key={i} height={`${LINE_HEIGHT}px`} display="flex" alignItems="center">
            <Text fontSize={FONT_SIZE} color={color} fontWeight={fontWeight} fontStyle={fontStyle} whiteSpace="nowrap">
              {`${t(phrase)}.`}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )

  const PhraseRow = ({
    phrases,
    color,
    fontWeight,
    fontStyle,
    mutedTextVisibility,
  }: {
    phrases: string[]
    color?: string
    fontWeight?: number
    fontStyle?: string
    mutedTextVisibility?: 'visible' | 'hidden'
  }) => (
    <HStack spacing={2} justifyContent="center" minHeight={`${LINE_HEIGHT}px`} alignItems="center">
      <Text fontSize={FONT_SIZE} color={color} visibility={mutedTextVisibility}>
        Bitcoiners
      </Text>
      <PhraseStrip phrases={phrases} color={color} fontWeight={fontWeight} fontStyle={fontStyle} />
      <Text fontSize={FONT_SIZE} color={color} visibility={mutedTextVisibility}>
        {t('Join a community of 85,000+ contributors.')}
      </Text>
    </HStack>
  )

  const MobilePhraseOnlyRow = ({
    phrases,
    color,
    fontStyle,
  }: {
    phrases: string[]
    color?: string
    fontStyle?: string
  }) => (
    <HStack spacing={1} alignItems="center">
      <Text fontSize={FONT_SIZE} color={color} visibility="hidden" whiteSpace="nowrap" aria-hidden="true">
        Bitcoiners
      </Text>
      <PhraseStrip phrases={phrases} color={color} fontStyle={fontStyle} />
    </HStack>
  )

  return (
    <VStack spacing={{ base: 0, sm: 0 }} textAlign="center" pt={0} pb={2} w="full" alignItems="center">
      <VStack display={{ base: 'flex', sm: 'none' }} spacing={0} w="full" alignItems="center">
        <Box opacity={0.35} sx={{ filter: 'blur(1.5px)' }} aria-hidden="true" mb={{ base: '-18px', sm: 0 }}>
          <MobilePhraseOnlyRow phrases={topPhrases} color={mutedColor} fontStyle="italic" />
        </Box>

        <HStack spacing={1} alignItems="center" justifyContent="center">
          <Text fontSize={FONT_SIZE} color={mutedColor} whiteSpace="nowrap">
            Bitcoiners
          </Text>
          <PhraseStrip phrases={centerPhrases} fontWeight={700} color={mutedColor} />
        </HStack>

        <Box opacity={0.35} sx={{ filter: 'blur(1.5px)' }} aria-hidden="true" mt={{ base: '-18px', sm: 0 }}>
          <MobilePhraseOnlyRow phrases={bottomPhrases} color={mutedColor} fontStyle="italic" />
        </Box>

        <Text fontSize={FONT_SIZE} color={mutedColor}>
          {t('Join a community of 85,000+ contributors.')}
        </Text>
      </VStack>

      <VStack display={{ base: 'none', sm: 'flex' }} spacing={0} textAlign="center" w="full" alignItems="center">
        {/* Top blurred row: invisible static "Bitcoiners" + scrolling phrase */}
        <Box opacity={0.35} sx={{ filter: 'blur(1.5px)' }} aria-hidden="true">
          <PhraseRow phrases={topPhrases} color={mutedColor} fontStyle="italic" mutedTextVisibility="hidden" />
        </Box>

        {/* Center row: static "Bitcoiners" + scrolling bold phrase + supporting copy */}
        <PhraseRow phrases={centerPhrases} fontWeight={700} color={mutedColor} />

        {/* Bottom blurred row: invisible static "Bitcoiners" + scrolling phrase */}
        <Box opacity={0.35} sx={{ filter: 'blur(1.5px)' }} aria-hidden="true">
          <PhraseRow phrases={bottomPhrases} color={mutedColor} fontStyle="italic" mutedTextVisibility="hidden" />
        </Box>
      </VStack>
    </VStack>
  )
}
