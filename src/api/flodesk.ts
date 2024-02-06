import { VITE_APP_FLODESK_API_KEY } from '../constants'

export const FLODESK_BASE_API_ENDPOINT = 'https://api.flodesk.com/v1'

export const createSubscriber = async (data: any) => {
  fetch(`${FLODESK_BASE_API_ENDPOINT}/subscribers`, {
    method: 'POST',
    headers: {
      'User-Agent': 'geyser.fund',
      Authorization: `Basic ${VITE_APP_FLODESK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
