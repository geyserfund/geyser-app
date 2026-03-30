import type { BoxProps } from '@chakra-ui/react'
import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, H1 } from '@/shared/components/typography/index.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

/** Renders the landing page hero section over the marketplace background image. */
export const Hero = (props: BoxProps): JSX.Element => {
  const overlayGradient = useColorModeValue(
    {
      base: `linear-gradient(
        90deg,
        var(--chakra-colors-blackAlpha-900) 0%,
        var(--chakra-colors-blackAlpha-900) 22%,
        var(--chakra-colors-blackAlpha-800) 42%,
        var(--chakra-colors-blackAlpha-600) 64%,
        var(--chakra-colors-blackAlpha-300) 100%
      )`,
      lg: `linear-gradient(
        90deg,
        var(--chakra-colors-blackAlpha-900) 0%,
        var(--chakra-colors-blackAlpha-800) 22%,
        var(--chakra-colors-blackAlpha-700) 38%,
        var(--chakra-colors-blackAlpha-500) 58%,
        var(--chakra-colors-blackAlpha-100) 100%
      )`,
    },
    {
      base: `linear-gradient(
        90deg,
        var(--chakra-colors-blackAlpha-900) 0%,
        var(--chakra-colors-blackAlpha-800) 22%,
        var(--chakra-colors-blackAlpha-700) 42%,
        var(--chakra-colors-blackAlpha-500) 64%,
        var(--chakra-colors-blackAlpha-300) 100%
      )`,
      lg: `linear-gradient(
        90deg,
        var(--chakra-colors-blackAlpha-900) 0%,
        var(--chakra-colors-blackAlpha-800) 22%,
        var(--chakra-colors-blackAlpha-700) 38%,
        var(--chakra-colors-blackAlpha-500) 58%,
        var(--chakra-colors-blackAlpha-100) 100%
      )`,
    },
  )

  return (
    <Box
      w="full"
      position="relative"
      overflow="hidden"
      borderRadius={0}
      minHeight={{ base: '270px', lg: '390px' }}
      {...props}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url('/images/landing-hero-market.png')"
        backgroundPosition={{ base: 'center', lg: 'center right' }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <Box position="absolute" inset={0} background={overlayGradient} />

      <Box
        position="relative"
        w="full"
        maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
        minHeight={{ base: '270px', lg: '390px' }}
        mx="auto"
        paddingX={standardPadding}
        paddingTop={{ base: 10, lg: 13 }}
        paddingBottom={{ base: 10, lg: 13 }}
        display="flex"
        alignItems="center"
      >
        <VStack
          w="full"
          maxWidth={{ base: 'full', lg: '38%' }}
          spacing={{ base: 4, lg: 5 }}
          textAlign="left"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <H1
            size={{ base: '2xl', md: '4xl', lg: '5xl' }}
            bold
            lineHeight={1.2}
            letterSpacing="-0.01em"
            color="white"
            w="full"
          >
            {t('Accelerate global Bitcoin adoption')}
          </H1>
          <Body size={{ base: 'lg', lg: 'xl' }} color="whiteAlpha.900" lineHeight={1.6} w="full">
            {t('Contribute to causes, initiatives and creators that push Bitcoin adoption around the world.')}
          </Body>
        </VStack>
      </Box>
    </Box>
  )
}
