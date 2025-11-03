import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { H1 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { PaymentRefundsTable } from './sections/PaymentRefunds.tsx'
import { PledgeRefundsTable } from './sections/PledgeRefunds.tsx'

/** Status types for refunds */

export const RefundPage = () => {
  return (
    <VStack w="full">
      <VStack w="full" maxWidth={dimensions.maxWidth} spacing={8} align="stretch" p={6}>
        <H1 size="3xl" bold>
          {t('Refunds')}
        </H1>

        <PledgeRefundsTable />

        <PaymentRefundsTable />
      </VStack>
    </VStack>
  )
}
