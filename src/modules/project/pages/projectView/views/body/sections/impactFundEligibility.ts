import { ProjectSubCategory } from '@/types'

export type EligibleImpactFund = {
  name: string
  title: string
}

const IMPACT_FUNDS = {
  LATAM: { name: 'latam-impact-fund', title: 'Latam Impact Fund' } satisfies EligibleImpactFund,
}

export const getEligibleImpactFund = ({
  region,
}: {
  region?: string | null
  subCategory?: ProjectSubCategory | null
}): EligibleImpactFund | null => {
  if (region === 'South America') {
    return IMPACT_FUNDS.LATAM
  }

  return null
}
