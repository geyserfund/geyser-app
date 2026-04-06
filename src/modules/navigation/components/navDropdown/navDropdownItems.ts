import type { TFunction } from 'i18next'

import { getPath, GuideUrl } from '@/shared/constants/index.ts'

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
      title: t('Who is Geyser for'),
      description: t('See who launches on Geyser and what they can build here.'),
      to: getPath('discoveryCreator'),
    },
    {
      title: t('Launch Now'),
      description: t('Go straight to your project details and begin launching now.'),
      to: getPath('launchProjectDetails'),
      badge: { label: t('start'), tone: 'new' },
    },
    {
      title: t('How to launch on Geyser'),
      description: t('Follow the guided start flow to set up your project.'),
      to: getPath('launchStart'),
    },
    {
      title: t('Look at our Guides'),
      description: t('Browse practical guides, walkthroughs, and launch resources.'),
      href: GuideUrl,
    },
  ]
}
