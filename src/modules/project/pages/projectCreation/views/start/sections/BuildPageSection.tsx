import { Box, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiImage, PiLink, PiNotePencil, PiTag, PiTextT } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Step 1 section describing how to build a high-converting project page. */
export const BuildPageSection = () => {
  const mutedBackground = useColorModeValue('neutral1.2', 'neutral1.4')
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')

  const setupElements = useMemo(
    () => [
      {
        icon: PiTextT,
        title: t('Project title and identifier'),
        detail: t('Use a clear project name and memorable URL identity'),
      },
      {
        icon: PiNotePencil,
        title: t('One-line objective and story'),
        detail: t('Explain the mission fast and expand with context and impact'),
      },
      {
        icon: PiImage,
        title: t('Project and header visuals'),
        detail: t('Use images or intro video that make the project feel real'),
      },
      {
        icon: PiLink,
        title: t('Contact and project links'),
        detail: t('Improve trust with transparent references and contact points'),
      },
      {
        icon: PiTag,
        title: t('Tags, category, and region'),
        detail: t('Improve discovery and help supporters understand relevance'),
      },
    ],
    [],
  )

  const storytellingFramework = useMemo(
    () => [
      t('Define your why'),
      t('Start with a hook'),
      t('Tell your story'),
      t('Show proof of work'),
      t('Picture the future impact'),
      t('Clearly ask for support'),
    ],
    [],
  )

  return (
    <StartPageSectionShell id="build-page" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Build a page supporters can trust in seconds')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t(
            'Make it obvious what you are building, why it matters, who it serves, and how supporters can help you move it forward.',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <VStack alignItems="stretch" spacing={4}>
          <H3 bold>{t('Key setup elements')}</H3>
          {setupElements.map((item) => (
            <PlaybookCard key={item.title}>
              <HStack alignItems="flex-start" spacing={4}>
                <VStack
                  width="40px"
                  height="40px"
                  borderRadius="10px"
                  backgroundColor={iconBackground}
                  justifyContent="center"
                  alignItems="center"
                  flexShrink={0}
                >
                  <item.icon size={18} />
                </VStack>
                <VStack alignItems="flex-start" spacing={1}>
                  <H3 size="md" bold>
                    {item.title}
                  </H3>
                  <Body size="sm" muted>
                    {item.detail}
                  </Body>
                </VStack>
              </HStack>
            </PlaybookCard>
          ))}
        </VStack>

        <PlaybookCard>
          <VStack alignItems="stretch" spacing={5}>
            <Box
              borderRadius="12px"
              background={useColorModeValue(
                'linear-gradient(135deg, var(--chakra-colors-primary1-8), var(--chakra-colors-primary1-6))',
                'linear-gradient(135deg, var(--chakra-colors-primary1-8), var(--chakra-colors-primary1-5))',
              )}
              height={{ base: '150px', md: '190px' }}
            />
            <VStack alignItems="flex-start" spacing={3}>
              <H3 bold>{t('Sample project page structure')}</H3>
              <PlaybookCard backgroundColor={mutedBackground}>
                <Body size="sm" bold>
                  {t('Your Project Title')}
                </Body>
                <Body size="sm" muted>
                  {t('@project-identifier')}
                </Body>
                <Body size="sm" marginTop={2}>
                  {t('Building the future of open-source tools')}
                </Body>
              </PlaybookCard>
            </VStack>
          </VStack>
        </PlaybookCard>
      </SimpleGrid>

      <PlaybookCard>
        <VStack alignItems="flex-start" spacing={4}>
          <H3 bold>{t('How to write a story people support')}</H3>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4} width="100%">
            {storytellingFramework.map((item, index) => (
              <HStack key={item} alignItems="center" spacing={3}>
                <VStack
                  width="24px"
                  height="24px"
                  borderRadius="full"
                  backgroundColor={iconBackground}
                  fontSize="xs"
                  fontWeight={700}
                  justifyContent="center"
                  alignItems="center"
                  flexShrink={0}
                >
                  {index + 1}
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
