import { IconType } from 'react-icons'
import { PiCompass, PiRanking, PiRocketLaunch, PiTrophy, PiWaveform } from 'react-icons/pi'

import { PathsMap } from '@/shared/constants'

export type PlatformNavItem = {
  label: string
  path: keyof PathsMap
  icon: IconType
}

export const platformNavItems: PlatformNavItem[] = [
  {
    label: 'Discover',
    path: 'platformLanding',
    icon: PiCompass,
  },
  {
    label: 'My Projects',
    path: 'platformMyProjects',
    icon: PiRocketLaunch,
  },
  {
    label: 'Activity',
    path: 'platformActivity',
    icon: PiWaveform,
  },
  {
    label: 'Leaderboard',
    path: 'platformLeaderboard',
    icon: PiRanking,
  },
  {
    label: 'Grants',
    path: 'platformGrants',
    icon: PiTrophy,
  },
]
