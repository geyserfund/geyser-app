import { Box, Image, VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

type CreationIllustrationCardProps = {
  title: string
  description: string
  image: string
}

/** Get discovered section with three feature cards */
export const CreationIllustrationCard = ({ title, description, image }: CreationIllustrationCardProps) => {
  return (
    <CardLayout w="full" key={title} spacing={4} justifyContent="space-between">
      <Box height="auto" width="100%" borderRadius="md" overflow="hidden" objectFit={'contain'}>
        <Image src={image} alt={title} width="100%" height="100%" objectFit="cover" />
      </Box>

      <VStack w="full" spacing={1} alignItems="flex-start">
        <H3 size="md" bold>
          {title}
        </H3>

        <Body size="sm" muted lineHeight="1.2">
          {description}
        </Body>
      </VStack>
    </CardLayout>
  )
}
