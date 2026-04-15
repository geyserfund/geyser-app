/** Impact Fund slugs used to resolve donate project targets from the Impact Funds listing query. */
export const LATAM_IMPACT_FUND_SLUG = 'latam-impact-fund'
export const BITCOIN_ADOPTION_IMPACT_FUND_SLUG = 'bitcoin-adoption-impact-fund'

const SESSION_KEY = 'geyser_impact_fund_donate_pref_v1'

export type ImpactFundDonateSessionPref = {
  airtableRecordId: string
  donateProjectName: string
}

export const REGION_OPTIONS = [
  { id: 'north-america', labelKey: 'North America' as const },
  { id: 'south-america', labelKey: 'South America' as const },
  { id: 'europe', labelKey: 'Europe' as const },
  { id: 'africa', labelKey: 'Africa' as const },
  { id: 'asia', labelKey: 'Asia' as const },
] as const

export type ImpactFundDonateRegionId = (typeof REGION_OPTIONS)[number]['id']

export const CATEGORY_OPTIONS = [
  { id: 'education', labelKey: 'Education' as const },
  { id: 'culture', labelKey: 'Culture' as const },
  { id: 'development', labelKey: 'Development' as const },
  { id: 'small-businesses', labelKey: 'Small Businesses' as const },
  { id: 'circular-economy', labelKey: 'Circular Economy' as const },
] as const

export type ImpactFundDonateCategoryId = (typeof CATEGORY_OPTIONS)[number]['id']

export function writeImpactFundDonateSessionPref(pref: ImpactFundDonateSessionPref): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(pref))
  } catch {
    // Storage may be unavailable (private mode, quota)
  }
}

export function readImpactFundDonateSessionPref(): ImpactFundDonateSessionPref | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ImpactFundDonateSessionPref
    if (typeof parsed.airtableRecordId === 'string' && typeof parsed.donateProjectName === 'string') {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function clearImpactFundDonateSessionPref(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}
