import { Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCalendar, PiChartBar, PiHeart, PiNotePencil } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Step 7 section for post-launch communication cadence and supporter retention. */
export const MomentumSection = () => {
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')
  const frequencyBadgeBg = useColorModeValue('neutral1.2', 'neutral1.4')

  const updateTypes = useMemo(
    () => [
      {
        icon: PiNotePencil,
        title: t('Progress updates'),
        description: t('Share wins, blockers, and what you are building next'),
        frequency: t('Every 1 to 2 weeks'),
      },
      {
        icon: PiChartBar,
        title: t('Milestone announcements'),
        description: t('Celebrate goal progress and convert momentum into more backing'),
        frequency: t('As milestones happen'),
      },
      {
        icon: PiHeart,
        title: t('Supporter recognition'),
        description: t('Thank contributors and spotlight community participation'),
        frequency: t('Monthly'),
      },
      {
        icon: PiCalendar,
        title: t('Impact reports'),
        description: t('Show what funding enabled and what is coming next'),
        frequency: t('Quarterly'),
      },
    ],
    [],
  )

  const principles = useMemo(
    () => [
      t('Share progress, not perfection'),
      t('Be transparent about wins and setbacks'),
      t('Use photos, videos, and metrics'),
      t('Make updates easy to share'),
      t('Turn first supporters into long-term backers'),
    ],
    [],
  )

  return (
    <StartPageSectionShell id="momentum" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Keep the project alive after the first wave')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t(
            'Fundraising success compounds through consistent communication. Keep supporters informed so trust and participation keep growing.',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {updateTypes.map((item) => (
          <PlaybookCard key={item.title}>
            <VStack alignItems="flex-start" spacing={3}>
              <HStack justifyContent="space-between" width="100%" alignItems="flex-start">
                <HStack alignItems="flex-start" spacing={3}>
                  <VStack
                    width="42px"
                    height="42px"
                    borderRadius="10px"
                    backgroundColor={iconBackground}
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                  >
                    <item.icon size={20} />
                  </VStack>
                  <VStack alignItems="flex-start" spacing={0}>
                    <H3 size="md" bold>
                      {item.title}
                    </H3>
                    <Body size="sm" muted>
                      {item.description}
                    </Body>
                  </VStack>
                </HStack>
                <VStack borderRadius="999px" backgroundColor={frequencyBadgeBg} paddingX={3} paddingY={1}>
                  <Body size="xs">{item.frequency}</Body>
                </VStack>
              </HStack>
            </VStack>
          </PlaybookCard>
        ))}
      </SimpleGrid>

      <PlaybookCard>
        <VStack alignItems="flex-start" spacing={4}>
          <H3 bold>{t('Sample progress update')}</H3>
          <Body size="sm" muted>
            {t(
              'Thanks to early supporters, we hit our first milestone and can move to the next production phase. Here is what shipped this week and what is next.',
            )}
          </Body>
          <HStack spacing={3}>
            <Button size="sm" variant="ghost" colorScheme="neutral1" leftIcon={<PiHeart />}>
              {t('Like')}
            </Button>
            <Button size="sm" variant="ghost" colorScheme="neutral1">
              {t('Comment')}
            </Button>
            <Button size="sm" variant="ghost" colorScheme="neutral1">
              {t('Share')}
            </Button>
          </HStack>
        </VStack>
      </PlaybookCard>

      <PlaybookCard backgroundColor={useColorModeValue('primary1.50', 'primary1.900')}>
        <VStack alignItems="flex-start" spacing={3}>
          <H3 bold>{t('Communication principles that build trust')}</H3>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} width="100%">
            {principles.map((item) => (
              <HStack key={item} alignItems="flex-start" spacing={2}>
                <VStack
                  width="20px"
                  height="20px"
                  borderRadius="full"
                  backgroundColor="primary1.8"
                  color="utils.blackContrast"
                  fontWeight={700}
                  fontSize="xs"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  marginTop="2px"
                >
                  ✓
                </VStack>
                <Body size="sm">{item}</Body>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </PlaybookCard>
    </StartPageSectionShell>
  )
}
