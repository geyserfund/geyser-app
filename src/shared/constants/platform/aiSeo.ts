export const AI_SEO_SITE_ORIGIN = 'https://geyser.fund'

export type AiSeoPageContext = 'default' | 'campaigns' | 'fundraisers' | 'grants' | 'impactFunds' | 'microLending'

export type AiSeoPageContent = {
  title: string
  description: string
  keywords: string
  about: string[]
}

const BASE_KEYWORDS = [
  'circular grants',
  'bitcoin impact funds',
  'bitcoin field partners',
  'reusable capital for local economies',
  'debt-free project funding',
  'bitcoin local economy projects',
]

const pageContentByContext: Record<AiSeoPageContext, AiSeoPageContent> = {
  default: {
    title: 'Geyser - Circular Grants, Impact Funds, and Field Partners',
    description:
      'Geyser connects trusted Field Partners, Circular Grants, and Impact Funds to move Bitcoin capital into stronger local economies.',
    keywords: BASE_KEYWORDS.join(', '),
    about: ['Circular Grants', 'Impact Funds', 'Field Partners'],
  },
  campaigns: {
    title: 'Launch Bitcoin Campaigns for Projects, Ideas, and Causes',
    description:
      'Geyser is the launchpad for all-or-nothing Bitcoin campaigns. Fund new ideas, support meaningful causes, and help impactful projects reach their funding goals.',
    keywords: [...BASE_KEYWORDS, 'all-or-nothing bitcoin campaigns', 'bitcoin campaign launches'].join(', '),
    about: ['Campaign launches', 'Ideas and causes', 'Community funding'],
  },
  fundraisers: {
    title: 'Bitcoin Fundraisers and Donations for Global Impact',
    description:
      'Support Bitcoin community fundraisers on Geyser - from independent creators and open-source builders to humanitarian causes helping communities worldwide through direct donations.',
    keywords: [...BASE_KEYWORDS, 'bitcoin donations for causes', 'humanitarian bitcoin fundraising'].join(', '),
    about: ['Direct donations', 'Creators and communities', 'Humanitarian impact'],
  },
  grants: {
    title: 'Bitcoin Grants for Builders, Education, and Community Initiatives',
    description:
      'Explore Bitcoin grants on Geyser supporting builders, educators, and grassroots initiatives advancing adoption and real-world impact.',
    keywords: [...BASE_KEYWORDS, 'bitcoin grants', 'bitcoin education funding', 'community bitcoin funding'].join(', '),
    about: ['Bitcoin grants', 'Builders and educators', 'Community initiatives'],
  },
  impactFunds: {
    title: 'Bitcoin Impact Funds',
    description:
      'Impact Funds on Geyser channel Bitcoin donations into high-impact projects and causes, supporting communities and advancing adoption worldwide.',
    keywords: [...BASE_KEYWORDS, 'impact funds', 'bitcoin donations for impact', 'bitcoin grants'].join(', '),
    about: ['Impact funds', 'Donations', 'Causes and communities'],
  },
  microLending: {
    title: 'Micro-Loans for Bitcoin Communities | Geyser',
    description:
      'Join the waitlist for Geyser micro-loans: small, flexible loans for real-world Bitcoin communities, from local borrowers to community lenders.',
    keywords: [
      ...BASE_KEYWORDS,
      'bitcoin micro loans',
      'community lending',
      'bitcoin small business loans',
      'grassroots bitcoin finance',
    ].join(', '),
    about: ['Micro-loans', 'Bitcoin communities', 'Local impact'],
  },
}

export const getAiSeoPageContent = (context: AiSeoPageContext): AiSeoPageContent => {
  return pageContentByContext[context]
}
