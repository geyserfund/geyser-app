import { IconType } from 'react-icons'
import { PiCompass, PiRanking, PiRocketLaunch, PiTrophy, PiTShirt, PiWaveform } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export enum DiscoveryNavItemKey {
  Discover = 'discover',
  MyProjects = 'myProjects',
  Activity = 'activity',
  Leaderboard = 'leaderboard',
  Grants = 'grants',
  Merch = 'merch',
}

export type DiscoveryNavItem = {
  label: string
  key: DiscoveryNavItemKey
  path: keyof PathsMap
  icon: IconType
}

export const discoveryNavItems: DiscoveryNavItem[] = [
  {
    label: 'Discover',
    key: DiscoveryNavItemKey.Discover,
    path: 'discoveryLanding',
    icon: PiCompass,
  },
  {
    label: 'My Projects',
    key: DiscoveryNavItemKey.MyProjects,
    path: 'discoveryMyProjects',
    icon: PiRocketLaunch,
  },
  {
    label: 'Activity',
    key: DiscoveryNavItemKey.Activity,
    path: 'discoveryActivity',
    icon: PiWaveform,
  },
  {
    label: 'Leaderboard',
    key: DiscoveryNavItemKey.Leaderboard,
    path: 'discoveryLeaderboard',
    icon: PiRanking,
  },
  {
    label: 'Grants',
    key: DiscoveryNavItemKey.Grants,
    path: 'discoveryGrants',
    icon: PiTrophy,
  },
  {
    label: 'Merch',
    key: DiscoveryNavItemKey.Merch,
    path: 'discoveryMerch',
    icon: PiTShirt,
  },
]
