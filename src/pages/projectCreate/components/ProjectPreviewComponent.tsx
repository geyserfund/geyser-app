import { Box, Text, VStack } from '@chakra-ui/react'

import { H2, H3 } from '../../../components/typography'
import { Card, ImageWithReload } from '../../../components/ui'
import { MarkDown, toSmallImageUrl, useMobileMode } from '../../../utils'

interface ProjectPreviewComponentProps {
  data: {
    image?: string
    thumbnailImage?: string
    title?: string
    shortDescription?: string
    description?: string
  }
}

export const ProjectPreviewComponent = ({
  data,
}: ProjectPreviewComponentProps) => {
  const isMobile = useMobileMode()
  return (
    <VStack
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
              src={data.image}
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
          <MarkDown
            fontSize={isMobile ? '14px' : '16px'}
            color="brand.textGrey"
          >
            {data.description || 'Project Description'}
          </MarkDown>
        </VStack>
      </Card>
    </VStack>
  )
}
