import { ProjectSubCategory } from '@/types'

export type EligibleImpactFund = {
  name: string
  title: string
}

const IMPACT_FUNDS = {
  LATAM: { name: 'latam-impact-fund', title: 'Latam Impact Fund' } satisfies EligibleImpactFund,
  EDUCATION: { name: 'education-impact-fund', title: 'Education Impact Fund' } satisfies EligibleImpactFund,
  CULTURE: { name: 'culture-impact-fund', title: 'Culture Impact Fund' } satisfies EligibleImpactFund,
  CIRCULAR_ECONOMIES: {
    name: 'circular-economies-impact-fund',
    title: 'Circular Economies Impact Fund',
  } satisfies EligibleImpactFund,
}

const EDUCATION_IMPACT_FUND_SUBCATEGORIES = new Set<ProjectSubCategory>([
  ProjectSubCategory.Course,
  ProjectSubCategory.ContentCreator,
  ProjectSubCategory.Journalism,
  ProjectSubCategory.Book,
  ProjectSubCategory.Podcast,
  ProjectSubCategory.HackerSpace,
])

const CULTURE_IMPACT_FUND_SUBCATEGORIES = new Set<ProjectSubCategory>([
  ProjectSubCategory.Event,
  ProjectSubCategory.Meetup,
  ProjectSubCategory.Film,
  ProjectSubCategory.Art,
  ProjectSubCategory.Game,
  ProjectSubCategory.Music,
  ProjectSubCategory.Collectible,
  ProjectSubCategory.Hardware,
])

export const getEligibleImpactFund = ({
  region,
  subCategory,
}: {
  region?: string | null
  subCategory?: ProjectSubCategory | null
}): EligibleImpactFund | null => {
  if (region === 'South America') {
    return IMPACT_FUNDS.LATAM
  }

  if (!subCategory) {
    return null
  }

  if (subCategory === ProjectSubCategory.CircularEconomy) {
    return IMPACT_FUNDS.CIRCULAR_ECONOMIES
  }

  if (EDUCATION_IMPACT_FUND_SUBCATEGORIES.has(subCategory)) {
    return IMPACT_FUNDS.EDUCATION
  }

  if (CULTURE_IMPACT_FUND_SUBCATEGORIES.has(subCategory)) {
    return IMPACT_FUNDS.CULTURE
  }

  return null
}
