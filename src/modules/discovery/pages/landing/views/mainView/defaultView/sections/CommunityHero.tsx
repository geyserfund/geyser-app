import { Button, Circle, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PiGlobeSimple, PiLightbulb } from 'react-icons/pi'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

/** Landing section guiding users toward projects or funds, with a simple contribution flow and signup CTA. */
export const CommunityHero = () => {
  const { t } = useTranslation()
  const iconCircleBg = useColorModeValue('primary1.50', 'primary1.900')
  const iconColor = useColorModeValue('primary1.500', 'primary1.300')
  const mutedTextColor = useColorModeValue('neutral1.9', 'neutral1.10')
  const stepCircleBg = useColorModeValue('primary1.50', 'primary1.900')
  const stepCircleColor = useColorModeValue('primary1.600', 'primary1.300')
  const pathCards = useMemo(
    () =>
      [
        {
          title: t('Projects'),
          description: t('Support individual creators and initiatives'),
          supportingText: t('One-time backing, rewards, campaigns'),
          buttonLabel: t('Explore Projects'),
          to: getPath('projectDiscovery'),
          icon: PiLightbulb,
          variant: 'solid' as const,
        },
        {
          title: t('Impact Funds'),
          description: t('Support long-term thematic initiatives'),
          supportingText: t('Ongoing pooled support for categories you care about'),
          buttonLabel: t('Explore Impact Funds'),
          to: getPath('discoveryImpactFunds'),
          icon: PiGlobeSimple,
          variant: 'outline' as const,
        },
      ] as const,
    [t],
  )
  const howItWorksSteps = useMemo(
    () =>
      [
        {
          title: t('Discover a project or fund'),
          description: t('Find campaigns and pools to back'),
        },
        {
          title: t('Contribute once or monthly'),
          description: t('Support your favorite causes'),
        },
        {
          title: t('Receive updates and track impact'),
          description: t('See how your contributions make a difference'),
        },
      ] as const,
    [t],
  )

  return (
    <VStack w="full" spacing={{ base: 8, lg: 10 }} align="center">
      <VStack w="full" spacing={5} maxW="980px">
        <H2 size={{ base: 'xl', md: '2xl' }} bold textAlign="center">
          {t('How it works')}
        </H2>

        <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8 }}>
          {howItWorksSteps.map((step, index) => (
            <VStack key={step.title} spacing={3} textAlign="center" align="center">
              <Circle size="40px" bg={stepCircleBg} color={stepCircleColor}>
                <Body bold>{index + 1}</Body>
              </Circle>
              <VStack spacing={2}>
                <Body size="lg" bold>
                  {step.title}
                </Body>
                <Body size="md" color={mutedTextColor} maxW="240px">
                  {step.description}
                </Body>
              </VStack>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>

      <VStack w="full" spacing={5} maxW="980px">
        <H2 size={{ base: 'xl', md: '2xl' }} bold textAlign="center">
          {t('Choose your path')}
        </H2>

        <SimpleGrid w="full" columns={{ base: 1, md: 2 }} spacing={4}>
          {pathCards.map((card) => (
            <CardLayout key={card.title} spacing={5} alignItems="center" textAlign="center" minH="100%" height="100%">
              <Circle size="56px" bg={iconCircleBg} color={iconColor}>
                <Icon as={card.icon} boxSize={6} />
              </Circle>

              <VStack spacing={2} minH={{ base: '120px', md: '144px' }}>
                <H2 size="xl" bold>
                  {card.title}
                </H2>
                <Body size="md" color={mutedTextColor} maxW="260px">
                  {card.description}
                </Body>
                <Body size="md" color={mutedTextColor} maxW="280px">
                  {card.supportingText}
                </Body>
              </VStack>

              <Button
                as={Link}
                to={card.to}
                variant={card.variant}
                colorScheme={card.variant === 'solid' ? 'primary1' : 'neutral1'}
                size="lg"
                borderRadius="10px"
                fontWeight={600}
                width={{ base: '100%', sm: '240px' }}
                whiteSpace="nowrap"
              >
                {card.buttonLabel}
              </Button>
            </CardLayout>
          ))}
        </SimpleGrid>
      </VStack>

      <CardLayout w="full" maxW="980px" spacing={6} alignItems="center" textAlign="center">
        <VStack spacing={3}>
          <H2 size={{ base: 'xl', md: '2xl' }} medium>
            {t('Get stories and updates in your inbox')}
          </H2>
          <Body size="md" color={mutedTextColor} maxW="720px">
            {t(
              'Stay up to date with the latest adoption news. Fresh stories of progress in education, culture, circular economies, and more.',
            )}
          </Body>
        </VStack>

        <SubscribeForm
          w="full"
          maxWidth="640px"
          inputProps={{
            placeholder: t('satoshi@gmx.com'),
          }}
          buttonProps={{
            children: t('Join'),
            variant: 'solid',
            colorScheme: 'neutral1',
            minWidth: { base: '100%', sm: '120px' },
          }}
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'stretch', sm: 'flex-start' }}
        />
      </CardLayout>
    </VStack>
  )
}
