import { Button, HStack, Link as ChakraLink, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import { CreationStoryCard } from '../components/CreationStoryCard.tsx'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

type StoryCard = {
  link: string
  image: string
}

const stories: StoryCard[] = [
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/successstory/success_story_1.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/btc-isla',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/successstory/success_story_2.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/btc-trading-cards',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/successstory/success_story_3.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/givers',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/successstory/success_story_4.png',
    link: ' https://guide.geyser.fund/geyser-docs/guides/success-stories/perus-bitcoin-revolution',
  },
]

/** Success Stories section with project cards */
export const SuccessStoriesSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()
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

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} width="100%" maxW={'1080px'}>
        {stories.map((story) => (
          <CreationStoryCard key={story.link} link={story.link} image={story.image} />
        ))}
      </SimpleGrid>
      <HStack justifyContent="flex-start" width="100%" maxW={'1140px'}>
        <Button
          as={ChakraLink}
          isExternal
          href="https://guide.geyser.fund/geyser-docs/guides/success-stories"
          colorScheme="neutral1"
          variant="ghost"
          size="xl"
          px={8}
          rightIcon={<PiArrowRight />}
        >
          {t('See all success stories')}
        </Button>
      </HStack>
      <Button minWidth="300px" onClick={handleLauchNowClick} colorScheme="primary1" size="xl" px={8}>
        {t('Launch now')}
      </Button>
      {renderModal()}
    </CreationLayoutCard>
  )
}
