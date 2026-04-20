import { Badge, Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { MICRO_LENDING_HERO_PUBLIC_PATH } from '../../utils/constants.ts'
import { MICRO_LENDING_WAITLIST_SECTION_ID, MICRO_LENDING_WHAT_IS_SECTION_ID } from '../../utils/layoutConstants.ts'

const scrollToSection = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const scrollToWaitlist = () => {
  scrollToSection(MICRO_LENDING_WAITLIST_SECTION_ID)
}

const scrollToWhatIsMicroLoans = () => {
  scrollToSection(MICRO_LENDING_WHAT_IS_SECTION_ID)
}

/** Full-bleed hero aligned with Impact Funds hero (image, directional overlay, left-aligned headline + CTAs). */
export function MicroLendingHero(): JSX.Element {
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
    <Box w="full" position="relative" overflow="hidden" borderRadius={0} minHeight={{ base: '270px', lg: '390px' }}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`url('${MICRO_LENDING_HERO_PUBLIC_PATH}')`}
        backgroundPosition={{ base: '60% 0%', lg: '88% 0%' }}
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
          maxWidth={{ base: 'full', lg: '58%' }}
          spacing={{ base: 4, lg: 5 }}
          textAlign="left"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Badge colorScheme="primary1" variant="subtle" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
            {t('Waitlist')}
          </Badge>
          <H1
            size={{ base: '2xl', md: '4xl', lg: '5xl' }}
            bold
            lineHeight={1.2}
            letterSpacing="-0.01em"
            color="white"
            w="full"
          >
            {t('Micro-Loans for Real-World Bitcoin Communities')}
          </H1>
          <Body size={{ base: 'lg', lg: 'xl' }} color="whiteAlpha.900" lineHeight={1.6} w="full">
            {t('Small, flexible loans to support local initiatives.')}
          </Body>
          <HStack spacing={4} flexWrap="wrap" pt={1} w="full">
            <Button type="button" colorScheme="primary1" size="lg" onClick={scrollToWaitlist}>
              {t('I Want to Borrow')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              borderColor="whiteAlpha.800"
              color="white"
              _hover={{ bg: 'whiteAlpha.200', borderColor: 'white' }}
              _active={{ bg: 'whiteAlpha.300' }}
              onClick={scrollToWaitlist}
            >
              {t('I Want to Lend')}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={scrollToWhatIsMicroLoans}
              color="whiteAlpha.900"
              fontWeight="normal"
              fontSize="sm"
              minH={0}
              h="auto"
              p={0}
              textDecoration="underline"
              _hover={{ color: 'white', textDecoration: 'underline', bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
            >
              {t('What are micro-loans')}
              {'?'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
