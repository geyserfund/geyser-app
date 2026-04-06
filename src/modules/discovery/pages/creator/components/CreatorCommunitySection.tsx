import { Box, HStack, Icon, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { creatorCommunityMainImageUrl, creatorCommunityPillars } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const getColorFamily = (colorToken: string) => colorToken.split('.')[0]
const getAlphaToken = (colorToken: string, alphaStep: number) => `${getColorFamily(colorToken)}Alpha.${alphaStep}`

/** Community belonging section focused on why launching on Geyser feels different. */
export const CreatorCommunitySection = () => {
  const sectionBackground = 'utils.pbg'
  const cardBackground = 'neutral1.2'
  const cardBorderColor = 'neutral1.6'
  const imageOverlayGradient = useColorModeValue(
    'linear(to-t, var(--chakra-colors-overlay-black-7), var(--chakra-colors-overlay-black-1))',
    'linear(to-t, var(--chakra-colors-overlay-white-7), var(--chakra-colors-overlay-white-1))',
  )

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
                <Box position="absolute" inset={0} bgGradient={imageOverlayGradient} />
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
                  'Geyser helps creators launch successful fundraisers and campaigns with audience, distribution, and hands-on support from day one.',
                )}
              </Body>
              <Body size="md" color="neutral1.10">
                {t(
                  "From exposure to the Bitcoiner community, to promotion through Geyser's network, to direct launch support, we help projects turn attention into momentum.",
                )}
              </Body>

              <SimpleGrid columns={1} spacing={4} w="full" mt={2}>
                {creatorCommunityPillars.map((pillar) => {
                  const iconBadgeBackground = getAlphaToken(pillar.accentColor, 3)
                  const iconBadgeBorderColor = getAlphaToken(pillar.accentColor, 5)

                  return (
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
                        w="42px"
                        h="42px"
                        borderRadius="12px"
                        backgroundColor={iconBadgeBackground}
                        borderWidth="1px"
                        borderColor={iconBadgeBorderColor}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={pillar.accentColor}
                        flexShrink={0}
                      >
                        <Icon as={pillar.icon} fontSize="20px" />
                      </Box>
                      <VStack align="start" spacing={2}>
                        <H3 size="md" bold>
                          {t(pillar.title)}
                        </H3>
                        <Body size="sm" color="neutral1.10">
                          {t(pillar.body)}
                        </Body>
                      </VStack>
                    </HStack>
                  )
                })}
              </SimpleGrid>
            </VStack>
          </SimpleGrid>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
