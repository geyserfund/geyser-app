import { useQuery } from '@apollo/client'
import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { NoDataError } from '@/components/errors/NoDataError.tsx'
import Loader from '@/components/ui/Loader.tsx'
import { QUERY_PAYMENTS_REFUNDABLE } from '@/modules/project/graphql/queries/refundsQuery.ts'
import { PaymentAttemptRefundModal } from '@/modules/project/pages/projectFunding/views/refund/components/PaymentAttemptRefundModal.tsx'
import { getRefundFileFromPayment } from '@/modules/project/pages/projectFunding/views/refund/utils/paymentRefund.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Payment, PaymentStatus, RefundablePaymentsGetResponse } from '@/types/index.ts'

import { StatusBadge } from '../components/RefundStatusBadge.tsx'

type PaymentRefundRow = {
  projectName: string
  paymentId: Payment['id']
  paymentUuid: string
  amount: number
  status: PaymentStatus
  refundFile?: ReturnType<typeof getRefundFileFromPayment>
}

/** Payment attempt refunds table component */
export const PaymentRefundsTable = () => {
  const { data, loading, error, refetch } = useQuery<{ paymentsRefundableGet: RefundablePaymentsGetResponse }>(
    QUERY_PAYMENTS_REFUNDABLE,
  )
  const { props: refundModalProps, ...refundModal } = useModal<{ payment: PaymentRefundRow }>()

  const payments =
    data?.paymentsRefundableGet?.refundablePayments.flatMap(({ project, payments }) =>
      payments.map((payment) => ({
        projectName: project.name,
        paymentId: payment.id,
        paymentUuid: payment.uuid,
        amount: payment.accountingAmountDue,
        status: payment.status,
        refundFile: getRefundFileFromPayment(payment),
      })),
    ) || []

  const handleRefundClick = (payment: PaymentRefundRow) => {
    refundModal.onOpen({ payment })
  }

  const handleRefundSuccess = async () => {
    refundModal.onClose()
    await refetch()
  }

  const renderTableRows = () => {
    if (loading) return <Loader />
    if (error) return <NoDataError message={t('Failed to fetch payment refunds')} />
    if (payments.length === 0) return <NoDataError message={t('No payment refunds found')} />

    return payments.map((payment) => (
      <HStack
        key={payment.paymentId}
        w="full"
        p={4}
        borderBottom="1px solid"
        borderColor="neutral1.6"
        _last={{ borderBottom: 'none' }}
      >
        <Body size="sm" flex="2">
          {payment.projectName || '-'}
        </Body>
        <Body size="sm" flex="2" fontFamily="mono">
          {payment.paymentUuid}
        </Body>
        <Body size="sm" flex="1">
          {payment.amount.toLocaleString()} sats
        </Body>
        <HStack flex="1">
          <StatusBadge status={payment.status} />
        </HStack>
        <Box flex="1" display="flex" justifyContent="flex-end">
          {payment.status === PaymentStatus.Refundable && payment.refundFile && (
            <Button size="sm" colorScheme="primary1" variant="solid" onClick={() => handleRefundClick(payment)}>
              {t('Claim Refund')}
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
            {t('Project')}
          </Body>
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
      <PaymentAttemptRefundModal
        isOpen={refundModal.isOpen}
        onClose={refundModal.onClose}
        amount={refundModalProps.payment?.amount || 0}
        paymentId={refundModalProps.payment?.paymentId}
        paymentUuid={refundModalProps.payment?.paymentUuid}
        refundFile={refundModalProps.payment?.refundFile}
        onCompleted={handleRefundSuccess}
      />
    </VStack>
  )
}
