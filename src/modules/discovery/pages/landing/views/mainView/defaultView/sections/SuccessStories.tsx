import { Link, SimpleGrid } from '@chakra-ui/react'
import { t } from 'i18next'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { CreationStoryCard } from '@/modules/project/pages/projectCreation/views/start/components/CreationStoryCard.tsx'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const stories = [
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_1.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/btc-isla',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_2.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/btc-trading-cards',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_3.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/perus-bitcoin-revolution',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_4.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/givers',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_5.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/the-bushido-of-bitcoin',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_6.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/bitcoinize',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_7.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/the-maxis-club',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_8.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/the-rage',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_9.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/mi-primer-bitcoin',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_10.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/free-roman-storm',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_11.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/orphans-of-uganda',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_stories_12.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/nostr-booth',
  },
]

export const SuccessStories = () => {
  // Select 4 random stories for display
  const shuffledStories = [...stories].sort(() => 0.5 - Math.random())
  const displayedStories = shuffledStories.slice(0, 4)
  return (
    <ProjectRowLayout
      title={t('Success Stories')}
      width="100%"
      rightContent={
        <DiscoverMoreButton as={Link} isExternal href="https://guide.geyser.fund/geyser-docs/guides/success-stories" />
      }
    >
      <SimpleGrid w="full" columns={{ base: 1, md: 4 }} spacing={{ base: 4, lg: 8 }}>
        {displayedStories.map((story) => {
          return <CreationStoryCard key={story.link} link={story.link} image={story.image} />
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
