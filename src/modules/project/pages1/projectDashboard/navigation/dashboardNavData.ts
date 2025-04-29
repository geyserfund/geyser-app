import {
  PiBag,
  PiBell,
  PiBookOpen,
  PiGear,
  PiInvoice,
  PiMegaphone,
  PiPlanet,
  PiPlugs,
  PiProjectorScreenChart,
  PiShapes,
  PiWallet,
} from 'react-icons/pi'

export enum DashboardType {
  settings = 'settings',
  analytics = 'analytics',
  features = 'features',
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
    type: DashboardType.features,
    icon: PiMegaphone,
  },
  {
    label: 'Project Info',
    path: 'dashboardInfo',
    type: DashboardType.settings,
    icon: PiPlanet,
    isPrelaunch: true,
  },
  {
    label: 'Links & tags',
    path: 'dashboardDetails',
    type: DashboardType.settings,
    icon: PiShapes,
    isPrelaunch: true,
  },
  {
    label: 'Story',
    path: 'projectStoryEdit',
    type: DashboardType.settings,
    icon: PiBookOpen,
    isPrelaunch: true,
  },
  {
    label: 'Wallet',
    path: 'dashboardWallet',
    type: DashboardType.settings,
    icon: PiWallet,
  },
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
    isPrelaunch: true,
  },
  {
    label: 'Settings',
    path: 'dashboardSettings',
    type: DashboardType.settings,
    icon: PiGear,
    isPrelaunch: true,
  },
]
