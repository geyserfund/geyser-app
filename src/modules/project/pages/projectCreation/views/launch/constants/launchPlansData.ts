import type { TFunction } from 'i18next'

export type LaunchPlanPoint = {
  title: string
  description?: string
}

export type LaunchPlanData = {
  id: 'basic' | 'visibility-boost' | 'growth' | 'partnership'
  title: string
  subtitle: string
  price: string
  points: LaunchPlanPoint[]
  highlightedText?: string
  body?: string
  strategyValue?: 'STARTER_LAUNCH' | 'GROWTH_LAUNCH' | 'PRO_LAUNCH'
}

export const getLaunchPlansData = (translate: TFunction): LaunchPlanData[] => [
  {
    id: 'basic',
    title: translate('Basic'),
    subtitle: translate('Do it yourself. Get listed and start collecting support.'),
    price: translate('$25'),
    points: [
      { title: translate('Access to all Geyser tools') },
      { title: translate('Discoverability on the platform') },
    ],
    strategyValue: 'STARTER_LAUNCH',
  },
  {
    id: 'visibility-boost',
    title: translate('Visibility Boost'),
    subtitle: translate(
      'Get eyes on your project. Best for projects that already have an audience and are confident about your project.',
    ),
    price: translate('$60'),
    points: [
      { title: translate('1 week front-page feature') },
      { title: translate('Newsletter placement') },
      { title: translate('1 social post by Geyser socials') },
    ],
    strategyValue: 'GROWTH_LAUNCH',
  },
  {
    id: 'growth',
    title: translate('Growth'),
    subtitle: translate(
      'Turn your project into a real launch with traction. Designed to generate your first wave of supporters and momentum (~50k–100k targeted impressions)',
    ),
    price: translate('$300'),
    highlightedText: translate('Picked by 40% of the Top 100 projects on Geyser'),
    points: [
      {
        title: translate('Strategy & Content Call'),
        description: translate('We help you define your goals, audience, and launch plan.'),
      },
      { title: translate('Content Engine'), description: translate('10 high-signal posts + clear posting plan') },
      {
        title: translate('Distribution'),
        description: translate('Social amplification, newsletter spotlight, and targeted email campaign'),
      },
      {
        title: translate('Ongoing Support'),
        description: translate(
          '1 month support in private chat group, mid-campaign check-in, and performance improvements',
        ),
      },
    ],
    strategyValue: 'PRO_LAUNCH',
  },
  {
    id: 'partnership',
    title: translate('Partnership'),
    subtitle: translate('Hands-on execution and full ecosystem amplification. For teams scaling serious initiatives.'),
    price: translate('starting at $2,500'),
    points: [
      { title: translate('Dedicated strategy and execution') },
      { title: translate('Content creation and campaign management') },
      { title: translate('Full network access and amplification') },
      { title: translate('Continuous optimization and support') },
      { title: translate('Direct collaboration with the Geyser team') },
    ],
  },
]
