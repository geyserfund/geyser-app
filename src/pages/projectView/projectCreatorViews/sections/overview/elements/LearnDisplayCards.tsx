import { Box, Image, Stack, VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../../../components/layouts'
import { Body2, H3 } from '../../../../../../components/typography'

interface LearnDisplayCardsProps {
  image: string
  title: string
  description: string
}

export const LearnDisplayCards = ({
  image,
  title,
  description,
}: LearnDisplayCardsProps) => {
  return (
    <CardLayout as={Stack} padding="20px" direction="row" w="full">
      <Box padding="10px" maxHeight="82px" backgroundColor="primary.50">
        <Image src={image} alt={title} h="full" />
      </Box>

      <VStack h="100%" flex="1" alignItems="start">
        <H3 color="neutral.900">{title}</H3>
        <Body2 color="neutral.600">{description}</Body2>
      </VStack>
    </CardLayout>
  )
}
