import { Button, HStack, Icon, Tag, VStack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowDown, PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'

const FundProjectsSteps = () => {
  const arrowColor = useColorModeValue('neutral1.9', 'neutral1.8')
  const stepColor = 'neutralAlpha.11'
  const isMobile = useBreakpointValue({ base: true, md: false })

  const steps = [
    t('Discover projects'),
    t('Contribute once or monthly'),
    t('Accelerate Bitcoin adoption'),
  ]

  if (isMobile) {
    return (
      <VStack w="full" spacing={2} align="center">
        {steps.map((step, index) => (
          <VStack key={step} spacing={2} align="center">
            <Body size="sm" fontWeight={600} color={stepColor} textAlign="center">
              {step}
            </Body>
            {index < steps.length - 1 && <Icon as={PiArrowDown} color={arrowColor} boxSize={4} />}
          </VStack>
        ))}
      </VStack>
    )
  }

  return (
    <HStack w="full" spacing={6} justify="center">
      {steps.map((step, index) => (
        <HStack key={step} spacing={6}>
          <Body size="md" fontWeight={600} color={stepColor} textAlign="center">
            {step}
          </Body>
          {index < steps.length - 1 && <Icon as={PiArrowRight} color={arrowColor} boxSize={5} flexShrink={0} />}
        </HStack>
      ))}
    </HStack>
  )
}

const ImpactFundPills = () => {
  const pillBorderColor = useColorModeValue('neutral1.6', 'neutral1.5')
  const pillColor = 'neutralAlpha.11'
  const isMobile = useBreakpointValue({ base: true, md: false })

  const features = [t('Support vetted projects'), t('Back more than 20 projects at once'), t('Receive impact reports')]

  if (isMobile) {
    return (
      <VStack w="full" spacing={3} align="stretch">
        {features.map((feature) => (
          <Tag
            key={feature}
            size="md"
            variant="outline"
            borderColor={pillBorderColor}
            color={pillColor}
          borderRadius="lg"
          fontWeight={600}
          px={4}
          py={2}
          justifyContent="center"
          >
            {feature}
          </Tag>
        ))}
      </VStack>
    )
  }

  return (
    <HStack w="full" spacing={4} flexWrap="wrap" justify="center">
      {features.map((feature) => (
        <Tag
          key={feature}
          size="lg"
          variant="outline"
          borderColor={pillBorderColor}
          color={pillColor}
          borderRadius="lg"
          fontWeight={600}
          px={6}
          py={3}
        >
          {feature}
        </Tag>
      ))}
    </HStack>
  )
}

/** Section explaining the two ways to support Bitcoin adoption on Geyser. */
export const HowGeyserWorks = () => {
  const cardBg = useColorModeValue('white', 'neutral1.3')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.4')
  const subtitleColor = 'neutralAlpha.11'

  return (
    <VStack w="full" spacing={6} align="start">
      <VStack spacing={2} align="start">
        <LandingPageSectionTitle>{t('How Geyser works')}</LandingPageSectionTitle>
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {t('Support Bitcoin adoption in 2 simple ways')}
        </H2>
      </VStack>

      <VStack w="full" spacing={5}>
        {/* Fund individual projects card */}
        <VStack
          w="full"
          align={{ base: 'start', md: 'center' }}
          spacing={{ base: 5, md: 8 }}
          px={{ base: 5, md: 8, lg: 10 }}
          py={{ base: 4, md: 6, lg: 7 }}
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorderColor}
          borderRadius="12px"
        >
          <VStack w="full" align="start" spacing={1}>
            <H3 size={{ base: 'md', lg: 'xl' }} bold>
              {t('Fund individual projects')}
            </H3>
            <Body size={{ base: 'md', lg: 'lg' }} color={subtitleColor}>
              {t('Support creators directly and choose where your sats go.')}
            </Body>
          </VStack>

          <FundProjectsSteps />

          <Button
            as={Link}
            to={getPath('discoveryProjects')}
            size="lg"
            w={{ base: 'full', md: 'auto' }}
            variant="solid"
            colorScheme="primary1"
            fontWeight={700}
            borderRadius="8px"
          >
            {t('Explore projects')}
          </Button>
        </VStack>

        {/* Contribute to an Impact Fund card */}
        <VStack
          w="full"
          align={{ base: 'start', md: 'center' }}
          spacing={{ base: 5, md: 8 }}
          px={{ base: 5, md: 8, lg: 10 }}
          py={{ base: 4, md: 6, lg: 7 }}
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorderColor}
          borderRadius="12px"
        >
          <VStack w="full" align="start" spacing={1}>
            <H3 size={{ base: 'md', lg: 'xl' }} bold>
              {t('Contribute to an Impact Fund')}
            </H3>
            <Body size={{ base: 'md', lg: 'lg' }} color={subtitleColor}>
              {t('Let us allocate your funds across high-impact projects.')}
            </Body>
          </VStack>

          <ImpactFundPills />

          <Button
            as={Link}
            to={getPath('discoveryImpactFunds')}
            size="lg"
            w={{ base: 'full', md: 'auto' }}
            variant="solid"
            colorScheme="primary1"
            fontWeight={700}
            borderRadius="8px"
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Fund an impact fund')}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
