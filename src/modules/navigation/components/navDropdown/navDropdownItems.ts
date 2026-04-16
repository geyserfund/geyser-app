import type { TFunction } from 'i18next'
import { PiRocketLaunch } from 'react-icons/pi'

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
export const getFundraiseNavDropdownItems = (
  t: TFunction,
  mode: 'desktop' | 'mobile' = 'desktop',
): NavDropdownMenuItem[] => {
  const whoGeyserIsForItem: NavDropdownMenuItem = {
    title: t('Who Geyser is for'),
    description: t('Look at the community of creators having impact'),
    to: getPath('discoveryCreator'),
  }

  const startYourProjectItem: NavDropdownMenuItem = {
    title: t('Start your project'),
    to: getPath('launchProjectDetails'),
    emphasis: 'cta',
    trailingIcon: PiRocketLaunch,
  }

  const howToLaunchItem: NavDropdownMenuItem = {
    title: t('How to launch on Geyser'),
    description: t('Follow the guided start flow to set up your project.'),
    to: getPath('launchStart'),
  }

  const lookAtGuidesItem: NavDropdownMenuItem = {
    title: t('Look at our Guides'),
    href: GuideUrl,
  }

  if (mode === 'mobile') {
    return [whoGeyserIsForItem, howToLaunchItem, lookAtGuidesItem, startYourProjectItem]
  }

  return [whoGeyserIsForItem, startYourProjectItem, howToLaunchItem, lookAtGuidesItem]
}
