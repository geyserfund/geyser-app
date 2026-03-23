import { Badge } from '@chakra-ui/react'

import { ContributionStatus, PaymentRefundStatus, PaymentStatus, PledgeRefundStatus } from '@/types/index.ts'

/** Status badge component */
export const StatusBadge = ({
  status,
}: {
  status: PledgeRefundStatus | PaymentRefundStatus | PaymentStatus | ContributionStatus
}) => {
  const getStatusColor = (status: PledgeRefundStatus | PaymentRefundStatus | PaymentStatus | ContributionStatus) => {
    switch (status) {
      case 'PENDING':
      case PaymentStatus.Refundable:
        return 'warning'
      case 'FAILED':
      case 'EXPIRED':
        return 'error'
      case 'PROCESSING':
      case PaymentStatus.Refunding:
      case PaymentStatus.Claiming:
        return 'info'
      case 'COMPLETED':
      case PaymentStatus.Refunded:
      case PaymentStatus.Claimable:
      case ContributionStatus.Confirmed:
        return 'success'
      case ContributionStatus.Pledged:
        return 'info'
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
