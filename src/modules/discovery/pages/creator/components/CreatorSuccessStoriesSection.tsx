import {
  Box,
  Button,
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

const getAlphaColor = (hexColor: string, alpha: number) => {
  const color = hexColor.trim().replace('#', '')

  if (color.length !== 6) {
    return `rgba(255, 255, 255, ${alpha})`
  }

  const red = Number.parseInt(color.slice(0, 2), 16)
  const green = Number.parseInt(color.slice(2, 4), 16)
  const blue = Number.parseInt(color.slice(4, 6), 16)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

/** Success stories section showcasing social proof and outcomes. */
export const CreatorSuccessStoriesSection = () => {
  const sectionBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const cardBackground = useColorModeValue('utils.pbg', 'neutral1.3')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.6')
  const ctaSurface = useColorModeValue('primary1.1', 'primary1.2')
  const ctaBorderColor = useColorModeValue('primary1.5', 'primary1.6')

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
              const accentBorderColor = getAlphaColor(story.accentColor, 0.5)
              const tagBackground = getAlphaColor(story.accentColor, 0.2)
              const outcomeBackground = getAlphaColor(story.accentColor, 0.18)

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
                      <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.1))" />
                      <Box
                        position="absolute"
                        left={4}
                        top={4}
                        px={3}
                        py={1}
                        borderRadius="full"
                        backgroundColor={tagBackground}
                        borderWidth="1px"
                        borderColor={accentBorderColor}
                      >
                        <Body
                          fontSize="xs"
                          fontWeight={700}
                          color={story.accentColor}
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          {t(story.tag)}
                        </Body>
                      </Box>
                      <Box
                        position="absolute"
                        right={4}
                        bottom={4}
                        px={3}
                        py={1.5}
                        borderRadius="md"
                        backgroundColor={outcomeBackground}
                        borderWidth="1px"
                        borderColor={accentBorderColor}
                      >
                        <Body fontSize="xs" fontWeight={700} color="white">
                          {t(story.outcomeLabel)}
                        </Body>
                      </Box>
                    </Box>
                    <VStack align="start" spacing={3} p={5}>
                      <Body size="lg" fontWeight={700}>
                        {t(story.title)}
                      </Body>
                      <Body size="sm" color="neutral1.10">
                        {t(story.description)}
                      </Body>
                      <HStack spacing={1.5} color={story.accentColor}>
                        <Body size="sm" fontWeight={700} color={story.accentColor}>
                          {t('Read story')}
                        </Body>
                        <PiArrowUpRight size={14} />
                      </HStack>
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
                        <Body fontSize="xs" color="neutral1.10">
                          {t(miniStory.subtitle)}
                        </Body>
                      ) : null}
                    </VStack>
                  </HStack>
                </ChakraLink>
              </GridItem>
            ))}

            <GridItem>
              <Button
                as={ChakraLink}
                href={successStoriesGuideUrl}
                isExternal={true}
                rel="noopener noreferrer"
                rightIcon={<PiArrowUpRight />}
                h="full"
                minH="72px"
                px={5}
                borderRadius="xl"
                backgroundColor={ctaSurface}
                borderWidth="1px"
                borderColor={ctaBorderColor}
                _hover={{ backgroundColor: ctaSurface, opacity: 0.9 }}
              >
                {t('See all success stories')}
              </Button>
            </GridItem>
          </Grid>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
