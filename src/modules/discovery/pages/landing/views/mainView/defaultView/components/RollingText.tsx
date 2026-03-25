import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'

const PHRASES = ['support each other', 'fund what matters', 'make ideas happen']

const LINE_HEIGHT = 52
const STEP_SECONDS = 3
const TRANSITION_SECONDS = 0.6
const TOTAL_SECONDS = STEP_SECONDS * PHRASES.length

const STEP_PCT = 100 / PHRASES.length
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
  const items = PHRASES.map((_, i) => PHRASES[(i + offset + PHRASES.length) % PHRASES.length]!)
  return [...items, items[0]!]
}

const FONT_SIZE = { base: 'xl', md: '2xl', lg: '3xl' }

/** Vertically rolling text carousel driven by CSS keyframes for GPU-accelerated smoothness. */
export const RollingText = () => {
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
  const PhraseStrip = ({ phrases, color, fontWeight, fontStyle }: {
    phrases: string[]
    color?: string
    fontWeight?: number
    fontStyle?: string
  }) => (
    <Box overflow="hidden" height={`${LINE_HEIGHT}px`}>
      <Box animation={animation} willChange="transform" sx={stripSx}>
        {phrases.map((phrase, i) => (
          <Box key={i} height={`${LINE_HEIGHT}px`} display="flex" alignItems="center">
            <Text fontSize={FONT_SIZE} color={color} fontWeight={fontWeight} fontStyle={fontStyle}>
              {phrase}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )

  return (
    <VStack spacing={0} textAlign="center" py={2} w="full">
      {/* Top blurred row: invisible static "Bitcoiners" + scrolling phrase */}
      <HStack
        spacing={2}
        justifyContent="center"
        height={`${LINE_HEIGHT}px`}
        alignItems="center"
        opacity={0.35}
        sx={{ filter: 'blur(1.5px)' }}
      >
        <Text fontSize={FONT_SIZE} visibility="hidden" aria-hidden="true">Bitcoiners</Text>
        <PhraseStrip phrases={topPhrases} color={mutedColor} fontStyle="italic" />
      </HStack>

      {/* Center row: static "Bitcoiners" + scrolling bold phrase */}
      <HStack spacing={2} justifyContent="center" height={`${LINE_HEIGHT}px`} alignItems="center">
        <Text fontSize={FONT_SIZE} color={mutedColor}>Bitcoiners</Text>
        <PhraseStrip phrases={centerPhrases} fontWeight={700} />
      </HStack>

      {/* Bottom blurred row: invisible static "Bitcoiners" + scrolling phrase */}
      <HStack
        spacing={2}
        justifyContent="center"
        height={`${LINE_HEIGHT}px`}
        alignItems="center"
        opacity={0.35}
        sx={{ filter: 'blur(1.5px)' }}
      >
        <Text fontSize={FONT_SIZE} visibility="hidden" aria-hidden="true">Bitcoiners</Text>
        <PhraseStrip phrases={bottomPhrases} color={mutedColor} fontStyle="italic" />
      </HStack>
    </VStack>
  )
}
