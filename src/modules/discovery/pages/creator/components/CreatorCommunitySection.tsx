import { Box, HStack, Icon, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FaQuoteLeft } from 'react-icons/fa'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { creatorCommunityMainImageUrl, creatorCommunityPillars, creatorCommunityTestimonials } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Community belonging section focused on why launching on Geyser feels different. */
export const CreatorCommunitySection = () => {
  const sectionBackground = useColorModeValue('utils.pbg', 'utils.pbg')
  const cardBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.6')

  return (
    <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 12 }} alignItems="start">
            <Box position="relative" maxW={{ base: 'full', lg: '540px' }}>
              <Box
                position="relative"
                overflow="hidden"
                borderRadius="2xl"
                aspectRatio={0.82}
                borderWidth="1px"
                borderColor={cardBorderColor}
              >
                <Image
                  src={creatorCommunityMainImageUrl}
                  alt={t('Community gathering')}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
                <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,0.55), rgba(0,0,0,0.05))" />
              </Box>
            </Box>

            <VStack align="start" spacing={4} justify="start" pt={{ lg: 1 }}>
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

              <SimpleGrid columns={1} spacing={4} w="full" mt={2}>
                {creatorCommunityPillars.map((pillar) => (
                  <HStack
                    key={pillar.title}
                    align="start"
                    spacing={4}
                    p={5}
                    borderWidth="1px"
                    borderColor={cardBorderColor}
                    borderRadius="xl"
                    backgroundColor={cardBackground}
                  >
                    <Box
                      width="4px"
                      minH={{ base: '54px', lg: '48px' }}
                      borderRadius="full"
                      backgroundColor={pillar.accentColor}
                      flexShrink={0}
                    />
                    <VStack align="start" spacing={2}>
                      <H3 size="md" bold>
                        {t(pillar.title)}
                      </H3>
                      <Body size="sm" color="neutral1.10">
                        {t(pillar.body)}
                      </Body>
                    </VStack>
                  </HStack>
                ))}
              </SimpleGrid>
            </VStack>
          </SimpleGrid>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
