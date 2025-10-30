import { VITE_APP_AIR_TABLE_KEY } from '@/shared/constants/config/env'

const AIRTABLE_API = 'https://api.airtable.com/v0/appyM7XlNIWVypuP5'

export const fetchFeaturedProject = async () => {
  return fetch(`${AIRTABLE_API}/Featured%20Project?maxRecords=3&view=Grid%20view`, {
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
