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
