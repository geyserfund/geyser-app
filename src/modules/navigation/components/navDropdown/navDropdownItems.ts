import type { TFunction } from 'i18next'

import { getPath } from '@/shared/constants/index.ts'

import type { NavDropdownMenuItem } from './NavDropdownMenu.tsx'

/** Returns dropdown items for the Donate navigation menu. */
export const getDonateNavDropdownItems = (t: TFunction): NavDropdownMenuItem[] => {
  return [
    {
      title: t('Fundraisers'),
      description: t('Browse ongoing causes and initiatives.'),
      to: getPath('discoveryFundraisers'),
    },
    {
      title: t('Impact Funds'),
      description: t('Fund a category through curated funds.'),
      to: getPath('discoveryImpactFunds'),
      badge: { label: t('new'), tone: 'new' },
    },
    {
      title: t('Campaigns'),
      description: t('Browse time-bound campaigns.'),
      to: getPath('discoveryCampaigns'),
    },
    {
      title: t('Micro-Lending'),
      description: t('Browse loans supporting small businesses.'),
      disabled: true,
      badge: { label: t('soon'), tone: 'soon' },
    },
  ]
}

/** Returns dropdown items for the new Fundraise navigation menu. */
export const getFundraiseNavDropdownItems = (t: TFunction): NavDropdownMenuItem[] => {
  return [
    {
      title: t('How to raise funds on Geyser'),
      description: t('Explore the creator page and begin your fundraising journey.'),
      to: getPath('discoveryCreator'),
    },
    {
      title: t('Fundraising Categories'),
      description: t('Find the category that best matches your initiative.'),
      href: 'https://guide.geyser.fund/geyser-docs/guides/geyser-for-___',
    },
    {
      title: t('Launch Now'),
      description: t('Start setting up your project and launch details now.'),
      to: getPath('launchProjectDetails'),
      emphasis: 'cta',
    },
    {
      title: t('Fundraising tips'),
      description: t('Review practical step-by-step advice before launching.'),
      href: 'https://guide.geyser.fund/geyser-docs/guides/step-by-step-tutorials',
    },
    {
      title: t('Success Stories'),
      description: t('Learn from creators who have already delivered impact.'),
      href: 'https://guide.geyser.fund/geyser-docs/guides/success-stories',
    },
    {
      title: t('Funding mechanisms'),
      description: t('Understand the mechanisms available on Geyser.'),
      href: 'https://guide.geyser.fund/geyser-docs/product-features/launch-a-project',
    },
  ]
}
