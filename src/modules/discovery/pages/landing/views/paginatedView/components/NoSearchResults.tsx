import { Box, Image, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'

import { NoResultsSearchUrl } from '../../../../../../../shared/constants'

export const NoSearchResults = () => {
  return (
    <VStack w="full" padding="12px" spacing="20px">
      <Box width="200px">
        <Image w="full" h="auto" alt="no-search-result-image" src={NoResultsSearchUrl} />
      </Box>
      <VStack w="full">
        <Body bold>Could not find any results for your search</Body>
        <Body>Please try again or apply another search</Body>
      </VStack>
    </VStack>
  )
}
