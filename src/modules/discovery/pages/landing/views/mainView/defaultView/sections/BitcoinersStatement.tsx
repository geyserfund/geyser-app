import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

const PHRASES = ['fund what matters', 'support each other', 'make ideas happen'] as const
const ROTATION_INTERVAL_MS = 2400

const useReducedMotionPreference = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

/** BitcoinersStatement renders the animated rolling-copy message below the how-it-works section. */
export const BitcoinersStatement = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotionPreference()
  const accentColor = useColorModeValue('primary1.11', 'primary1.7')
  const panelColor = useColorModeValue('gray.50', 'gray.800')

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % PHRASES.length)
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <VStack
      width="100%"
      spacing={4}
      padding={{ base: 6, lg: 8 }}
      borderRadius="32px"
      backgroundColor={panelColor}
      align="center"
      textAlign="center"
    >
      <Body size="sm" color="neutral1.10" textTransform="uppercase" letterSpacing="0.1em">
        {t('Built for communities')}
      </Body>

      <H2 size={{ base: 'xl', lg: '2xl' }} dark bold>
        {t('Bitcoiners')}
      </H2>

      <Box height="44px" overflow="hidden" minWidth={{ base: '260px', md: '360px' }}>
        {prefersReducedMotion ? (
          <Body size={{ base: 'lg', lg: 'xl' }} color={accentColor} bold>
            {t(PHRASES[0])}
          </Body>
        ) : (
          <VStack
            spacing={0}
            align="center"
            transform={`translateY(-${activeIndex * 44}px)`}
            transition="transform 0.55s ease"
          >
            {PHRASES.map((phrase) => (
              <Body key={phrase} size={{ base: 'lg', lg: 'xl' }} color={accentColor} bold minHeight="44px">
                {t(phrase)}
              </Body>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  )
}
