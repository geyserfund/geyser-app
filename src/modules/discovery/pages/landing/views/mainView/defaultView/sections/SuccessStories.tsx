import { Box, HStack, Link, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import BringSuccessStoryImage from '@/assets/bring-success-story.webp'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { CreationStoryCard } from '@/modules/project/pages/projectCreation/views/start/components/CreationStoryCard.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

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
  {
    image: BringSuccessStoryImage,
    link: 'https://guide.geyser.fund/geyser-docs/guides/take-brindon-to-btc-prague',
  },
  {
    image:
      'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_story_love_is_the_cure.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/love-is-the-cure',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_story_Node_runners.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/noderunners-bitcoin-blitz',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_story_wall_axe.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/wallaxe',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/success_stories/success_story_we_satoshi.png',
    link: 'https://guide.geyser.fund/geyser-docs/guides/success-stories/wesatoshis',
  },
]

export const SuccessStories = () => {
  const surfaceColor = useColorModeValue('gray.50', 'gray.800')

  const displayedStories = useMemo(() => {
    const shuffledStories = [...stories].sort(() => 0.5 - Math.random())
    return shuffledStories.slice(0, 3)
  }, [])

  return (
    <ProjectRowLayout
      title={t('Impact stories')}
      subtext={t('Snapshots from projects and communities using Bitcoin to create real change')}
      width="100%"
      rightContent={
        <DiscoverMoreButton as={Link} isExternal href="https://guide.geyser.fund/geyser-docs/guides/success-stories" />
      }
    >
      <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 6 }}>
        {displayedStories.map((story, index) => (
          <VStack
            key={story.link}
            align="stretch"
            spacing={3}
            padding={{ base: 3, lg: 4 }}
            borderRadius="28px"
            backgroundColor={surfaceColor}
          >
            <CreationStoryCard link={story.link} image={story.image} />
            <HStack justify="space-between" align="start" spacing={3}>
              <Body size="sm" color="neutral1.10">
                {index === 0
                  ? t('Community-led adoption stories from around the world.')
                  : index === 1
                  ? t('Creator campaigns turning ideas into lasting Bitcoin impact.')
                  : t('Grassroots efforts supported directly by Bitcoin contributors.')}
              </Body>
              <Box flexShrink={0}>
                <Body size="sm" bold color="primary1.11">
                  {t('Read')}
                </Body>
              </Box>
            </HStack>
          </VStack>
        ))}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
