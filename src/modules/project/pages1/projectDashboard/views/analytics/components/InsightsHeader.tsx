import { Box, HStack, Text } from '@chakra-ui/react'
import { t } from 'i18next'

import { InsightsOptionsSelect } from '../elements'

export enum InsightsOptions {
  lastWeek = 'Last 7 days',
  lastMonth = 'Last 30 days',
  lastYear = 'Last 12 months',
}

export const InsightsHeader = () => {
  return (
    <HStack w="full" justifyContent="space-between">
      <InsightsOptionsSelect />

      <Box
        px={'10px'}
        py={'3px'}
        borderRadius="8px"
        backgroundColor="primary.400"
        border="2px solid"
        borderColor="neutral.1000"
      >
        <Text color="black">{t('BETA')}</Text>
      </Box>
    </HStack>
  )
}
