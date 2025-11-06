import {
  PiBag,
  PiBell,
  PiBookOpen,
  PiFlagBannerFold,
  PiGear,
  PiHandbag,
  PiInvoice,
  PiMegaphone,
  PiPlanet,
  PiPlugs,
  PiProjectorScreenChart,
  PiWallet,
} from 'react-icons/pi'

export enum DashboardType {
  config = 'config',
  settings = 'settings',
  analytics = 'analytics',
}

import { IconType } from 'react-icons'

import { PathsMap } from '@/shared/constants'

export type ProjectDashboardItem = {
  label: string
  path: keyof PathsMap
  type?: DashboardType
  icon: IconType
  isPrelaunch?: boolean
}

export const projectDashboardItems: ProjectDashboardItem[] = [
  {
    label: 'Project Details',
    path: 'dashboardInfo',
    type: DashboardType.config,
    icon: PiPlanet,
  },
  {
    label: 'Story',
    path: 'projectStoryEdit',
    type: DashboardType.config,
    icon: PiBookOpen,
  },
  {
    label: 'Funding Goal',
    path: 'dashboardFundingGoal',
    type: DashboardType.config,
    icon: PiFlagBannerFold,
  },
  {
    label: 'Products',
    path: 'dashboardRewards',
    type: DashboardType.config,
    icon: PiHandbag,
  },
  {
    label: 'Wallet',
    path: 'dashboardWallet',
    type: DashboardType.config,
    icon: PiWallet,
  },
  // ------------------------------------------------------------ //
  {
    label: 'Analytics',
    path: 'dashboardAnalytics',
    type: DashboardType.analytics,
    icon: PiProjectorScreenChart,
  },
  {
    label: 'Sales',
    path: 'dashboardSales',
    type: DashboardType.analytics,
    icon: PiBag,
  },
  {
    label: 'Accounting',
    path: 'dashboardAccounting',
    type: DashboardType.analytics,
    icon: PiInvoice,
  },
  {
    label: 'Promote',
    path: 'dashboardPromote',
    type: DashboardType.analytics,
    icon: PiMegaphone,
  },
  // ------------------------------------------------------------ //

  {
    label: 'Nostr',
    path: 'dashboardNostr',
    type: DashboardType.settings,
    icon: PiPlugs,
  },
  {
    label: 'Notifications',
    path: 'dashboardNotifications',
    type: DashboardType.settings,
    icon: PiBell,
  },
  {
    label: 'Settings',
    path: 'dashboardSettings',
    type: DashboardType.settings,
    icon: PiGear,
  },
]
