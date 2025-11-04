import { Box, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import ReactPlayer from 'react-player'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'

type StoryCard = {
  image: string
  link: string
}

const stories: StoryCard[] = [
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips1.png',
    link: 'https://www.youtube.com/shorts/y8u6wwhcG1U',
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
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips4.png',
    link: 'https://www.youtube.com/watch?v=SqNPogWpmAg',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips5.png',
    link: 'https://www.youtube.com/watch?v=LxE1kx0bkhs',
  },
  {
    image: 'https://storage.googleapis.com/geyser-projects-media/app/creationflow/tips/tips6.png',
    link: 'https://www.youtube.com/shorts/FXhDpJHfmS4',
  },
]

/** Tips & Creator Stories section with video/story cards */
export const TipsStoriesSection = () => {
  const videoModal = useModal()

  return (
    <>
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
              key={story.link}
              width="auto"
              aspectRatio="1/1.4"
              bg="neutral.200"
              borderRadius="8px"
              overflow="hidden"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'md',
                cursor: 'pointer',
              }}
              transition="transform 0.2s"
              onClick={() =>
                videoModal.onOpen({
                  url: story.link,
                })
              }
            >
              <Image src={story.image} alt={story.link} width="100%" height="100%" objectFit="cover" />
            </Box>
          ))}
        </SimpleGrid>
      </CreationLayoutCard>
      <Modal
        {...videoModal}
        size="3xl"
        bodyProps={{
          height: '80vh',
          width: '80vh',
          as: VStack,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ReactPlayer url={videoModal.props.url} controls={true} playing={true} width="100%" height="100%" />
      </Modal>
    </>
  )
}
