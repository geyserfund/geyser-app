import { Box, Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiChartLine, PiRocketLaunch } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getFinalStats } from '../utils/startPageContent.ts'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Final conversion section for the launch start playbook page. */
export const FinalCTASection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const stats = useMemo(() => getFinalStats(t), [])

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
          <Body size="lg" maxWidth="760px" light>
            {t('You do not need perfect conditions to begin. Start with clarity, then improve through momentum.')}
          </Body>

          <HStack spacing={3} flexWrap="wrap" justifyContent="center" width="100%">
            <Button
              size="lg"
              colorScheme="primary1"
              onClick={handleLauchNowClick}
              rightIcon={<PiRocketLaunch />}
              borderRadius="12px"
              width={{ base: '100%', sm: 'auto' }}
            >
              {t('Start your project')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="neutral1"
              onClick={onExploreToolsClick}
              leftIcon={<PiChartLine />}
              width={{ base: '100%', sm: 'auto' }}
            >
              {t('Explore tools')}
            </Button>
          </HStack>

          <PlaybookCard width="100%" maxWidth="920px">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {stats.map((stat) => (
                <VStack key={stat.title} spacing={1}>
                  <Body size="xl" bold color="primary1.9">
                    {stat.title}
                  </Body>
                  <Body size="xs" light>
                    {stat.description}
                  </Body>
                </VStack>
              ))}
            </SimpleGrid>
          </PlaybookCard>

          <Box>
            <Body size="sm" light fontStyle="italic" maxWidth="680px">
              {t('Join creators building with tools, visibility, and support from the Geyser ecosystem.')}
            </Body>
          </Box>
        </VStack>
      </StartPageSectionShell>
      {renderModal()}
    </>
  )
}
