import { type BadgeProps, Badge } from '@chakra-ui/react'
import { t } from 'i18next'

import { ImpactFundApplicationStatus } from '@/types'

import { applicationStatusColors, applicationStatusLabels } from './dashboardConstants'

type ApplicationStatusTagProps = {
  status: ImpactFundApplicationStatus
  size?: BadgeProps['size']
}

export function ApplicationStatusTag({ status, size = 'sm' }: ApplicationStatusTagProps) {
  const colorScheme = applicationStatusColors[status]
  return (
    <Badge size={size} variant="soft" colorScheme={colorScheme} fontWeight={600}>
      {t(applicationStatusLabels[status])}
    </Badge>
  )
}
