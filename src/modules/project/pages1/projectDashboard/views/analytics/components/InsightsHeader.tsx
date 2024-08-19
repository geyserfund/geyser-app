import { HStack } from '@chakra-ui/react'

import { InsightsOptionsSelect } from '../elements'

export enum InsightsOptions {
  lastWeek = 'Last 7 days',
  lastMonth = 'Last 30 days',
  lastYear = 'Last 12 months',
}

export const InsightsHeader = () => {
  return (
    <HStack w="full" justifyContent="flex-end">
      <InsightsOptionsSelect />
    </HStack>
  )
}
