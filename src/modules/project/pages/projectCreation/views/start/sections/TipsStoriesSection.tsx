import { Box, Image, Link, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'

type StoryCard = {
  image: string
  link: string
}

const stories: StoryCard[] = [
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips1.png',
    link: 'https://www.instagram.com/reel/DPG4VtDjOwB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips2.png',
    link: 'https://youtube.com/shorts/5bcmXtR8c9I?si=Rrv89hd8oPkf_NGC',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips3.png',
    link: 'https://youtube.com/shorts/Hp9Jhxl7ZfM?feature=share',
  },
  {
    link: 'https://www.youtube.com/watch?v=SqNPogWpmAg',
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips4.png',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips5.png',
    link: 'https://www.youtube.com/shorts/FXhDpJHfmS4',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips6.png',
    link: 'https://www.youtube.com/watch?v=LxE1kx0bkhs&list=PLIDbic_KUMN2awpb22SHp2sR3o261zDZX&index=5',
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

      <SimpleGrid
        columns={{ base: 1, xs: 2, sm: 3 }}
        spacing={6}
        width="100%"
        maxW={dimensions.creation.start.maxWidth}
      >
        {stories.map((story) => (
          <Box
            as={Link}
            isExternal
            href={story.link}
            key={story.link}
            width="auto"
            aspectRatio="1/1.4"
            bg="neutral.200"
            borderRadius="8px"
            overflow="hidden"
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: 'md',
            }}
            transition="transform 0.2s"
          >
            <Image src={story.image} alt={story.link} width="100%" height="100%" objectFit="cover" />
          </Box>
        ))}
      </SimpleGrid>
    </CreationLayoutCard>
  )
}
