import { gql } from '@apollo/client'

export const QUERY_NEWSLETTER_PREFERENCES = gql`
  query NewsletterPreferencesGet($userId: BigInt!) {
    newsletterPreferencesGet(userId: $userId) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
    }
  }
`
