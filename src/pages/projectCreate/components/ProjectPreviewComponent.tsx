import { Box, Text, VStack } from '@chakra-ui/react'

import { H2, H3 } from '../../../components/typography'
import { Card, ImageWithReload } from '../../../components/ui'
import { MarkdownField } from '../../../forms/components/MarkdownField'
import { toSmallImageUrl } from '../../../utils'

interface ProjectPreviewComponentProps {
  data: {
    image?: string | null
    thumbnailImage?: string | null
    title?: string
    shortDescription?: string
    description?: string
  }
}

export const ProjectPreviewComponent = ({
  data,
}: ProjectPreviewComponentProps) => {
  return (
    <VStack
      zIndex={90}
      bg="neutral.0"
      justifyContent="flex-start"
      alignItems="flex-start"
      minWidth="350px"
      maxWidth="350px"
      spacing="10px"
    >
      <Text>Preview</Text>
      <Card overflow="hidden" width="100%">
        <Box position="relative" marginBottom="10px">
          <Box height="100px" overflow="hidden" backgroundColor="white">
            <ImageWithReload
              grey
              src={data.image || ''}
              height="100px"
              width="100%"
              noCacheId={(Math.random() + 1).toString(36).substring(7)}
            />
          </Box>

          <Box
            width="60px"
            height="60px"
            border="1px solid white"
            borderRadius="6px"
            overflow="hidden"
            position="absolute"
            bottom="-10px"
            left="10px"
            backgroundColor="white"
          >
            <ImageWithReload
              grey
              src={toSmallImageUrl(data.thumbnailImage || '')}
              height="100%"
              width="100%"
              noCacheId={(Math.random() + 1).toString(36).substring(7)}
            />
          </Box>
        </Box>
        <VStack padding="10px" width="100%" alignItems="flex-start">
          <H2 width="100%" isTruncated>
            {data.title || 'Project Title'}
          </H2>
          <H3 wordBreak="break-all">
            {data.shortDescription || 'Project Objective'}
          </H3>
          <MarkdownField preview content={data.description || 'Story'} />
        </VStack>
      </Card>
    </VStack>
  )
}
