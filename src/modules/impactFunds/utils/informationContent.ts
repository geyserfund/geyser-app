import { t } from 'i18next'
import { PiArrowsClockwiseBold, PiCalendarBold, PiChartBarBold, PiCoinsBold, PiScalesBold } from 'react-icons/pi'

export type ImpactFundFundingModelIllustration =
  | 'direct-grants'
  | 'matching-fund'
  | 'all-or-nothing'
  | 'hackathons-eduthons'

export const impactFundHowItWorksItems = [
  {
    title: t('Annual Commitment'),
    description: t('A dedicated pool of capital is committed each year by founding and supporting sponsors.'),
    icon: PiCalendarBold,
  },
  {
    title: t('Allocation Committee'),
    description: t('An independent review panel evaluates applications and allocates funding.'),
    icon: PiScalesBold,
  },
  {
    title: t('Transparency & Reporting'),
    description: t('Impact reports are published outlining funded projects, outcomes, and fund performance.'),
    icon: PiChartBarBold,
  },
] as const

export const impactFundFundingOverviewItems = [
  {
    title: t('Funding Cycles'),
    description: t('Applications are reviewed and selected on a recurring basis.'),
    icon: PiArrowsClockwiseBold,
  },
  {
    title: t('Funding Range'),
    description: t('From $2.5k to $20k, depending on scope, impact and stage of development.'),
    icon: PiCoinsBold,
  },
] as const

export const impactFundFundingModelItems = [
  {
    title: t('Direct Grants'),
    eyebrow: t('Upfront allocation'),
    description: t('Full requested amount allocated after committee approval.'),
    icon: PiCoinsBold,
    illustration: 'direct-grants' as ImpactFundFundingModelIllustration,
    gradientFrom: 'orange.200',
    gradientTo: 'yellow.200',
  },
  {
    title: t('Capped Matching Fund'),
    eyebrow: t('Community-powered'),
    description: t(
      'The fund matches independently raised capital up to a predefined cap to incentivize traction and community participation.',
    ),
    icon: PiArrowsClockwiseBold,
    illustration: 'matching-fund' as ImpactFundFundingModelIllustration,
    gradientFrom: 'green.200',
    gradientTo: 'teal.200',
  },
  {
    title: t('All-or-Nothing Co-Funding'),
    eyebrow: t('Milestone release'),
    description: t(
      'Conditional commitment released only if full funding is reached within a fixed timeframe (for example, 60 days).',
    ),
    icon: PiScalesBold,
    illustration: 'all-or-nothing' as ImpactFundFundingModelIllustration,
    gradientFrom: 'blue.200',
    gradientTo: 'cyan.200',
  },
  {
    title: t('Hackathons & Eduthons'),
    eyebrow: t('Events and rewards'),
    description: t(
      'We periodically organise hackathons to encourage and reward education around Bitcoin and Bitcoin development',
    ),
    icon: PiCalendarBold,
    illustration: 'hackathons-eduthons' as ImpactFundFundingModelIllustration,
    gradientFrom: 'pink.200',
    gradientTo: 'orange.200',
  },
] as const

export type ImpactFundFundingModelItem = (typeof impactFundFundingModelItems)[number]
