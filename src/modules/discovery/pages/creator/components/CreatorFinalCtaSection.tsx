import { Box, Button, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FaBolt } from 'react-icons/fa'
import { PiRocketLaunch } from 'react-icons/pi'

import { useLaunchNow } from '@/modules/project/pages/projectCreation/views/start/utils/useLaunchNow.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorFinalCtaTrustPoints, creatorHeroImageUrl } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Final call-to-action section closing the creator landing page narrative. */
export const CreatorFinalCtaSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const sectionBackground = useColorModeValue('neutral1.12', 'neutral1.1')
  const primaryGradient = useColorModeValue(
    'linear(to-r, var(--chakra-colors-geyser-9) 0%, var(--chakra-colors-grass-8) 100%)',
    'linear(to-r, var(--chakra-colors-geyser-9) 0%, var(--chakra-colors-grass-8) 100%)',
  )
  const centerGlowBackground = useColorModeValue(
    'radial-gradient(ellipse at center, var(--chakra-colors-geyserAlpha-3) 0%, transparent 70%)',
    'radial-gradient(ellipse at center, var(--chakra-colors-geyserAlpha-4) 0%, transparent 70%)',
  )
  const imageOverlayBackground = useColorModeValue(
    'linear-gradient(180deg, var(--chakra-colors-overlay-black-6) 0%, var(--chakra-colors-overlay-black-4) 50%, var(--chakra-colors-overlay-black-6) 100%)',
    'linear-gradient(180deg, var(--chakra-colors-overlay-white-6) 0%, var(--chakra-colors-overlay-white-4) 50%, var(--chakra-colors-overlay-white-6) 100%)',
  )
  const leftAmbientGlowBackground = useColorModeValue(
    'radial-gradient(ellipse, var(--chakra-colors-geyserAlpha-4) 0%, transparent 70%)',
    'radial-gradient(ellipse, var(--chakra-colors-geyserAlpha-5) 0%, transparent 70%)',
  )
  const rightAmbientGlowBackground = useColorModeValue(
    'radial-gradient(ellipse, var(--chakra-colors-violetAlpha-4) 0%, transparent 70%)',
    'radial-gradient(ellipse, var(--chakra-colors-violetAlpha-5) 0%, transparent 70%)',
  )

  return (
    <>
      <Box
        as="section"
        position="relative"
        w="full"
        py={{ base: 20, lg: 24 }}
        overflow="hidden"
        backgroundColor={sectionBackground}
      >
        <Box position="absolute" inset={0}>
          <Box
            position="absolute"
            inset={0}
            backgroundImage={`url(${creatorHeroImageUrl})`}
            backgroundPosition="center 20%"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            opacity={0.2}
          />
          <Box
            position="absolute"
            inset={0}
            background={centerGlowBackground}
          />
          <Box position="absolute" inset={0} background={imageOverlayBackground} />
        </Box>

        <Box
          position="absolute"
          top="20%"
          left="15%"
          width={{ base: '220px', lg: '400px' }}
          height={{ base: '160px', lg: '300px' }}
          borderRadius="50%"
          background={leftAmbientGlowBackground}
          filter="blur(60px)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="15%"
          right="10%"
          width={{ base: '220px', lg: '350px' }}
          height={{ base: '160px', lg: '250px' }}
          borderRadius="50%"
          background={rightAmbientGlowBackground}
          filter="blur(50px)"
          pointerEvents="none"
        />

        <CreatorSectionContainer position="relative" zIndex={1}>
          <VStack spacing={6} maxW="760px" mx="auto" textAlign="center" align="center">
            <HStack
              spacing={2}
              px={4}
              py={2}
              borderRadius="full"
              backgroundColor="geyserAlpha.4"
              borderWidth="1px"
              borderColor="geyserAlpha.6"
            >
              <Icon as={FaBolt} boxSize={3.5} color="geyser.9" />
              <Body size="xs" color="geyser.9" fontWeight={600} letterSpacing="0.06em" textTransform="uppercase">
                {t('Join the Geyser creator community')}
              </Body>
            </HStack>

            <H2 size={{ base: '3xl', lg: '6xl' }} bold color="white" lineHeight={1.05} letterSpacing="-0.03em">
              {t('Start the project only')}
              <br />
              <Box as="span" bgGradient={primaryGradient} bgClip="text" color="transparent">
                {t('you can bring to life')}
              </Box>
            </H2>

            <Body size={{ base: 'md', lg: 'lg' }} color="whiteAlpha.800" maxW={{ base: '580px', lg: '700px' }}>
              {t(
                'Whether you are building culture, tools, education, media, or local impact, Geyser gives creators a place to rally support around what matters.',
              )}
            </Body>

            <HStack spacing={3} flexWrap="wrap" justify="center" pt={1}>
              <Button
                onClick={handleLauchNowClick}
                size="lg"
                colorScheme="primary1"
                rightIcon={<PiRocketLaunch />}
                borderRadius="12px"
                px={8}
              >
                {t('Start your project')}
              </Button>
            </HStack>

            <HStack spacing={{ base: 4, md: 6 }} flexWrap="wrap" justify="center" pt={2}>
              {creatorFinalCtaTrustPoints.map((item) => (
                <HStack key={item} spacing={2}>
                  <Box w="6px" h="6px" borderRadius="full" backgroundColor="geyser.9" opacity={0.75} />
                  <Body fontSize="sm" color="whiteAlpha.600">
                    {t(item)}
                  </Body>
                </HStack>
              ))}
            </HStack>
          </VStack>
        </CreatorSectionContainer>
      </Box>
      {renderModal()}
    </>
  )
}
