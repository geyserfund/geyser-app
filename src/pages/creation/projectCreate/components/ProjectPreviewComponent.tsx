import { Box, Text, VStack } from '@chakra-ui/react'

import { Card, ImageWithReload } from '../../../../components/ui'
import { MarkDown } from '../../../../utils'

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
  return (
    <VStack
      justifyContent="flex-start"
      alignItems="flex-start"
      minWidth="350px"
      maxWidth="370px"
      spacing="10px"
    >
      <Text>Preview</Text>
      <Card overflow="hidden" width="100%">
        <Box position="relative" marginBottom="10px">
          <Box height="100px" overflow="hidden">
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
          >
            <ImageWithReload
              grey
              src={data.thumbnailImage}
              height="100%"
              width="100%"
              noCacheId={(Math.random() + 1).toString(36).substring(7)}
            />
          </Box>
        </Box>
        <VStack padding="10px" width="100%" alignItems="flex-start">
          <Text fontSize="28px" fontWeight={700}>
            {data.title || 'Project Title'}
          </Text>
          <Text fontSize="14px" fontWeight={700}>
            {data.shortDescription || 'Project Objective'}
          </Text>
          <MarkDown fontSize="16px" color="brand.textGrey">
            {data.description || 'Project Description'}
          </MarkDown>
        </VStack>
      </Card>
    </VStack>
  )
}
