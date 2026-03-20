import { t } from 'i18next'
import { PiLightning, PiRocketLaunch, PiUsers } from 'react-icons/pi'

/**
 * Flodesk segment definitions.
 * Replace the `id` values with actual segment IDs from the Flodesk dashboard.
 */
export const NEWSLETTER_SEGMENTS = [
  { id: 'monthly_updates', label: t('Monthly updates') },
  { id: 'weekly_stories', label: t('Weekly stories') },
  { id: 'product_launches', label: t('Product launches') },
] as const

export const CONTENT_PILLARS = [
  {
    title: t('Adoption on the ground'),
    description: t('The local stories, experiments, and communities pushing Bitcoin forward in the real world.'),
    icon: PiLightning,
  },
  {
    title: t('Builders to watch'),
    description: t('New projects, launches, and early momentum worth paying attention to before they are mainstream.'),
    icon: PiRocketLaunch,
  },
  {
    title: t('Community signal'),
    description: t('The people, movements, and ideas shaping the culture around Bitcoin beyond the loudest headlines.'),
    icon: PiUsers,
  },
] as const
