import { Button, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'

const pathways = [
  {
    title: 'Support Circular Grants',
    description: 'Back vetted local projects with reusable, debt-free capital.',
    action: 'Explore Circular Grants',
    to: getPath('discoveryCircularGrants'),
  },
  {
    title: 'Contribute to a Regional Partner Fund',
    description: 'Help allocate capital across high-impact local projects and follow the outcomes.',
    action: 'Explore Regional Partner Funds',
    to: getPath('discoveryImpactFunds'),
  },
  {
    title: 'Become a Field Partner',
    description: 'Help local projects launch, access capital, and share their impact.',
    action: 'Become a Field Partner',
    to: `${getPath('discoveryImpactFunds')}#field-partners`,
  },
] as const

/** Section explaining the three ways to participate in Geyser's local funding network. */
export const HowGeyserWorks = () => {
  const cardBg = useColorModeValue(undefined, 'neutral1.3')
  const subtitleColor = 'neutralAlpha.11'

  return (
    <VStack w="full" spacing={6} align="start">
      <VStack spacing={2} align="start">
        <LandingPageSectionTitle>{t('How Geyser works')}</LandingPageSectionTitle>
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {t('Build stronger local economies together')}
        </H2>
      </VStack>

      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={5}>
        {pathways.map((pathway) => (
          <CardLayout
            key={pathway.title}
            w="full"
            h="full"
            align="start"
            spacing={5}
            px={{ base: 5, md: 6 }}
            py={{ base: 5, md: 6 }}
            bg={cardBg}
          >
            <VStack w="full" align="start" spacing={2} flex={1}>
              <H3 size={{ base: 'md', lg: 'xl' }} bold>
                {t(pathway.title)}
              </H3>
              <Body size={{ base: 'md', lg: 'lg' }} color={subtitleColor}>
                {t(pathway.description)}
              </Body>
            </VStack>
            <Button
              as={Link}
              to={pathway.to}
              size="lg"
              w="full"
              variant="solid"
              colorScheme="primary1"
              fontWeight={700}
              rightIcon={<Icon as={PiArrowRight} />}
            >
              {t(pathway.action)}
            </Button>
          </CardLayout>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
