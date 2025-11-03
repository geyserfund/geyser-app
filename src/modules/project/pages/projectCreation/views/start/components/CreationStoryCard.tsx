import { Box, Image, Link } from '@chakra-ui/react'

type StoryCard = {
  link: string
  image: string
}

/** Success Stories section with project cards */
export const CreationStoryCard = ({ link, image }: StoryCard) => {
  return (
    <Box
      as={Link}
      isExternal
      href={link}
      borderRadius="md"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
    >
      <Box height="auto" width="100%" aspectRatio="1/1.4" bg="neutral.200">
        <Image src={image} alt={link} width="100%" height="100%" objectFit="cover" />
      </Box>
    </Box>
  )
}
