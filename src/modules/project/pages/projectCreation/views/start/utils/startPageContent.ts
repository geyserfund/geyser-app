import type { TFunction } from 'i18next'

export type KeyValueRow = {
  title: string
  description: string
}

export type QuestionAnswerRow = {
  question: string
  answer: string
}

export type LaunchPlanRow = {
  title: string
  subtitle: string
  price: string
  points: string[]
  badge?: string
}

export const getFundamentals = (translate: TFunction): KeyValueRow[] => [
  {
    title: translate('A meaningful idea'),
    description: translate(
      'Show that you have thought clearly about the issue, and that your fundraiser or campaign idea is how you solve it.',
    ),
  },
  {
    title: translate('Proof of Work'),
    description: translate(
      "Show the time, money and effort you've put into this idea or project already. You're not waiting for money or permission to build this.",
    ),
  },
  {
    title: translate('Reputation'),
    description: translate(
      "Show that you are connected to the Bitcoin community's trust network. And make sure that those Bitcoiners around you are ready to vouch for you.",
    ),
  },
]

export const getTrustPayoutCards = (translate: TFunction): KeyValueRow[] => [
  {
    title: translate('Connect your social profile'),
    description: translate(
      'Show strong proof of work and visible ties to the Bitcoin community, so supporters know who is behind the project.',
    ),
  },
  {
    title: translate('Complete your project story'),
    description: translate(
      'Tell a clear story, add video, and bring personal context. People support people when they can feel the mission.',
    ),
  },
  {
    title: translate('Verify your profile'),
    description: translate(
      'Verified identity signals credibility and helps your page convert trust into real funding momentum.',
    ),
  },
]

export const getMomentumSteps = (translate: TFunction): KeyValueRow[] => [
  {
    title: translate('Launch with a clear ask'),
    description: translate('Make your first message specific, simple, and actionable.'),
  },
  {
    title: translate('Invite your first supporters'),
    description: translate('Reach out personally to the people most likely to back early.'),
  },
  {
    title: translate('Share early momentum'),
    description: translate('Post first wins quickly so others can see progress.'),
  },
  {
    title: translate('Keep posting updates'),
    description: translate('Treat launch as the beginning, not the finish line.'),
  },
]

export const getLaunchPlans = (translate: TFunction): LaunchPlanRow[] => [
  {
    title: translate('Starter Launch'),
    subtitle: translate('do it yourself, get the basic exposure'),
    price: translate('$25'),
    points: [translate('Access to all Geyser tooling and get discovered through the Geyser platform')],
  },
  {
    title: translate('Growth Launch'),
    subtitle: translate('Visibility boost'),
    price: translate('$60'),
    points: [
      `${translate('Landing Page Feature')}: ${translate('1 week front-page spotlight')}`,
      `${translate('Geyser Newsletter feature')}: ${translate(
        'get featured at the top of our monthly newsletter going out to 5000+ subscribers',
      )}`,
      `${translate('Social Media post')}: ${translate(
        '1 social media post on Geyser’s X account with 15k+ followers',
      )}`,
    ],
    badge: translate('Popular'),
  },
  {
    title: translate('Pro Launch'),
    subtitle: translate('Maximum visibility + product feedback'),
    price: translate('$90'),
    points: [
      translate('Limited to 5 per month, subject to selection'),
      translate('Everything in Growth'),
      `${translate('Spotlight Email')}: ${translate(
        'Your project featured in a dedicated email sent to Geyser users most interested in your category',
      )}`,
      `${translate('Project feedback')}: ${translate(
        'Geyser Team Expert provides 1-time feedback on your project story and structure',
      )}`,
      translate('Picked by 40% of Top 100 projects on Geyser'),
    ],
    badge: translate('Best Value'),
  },
  {
    title: translate('Geyser Partnership'),
    subtitle: translate('hands on support + network amplification'),
    price: translate('starting at $1,000'),
    points: [
      translate(
        'Geyser becomes your partner providing personalized launch strategy, project feedback, marketing support',
      ),
    ],
    badge: translate('Premium'),
  },
]

export const getResources = (translate: TFunction): KeyValueRow[] => [
  {
    title: translate('Launch a project'),
    description: translate('Complete guide to getting started on Geyser.'),
  },
  {
    title: translate('Project checklist'),
    description: translate('Use a practical checklist before going live.'),
  },
  {
    title: translate('Wallet setup and withdrawals'),
    description: translate('Configure payouts and manage withdrawals safely.'),
  },
  {
    title: translate('Rewards playbook'),
    description: translate('Structure rewards so supporters have clear options.'),
  },
  {
    title: translate('Frequently asked questions'),
    description: translate('Get quick answers before launch day.'),
  },
]

export const getFaqItems = (translate: TFunction): QuestionAnswerRow[] => [
  {
    question: translate('Do I need everything finished before launching'),
    answer: translate('No. Start with a clear story and complete setup, then improve with updates and feedback.'),
  },
  {
    question: translate('Which fundraiser type should I pick first'),
    answer: translate(
      'Open Fundraiser fits ongoing work. All-or-Nothing is best when delivery depends on a minimum goal.',
    ),
  },
  {
    question: translate('Can contributors use both Bitcoin and fiat'),
    answer: translate('Yes. You can accept Lightning, on-chain Bitcoin, and familiar fiat payment options.'),
  },
  {
    question: translate('Can I edit goals, rewards, or content later'),
    answer: translate('Yes. You can iterate as your project evolves and as you learn what supporters respond to.'),
  },
  {
    question: translate('How do I get more visibility after launch'),
    answer: translate('Post updates, share milestones, and choose a launch plan that matches the reach you need.'),
  },
]

export const getFinalStats = (translate: TFunction): KeyValueRow[] => [
  { title: translate('50,000+'), description: translate('Bitcoiners in the Geyser ecosystem') },
  { title: translate('5,000+'), description: translate('Monthly newsletter reach for Growth Launch') },
  { title: translate('15k+'), description: translate('Followers reached through Growth social support') },
]
