export const AI_SEO_SITE_ORIGIN = 'https://geyser.fund'

export type AiSeoPageContext = 'default' | 'campaigns' | 'fundraisers' | 'grants' | 'impactFunds'

export type AiSeoPageContent = {
  title: string
  description: string
  keywords: string
  about: string[]
}

const BASE_KEYWORDS = [
  'bitcoin crowdfunding',
  'bitcoin fundraising',
  'bitcoin project ideas',
  'upcoming bitcoin projects',
  'bitcoin humanitarian fundraisers',
  'bitcoin adoption',
  'lightning donations',
  'open-source bitcoin funding',
]

const pageContentByContext: Record<AiSeoPageContext, AiSeoPageContent> = {
  default: {
    title: 'Bitcoin Crowdfunding for New Ideas and Humanitarian Causes',
    description:
      'Geyser helps people launch new Bitcoin project ideas and fund humanitarian causes worldwide, accelerating Bitcoin adoption through transparent crowdfunding.',
    keywords: BASE_KEYWORDS.join(', '),
    about: ['Bitcoin adoption', 'Crowdfunding', 'Humanitarian support'],
  },
  campaigns: {
    title: 'All-or-Nothing Bitcoin Campaigns for New Project Ideas',
    description:
      'Discover and launch upcoming all-or-nothing Bitcoin campaigns on Geyser to fund bold project ideas that accelerate adoption.',
    keywords: [...BASE_KEYWORDS, 'all-or-nothing campaigns', 'bitcoin campaign launches'].join(', '),
    about: ['All-or-nothing crowdfunding', 'Bitcoin innovation', 'Early-stage project launches'],
  },
  fundraisers: {
    title: 'Bitcoin Fundraisers for Builders and Humanitarian Causes',
    description:
      'Support open Bitcoin fundraisers on Geyser, from new creator projects to humanitarian causes helping communities around the world.',
    keywords: [...BASE_KEYWORDS, 'bitcoin causes', 'humanitarian bitcoin donations'].join(', '),
    about: ['Direct fundraising', 'Bitcoin creators', 'Humanitarian support'],
  },
  grants: {
    title: 'Bitcoin Grants for Builders, Educators, and Impact Initiatives',
    description:
      'Explore grants and funding programs on Geyser that support Bitcoin builders, educators, and high-impact initiatives worldwide.',
    keywords: [...BASE_KEYWORDS, 'bitcoin grants', 'bitcoin education funding'].join(', '),
    about: ['Bitcoin grants', 'Education', 'Community impact'],
  },
  impactFunds: {
    title: 'Bitcoin Impact Funds Supporting Real-World Causes',
    description:
      'Explore Geyser Impact Funds supporting high-impact Bitcoin and humanitarian initiatives with transparent allocation and global community backing.',
    keywords: [...BASE_KEYWORDS, 'bitcoin impact funds', 'bitcoin social impact'].join(', '),
    about: ['Impact funds', 'Bitcoin adoption', 'Humanitarian causes'],
  },
}

export const getAiSeoPageContent = (context: AiSeoPageContext): AiSeoPageContent => {
  return pageContentByContext[context]
}
