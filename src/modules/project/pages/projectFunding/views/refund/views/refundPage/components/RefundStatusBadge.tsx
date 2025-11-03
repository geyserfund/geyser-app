import { Badge } from '@chakra-ui/react'

import { PaymentRefundStatus, PledgeRefundStatus } from '@/types/index.ts'

/** Status badge component */
export const StatusBadge = ({ status }: { status: PledgeRefundStatus | PaymentRefundStatus }) => {
  const getStatusColor = (status: PledgeRefundStatus | PaymentRefundStatus) => {
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
