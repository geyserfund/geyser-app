import { Box, Image } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography/Body.tsx'

type StoryCard = {
  title: string
  image: string
  description?: string
}

/** Success Stories section with project cards */
export const CreationStoryCard = ({ title, image, description }: StoryCard) => {
  return (
    <Box
      key={title}
      borderRadius="md"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
    >
      <Box height="auto" width="100%" aspectRatio="1/1" bg="neutral.200">
        <Image src={image} alt={title} width="100%" height="100%" objectFit="cover" />
      </Box>
      <Box p={3}>
        <Body size="sm" bold>
          {title}
        </Body>
        <Body size="xs" noOfLines={2}>
          {description}
        </Body>
      </Box>
    </Box>
  )
}
