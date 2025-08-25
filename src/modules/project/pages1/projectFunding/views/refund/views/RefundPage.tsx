import { Badge, Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

/** Status types for refunds */
type RefundStatus = 'PENDING' | 'FAILED' | 'PROCESSING' | 'EXPIRED' | 'CANCELLED' | 'COMPLETED'

/** Pledge refund interface */
interface PledgeRefund {
  id: string
  projectName: string
  amount: number
  status: RefundStatus
  expiresIn?: string
}

/** Payment attempt refund interface */
interface PaymentRefund {
  id: string
  paymentUUID: string
  projectName: string
  amount: number
  status: RefundStatus
}

/** Status badge component */
const StatusBadge = ({ status }: { status: RefundStatus }) => {
  const getStatusColor = (status: RefundStatus) => {
    switch (status) {
      case 'PENDING':
        return 'warning'
      case 'FAILED':
        return 'error'
      case 'PROCESSING':
        return 'info'
      case 'EXPIRED':
        return 'neutral'
      case 'CANCELLED':
        return 'neutral'
      case 'COMPLETED':
        return 'success'
      default:
        return 'neutral'
    }
  }

  return (
    <Badge colorScheme={getStatusColor(status)} variant="surface" px={2} py={1} fontSize="sm" textTransform="uppercase">
      {status}
    </Badge>
  )
}

/** Pledge refunds table component */
const PledgeRefundsTable = ({ pledges }: { pledges: PledgeRefund[] }) => {
  return (
    <VStack w="full" spacing={4} align="stretch">
      <H2>{t('Pledge Refunds')}</H2>
      <Body size="sm" color="neutral.11">
        {t('Pledges you made to failed campaigns that can now be refunded.')}
      </Body>

      <CardLayout w="full" padding={0}>
        {/* Table Header */}
        <HStack w="full" p={4} borderBottom="1px solid" borderColor="neutral1.6" bg="neutral1.3">
          <Body size="sm" bold flex="2">
            {t('Project')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Amount')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Status')}
          </Body>
          <Body size="sm" bold flex="1">
            {t('Expires In')}
          </Body>
          <Box flex="1" />
        </HStack>

        {/* Table Rows */}
        {pledges.map((pledge) => (
          <HStack
            key={pledge.id}
            w="full"
            p={4}
            borderBottom="1px solid"
            borderColor="neutral1.6"
            _last={{ borderBottom: 'none' }}
          >
            <Body size="sm" flex="2">
              {pledge.projectName}
            </Body>
            <Body size="sm" flex="1">
              {pledge.amount.toLocaleString()} sats
            </Body>
            <HStack flex="1">
              <StatusBadge status={pledge.status} />
            </HStack>
            <Body size="sm" flex="1" color="neutral.11">
              {pledge.expiresIn || '-'}
            </Body>
            <Box flex="1">
              {pledge.status === 'PENDING' && (
                <Button size="sm" colorScheme="primary1" variant="solid">
                  {t('Claim')}
                </Button>
              )}
              {pledge.status === 'FAILED' && (
                <Button size="sm" colorScheme="primary1" variant="outline">
                  {t('Re-Claim')}
                </Button>
              )}
            </Box>
          </HStack>
        ))}
      </CardLayout>
    </VStack>
  )
}

/** Payment attempt refunds table component */
const PaymentRefundsTable = ({ payments }: { payments: PaymentRefund[] }) => {
  return (
    <VStack w="full" spacing={4} align="stretch">
      <H2>{t('Payment Attempt Refunds')}</H2>
      <Body size="sm" color="neutral.11">
        {t('Failed payment attempts which can be refunded.')}
      </Body>

      <CardLayout w="full" padding={0}>
        {/* Table Header */}
        <HStack w="full" p={4} borderBottom="1px solid" borderColor="neutral1.6" bg="neutral1.3">
          <Body size="sm" bold flex="2">
            {t('Payment UUID')}
          </Body>
          <Body size="sm" bold flex="1.5">
            {t('Project')}
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
        {payments.map((payment) => (
          <HStack
            key={payment.id}
            w="full"
            p={4}
            borderBottom="1px solid"
            borderColor="neutral1.6"
            _last={{ borderBottom: 'none' }}
          >
            <Body size="sm" flex="2" fontFamily="mono">
              {payment.paymentUUID}
            </Body>
            <Body size="sm" flex="1.5">
              {payment.projectName}
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
              {payment.status === 'FAILED' && (
                <Button size="sm" colorScheme="primary1" variant="outline">
                  {t('Re-Claim')}
                </Button>
              )}
            </Box>
          </HStack>
        ))}
      </CardLayout>
    </VStack>
  )
}

export const RefundPage = () => {
  /** Demo pledge refunds data */
  const pledgeRefunds: PledgeRefund[] = [
    {
      id: '1',
      projectName: 'Project A',
      amount: 12345,
      status: 'PENDING',
      expiresIn: '3 days',
    },
    {
      id: '2',
      projectName: 'Project B',
      amount: 12345,
      status: 'FAILED',
      expiresIn: '-',
    },
    {
      id: '3',
      projectName: 'Project C',
      amount: 12345,
      status: 'PROCESSING',
      expiresIn: '-',
    },
    {
      id: '4',
      projectName: 'Project D',
      amount: 12345,
      status: 'EXPIRED',
      expiresIn: '-',
    },
    {
      id: '5',
      projectName: 'Project E',
      amount: 12345,
      status: 'CANCELLED',
      expiresIn: '-',
    },
  ]

  /** Demo payment refunds data */
  const paymentRefunds: PaymentRefund[] = [
    {
      id: '1',
      paymentUUID: 'lea29596-fefa-4d21-a2ee-6e0bdd9c6932',
      projectName: 'Project Alpha',
      amount: 12345,
      status: 'PENDING',
    },
    {
      id: '2',
      paymentUUID: 'lea29596-fefa-4d21-a2ee-6e0bdd9c6932',
      projectName: 'Project Beta',
      amount: 12345,
      status: 'FAILED',
    },
    {
      id: '3',
      paymentUUID: 'lea29596-fefa-4d21-a2ee-6e0bdd9c6932',
      projectName: 'Project Gamma',
      amount: 12345,
      status: 'PROCESSING',
    },
    {
      id: '4',
      paymentUUID: 'lea29596-fefa-4d21-a2ee-6e0bdd9c6932',
      projectName: 'Project Delta',
      amount: 12345,
      status: 'COMPLETED',
    },
  ]

  return (
    <VStack w="full">
      <VStack w="full" maxWidth={dimensions.maxWidth} spacing={8} align="stretch" p={6}>
        <H1>{t('Refunds')}</H1>

        <PledgeRefundsTable pledges={pledgeRefunds} />

        <PaymentRefundsTable payments={paymentRefunds} />
      </VStack>
    </VStack>
  )
}
