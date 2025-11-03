import { IconType } from 'react-icons'
import { PiClockCountdown, PiHandbag, PiHandCoins, PiHouse, PiRocket, PiTrophy } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export enum DiscoveryNavItemKey {
  Campaigns = 'campaigns',
  Fundraisers = 'fundraisers',
  MyProjects = 'myProjects',
  Products = 'products',
  Activity = 'activity',
  Grants = 'grants',
  Merch = 'merch',
  Guardians = 'guardians',
  Launchpad = 'launchpad',
  Heroes = 'heroes',
  Profile = 'profile',
  landing = 'landing',
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
    label: 'Discovery',
    key: DiscoveryNavItemKey.landing,
    path: 'discoveryLanding',
    icon: PiHouse,
    bottomNav: true,
  },
  {
    label: 'Campaigns',
    key: DiscoveryNavItemKey.Campaigns,
    path: 'discoveryAllOrNothing',
    icon: PiClockCountdown,
    bottomNav: true,
  },
  {
    label: 'Fundraisers',
    key: DiscoveryNavItemKey.Fundraisers,
    path: 'discoveryFundraisers',
    icon: PiHandCoins,
    bottomNav: true,
  },
  {
    label: 'My projects',
    key: DiscoveryNavItemKey.MyProjects,
    path: 'discoveryMyProjects',
    icon: PiRocket,
    bottomNav: true,
  },
  {
    label: 'Shop',
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
]
