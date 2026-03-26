import { Box, Button, Circle, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { FeaturedContributions } from '../components/FeaturedContributions.tsx'
import { RollingText } from '../components/RollingText.tsx'

const HOW_IT_WORKS_STEPS = [
  {
    title: 'Choose category',
    description: 'Find projects in categories you want to support',
  },
  {
    title: 'Donate',
    description: 'Make a one-off or recurring donation',
  },
  {
    title: 'View Impact',
    description: 'Get regular updates by email',
  },
] as const

/** Landing hero showcasing community stats, how-it-works flow, and rolling mission statement. */
export const CommunityHero = () => {
  const circleBg = useColorModeValue('primary1.3', 'primary1.4')
  const circleColor = useColorModeValue('primary1.11', 'primary1.11')
  const fadeBg = useColorModeValue('neutral1.1', 'neutral1.2')

  return (
    <VStack w="full" spacing={{ base: 4, md: 6 }} py={0} alignItems="flex-start">
      {/* Rolling mission statement */}
      <RollingText />

      {/* Scrolling contributions */}
      <Box position="relative" w="full" visibility="hidden" aria-hidden="true" display={{ base: 'none', md: 'block' }}>
        <FeaturedContributions size="lg" />

        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          w="40px"
          bgGradient={`linear(to-r, ${fadeBg}, transparent)`}
          pointerEvents="none"
          zIndex={1}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          w="40px"
          bgGradient={`linear(to-l, ${fadeBg}, transparent)`}
          pointerEvents="none"
          zIndex={1}
        />
      </Box>

      {/* How it works */}
      <VStack w="full" spacing={{ base: 6, md: 8 }} align="center" maxW="900px" mx="auto">
        <H2 size={{ base: 'xl', md: '2xl', lg: '3xl' }} bold>
          {t('How it works')}
        </H2>

        <HStack
          spacing={{ base: 6, md: 12 }}
          justify="center"
          align="flex-start"
          flexDirection={{ base: 'column', sm: 'row' }}
          w="full"
        >
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <VStack key={index} spacing={3} flex={1} align="center" textAlign="center" maxW="220px" mx="auto">
              <Circle size="40px" bg={circleBg} color={circleColor} fontWeight={700} fontSize="md">
                {index + 1}
              </Circle>
              <Body size="md" bold>
                {t(step.title)}
              </Body>
              <Body size="sm" muted>
                {t(step.description)}
              </Body>
            </VStack>
          ))}
        </HStack>

        {/* CTA Buttons */}
        <HStack spacing={4} pt={2} flexDirection={{ base: 'column', sm: 'row' }} align="stretch" w="full">
          <Button
            as={Link}
            to={getPath('projectDiscovery')}
            variant="solid"
            colorScheme="primary1"
            size="lg"
            borderRadius="10px"
            fontWeight={600}
            rightIcon={<Icon as={PiArrowRight} />}
            w="full"
            flex={{ sm: 1 }}
          >
            {t('Discover Projects')}
          </Button>
          <Button
            as={Link}
            to={getPath('discoveryImpactFunds')}
            variant="outline"
            colorScheme="neutral1"
            size="lg"
            borderRadius="10px"
            fontWeight={600}
            w="full"
            flex={{ sm: 1 }}
          >
            {t('Discover Impact Funds')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
