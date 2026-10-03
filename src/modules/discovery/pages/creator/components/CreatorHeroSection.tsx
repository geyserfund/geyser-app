import { Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiRocketLaunch } from 'react-icons/pi'

import { useLaunchNow } from '@/modules/project/pages/projectCreation/views/start/utils/useLaunchNow.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { useProjectsSummaryQuery } from '@/types'
import { getBitcoinAmount } from '@/utils'

import { creatorHeroImageUrl } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const STATIC_CREATORS_WORLDWIDE = '900+'
const STATIC_COUNTRIES_REPRESENTED = '100+'

/** Hero section that introduces the creator community and primary call to action. */
export const CreatorHeroSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()
  const { data } = useProjectsSummaryQuery()

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
  const creatorTitleGradient = useColorModeValue(
    'linear(to-r, var(--chakra-colors-geyser-9) 0%, var(--chakra-colors-geyser-10) 50%, var(--chakra-colors-grass-8) 100%)',
    'linear(to-r, var(--chakra-colors-geyser-9) 0%, var(--chakra-colors-geyser-10) 50%, var(--chakra-colors-grass-8) 100%)',
  )
  const secondaryButtonBackground = 'whiteAlpha.260'
  const secondaryButtonBorderColor = 'whiteAlpha.500'
  const secondaryButtonHoverBackground = 'whiteAlpha.320'

  const raisedSats = Number(data?.projectsSummary?.fundedTotal || 0)

  const heroStats = [
    { value: STATIC_CREATORS_WORLDWIDE, label: t('Creators worldwide') },
    { value: STATIC_COUNTRIES_REPRESENTED, label: t('Countries represented') },
    { value: `${getBitcoinAmount(raisedSats, true)} ₿`, label: t('Raised by creators') },
  ]
  const handleExploreSuccessStories = () => {
    const successStoriesSection = document.getElementById('creator-success-stories')
    successStoriesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Box as="section" display="flex" alignItems="center" w="full" position="relative" overflow="hidden" minH="578px">
        <Box
          position="absolute"
          inset={0}
          backgroundImage={`url(${creatorHeroImageUrl})`}
          backgroundPosition={{ base: 'center', lg: 'center 30%' }}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          filter="brightness(0.72) saturate(0.92) contrast(1.05)"
        />
        <Box position="absolute" inset={0} background={overlayGradient} />

        <CreatorSectionContainer
          position="relative"
          zIndex={1}
          h="full"
          pt={{ base: 12, lg: 20 }}
          pb={{ base: 10, lg: 10 }}
          display="flex"
          alignItems="center"
        >
          <VStack align="start" spacing={{ base: 5, lg: 6 }} maxW={{ base: 'full', lg: '760px' }}>
            <H1
              size={{ base: '2xl', md: '4xl', lg: '5xl' }}
              bold
              lineHeight={1.2}
              letterSpacing="-0.01em"
              color="white"
              w="full"
            >
              <Box as="span" display="block">
                {t('Join the Geyser')}
              </Box>
              <Box as="span" display="block" bgGradient={creatorTitleGradient} bgClip="text" color="transparent">
                {t('creator community')}
              </Box>
            </H1>

            <Body
              size={{ base: 'lg', lg: 'xl' }}
              color="whiteAlpha.900"
              lineHeight={1.6}
              maxW={{ base: 'full', lg: '620px' }}
            >
              {t('The place where Bitcoin creators rally the community to bring meaningful projects to life.')}
            </Body>

            <HStack spacing={3} flexWrap="wrap">
              <Button
                onClick={handleLauchNowClick}
                size="lg"
                colorScheme="primary1"
                rightIcon={<PiRocketLaunch />}
                borderRadius="12px"
              >
                {t('Start your project')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                borderRadius="12px"
                backgroundColor={secondaryButtonBackground}
                borderColor={secondaryButtonBorderColor}
                color="white"
                onClick={handleExploreSuccessStories}
                _hover={{ backgroundColor: secondaryButtonHoverBackground }}
              >
                {t('Explore success stories')}
              </Button>
            </HStack>

            <HStack w="full" justify="flex-start" align="center" spacing={4} flexWrap="wrap">
              <HStack spacing={{ base: 4, lg: 8 }} flexWrap="wrap" flex={1}>
                {heroStats.map((stat) => (
                  <HStack key={stat.label} spacing={2}>
                    <Body size="lg" color="white" fontWeight={700}>
                      {stat.value}
                    </Body>
                    <Body size="sm" color="whiteAlpha.800">
                      {stat.label}
                    </Body>
                  </HStack>
                ))}
              </HStack>
            </HStack>
          </VStack>
        </CreatorSectionContainer>
      </Box>
      {renderModal()}
    </>
  )
}
