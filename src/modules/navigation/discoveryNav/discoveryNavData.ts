import { IconType } from 'react-icons'
import { PiCompass, PiCrown, PiHandbag, PiRocketLaunch, PiSketchLogo, PiTrophy, PiWaveform } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export enum DiscoveryNavItemKey {
  Discover = 'discover',
  MyProjects = 'myProjects',
  Products = 'products',
  Activity = 'activity',
  HallOfFame = 'hallOfFame',
  Grants = 'grants',
  Merch = 'merch',
  Guardians = 'guardians',
}

export type DiscoveryNavItem = {
  label: string
  key: DiscoveryNavItemKey
  path: keyof PathsMap
  icon: IconType
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
    bottomNav: false,
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
    label: 'Hall of fame',
    key: DiscoveryNavItemKey.HallOfFame,
    path: 'discoveryHallOfFame',
    icon: PiCrown,
    bottomNav: true,
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
    bottomNav: true,
  },
]
