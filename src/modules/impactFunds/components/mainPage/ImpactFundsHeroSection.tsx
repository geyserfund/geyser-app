import type { BoxProps } from '@chakra-ui/react'
import { Box, Button, HStack, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { ImpactFundWhyDonateModal } from '@/modules/impactFunds/components/ImpactFundWhyDonateModal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { ImpactFundDonateButton } from './ImpactFundCtas.tsx'

type ImpactFundsHeroSectionProps = BoxProps & {
  onDonateClick: () => void
}

/** Full-bleed hero aligned with discovery landing `Hero` (image, overlay, max width, H1 + body scale). */
export function ImpactFundsHeroSection({ onDonateClick, ...boxProps }: ImpactFundsHeroSectionProps): JSX.Element {
  const whyFundModal = useDisclosure()
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
      {...boxProps}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url('/images/impact-funds-hero.png')"
        backgroundPosition="center 10%"
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
          maxWidth={{ base: 'full', lg: '55%' }}
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
            {t('Bitcoin Adoption Impact Fund')}
          </H1>
          <Body size={{ base: 'lg', lg: 'xl' }} color="whiteAlpha.900" lineHeight={1.6} w="full">
            {t(
              "A stronger Bitcoin is a widely used Bitcoin. This fund is focused on bringing Bitcoin adoption and awareness where Wall Street won't.",
            )}
          </Body>
          <HStack spacing={4} flexWrap="wrap" pt={1}>
            <ImpactFundDonateButton onClick={onDonateClick} />
            <Button
              type="button"
              variant="link"
              onClick={whyFundModal.onOpen}
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
              {t('Why donate to the fund')}?
            </Button>
          </HStack>
        </VStack>
      </Box>

      <ImpactFundWhyDonateModal isOpen={whyFundModal.isOpen} onClose={whyFundModal.onClose} />
    </Box>
  )
}
