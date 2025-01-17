import { HStack } from '@chakra-ui/react'

import { InsightsOptionsSelect } from '../elements'

export const InsightsHeader = () => {
  return (
    <HStack w="full" justifyContent="flex-end">
      <InsightsOptionsSelect />
    </HStack>
  )
}
