import { VITE_APP_AIR_TABLE_KEY } from '@/shared/constants/config/env'

const AIRTABLE_API = 'https://api.airtable.com/v0/appyM7XlNIWVypuP5'

export const fetchFeaturedProject = async () => {
  return fetch(`${AIRTABLE_API}/Featured%20Project?maxRecords=6&view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const fetchFeaturedShops = async () => {
  return fetch(`${AIRTABLE_API}/Featured%20Products?maxRecords=3&view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const fetchInfoBannerData = async () => {
  return fetch(`${AIRTABLE_API}/Info%20Banner?view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const fetchNoticeBannerData = async () => {
  return fetch(`${AIRTABLE_API}/Notice%20Banner?view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const fetchHeroSponsorshipBannerData = async () => {
  return fetch(`${AIRTABLE_API}/Hero%20Sponsorship%20Banner?view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const fetchFeaturedWalletsData = async () => {
  return fetch(`${AIRTABLE_API}/Featured%20Wallets?view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const fetchCharityProjectsData = async () => {
  return fetch(`${AIRTABLE_API}/Charity%20Projects?view=Grid%20view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export const postNudgeCreatorData = async (data: {
  projectName: string
  creatorName: string
  contributorName: string
}) => {
  const sendData = {
    records: [{ fields: data }],
  }

  return fetch(`${AIRTABLE_API}/NudgeCreator`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  }).then((response) => response.json())
}

export const postCampaignLaunchRegistration = async (data: { email: string; description: string }) => {
  const sendData = {
    records: [{ fields: data }],
  }

  return fetch(`${AIRTABLE_API}/campaign%20registration`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  }).then((response) => response.json())
}

/**
 * Same base (`appyM7XlNIWVypuP5`) as other helpers. Create a table named `Impact Fund Donations` with fields:
 * - `Region` (single line text, optional)
 * - `Categories` (long text)
 * - `Target Impact Fund` (single line text) — e.g. `latam-impact-fund` / `bitcoin-adoption-impact-fund`
 * - `Contribution UUID` (single line text, filled after successful funding)
 */
const IMPACT_FUND_DONATIONS_TABLE = 'Impact Fund Donations'

export type PostImpactFundDonationPreferenceInput = {
  regionLabel: string | null
  categoriesLabels: string[]
  targetImpactFundSlug: string
}

type AirtableCreateResponse = {
  records?: Array<{ id?: string }>
}

/** Creates a row when the user continues from Impact Fund donate preferences (region / categories). */
export const postImpactFundDonationPreference = async (
  input: PostImpactFundDonationPreferenceInput,
): Promise<{ recordId: string | null }> => {
  const fields: Record<string, string> = {
    'Target Impact Fund': input.targetImpactFundSlug,
    Categories: input.categoriesLabels.length > 0 ? input.categoriesLabels.join(', ') : '',
  }
  if (input.regionLabel) {
    fields.Region = input.regionLabel
  }

  const sendData = {
    records: [{ fields }],
  }

  const response = await fetch(`${AIRTABLE_API}/${encodeURIComponent(IMPACT_FUND_DONATIONS_TABLE)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  })

  if (!response.ok) {
    return { recordId: null }
  }

  const json = (await response.json()) as AirtableCreateResponse
  const recordId = json.records?.[0]?.id ?? null
  return { recordId }
}

/** Attaches the completed contribution uuid to the preference row created in postImpactFundDonationPreference. */
export const patchImpactFundDonationContributionUuid = async (input: {
  recordId: string
  contributionUuid: string
}): Promise<void> => {
  const response = await fetch(
    `${AIRTABLE_API}/${encodeURIComponent(IMPACT_FUND_DONATIONS_TABLE)}/${encodeURIComponent(input.recordId)}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Contribution UUID': input.contributionUuid,
        },
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Airtable patch failed')
  }
}

/**
 * Same base (`appyM7XlNIWVypuP5`) as other helpers. Create a table named `Micro-Lending Waitlist` with fields:
 * - `Interest` (single select): `Borrower`, `Lender`, `Both`
 * - `Name` (single line text)
 * - `Email` (email)
 * - `Country` (single line text)
 * - `Message` (long text, optional)
 */
const MICRO_LENDING_WAITLIST_TABLE = 'Micro-Lending Waitlist'

export type PostMicroLendingWaitlistInput = {
  interest: 'Borrower' | 'Lender' | 'Both'
  name: string
  email: string
  country: string
  message?: string
}

/** Creates a waitlist row from the micro-loans landing page form. */
export const postMicroLendingWaitlist = async (input: PostMicroLendingWaitlistInput): Promise<void> => {
  const fields: Record<string, string> = {
    Interest: input.interest,
    Name: input.name,
    Email: input.email,
    Country: input.country,
  }
  if (input.message) {
    fields.Message = input.message
  }

  const response = await fetch(`${AIRTABLE_API}/${encodeURIComponent(MICRO_LENDING_WAITLIST_TABLE)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields }] }),
  })

  if (!response.ok) {
    throw new Error('Airtable waitlist post failed')
  }
}
