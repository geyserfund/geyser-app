import { Box, Image, VStack } from '@chakra-ui/react'

import { Body1 } from '../../../components/typography'
import { NoResultsSearchUrl } from '../../../constants'

export const NoSearchResults = () => {
  return (
    <VStack w="full" padding="12px" spacing="20px">
      <Box width="200px">
        <Image
          w="full"
          h="auto"
          alt="no-search-result-image"
          src={NoResultsSearchUrl}
        />
      </Box>
      <VStack w="full">
        <Body1 bold color="black">
          Could not find any results for your search
        </Body1>
        <Body1 color="black">Please try again or apply another search</Body1>
      </VStack>
    </VStack>
  )
}
