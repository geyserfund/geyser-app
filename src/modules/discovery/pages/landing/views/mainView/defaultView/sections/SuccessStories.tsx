import { Box, GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { halfStandardPadding } from '@/shared/styles/reponsiveValues.ts'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const stories = [
  {
    title: 'Success Story 1',
    creator: 'Creator 1',
    image: 'https://via.placeholder.com/150',
    description: 'Description 1',
    link: 'https://www.google.com',
  },
  {
    title: 'Success Story 2',
    creator: 'Creator 2',
    image: 'https://via.placeholder.com/150',
    description: 'Description 2',
    link: 'https://www.google.com',
  },
  {
    title: 'Success Story 3',
    creator: 'Creator 3',
    image: 'https://via.placeholder.com/150',
    description: 'Description 3',
    link: 'https://www.google.com',
  },
]

export const SuccessStories = () => {
  return (
    <ProjectRowLayout title={t('Success Stories')} width="100%">
      <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }}>
        {stories.map((story) => {
          return (
            <GridItem key={story.title}>
              <SuccessStoryCard story={story} />
            </GridItem>
          )
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}

const SuccessStoryCard = ({ story }: { story: (typeof stories)[number] }) => {
  return (
    <CardLayout
      background={`url(${story.image})`}
      justifyContent="center"
      alignItems="center"
      position="relative"
      height="468px"
    >
      <VStack
        width="auto"
        height="auto"
        alignItems={'start'}
        spacing={0}
        padding={halfStandardPadding}
        borderRadius="8px"
        position="relative"
        backgroundColor="overlay.black.1"
      >
        <Body bold size="xl" zIndex={1}>
          {story.creator}
        </Body>
        <Body medium size="xl" zIndex={1}>
          {story.title}
        </Body>
      </VStack>

      <Box position="absolute" bottom={2} left={2} width="100%">
        <Body medium size="xl">
          {story.description}
        </Body>
      </Box>
    </CardLayout>
  )
}
