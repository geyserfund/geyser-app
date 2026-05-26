import { gql } from '@apollo/client'

export const MUTATION_BEEHIIV_NEWSLETTER_SUBSCRIBE = gql`
  mutation BeehiivNewsletterSubscribe($input: BeehiivNewsletterSubscribeInput!) {
    beehiivNewsletterSubscribe(input: $input) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
      tags
    }
  }
`

export const MUTATION_BEEHIIV_NEWSLETTER_PREFERENCES_UPDATE = gql`
  mutation BeehiivNewsletterPreferencesUpdate($input: BeehiivNewsletterPreferencesUpdateInput!) {
    beehiivNewsletterPreferencesUpdate(input: $input) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
      tags
    }
  }
`

export const MUTATION_BEEHIIV_NEWSLETTER_STATUS_UPDATE = gql`
  mutation BeehiivNewsletterStatusUpdate($input: BeehiivNewsletterStatusUpdateInput!) {
    beehiivNewsletterStatusUpdate(input: $input) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
      tags
    }
  }
`
