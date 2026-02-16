import { IconType } from 'react-icons'
import { PiClockCountdown, PiHandCoins, PiHouse, PiRocket, PiTrophy } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export enum DiscoveryNavItemKey {
  Campaigns = 'campaigns',
  Fundraisers = 'fundraisers',
  MyProjects = 'myProjects',
  ImpactFunds = 'impactFunds',
  Activity = 'activity',
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
    label: 'Impact Funds',
    key: DiscoveryNavItemKey.ImpactFunds,
    path: 'discoveryImpactFunds',
    icon: PiTrophy,
    bottomNav: true,
  },
]
