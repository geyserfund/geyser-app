export type NewsletterPreferenceKey = 'newsletterMonthly' | 'productUpdates' | 'projectSpotlights'

export const DEFAULT_NEWSLETTER_PREFERENCES: Record<NewsletterPreferenceKey, boolean> = {
  newsletterMonthly: true,
  productUpdates: true,
  projectSpotlights: true,
}
