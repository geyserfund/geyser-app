import { t } from 'i18next'
import { PiLightning, PiRocketLaunch, PiUsers } from 'react-icons/pi'

import type { BeehiivNewsletterPreferenceKey } from '@/shared/constants/beehiiv.ts'

export const NEWSLETTER_SEGMENTS = [
  { id: 'newsletterMonthly', label: t('Monthly Newsletter') },
  { id: 'productUpdates', label: t('Product Updates') },
  { id: 'projectSpotlights', label: t('Project Spotlights') },
] as const

export type NewsletterSegmentId = (typeof NEWSLETTER_SEGMENTS)[number]['id'] & BeehiivNewsletterPreferenceKey

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
