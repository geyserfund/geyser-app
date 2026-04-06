import {
  Badge,
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
  Link as ChakraLink,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorMiniStories, creatorStories } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const successStoriesGuideUrl = 'https://guide.geyser.fund/geyser-docs/guides/success-stories'

const getColorFamily = (colorToken: string) => colorToken.split('.')[0]
const getAlphaToken = (colorToken: string, alphaStep: number) => `${getColorFamily(colorToken)}Alpha.${alphaStep}`

/** Success stories section showcasing social proof and outcomes. */
export const CreatorSuccessStoriesSection = () => {
  const sectionBackground = 'neutral1.2'
  const cardBackground = useColorModeValue('utils.pbg', 'neutral1.3')
  const cardBorderColor = 'neutral1.6'
  const ctaSurface = useColorModeValue('primary1.1', 'primary1.2')
  const ctaBorderColor = useColorModeValue('primary1.5', 'primary1.6')
  const imageOverlayGradient = useColorModeValue(
    'linear(to-t, var(--chakra-colors-overlay-black-7), var(--chakra-colors-overlay-black-2))',
    'linear(to-t, var(--chakra-colors-overlay-white-7), var(--chakra-colors-overlay-white-2))',
  )

  return (
    <Box
      as="section"
      id="creator-success-stories"
      w="full"
      py={{ base: 14, lg: 20 }}
      scrollMarginTop={{ base: 24, lg: 28 }}
      backgroundColor={sectionBackground}
    >
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 7, lg: 10 }}>
          <VStack align={{ base: 'start', lg: 'center' }} spacing={3}>
            <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
              {t('Success stories')}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold textAlign={{ base: 'left', lg: 'center' }}>
              {t('Real creators. Real results.')}
            </H2>
            <Body size="md" color="neutral1.10" maxW="620px" textAlign={{ base: 'left', lg: 'center' }}>
              {t("These aren't outliers. They are what happens when a creator meets the right community.")}
            </Body>
          </VStack>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }} gap={{ base: 4, lg: 5 }}>
            {creatorStories.map((story) => {
              const accentBorderColor = getAlphaToken(story.accentColor, 8)

              return (
                <ChakraLink
                  key={story.title}
                  href={story.linkUrl}
                  isExternal={true}
                  rel="noopener noreferrer"
                  display="block"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    role="group"
                    overflow="hidden"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor={cardBorderColor}
                    backgroundColor={cardBackground}
                    transition="all 0.25s ease"
                    _hover={{ transform: 'translateY(-4px)', borderColor: accentBorderColor }}
                  >
                    <Box position="relative" h={{ base: '220px', lg: '250px' }}>
                      <Image
                        src={story.imageUrl}
                        alt={t(story.title)}
                        w="full"
                        h="full"
                        objectFit="cover"
                        transition="transform 0.35s ease"
                        _groupHover={{ transform: 'scale(1.05)' }}
                      />
                      <Box position="absolute" inset={0} bgGradient={imageOverlayGradient} />
                      <HStack position="absolute" left={3} bottom={3} spacing={2} alignItems="center">
                        <Badge
                          variant="surface"
                          colorScheme="primary1"
                          size="sm"
                          borderColor={accentBorderColor}
                          textTransform="uppercase"
                          fontSize="10px"
                          px={2}
                          py={0.5}
                          lineHeight={1.1}
                        >
                          {t(story.tag)}
                        </Badge>
                        <Badge
                          variant="surface"
                          colorScheme="neutral1"
                          size="sm"
                          borderColor={accentBorderColor}
                          fontSize="10px"
                          px={2}
                          py={0.5}
                          lineHeight={1.1}
                        >
                          {t(story.outcomeLabel)}
                        </Badge>
                      </HStack>
                    </Box>
                    <VStack align="start" spacing={2} p={5}>
                      <HStack w="full" spacing={3} align="flex-start" justify="space-between">
                        <Body size="lg" fontWeight={700}>
                          {t(story.title)}
                        </Body>
                        <HStack
                          spacing={1.5}
                          color={story.accentColor}
                          opacity={0}
                          transform="translateX(-4px)"
                          transition="all 0.2s ease"
                          _groupHover={{ opacity: 1, transform: 'translateX(0)' }}
                          _groupFocusWithin={{ opacity: 1, transform: 'translateX(0)' }}
                        >
                          <Body size="sm" fontWeight={700} color={story.accentColor} whiteSpace="nowrap">
                            {t('Read story')}
                          </Body>
                          <PiArrowUpRight size={14} />
                        </HStack>
                      </HStack>
                      <Body size="sm" color="neutral1.10">
                        {t(story.description)}
                      </Body>
                    </VStack>
                  </Box>
                </ChakraLink>
              )
            })}
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr)) auto' }} gap={3} alignItems="stretch">
            {creatorMiniStories.map((miniStory) => (
              <GridItem key={miniStory.title}>
                <ChakraLink
                  href={miniStory.linkUrl}
                  isExternal={true}
                  rel="noopener noreferrer"
                  display="block"
                  h="full"
                  _hover={{ textDecoration: 'none' }}
                >
                  <HStack
                    spacing={3}
                    p={3}
                    borderWidth="1px"
                    borderColor={cardBorderColor}
                    borderRadius="xl"
                    backgroundColor={cardBackground}
                    h="full"
                  >
                    <Image
                      src={miniStory.imageUrl}
                      alt={t(miniStory.title)}
                      boxSize="44px"
                      borderRadius="lg"
                      objectFit="cover"
                    />
                    <VStack spacing={0.5} align="start">
                      <Body size="sm" fontWeight={700}>
                        {t(miniStory.title)}
                      </Body>
                      {miniStory.subtitle ? (
                        <Body fontSize="xs" color="neutral1.10" noOfLines={1}>
                          {t(miniStory.subtitle)}
                        </Body>
                      ) : null}
                    </VStack>
                  </HStack>
                </ChakraLink>
              </GridItem>
            ))}

            <GridItem>
              <ChakraLink
                href={successStoriesGuideUrl}
                isExternal={true}
                rel="noopener noreferrer"
                display="block"
                h="full"
                _hover={{ textDecoration: 'none' }}
              >
                <HStack
                  spacing={2}
                  justify="space-between"
                  p={4}
                  h="full"
                  minH="72px"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={ctaBorderColor}
                  backgroundColor={ctaSurface}
                  color="primary1.11"
                >
                  <Body size="sm" fontWeight={700} color="inherit">
                    {t('See all success stories')}
                  </Body>
                  <PiArrowUpRight size={16} />
                </HStack>
              </ChakraLink>
            </GridItem>
          </Grid>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
