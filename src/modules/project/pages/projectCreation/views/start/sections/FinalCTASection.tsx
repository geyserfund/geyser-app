import { Box, Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiChartLine, PiRocket } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Final conversion section for the launch start playbook page. */
export const FinalCTASection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const stats = useMemo(
    () => [
      { value: t('50,000+'), label: t('Bitcoiners in the Geyser ecosystem') },
      { value: t('5,000+'), label: t('Monthly newsletter reach for Growth Launch') },
      { value: t('15k+'), label: t('Followers reached through Growth social support') },
    ],
    [],
  )

  const onExploreToolsClick = () => {
    const section = document.getElementById('creator-tools')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <StartPageSectionShell
        id="final-cta"
        sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}
        borderTop="1px solid"
        borderColor={useColorModeValue('neutral1.4', 'neutral1.5')}
      >
        <VStack alignItems="center" spacing={6} textAlign="center">
          <H2 bold>{t('Ready to launch your project')}?</H2>
          <Body size="lg" maxWidth="760px" muted>
            {t(
              'You do not need perfect conditions to begin. You need a clear story, the right setup, and the confidence to launch.',
            )}
          </Body>

          <HStack spacing={3} flexWrap="wrap" justifyContent="center">
            <Button size="lg" colorScheme="primary1" onClick={handleLauchNowClick} leftIcon={<PiRocket />}>
              {t('Launch your project')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="neutral1"
              onClick={onExploreToolsClick}
              leftIcon={<PiChartLine />}
            >
              {t('Explore tools')}
            </Button>
          </HStack>

          <PlaybookCard width="100%" maxWidth="920px">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {stats.map((stat) => (
                <VStack key={stat.label} spacing={1}>
                  <Body size="xl" bold color="primary1.9">
                    {stat.value}
                  </Body>
                  <Body size="xs" muted>
                    {stat.label}
                  </Body>
                </VStack>
              ))}
            </SimpleGrid>
          </PlaybookCard>

          <Box>
            <Body size="sm" muted fontStyle="italic" maxWidth="680px">
              {t('Join creators building the future with the tools, visibility, and community that Geyser provides.')}
            </Body>
          </Box>
        </VStack>
      </StartPageSectionShell>
      {renderModal()}
    </>
  )
}
