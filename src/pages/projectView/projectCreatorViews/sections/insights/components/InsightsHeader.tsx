import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H2 } from '../../../../../../components/typography'
import { useMobileMode } from '../../../../../../utils'
import { InsightsOptionsSelect } from '../elements'

export enum InsightsOptions {
  lastWeek = 'Last 24 hours',
  lastMonth = 'Last 7 days',
  lastYear = 'Last 30 days',
}

export const InsightsHeader = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      justifyContent="space-between"
    >
      <HStack w="full" justifyContent={'start'}>
        <H2>{t('Insights')}</H2>
        <InsightsOptionsSelect />
      </HStack>
      {!isMobile && (
        <Box
          px={'20px'}
          py={'5px'}
          borderRadius="8px"
          backgroundColor="primary.400"
        >
          <Text color="black">{t('BETA')}</Text>
        </Box>
      )}
    </Stack>
  )
}
