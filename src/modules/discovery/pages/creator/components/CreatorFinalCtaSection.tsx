import { Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FaBolt } from 'react-icons/fa'
import { PiRocketLaunch } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { creatorFinalCtaTrustPoints, creatorHeroImageUrl } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Final call-to-action section closing the creator landing page narrative. */
export const CreatorFinalCtaSection = () => {
  const sectionBackground = useColorModeValue('#080c0b', '#080c0b')
  const primaryGradient = useColorModeValue(
    'linear(to-r, #00f5dc 0%, #4ade80 100%)',
    'linear(to-r, #00f5dc 0%, #4ade80 100%)',
  )

  return (
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
          background="radial-gradient(ellipse at center, rgba(0,245,220,0.06) 0%, transparent 70%)"
        />
        <Box
          position="absolute"
          inset={0}
          background="linear-gradient(180deg, rgba(8,12,11,0.6) 0%, rgba(8,12,11,0.3) 50%, rgba(8,12,11,0.6) 100%)"
        />
      </Box>

      <Box
        position="absolute"
        top="20%"
        left="15%"
        width={{ base: '220px', lg: '400px' }}
        height={{ base: '160px', lg: '300px' }}
        borderRadius="50%"
        background="radial-gradient(ellipse, rgba(0,245,220,0.1) 0%, transparent 70%)"
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
        background="radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)"
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
            backgroundColor="rgba(0,245,220,0.1)"
            borderWidth="1px"
            borderColor="rgba(0,245,220,0.25)"
          >
            <FaBolt size={14} color="#00f5dc" />
            <Body size="xs" color="#00f5dc" fontWeight={600} letterSpacing="0.06em" textTransform="uppercase">
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
              as={Link}
              to={getPath('launchProjectDetails')}
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
                <Box w="6px" h="6px" borderRadius="full" backgroundColor="#00f5dc" opacity={0.75} />
                <Body fontSize="sm" color="whiteAlpha.600">
                  {t(item)}
                </Body>
              </HStack>
            ))}
          </HStack>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
