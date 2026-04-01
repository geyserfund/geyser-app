export const AI_SEO_SITE_ORIGIN = 'https://geyser.fund'

export type AiSeoPageContext = 'default' | 'campaigns' | 'fundraisers' | 'grants' | 'impactFunds'

export type AiSeoPageContent = {
  title: string
  description: string
  keywords: string
  about: string[]
}

const BASE_KEYWORDS = [
  'bitcoin crowdfunding platform',
  'bitcoin donations',
  'bitcoin campaigns',
  'fund bitcoin projects and causes',
  'launch bitcoin campaigns',
  'bitcoin fundraising',
  'pledge with bitcoin',
  'global donations',
  'open-source bitcoin funding',
  'bitcoin adoption projects',
]

const pageContentByContext: Record<AiSeoPageContext, AiSeoPageContent> = {
  default: {
    title: 'Geyser - Fund Bitcoin Projects, Ideas, and Causes',
    description:
      'Geyser is the home of Bitcoin crowdfunding and donations. Launch projects, fund ideas, and support humanitarian causes worldwide using Bitcoin and Lightning rails.',
    keywords: BASE_KEYWORDS.join(', '),
    about: ['Bitcoin crowdfunding', 'Donations', 'Projects and causes'],
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
}

export const getAiSeoPageContent = (context: AiSeoPageContext): AiSeoPageContent => {
  return pageContentByContext[context]
}
