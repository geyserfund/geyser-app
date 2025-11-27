import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Navigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'

import { PaymentRefundsTable } from './sections/PaymentRefunds.tsx'
import { PledgeRefundsTable } from './sections/PledgeRefunds.tsx'
import { PledgesTable } from './sections/Pledges.tsx'

/** Status types for refunds */

export const RefundPage = () => {
  const { loading, isLoggedIn } = useAuthContext()

  if (!loading && !isLoggedIn) {
    return <Navigate to={getPath('refundFile')} />
  }

  return (
    <VStack w="full">
      <VStack w="full" maxWidth={dimensions.maxWidth} spacing={8} align="stretch" p={6}>
        <H1 size="3xl" bold>
          {t('Refunds')}
        </H1>

        <PledgesTable />

        <PledgeRefundsTable />

        <PaymentRefundsTable />
      </VStack>
    </VStack>
  )
}
