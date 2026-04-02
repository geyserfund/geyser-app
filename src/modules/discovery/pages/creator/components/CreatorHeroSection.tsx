import { Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { creatorHeroImageUrl } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Hero section that introduces the creator community and primary call to action. */
export const CreatorHeroSection = () => {
  const overlayGradient = useColorModeValue(
    'linear(to-r, rgba(8, 12, 11, 0.8), rgba(8, 12, 11, 0.45))',
    'linear(to-r, rgba(4, 7, 6, 0.9), rgba(4, 7, 6, 0.55))',
  )
  const badgeBackground = useColorModeValue('whiteAlpha.220', 'whiteAlpha.220')
  const badgeBorderColor = useColorModeValue('whiteAlpha.500', 'whiteAlpha.500')
  const badgeTextColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900')
  const secondaryButtonBackground = useColorModeValue('whiteAlpha.260', 'whiteAlpha.260')
  const secondaryButtonBorderColor = useColorModeValue('whiteAlpha.500', 'whiteAlpha.500')
  const secondaryButtonHoverBackground = useColorModeValue('whiteAlpha.320', 'whiteAlpha.320')
  const creatorTitleGradient = useColorModeValue(
    'linear(to-r, #00f5dc 0%, #00ead2 50%, #4ade80 100%)',
    'linear(to-r, #00f5dc 0%, #00ead2 50%, #4ade80 100%)',
  )

  const heroStats = [
    { value: '10,000+', label: t('Creators worldwide') },
    { value: '80+', label: t('Countries represented') },
    { value: '$5M+', label: t('Raised by creators') },
  ]

  return (
    <Box as="section" w="full" position="relative" overflow="hidden" minH={{ base: '580px', lg: '680px' }}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`url(${creatorHeroImageUrl})`}
        backgroundPosition={{ base: 'center', lg: 'center 30%' }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        filter="brightness(0.72) saturate(0.92) contrast(1.05)"
      />
      <Box position="absolute" inset={0} bgGradient={overlayGradient} />

      <CreatorSectionContainer
        position="relative"
        zIndex={1}
        h="full"
        pt={{ base: 24, lg: 32 }}
        pb={{ base: 16, lg: 20 }}
      >
        <VStack align="start" spacing={{ base: 5, lg: 7 }} maxW={{ base: 'full', lg: '760px' }}>
          <Box
            px={4}
            py={1.5}
            borderRadius="full"
            backgroundColor={badgeBackground}
            borderWidth="1px"
            borderColor={badgeBorderColor}
          >
            <Body
              fontSize="xs"
              fontWeight={700}
              color={badgeTextColor}
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              {t('Creator community')}
            </Body>
          </Box>

          <H1 color="white" size={{ base: '4xl', md: '5xl', lg: '6xl' }} lineHeight={1.03} letterSpacing="-0.02em" bold>
            <Box as="span" display="block">
              {t('Join the Geyser')}
            </Box>
            <Box as="span" display="block" bgGradient={creatorTitleGradient} bgClip="text" color="transparent">
              {t('creator community')}
            </Box>
          </H1>

          <Body size={{ base: 'lg', lg: 'xl' }} color="whiteAlpha.900" maxW={{ base: 'full', lg: '620px' }}>
            {t(
              'A place where creators, organizers, educators, builders, and storytellers rally community support to bring meaningful ideas to life.',
            )}
          </Body>

          <HStack spacing={3} flexWrap="wrap">
            <Button
              as={Link}
              to={getPath('launchProjectDetails')}
              size="lg"
              colorScheme="primary1"
              rightIcon={<PiArrowRight />}
              borderRadius="12px"
            >
              {t('Start your project')}
            </Button>
            <Button
              as={Link}
              to={`${getPath('discoveryCreator')}#creator-success-stories`}
              variant="outline"
              size="lg"
              borderRadius="12px"
              backgroundColor={secondaryButtonBackground}
              borderColor={secondaryButtonBorderColor}
              color="white"
              _hover={{ backgroundColor: secondaryButtonHoverBackground }}
            >
              {t('Explore success stories')}
            </Button>
          </HStack>

          <HStack spacing={{ base: 4, lg: 8 }} flexWrap="wrap">
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
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
