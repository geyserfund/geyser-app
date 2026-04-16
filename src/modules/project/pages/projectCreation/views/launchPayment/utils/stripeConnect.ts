import { ProjectFundingStrategy } from '@/types/index.ts'

type CreationFiatProject = {
  fundingStrategy?: ProjectFundingStrategy | null
  location?: {
    country?: {
      code?: string | null
    } | null
  } | null
}

// Based on Stripe's published Connect availability list.
export const STRIPE_CONNECT_SUPPORTED_COUNTRIES = new Set([
  'AE',
  'AT',
  'AU',
  'BE',
  'BG',
  'CA',
  'CH',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GB',
  'GI',
  'GR',
  'HK',
  'HR',
  'HU',
  'IE',
  'IN',
  'IT',
  'JP',
  'LI',
  'LT',
  'LU',
  'LV',
  'MT',
  'MX',
  'MY',
  'NL',
  'NO',
  'NZ',
  'PL',
  'PT',
  'RO',
  'SE',
  'SG',
  'SI',
  'SK',
  'TH',
  'US',
])

/** Returns whether the creation flow should show the fiat contributions step for a project. */
export const shouldShowCreationFiatStep = (project?: CreationFiatProject | null): boolean => {
  if (project?.fundingStrategy !== ProjectFundingStrategy.TakeItAll) {
    return false
  }

  const countryCode = project.location?.country?.code?.toUpperCase()

  if (!countryCode) {
    return false
  }

  return STRIPE_CONNECT_SUPPORTED_COUNTRIES.has(countryCode)
}
