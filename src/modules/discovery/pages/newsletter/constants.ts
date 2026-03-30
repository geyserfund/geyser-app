import { t } from 'i18next'
import { PiLightning, PiRocketLaunch, PiUsers } from 'react-icons/pi'

export const NEWSLETTER_SEGMENTS = [
  { id: '69bd8362f0fdf1e8292b3f87', label: t('Monthly updates') },
  { id: '69bd832ada18913fd40f2afd', label: t('Weekly stories') },
  { id: '69bd83041b4c64389ab7aa54', label: t('Product updates') },
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
