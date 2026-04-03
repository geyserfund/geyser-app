import { Box, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiChartLine, PiClock, PiMegaphone, PiUsers } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Step 6 section for first-week launch execution and timeline. */
export const LaunchStrongSection = () => {
  const timelineIconBg = useColorModeValue('primary1.100', 'primary1.900')
  const mistakeBadgeBg = useColorModeValue('error.4', 'error.6')

  const timeline = useMemo(
    () => [
      {
        icon: PiUsers,
        title: t('Before launch'),
        duration: t('1 to 2 weeks before'),
        tasks: [
          t('Draft your launch announcement'),
          t('Prepare a small early-supporter list'),
          t('Set a first goal that creates momentum'),
          t('Prepare visuals and shareable content'),
        ],
      },
      {
        icon: PiMegaphone,
        title: t('Launch day'),
        duration: t('Day 0'),
        tasks: [
          t('Publish your announcement across channels'),
          t('Personally message close supporters'),
          t('Launch like an event, not just a button click'),
          t('Respond quickly to comments and questions'),
        ],
      },
      {
        icon: PiChartLine,
        title: t('Days 3 to 7'),
        duration: t('First week'),
        tasks: [
          t('Post your first progress update'),
          t('Thank early supporters publicly'),
          t('Share milestones as they happen'),
          t('Keep communicating and do not disappear'),
        ],
      },
    ],
    [],
  )

  const mistakes = useMemo(
    () => [
      t('Launching without warming up supporters first'),
      t('Setting an unrealistic first goal'),
      t('Disappearing after publish day'),
      t('Waiting for perfect conditions'),
      t('Not preparing shareable content in advance'),
    ],
    [],
  )

  return (
    <StartPageSectionShell id="launch-strong">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Your first 72 hours matter most')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t(
            'A strong launch is preparation plus consistency. Treat launch day as a coordinated event and keep momentum through the first week.',
          )}
        </Body>
      </VStack>

      <VStack alignItems="stretch" spacing={4}>
        {timeline.map((phase) => (
          <PlaybookCard key={phase.title}>
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
              <HStack alignItems="flex-start" spacing={3}>
                <VStack
                  width="44px"
                  height="44px"
                  borderRadius="full"
                  backgroundColor={timelineIconBg}
                  justifyContent="center"
                  alignItems="center"
                  flexShrink={0}
                >
                  <phase.icon size={20} />
                </VStack>
                <VStack alignItems="flex-start" spacing={0}>
                  <H3 size="md" bold>
                    {phase.title}
                  </H3>
                  <Body size="sm" muted>
                    {phase.duration}
                  </Body>
                </VStack>
              </HStack>

              <VStack alignItems="flex-start" spacing={2} gridColumn={{ base: 'auto', lg: 'span 2' }}>
                {phase.tasks.map((task) => (
                  <HStack key={task} spacing={2} alignItems="flex-start">
                    <VStack
                      width="18px"
                      height="18px"
                      borderRadius="full"
                      border="2px solid"
                      borderColor="primary1.8"
                      marginTop="4px"
                    />
                    <Body size="sm">{task}</Body>
                  </HStack>
                ))}
              </VStack>
            </SimpleGrid>
          </PlaybookCard>
        ))}
      </VStack>

      <PlaybookCard backgroundColor={useColorModeValue('neutral1.2', 'neutral1.3')}>
        <VStack alignItems="flex-start" spacing={3}>
          <H3 bold>{t('Common mistakes to avoid')}</H3>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} width="100%">
            {mistakes.map((item) => (
              <HStack key={item} alignItems="flex-start" spacing={2}>
                <Box
                  width="20px"
                  height="20px"
                  borderRadius="full"
                  backgroundColor={mistakeBadgeBg}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight={700}
                  fontSize="xs"
                  flexShrink={0}
                >
                  ×
                </Box>
                <Body size="sm">{item}</Body>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </PlaybookCard>

      <PlaybookCard backgroundColor={useColorModeValue('primary1.50', 'primary1.900')}>
        <HStack alignItems="flex-start" spacing={3}>
          <Box marginTop="2px">
            <PiClock size={24} />
          </Box>
          <VStack alignItems="flex-start" spacing={1}>
            <H3 size="md" bold>
              {t('What momentum looks like')}
            </H3>
            <Body size="sm" muted>
              {t(
                'Early support compounds. First supporters attract more supporters, and frequent updates maintain trust.',
              )}
            </Body>
          </VStack>
        </HStack>
      </PlaybookCard>
    </StartPageSectionShell>
  )
}
