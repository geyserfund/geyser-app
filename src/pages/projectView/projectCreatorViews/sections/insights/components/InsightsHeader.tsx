import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H2 } from '../../../../../../components/typography'
import { useMobileMode } from '../../../../../../utils'
import { InsightsOptionsSelect } from '../elements'

export enum InsightsOptions {
  lastWeek = 'Last 7 days',
  lastMonth = 'Last 30 days',
  lastYear = 'Last 12 months',
}

export const InsightsHeader = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  return (
    <Stack direction={{ base: 'column', lg: 'row' }} w="full" justifyContent="space-between">
      <HStack w="full" justifyContent={'start'}>
        <H2>{t('Insights')}</H2>
        <InsightsOptionsSelect />
      </HStack>
      {!isMobile && (
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
      )}
    </Stack>
  )
}
