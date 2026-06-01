import { gql } from '@apollo/client'

export const MUTATION_NEWSLETTER_SUBSCRIBE = gql`
  mutation NewsletterSubscribe($beehiivNewsletterInput: BeehiivNewsletterSubscribeInput!) {
    newsletterSubscribe(beehiivNewsletterInput: $beehiivNewsletterInput) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
    }
  }
`

export const MUTATION_NEWSLETTER_PREFERENCES_UPDATE = gql`
  mutation NewsletterPreferencesUpdate($input: NewsletterPreferencesUpdateInput!) {
    newsletterPreferencesUpdate(input: $input) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
    }
  }
`

export const MUTATION_NEWSLETTER_STATUS_UPDATE = gql`
  mutation NewsletterStatusUpdate($input: NewsletterStatusUpdateInput!) {
    newsletterStatusUpdate(input: $input) {
      email
      status
      newsletterMonthly
      productUpdates
      projectSpotlights
    }
  }
`
