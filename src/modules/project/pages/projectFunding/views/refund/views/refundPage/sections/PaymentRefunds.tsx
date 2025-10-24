import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { NoDataError } from '@/components/errors/NoDataError.tsx'
import Loader from '@/components/ui/Loader.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { usePaymentRefundsQuery } from '@/types/index.ts'

import { StatusBadge } from '../components/RefundStatusBadge.tsx'

/** Payment attempt refunds table component */
export const PaymentRefundsTable = () => {
  const { data, loading, error } = usePaymentRefundsQuery()
  const payments = data?.paymentRefundsGet?.refunds || []

  const renderTableRows = () => {
    if (loading) return <Loader />
    if (error) return <NoDataError message={t('Failed to fetch payment refunds')} />
    if (payments.length === 0) return <NoDataError message={t('No payment refunds found')} />

    return payments.map((payment) => (
      <HStack
        key={payment.id}
        w="full"
        p={4}
        borderBottom="1px solid"
        borderColor="neutral1.6"
        _last={{ borderBottom: 'none' }}
      >
        <Body size="sm" flex="2" fontFamily="mono">
          {payment.id}
        </Body>
        <Body size="sm" flex="1">
          {payment.amount.toLocaleString()} sats
        </Body>
        <HStack flex="1">
          <StatusBadge status={payment.status} />
        </HStack>
        <Box flex="1">
          {payment.status === 'PENDING' && (
            <Button size="sm" colorScheme="primary1" variant="solid">
              {t('Claim')}
            </Button>
          )}
        </Box>
      </HStack>
    ))
  }

  const renderTable = () => {
    return (
      <CardLayout w="full" padding={0}>
        {/* Table Header */}
        <HStack w="full" p={4} borderBottom="1px solid" borderColor="neutral1.6" bg="neutral1.3">
          <Body size="sm" bold flex="2">
            {t('Payment UUID')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Amount')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Status')}
          </Body>
          <Box flex="1" />
        </HStack>

        {/* Table Rows */}
        {renderTableRows()}
      </CardLayout>
    )
  }

  return (
    <VStack w="full" spacing={4} align="stretch">
      <VStack w="full" spacing={0} align="start">
        <H2 size="xl" medium>
          {t('Payment Attempt Refunds')}
        </H2>
        <Body size="sm" color="neutral.11">
          {t('Failed payment attempts which can be refunded.')}
        </Body>
      </VStack>
      {renderTable()}
    </VStack>
  )
}
