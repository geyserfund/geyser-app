import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'

import { NoDataError } from '@/components/errors/NoDataError.tsx'
import Loader from '@/components/ui/Loader.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import {
  PaymentStatus,
  PledgeRefundStatus,
  PledgeRefundWithPaymentFragment,
  usePledgeRefundsQuery,
} from '@/types/index.ts'

import { RefundRsk } from '../../../../refundPayoutRsk/RefundRsk.tsx'
import { StatusBadge } from '../components/RefundStatusBadge.tsx'

/** Pledge refunds table component */
export const PledgeRefundsTable = () => {
  const { data, loading, error } = usePledgeRefundsQuery()

  const pledges =
    data?.pledgeRefundsGet?.refunds.filter(
      (pledge) => pledge.status !== PledgeRefundStatus.Cancelled && pledge.status !== PledgeRefundStatus.Pending,
    ) || []

  const { props: modalProps, ...rskModalProps } = useModal<{ pledge: PledgeRefundWithPaymentFragment }>()

  const { props: refundRskModalProps, ...refundRskModal } = useModal<{ pledge: PledgeRefundWithPaymentFragment }>()

  const handleReclaimPledge = (pledge: PledgeRefundWithPaymentFragment) => {
    rskModalProps.onOpen({ pledge })
  }

  const handleClaimPledge = (pledge: PledgeRefundWithPaymentFragment) => {
    refundRskModal.onOpen({ pledge })
  }

  const renderTableRows = () => {
    if (loading) return <Loader />
    if (error) return <NoDataError message={t('Failed to fetch pledge refunds')} />
    if (pledges.length === 0) return <NoDataError message={t('No pledge refunds found')} />

    return pledges.map((pledge) => {
      const isPaymentFailed =
        [...(pledge?.payments || [])]?.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )?.[0]?.status === PaymentStatus.Failed

      return (
        <HStack
          key={pledge.id}
          w="full"
          p={4}
          borderBottom="1px solid"
          borderColor="neutral1.6"
          _last={{ borderBottom: 'none' }}
        >
          <Body size="sm" flex="2">
            {pledge?.project?.name}
          </Body>
          <Body size="sm" flex="1">
            {pledge.amount.toLocaleString()} sats
          </Body>
          <HStack flex="1">
            <StatusBadge status={pledge.status} />
          </HStack>
          <Body size="sm" flex="1" color="neutral.11">
            {DateTime.fromMillis(pledge.expiresAt).diff(DateTime.now()).toFormat('d') || '-'}
          </Body>
          <Box flex="1">
            {pledge.status === PledgeRefundStatus.Pending && (
              <Button size="sm" colorScheme="primary1" variant="solid" onClick={() => handleClaimPledge(pledge)}>
                {t('Claim')}
              </Button>
            )}
            {pledge.status === PledgeRefundStatus.Processing && isPaymentFailed && (
              <Button size="sm" colorScheme="primary1" variant="outline" onClick={() => handleReclaimPledge(pledge)}>
                {t('Re-Claim')}
              </Button>
            )}
          </Box>
        </HStack>
      )
    })
  }

  const renderTable = () => {
    return (
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

        {renderTableRows()}

        {/* Table Rows */}
      </CardLayout>
    )
  }

  return (
    <VStack w="full" spacing={4} align="stretch">
      <VStack w="full" spacing={0} align="start">
        <H2 size="xl" medium>
          {t('Refunds')}
        </H2>
        <Body size="sm" color="neutral.11">
          {t('Refunds you have initiated.')}
        </Body>
      </VStack>
      {renderTable()}
      {refundRskModal.isOpen && (
        <RefundRsk
          {...refundRskModal}
          contributionUUID={refundRskModalProps.pledge.payments?.[0]?.linkedEntityUUID || ''}
          projectId={refundRskModalProps.pledge.project?.id}
        />
      )}
    </VStack>
  )
}
