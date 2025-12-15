import { Badge } from '@chakra-ui/react'

import { ContributionStatus, PaymentRefundStatus, PledgeRefundStatus } from '@/types/index.ts'

/** Status badge component */
export const StatusBadge = ({ status }: { status: PledgeRefundStatus | PaymentRefundStatus | ContributionStatus }) => {
  const getStatusColor = (status: PledgeRefundStatus | PaymentRefundStatus | ContributionStatus) => {
    switch (status) {
      case 'PENDING':
        return 'warning'
      case 'FAILED':
        return 'error'
      case 'PROCESSING':
        return 'info'
      case 'EXPIRED':
        return 'error'
      case 'COMPLETED':
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
