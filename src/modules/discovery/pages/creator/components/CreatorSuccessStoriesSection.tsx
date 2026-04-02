import { Box, Button, HStack, Image, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorMiniStories, creatorStories } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const successStoriesGuideUrl = 'https://guide.geyser.fund/geyser-docs/guides/success-stories'

/** Success stories section showcasing social proof and outcomes. */
export const CreatorSuccessStoriesSection = () => {
  const sectionBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const cardBackground = useColorModeValue('utils.pbg', 'neutral1.3')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.6')
  const outcomeBackground = useColorModeValue('primary1.3', 'primary1.3')
  const outcomeTextColor = useColorModeValue('primary1.11', 'primary1.11')

  return (
    <Box
      as="section"
      id="creator-success-stories"
      w="full"
      py={{ base: 14, lg: 20 }}
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

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 4, lg: 5 }}>
            {creatorStories.map((story) => (
              <Box
                key={story.title}
                overflow="hidden"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={cardBorderColor}
                backgroundColor={cardBackground}
              >
                <Box position="relative" h={{ base: '220px', lg: '250px' }}>
                  <Image src={story.imageUrl} alt={t(story.title)} w="full" h="full" objectFit="cover" />
                  <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.1))" />
                  <Box
                    position="absolute"
                    left={4}
                    top={4}
                    px={3}
                    py={1}
                    borderRadius="full"
                    backgroundColor="whiteAlpha.850"
                  >
                    <Body fontSize="xs" fontWeight={700} color="neutral1.11">
                      {t(story.category)}
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
                  >
                    <Body fontSize="xs" fontWeight={700} color={outcomeTextColor}>
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
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
            {creatorMiniStories.map((miniStory) => (
              <HStack
                key={miniStory.title}
                spacing={3}
                p={3}
                borderWidth="1px"
                borderColor={cardBorderColor}
                borderRadius="xl"
                backgroundColor={cardBackground}
              >
                <Image
                  src={miniStory.imageUrl}
                  alt={t(miniStory.title)}
                  boxSize="48px"
                  borderRadius="lg"
                  objectFit="cover"
                />
                <VStack spacing={0.5} align="start">
                  <Body size="sm" fontWeight={700}>
                    {t(miniStory.title)}
                  </Body>
                  <Body fontSize="xs" color="neutral1.10">
                    {t(miniStory.subtitle)}
                  </Body>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>

          <Button
            as={ChakraLink}
            href={successStoriesGuideUrl}
            isExternal={true}
            rel="noopener noreferrer"
            variant="outline"
            colorScheme="neutral1"
            size="lg"
            rightIcon={<PiArrowUpRight />}
            alignSelf={{ base: 'stretch', md: 'start' }}
          >
            {t('See all success stories')}
          </Button>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
