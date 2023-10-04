import { Box, Image, Stack, VStack } from '@chakra-ui/react'

import {
  CardLayout,
  CardLayoutProps,
} from '../../../../../../components/layouts'
import { Body2, H3 } from '../../../../../../components/typography'

interface LearnDisplayCardsProps extends CardLayoutProps {
  image: string
  title: string
  description: string
}

export const LearnDisplayCards = ({
  image,
  title,
  description,
  ...props
}: LearnDisplayCardsProps) => {
  return (
    <CardLayout as={Stack} padding="20px" direction="row" w="full" {...props}>
      <Box
        padding="10px"
        height="82px"
        width={'105px'}
        backgroundColor="primary.50"
        borderRadius={'8px'}
      >
        <Image src={image} alt={title} h="full" />
      </Box>

      <VStack h="100%" alignItems="start">
        <H3 color="neutral.900">{title}</H3>
        <Body2 color="neutral.600">{description}</Body2>
      </VStack>
    </CardLayout>
  )
}
