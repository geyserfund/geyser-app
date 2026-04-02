import { Box, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const communityImageUrl =
  'https://images.unsplash.com/photo-1760992003927-96ac55e57296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400'

const communityPillars = [
  {
    title: 'Creators are supported by people who care',
    body: 'Backers on Geyser are often your earliest advocates, helping your project spread and gain momentum.',
  },
  {
    title: 'Projects can start small and grow steadily',
    body: 'A few believers can be enough to unlock the first milestone and attract wider participation.',
  },
  {
    title: 'Geyser is powered by community energy',
    body: 'Contributions are meaningful signals that your mission resonates beyond your immediate network.',
  },
  {
    title: 'Global builders, local impact',
    body: 'Creators from different backgrounds and geographies launch here to build culture, education, and tools.',
  },
]

/** Community belonging section focused on why launching on Geyser feels different. */
export const CreatorCommunitySection = () => {
  const sectionBackground = useColorModeValue('utils.pbg', 'utils.pbg')
  const cardBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.6')

  return (
    <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 7, lg: 10 }} alignItems="center">
          <VStack align="start" spacing={4}>
            <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
              {t('More than a platform')}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold>
              {t("You're not launching alone")}
            </H2>
            <Body size="md" color="neutral1.10">
              {t(
                'On Geyser, creators are supported by people who care about the mission, not just the transaction. That shared conviction helps projects start, survive, and scale.',
              )}
            </Body>
            <Body size="md" color="neutral1.10">
              {t(
                'Whether you are building culture, education, open-source tools, stories, or local impact, this is where ideas find their people.',
              )}
            </Body>
          </VStack>

          <Box
            overflow="hidden"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={cardBorderColor}
            minH={{ base: '280px', lg: '430px' }}
          >
            <Image src={communityImageUrl} alt={t('Community gathering')} w="full" h="full" objectFit="cover" />
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mt={{ base: 7, lg: 8 }}>
          {communityPillars.map((pillar) => (
            <Box
              key={pillar.title}
              borderWidth="1px"
              borderColor={cardBorderColor}
              borderRadius="xl"
              p={5}
              backgroundColor={cardBackground}
            >
              <VStack align="start" spacing={2}>
                <H3 size="md" bold>
                  {t(pillar.title)}
                </H3>
                <Body size="sm" color="neutral1.10">
                  {t(pillar.body)}
                </Body>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </CreatorSectionContainer>
    </Box>
  )
}
