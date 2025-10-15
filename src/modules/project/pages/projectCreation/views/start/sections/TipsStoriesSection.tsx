import { Box, Image, Link, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'

type StoryCard = {
  title: string
  image: string
  link: string
}

const stories: StoryCard[] = [
  {
    title: 'Tips',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=400&fit=crop',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    title: 'Advice ',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    title: 'Creator stories',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop',
    title: 'Creator stories2',
  },
]

/** Tips & Creator Stories section with video/story cards */
export const TipsStoriesSection = () => {
  return (
    <CreationLayoutCard bg="neutral1.3">
      <VStack maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <H2 size="2xl" bold>
          {t('Tips & Creator Stories')}
        </H2>

        <Body size="md">
          {t(
            'Learn from other creators who have launched successfully on Geyser. Watch quick tips, real experiences, and lessons to guide your own journey.',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={[1, 4]} spacing={6} width="100%" maxW={dimensions.creation.start.maxWidth}>
        {stories.map((story) => (
          <Box
            as={Link}
            isExternal
            href={story.link}
            key={story.title}
            height="350px"
            width="auto"
            bg="neutral.200"
            borderRadius="8px"
            overflow="hidden"
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: 'md',
            }}
            transition="transform 0.2s"
          >
            <Image src={story.image} alt={story.title} width="100%" height="100%" objectFit="cover" />
          </Box>
        ))}
      </SimpleGrid>
    </CreationLayoutCard>
  )
}
