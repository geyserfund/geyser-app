import { VITE_APP_AIR_TABLE_KEY } from '../constants'

export const fetchBitcoinRates = async () =>
  fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
    .then((response) => response.json())
    .then((response) => response.data.rates.USD)

export const createCreatorRecord = async (data: any) => {
  fetch(
    'https://api.airtable.com/v0/appyM7XlNIWVypuP5/Subscribers%20(Funders%2BCreators)',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  ).then((response) => response.json())
}

export const createApplicantRecord = async (data: any) => {
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Applicants', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const createApplicantRecordRound2 = async (data: any) =>
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Applicants', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err)
    })

export const createGrantContributionRecord = async (data: any) =>
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Contributors', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => {
      console.log(err)
    })

export const getGrantSponsorRecords = async () =>
  fetch(
    'https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Contributors?fields%5B%5D=Name&fields%5B%5D=Amount&fields%5B%5D=PFP%20link&filterByFormula=Amount%3E%3D1000',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => response.json())
    .then((res) => res.records)
    .catch((err) => {
      console.log(err)
    })

export const getGrantApplicants = async (): Promise<
  {
    fields: { Grant: string }
  }[]
> =>
  fetch(
    'https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Applicants?fields%5B%5D=Grant',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => response.json())
    .then((res) => res.records)
    .catch((err) => {
      console.log(err)
    })
