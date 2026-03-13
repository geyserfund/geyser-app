import { Box, Button, HStack, Icon, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight, PiHandHeartBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { fonts } from '@/shared/styles/fonts.ts'

const IMAGE_GAP = 14

const MARQUEE_ROWS = [
  {
    images: [
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_2.jpg',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_7.jpeg',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_5.jpg',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_9.jpeg',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_3.jpg',
    ],
    duration: '40s',
    height: { base: '180px', md: '230px', lg: '270px' },
    widths: ['300px', '240px', '280px', '260px', '300px'],
  },
  {
    images: [
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_4.jpg',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_1.jpg',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_8.webp',
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/movement/guardians_movement_6.jpg',
    ],
    duration: '34s',
    height: { base: '160px', md: '200px', lg: '240px' },
    widths: ['260px', '300px', '240px', '280px'],
  },
] as const

/** Hero section driving conversions for the Guardians program via merch + impact fund messaging. */
export const JoinTheMovement = () => {
  const mutedColor = useColorModeValue('neutral1.9', 'neutral1.8')
  const badgeBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.700')
  const badgeShadow = useColorModeValue('lg', 'dark-lg')
  const fadeBg = useColorModeValue('neutral1.1', 'neutral1.2')

  return (
    <VStack w="full" spacing={8} align="center">
      {/* Copy block — 3 levels: eyebrow, headline, body+CTA */}
      <VStack
        align={{ base: 'start', md: 'center' }}
        spacing={5}
        w="full"
        px={{ base: 4, md: 6 }}
        textAlign={{ base: 'left', md: 'center' }}
      >
        <Body size="sm" color={mutedColor} textTransform="uppercase" letterSpacing="0.1em" fontWeight={600}>
          {t('Guardians of Bitcoin Adoption')}
        </Body>

        <H2
          size={{ base: '2xl', lg: '4xl' }}
          bold
          lineHeight={1.1}
          fontFamily={fonts.cormorant}
          letterSpacing="-0.01em"
        >
          {t('Wear the mission. Fund the future.')}
        </H2>

        <Body size={{ base: 'md', lg: 'lg' }} color="neutral1.11" lineHeight={1.6} maxW="580px">
          {t(
            'Grab limited-edition gear from top Bitcoin brands. 100% of proceeds go to Impact Funds to fund grassroots adoption projects worldwide.',
          )}
        </Body>

        <VStack spacing={2} pt={3} align={{ base: 'start', md: 'center' }}>
          <Button
            as={Link}
            to={getPath('guardians')}
            size="lg"
            width={{ base: 'full', md: 'auto' }}
            minW="240px"
            variant="solid"
            colorScheme="primary1"
            fontWeight={700}
            borderRadius="10px"
            boxShadow="0 4px 14px 0 rgba(0, 198, 163, 0.36)"
            transition="all 0.2s ease"
            _hover={{ transform: 'translateY(-2px)', boxShadow: '0 6px 20px 0 rgba(0, 198, 163, 0.45)' }}
            _active={{ transform: 'translateY(0)', boxShadow: '0 2px 8px 0 rgba(0, 198, 163, 0.3)' }}
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Browse the Guardian Merch')}
          </Button>
          <Text fontSize="xs" color={mutedColor}>
            {t('100+ Guardians joined')}
            {' · '}
            <Text as={Link} to={getPath('impactFunds')} textDecoration="underline" color={mutedColor}>
              {t('Learn about Impact Funds')}
            </Text>
          </Text>
        </VStack>
      </VStack>

      {/* Full-width image marquee */}
      <Box position="relative" w="full" overflow="hidden">
        <VStack spacing={`${IMAGE_GAP}px`}>
          {MARQUEE_ROWS.map((row, rowIndex) => (
            <Box key={rowIndex} w="full" overflow="hidden">
              <Box
                display="flex"
                width="max-content"
                willChange="transform"
                animation={`marquee-${rowIndex} ${row.duration} linear infinite`}
                sx={{
                  backfaceVisibility: 'hidden',
                  [`@keyframes marquee-${rowIndex}`]: {
                    '0%': { transform: 'translate3d(0, 0, 0)' },
                    '100%': { transform: 'translate3d(-50%, 0, 0)' },
                  },
                }}
              >
                {[...row.images, ...row.images].map((src, i) => (
                  <Image
                    key={`${rowIndex}-${i}`}
                    src={src}
                    alt={t('Guardian merch')}
                    borderRadius="12px"
                    h={row.height}
                    w={row.widths[i % row.widths.length]}
                    minW={row.widths[i % row.widths.length]}
                    mr={`${IMAGE_GAP}px`}
                    objectFit="cover"
                    flexShrink={0}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </VStack>

        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          w="60px"
          bgGradient={`linear(to-r, ${fadeBg}, transparent)`}
          pointerEvents="none"
          zIndex={1}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          w="60px"
          bgGradient={`linear(to-l, ${fadeBg}, transparent)`}
          pointerEvents="none"
          zIndex={1}
        />

        <Box
          position="absolute"
          bottom={{ base: 4, lg: 5 }}
          right={{ base: '70px', lg: '80px' }}
          bg={badgeBg}
          backdropFilter="blur(8px)"
          borderRadius="12px"
          px={4}
          py={3}
          boxShadow={badgeShadow}
          maxW="200px"
          zIndex={2}
        >
          <HStack spacing={2}>
            <Icon as={PiHandHeartBold} boxSize={5} color="primary1.9" />
            <VStack spacing={0} align="start">
              <Text fontSize="xs" fontWeight={700} lineHeight={1.2}>
                {t('{{amount}} distributed', { amount: '2.5+ BTC' })}
              </Text>
              <Text fontSize="2xs" color="neutral1.9" lineHeight={1.3}>
                {t('across grassroots adoption projects')}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}
