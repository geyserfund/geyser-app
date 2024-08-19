import { IconType } from 'react-icons'
import { PiCompass, PiRanking, PiRocketLaunch, PiTrophy, PiWaveform } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export type DiscoveryNavItem = {
  label: string
  path: keyof PathsMap
  icon: IconType
}

export const discoveryNavItems: DiscoveryNavItem[] = [
  {
    label: 'Discover',
    path: 'discoveryLanding',
    icon: PiCompass,
  },
  {
    label: 'My Projects',
    path: 'discoveryMyProjects',
    icon: PiRocketLaunch,
  },
  {
    label: 'Activity',
    path: 'discoveryActivity',
    icon: PiWaveform,
  },
  {
    label: 'Leaderboard',
    path: 'discoveryLeaderboard',
    icon: PiRanking,
  },
  {
    label: 'Grants',
    path: 'discoveryGrants',
    icon: PiTrophy,
  },
]
