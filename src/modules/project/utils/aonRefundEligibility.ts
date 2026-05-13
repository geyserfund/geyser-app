import { ProjectAonGoalStatus } from '@/types/index.ts'

const AON_REFUND_ELIGIBLE_STATUSES = [
  ProjectAonGoalStatus.Active,
  ProjectAonGoalStatus.Failed,
  ProjectAonGoalStatus.Cancelled,
  ProjectAonGoalStatus.Unclaimed,
]

export const isAonRefundEligibleStatus = (status?: ProjectAonGoalStatus | null) => {
  if (!status) {
    return false
  }

  return AON_REFUND_ELIGIBLE_STATUSES.includes(status)
}
