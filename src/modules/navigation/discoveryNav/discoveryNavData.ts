import { IconType } from 'react-icons'
import { PiBell, PiClockCountdown, PiHandbag, PiSketchLogo, PiTrophy, PiWaveform } from 'react-icons/pi'

import { LegendJewelIconUrl, PathsMap } from '@/shared/constants'

export enum DiscoveryNavItemKey {
  AllOrNothing = 'allOrNothing',
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
    label: 'All or Nothing',
    key: DiscoveryNavItemKey.AllOrNothing,
    path: 'discoveryAllOrNothing',
    icon: PiClockCountdown,
    bottomNav: true,
  },
  {
    label: 'Feed',
    key: DiscoveryNavItemKey.Activity,
    path: 'discoveryActivity',
    icon: PiWaveform,
    bottomNav: true,
  },
  {
    label: 'Updates',
    key: DiscoveryNavItemKey.MyProjects,
    path: 'discoveryMyProjects',
    icon: PiBell,
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
