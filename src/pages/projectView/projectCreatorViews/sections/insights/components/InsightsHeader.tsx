import { Button, HStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H2 } from '../../../../../../components/typography'
import { useMobileMode } from '../../../../../../utils'
import { InsightsOptionsSelect } from '../elements'

export enum InsightsOptions {
  lastWeek = 'Last week',
  lastMonth = 'Last month',
  lastYear = 'Last year',
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
        <H2>{t('Weekly overview')}</H2>
        <InsightsOptionsSelect />
      </HStack>
      {!isMobile && <Button variant="primary">{t('BETA')}</Button>}
    </Stack>
  )
}
