import { type BadgeProps, Badge } from '@chakra-ui/react'
import { t } from 'i18next'

import { ImpactFundApplicationFundingModel } from '@/types'

import { fundingModelLabels } from './dashboardConstants'

type FundingModelTagProps = {
  fundingModel: ImpactFundApplicationFundingModel
  size?: BadgeProps['size']
}

const colorByModel: Record<ImpactFundApplicationFundingModel, 'primary1' | 'info' | 'warning'> = {
  [ImpactFundApplicationFundingModel.DirectGrant]: 'primary1',
  [ImpactFundApplicationFundingModel.Matching]: 'info',
  [ImpactFundApplicationFundingModel.AonCofunding]: 'warning',
}

export function FundingModelTag({ fundingModel, size = 'sm' }: FundingModelTagProps) {
  return (
    <Badge size={size} variant="surface" colorScheme={colorByModel[fundingModel]} fontWeight={600}>
      {t(fundingModelLabels[fundingModel])}
    </Badge>
  )
}
