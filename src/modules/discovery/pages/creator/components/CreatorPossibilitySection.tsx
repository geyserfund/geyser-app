import { Box, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorPossibilities } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const getColorFamily = (colorToken: string) => colorToken.split('.')[0]
const getAlphaToken = (colorToken: string, alphaStep: number) => `${getColorFamily(colorToken)}Alpha.${alphaStep}`

/** Possibility section helping visitors imagine what they can build on Geyser. */
export const CreatorPossibilitySection = () => {
  const sectionBackground = 'utils.pbg'
  const cardBackground = useColorModeValue('neutral1.1', 'neutral1.2')
  const cardShadow = useColorModeValue(
    '0 8px 20px var(--chakra-colors-overlay-black-3)',
    '0 10px 24px var(--chakra-colors-overlay-white-5)',
  )

  return (
    <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 7, lg: 10 }}>
          <VStack align={{ base: 'start', lg: 'center' }} spacing={3}>
            <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
              {t('What you can build here')}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold textAlign={{ base: 'left', lg: 'center' }}>
              {t('What could you bring to life?')}
            </H2>
            <Body size="md" color="neutral1.10" maxW="620px" textAlign={{ base: 'left', lg: 'center' }}>
              {t(
                "Geyser has room for every scale of ambition. Show up with your idea and find the people who've been waiting for it.",
              )}
            </Body>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {creatorPossibilities.map((possibility) => {
              const iconBadgeBackground = getAlphaToken(possibility.iconColor, 2)
              const iconBadgeBorderColor = getAlphaToken(possibility.iconColor, 4)

              return (
                <Box
                  key={possibility.title}
                  p={6}
                  borderWidth="1px"
                  borderColor={possibility.borderColor}
                  borderRadius="xl"
                  backgroundColor={cardBackground}
                  boxShadow={cardShadow}
                  transition="transform 0.2s ease"
                  _hover={{ transform: 'translateY(-3px)' }}
                >
                  <VStack align="start" spacing={3}>
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      w="44px"
                      h="44px"
                      borderRadius="12px"
                      backgroundColor={iconBadgeBackground}
                      borderWidth="1px"
                      borderColor={iconBadgeBorderColor}
                    >
                      <Icon as={possibility.icon} boxSize={5} color={possibility.iconColor} />
                    </Box>
                    <Body size="lg" fontWeight={700}>
                      {t(possibility.title)}
                    </Body>
                    <Body size="sm" color="neutral1.10">
                      {t(possibility.description)}
                    </Body>
                  </VStack>
                </Box>
              )
            })}
          </SimpleGrid>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
