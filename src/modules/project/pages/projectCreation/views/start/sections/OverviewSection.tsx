import { SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiChartLine, PiLightbulb, PiRocket, PiTarget, PiUsers } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Overview section defining the core success pillars for Geyser fundraising. */
export const OverviewSection = () => {
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')

  const pillars = useMemo(
    () => [
      {
        icon: PiLightbulb,
        title: t('A compelling story'),
        description: t('Make supporters understand what you are building and why it matters'),
      },
      {
        icon: PiTarget,
        title: t('The right fundraising model'),
        description: t('Choose the structure that matches your goals and timeline'),
      },
      {
        icon: PiUsers,
        title: t('Clear setup and trust signals'),
        description: t('Build confidence through transparent setup and verification'),
      },
      {
        icon: PiChartLine,
        title: t('Useful creator tools'),
        description: t('Turn interest into funding with goals, rewards, updates, and insights'),
      },
      {
        icon: PiRocket,
        title: t('Strong momentum'),
        description: t('Launch with intent and keep communication consistent in week one and beyond'),
      },
    ],
    [],
  )

  return (
    <StartPageSectionShell id="overview-section">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('What makes a fundraiser succeed on Geyser')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t(
            'A strong Geyser fundraiser is not just publishing a page. It combines story, structure, trust, and momentum to convert visitors into supporters.',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
        {pillars.map((pillar) => (
          <PlaybookCard key={pillar.title}>
            <VStack alignItems="flex-start" spacing={4}>
              <VStack
                width="44px"
                height="44px"
                borderRadius="12px"
                backgroundColor={iconBackground}
                justifyContent="center"
                alignItems="center"
              >
                <pillar.icon size={20} />
              </VStack>
              <H3 size="md" bold>
                {pillar.title}
              </H3>
              <Body size="sm" muted>
                {pillar.description}
              </Body>
            </VStack>
          </PlaybookCard>
        ))}
      </SimpleGrid>
    </StartPageSectionShell>
  )
}
