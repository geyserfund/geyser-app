import { VITE_APP_FLODESK_API_KEY } from '../shared/constants'

const FLODESK_BASE_API_ENDPOINT = 'https://api.flodesk.com/v1'

const flodeskHeaders = {
  'User-Agent': 'geyser.fund',
  Authorization: `Basic ${VITE_APP_FLODESK_API_KEY}`,
  'Content-Type': 'application/json',
} as const

type CreateSubscriberData = {
  email: string
  first_name?: string
  last_name?: string
  segment_ids?: string[]
}

/** Creates or updates a Flodesk subscriber, optionally assigning them to segments. */
export const createSubscriber = async (data: CreateSubscriberData) => {
  const response = await fetch(`${FLODESK_BASE_API_ENDPOINT}/subscribers`, {
    method: 'POST',
    headers: flodeskHeaders,
    body: JSON.stringify(data),
  })
  return response.json()
}
