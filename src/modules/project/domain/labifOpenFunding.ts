import { ProjectFundingStrategy } from '@/types/index.ts'
import { LATIN_AMERICA_COUNTRY_CODES } from '@/shared/constants/platform/regionCountryCodes.ts'

type LabifProjectLike = {
  countryCode?: string | null
  fundingStrategy?: ProjectFundingStrategy | null
  isCircularGrant?: boolean | null
  launchedAt?: string | null
  location?: { country?: { code?: string | null } | null } | null
}

export const isLabifEligibleCountry = (countryCode?: string | null) =>
  Boolean(countryCode && LATIN_AMERICA_COUNTRY_CODES.some((code) => code === countryCode.toUpperCase()))

export const isLabifOpenFundingProject = (project: LabifProjectLike) =>
  project.isCircularGrant !== true &&
  project.fundingStrategy === ProjectFundingStrategy.TakeItAll &&
  isLabifEligibleCountry(project.countryCode || project.location?.country?.code)

export const isLabifOpenFundingDraft = (project: LabifProjectLike) =>
  !project.launchedAt && isLabifOpenFundingProject(project)
