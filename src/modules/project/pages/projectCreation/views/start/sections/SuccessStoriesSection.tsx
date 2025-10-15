import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import { CreationStoryCard } from '../components/CreationStoryCard.tsx'

type StoryCard = {
  title: string
  image: string
  description?: string
}

const stories: StoryCard[] = [
  {
    title: 'Ha Economy',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=200&fit=crop',
    description: 'The Bitcoin circular economy is a system that uses Bitcoin to create a circular economy.',
  },
  {
    title: 'Sofa',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
    description: 'The Bitcoin circular economy is a system that uses Bitcoin to create a circular economy.',
  },
  {
    title: 'Bitcoin Trading',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
    description: 'The Bitcoin circular economy is a system that uses Bitcoin to create a circular economy.',
  },
  {
    title: 'Bitquoise',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop',
    description:
      'The Bitcoin circular economy is a system that uses Bitcoin to create a circular economy. asdfasd adlfna lorem ipsum dolor sit amet',
  },
]

/** Success Stories section with project cards */
export const SuccessStoriesSection = () => {
  return (
    <CreationLayoutCard bg="neutral1.3">
      <VStack maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <H2 size="2xl" bold>
          {t('Success Stories')}
        </H2>

        <Body size="md">
          {t(
            'From grassroots Bitcoin circular economies to innovative products and humanitarian projects, creators have used Geyser to turn ideas into reality. Discover how others are using Geyser to achieve their dreams.',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} width="100%" maxW={dimensions.creation.start.maxWidth}>
        {stories.map((story) => (
          <CreationStoryCard
            key={story.title}
            title={story.title}
            image={story.image}
            description={story.description}
          />
        ))}
      </SimpleGrid>

      <Button minWidth="300px" as={Link} to={getPath('launchProjectDetails')} colorScheme="primary1" size="xl" px={8}>
        {t('Launch now')}
      </Button>
    </CreationLayoutCard>
  )
}
