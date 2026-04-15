import { Box, Flex, Image, Link, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { type ImpactFundsSuccessStory } from '../../utils/mainPageContent.ts'

type ImpactFundsSuccessStoriesSectionProps = {
  stories: readonly ImpactFundsSuccessStory[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
  cardSurfaceBg: string
  sectionCardShadow: string
}

/** Success story cards with optional image and external guide link. */
export function ImpactFundsSuccessStoriesSection({
  stories,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
  cardSurfaceBg,
  sectionCardShadow,
}: ImpactFundsSuccessStoriesSectionProps): JSX.Element {
  const placeholderImageBg = useColorModeValue('neutral1.2', 'neutral1.4')

  return (
    <VStack align="stretch" spacing={6}>
      <VStack align="center" spacing={2} w="full" textAlign="center">
        <H2 size="2xl" bold color={sectionPrimaryTextColor}>
          {t('Success Stories')}
        </H2>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {stories.map((story) => {
          const imageBlock = story.imageUrl ? (
            <Image
              src={story.imageUrl}
              alt={story.title}
              w="full"
              h={{ base: '200px', md: '220px' }}
              objectFit="cover"
            />
          ) : (
            <Flex
              align="center"
              justify="center"
              h={{ base: '200px', md: '220px' }}
              w="full"
              bg={placeholderImageBg}
            >
              <Body size="sm" color={sectionSecondaryTextColor}>
                {t('Image coming soon')}
              </Body>
            </Flex>
          )

          const card = (
            <Box
              overflow="hidden"
              borderRadius="xl"
              bg={cardSurfaceBg}
              boxShadow={sectionCardShadow}
              minH="160px"
              _hover={
                story.href
                  ? {
                      shadow: 'lg',
                    }
                  : undefined
              }
            >
              {imageBlock}
              <VStack align="start" spacing={3} p={6}>
                <Body bold color={sectionPrimaryTextColor}>
                  {story.title}
                </Body>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.6}>
                  {story.description}
                </Body>
              </VStack>
            </Box>
          )

          return (
            <Box key={story.title}>
              {story.href ? (
                <Link
                  href={story.href}
                  isExternal
                  display="block"
                  w="full"
                  _hover={{ textDecoration: 'none' }}
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </Box>
          )
        })}
      </SimpleGrid>
    </VStack>
  )
}
