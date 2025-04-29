import { IconType } from 'react-icons'
import { GiAirBalloon } from 'react-icons/gi'
import { PiCompass, PiCrown, PiHandbag, PiRocketLaunch, PiSketchLogo, PiTrophy, PiWaveform } from 'react-icons/pi'

import { LegendJewelIconUrl, PathsMap } from '@/shared/constants'

export enum DiscoveryNavItemKey {
  Discover = 'discover',
  MyProjects = 'myProjects',
  Products = 'products',
  Activity = 'activity',
  Grants = 'grants',
  Merch = 'merch',
  Guardians = 'guardians',
  Launchpad = 'launchpad',
  Heroes = 'heroes',
}

export type DiscoveryNavItem = {
  label: string
  key: DiscoveryNavItemKey
  path: keyof PathsMap
  icon: IconType
  image?: string
  bottomNav: boolean
}

export const discoveryNavItems: DiscoveryNavItem[] = [
  {
    label: 'Discover',
    key: DiscoveryNavItemKey.Discover,
    path: 'discoveryLanding',
    icon: PiCompass,
    bottomNav: true,
  },

  {
    label: 'Products',
    key: DiscoveryNavItemKey.Products,
    path: 'discoveryProducts',
    icon: PiHandbag,
    bottomNav: true,
  },
  {
    label: 'Launchpad',
    key: DiscoveryNavItemKey.Launchpad,
    path: 'discoveryLaunchpad',
    icon: GiAirBalloon,
    bottomNav: true,
  },
  {
    label: 'Activity',
    key: DiscoveryNavItemKey.Activity,
    path: 'discoveryActivity',
    icon: PiWaveform,
    bottomNav: true,
  },
  {
    label: 'My Projects',
    key: DiscoveryNavItemKey.MyProjects,
    path: 'discoveryMyProjects',
    icon: PiRocketLaunch,
    bottomNav: true,
  },
  {
    label: 'Heroes',
    key: DiscoveryNavItemKey.Heroes,
    path: 'discoveryHeroes',
    icon: PiCrown,
    bottomNav: false,
  },
  {
    label: 'Grants',
    key: DiscoveryNavItemKey.Grants,
    path: 'discoveryGrants',
    icon: PiTrophy,
    bottomNav: false,
  },

  {
    label: 'Guardians',
    key: DiscoveryNavItemKey.Guardians,
    path: 'guardians',
    icon: PiSketchLogo,
    image: LegendJewelIconUrl,
    bottomNav: false,
  },
]
