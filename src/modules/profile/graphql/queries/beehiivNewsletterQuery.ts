import { gql } from '@apollo/client'

export const QUERY_BEEHIIV_NEWSLETTER_PREFERENCES = gql`
  query BeehiivNewsletterPreferencesGet($userId: BigInt!) {
    beehiivNewsletterPreferencesGet(userId: $userId) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
      tags
    }
  }
`
