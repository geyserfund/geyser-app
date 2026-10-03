import type { TFunction } from 'i18next'
import type { IconType } from 'react-icons'
import { GiAfrica, GiSouthAmerica } from 'react-icons/gi'
import { PiArrowUpRight, PiChartBar, PiGlobe, PiHandshake, PiPlant, PiStack, PiUsersThree } from 'react-icons/pi'

import { getPath } from '@/shared/constants/index.ts'
import {
  AFRICA_REGION_FILTER,
  LATIN_AMERICA_REGION_FILTER,
} from '@/shared/constants/platform/regionCountryCodes.ts'

import type { NavDropdownMenuSection } from './NavDropdownMenu.tsx'

export type DonateNavLink = {
  description: string
  icon: IconType
  title: string
  to: string
}

export type DonateNavMenuData = {
  circularGrants: {
    ctaLabel: string
    ctaTo: string
    description: string
    icon: IconType
    regions: DonateNavLink[]
    regionsLabel: string
    title: string
  }
  legacy: DonateNavLink & {
    ctaLabel: string
  }
  supportGeyser: {
    ctaLabel: string
    ctaTo: string
    description: string
    icon: IconType
    links: DonateNavLink[]
    title: string
  }
}

/** Returns the Donate mega-menu content used by desktop, mobile, and sidebar nav. */
export const getDonateNavMenu = (t: TFunction): DonateNavMenuData => {
  return {
    circularGrants: {
      icon: PiPlant,
      title: t('Circular Grants'),
      description: t(
        'Fund entrepreneurs through trusted local Field Partners. Zero-cost capital for a more circular Bitcoin economy.',
      ),
      ctaLabel: t('Explore Circular Grants'),
      ctaTo: getPath('discoveryCircularGrants'),
      regionsLabel: t('Browse by region'),
      regions: [
        {
          icon: PiGlobe,
          title: t('All regions'),
          description: t('View all grants'),
          to: getPath('discoveryCircularGrantProjects'),
        },
        {
          icon: GiSouthAmerica,
          title: t('Latin America'),
          description: t('Grants in Latam'),
          to: `${getPath('discoveryCircularGrantProjects')}?region=${encodeURIComponent(LATIN_AMERICA_REGION_FILTER)}`,
        },
        {
          icon: GiAfrica,
          title: t('Africa'),
          description: t('Grants in Africa'),
          to: `${getPath('discoveryCircularGrantProjects')}?region=${encodeURIComponent(AFRICA_REGION_FILTER)}`,
        },
      ],
    },
    supportGeyser: {
      icon: PiUsersThree,
      title: t('Support Geyser'),
      description: t(
        'Help fund the people, tools, and infrastructure that make this work possible, including our Field Partner network.',
      ),
      ctaLabel: t('Support Geyser'),
      ctaTo: getPath('fundingStart', 'geyser'),
      links: [
        {
          icon: PiHandshake,
          title: t('Our Field Partner network'),
          description: t('Learn about the local teams on the ground.'),
          to: `${getPath('discoveryImpactFunds')}#field-partners`,
        },
        {
          icon: PiChartBar,
          title: t('Our impact'),
          description: t('See how your support is put to work.'),
          to: `${getPath('discoveryImpactFunds')}#impact`,
        },
      ],
    },
    legacy: {
      icon: PiStack,
      title: t('Looking for crowdfunding projects?'),
      description: t("Browse Geyser's original crowdfunding platform."),
      ctaLabel: t('View legacy projects'),
      to: getPath('discoveryProjects'),
    },
  }
}

/** Returns grouped sections for the Donate navigation menu. */
export const getDonateNavDropdownSections = (t: TFunction): NavDropdownMenuSection[] => {
  const menu = getDonateNavMenu(t)

  return [
    {
      items: [
        {
          title: menu.circularGrants.ctaLabel,
          to: menu.circularGrants.ctaTo,
          leadingIcon: menu.circularGrants.icon,
        },
        ...menu.circularGrants.regions.map((region) => ({
          title: region.title,
          to: region.to,
          leadingIcon: region.icon,
        })),
      ],
    },
    {
      items: [
        {
          title: t('Field Partner Network'),
          to: `${getPath('discoveryImpactFunds')}#field-partners`,
          leadingIcon: PiHandshake,
        },
        {
          title: t('Our impact'),
          to: `${getPath('discoveryImpactFunds')}#impact`,
          leadingIcon: PiChartBar,
        },
      ],
    },
  ]
}

/** Returns grouped sections for the About navigation menu. */
export const getAboutNavDropdownSections = (t: TFunction): NavDropdownMenuSection[] => {
  return [
    {
      items: [
        { title: t('What is Geyser?'), to: getPath('about') },
        { title: t('Field Partners'), to: `${getPath('discoveryImpactFunds')}#field-partners` },
        { title: t('Impact'), to: `${getPath('discoveryImpactFunds')}#impact` },
        { title: t('Due Diligence'), to: getPath('aboutDueDiligence') },
        { title: t('News'), to: getPath('discoveryNews'), trailingIcon: PiArrowUpRight },
      ],
    },
  ]
}
