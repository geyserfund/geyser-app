import { Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

const STEPS = [
  {
    step: '1',
    title: 'Choose category',
    description: 'Find projects in categories you want to support',
  },
  {
    step: '2',
    title: 'Donate',
    description: 'Make a one-off or recurring donation',
  },
  {
    step: '3',
    title: 'View impact',
    description: 'Get regular updates by email',
  },
] as const

/** HowItWorks presents the simplified three-step flow on the landing page. */
export const HowItWorks = () => {
  const panelColor = useColorModeValue('white', 'gray.800')
  const panelBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')

  return (
    <VStack width="100%" spacing={8} align="center">
      <VStack spacing={3} textAlign="center" maxW="680px">
        <H2 size={{ base: 'xl', lg: '2xl' }} dark bold>
          {t('How it works')}
        </H2>
        <Body size={{ base: 'md', lg: 'lg' }} color="neutral1.10" lineHeight={1.7}>
          {t('Discover people and projects using Bitcoin to build useful things, then support them directly.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} width="100%">
        {STEPS.map((step) => (
          <VStack
            key={step.step}
            align="stretch"
            spacing={4}
            padding={{ base: 5, lg: 6 }}
            borderRadius="28px"
            border="1px solid"
            borderColor={panelBorder}
            backgroundColor={panelColor}
            minHeight="100%"
          >
            <HStack spacing={3}>
              <HStack
                justify="center"
                align="center"
                width="40px"
                height="40px"
                borderRadius="full"
                backgroundColor="primary1.2"
              >
                <Body bold color="primary1.11">
                  {step.step}
                </Body>
              </HStack>
              <H3 size="md" dark bold>
                {t(step.title)}
              </H3>
            </HStack>
            <Body color="neutral1.10" lineHeight={1.6}>
              {t(step.description)}
            </Body>
          </VStack>
        ))}
      </SimpleGrid>

      <HStack spacing={3} flexWrap="wrap" justify="center">
        <Button as={Link} to={getPath('discoveryLanding')} colorScheme="primary1" borderRadius="full">
          {t('Discover Projects')}
        </Button>
        <Button
          as={Link}
          to={getPath('discoveryImpactFunds')}
          variant="outline"
          colorScheme="neutral1"
          borderRadius="full"
        >
          {t('Discover Impact Funds')}
        </Button>
      </HStack>
    </VStack>
  )
}
