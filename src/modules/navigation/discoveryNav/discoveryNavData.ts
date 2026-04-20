import { IconType } from 'react-icons'
import { PiBag, PiClockCountdown, PiHandCoins, PiHouse, PiRocket, PiTrophy } from 'react-icons/pi'

import MarketplaceNavIcon from '@/assets/marketplace-nav.png'
import { ImpactFundsIconUrl, PathsMap } from '@/shared/constants'

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
  new?: boolean
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
    label: 'Shops',
    key: DiscoveryNavItemKey.Merch,
    path: 'discoveryProducts',
    icon: PiBag,
    image: MarketplaceNavIcon,
    bottomNav: true,
  },
  {
    label: 'Adoption Impact Fund',
    key: DiscoveryNavItemKey.ImpactFunds,
    path: 'discoveryImpactFunds',
    icon: PiTrophy,
    image: ImpactFundsIconUrl,
    new: true,
    bottomNav: true,
  },
]
