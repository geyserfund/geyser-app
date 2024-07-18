import {
  PiBag,
  PiBookOpenText,
  PiGear,
  PiInvoice,
  PiPlanet,
  PiPlugs,
  PiProjectorScreenChart,
  PiShapes,
  PiUsersThree,
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
    label: 'Project Info',
    path: 'dashboardInfo',
    type: DashboardType.settings,
    icon: PiPlanet,
  },
  {
    label: 'Links & tags',
    path: 'dashboardDetails',
    type: DashboardType.settings,
    icon: PiShapes,
  },
  {
    label: 'Story',
    path: 'dashboardStory',
    type: DashboardType.settings,
    icon: PiBookOpenText,
  },
  {
    label: 'Connect wallet',
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
    label: 'Settings',
    path: 'dashboardSettings',
    type: DashboardType.settings,
    icon: PiGear,
  },
  {
    label: 'Affiliates',
    path: 'dashboardAffiliates',
    type: DashboardType.features,
    icon: PiUsersThree,
  },
]

// status: {
//   label: 'Status',
//   path: 'dashboardStatus',
// },
// rewards: {
//   label: 'Currency Denominations',
//   path: 'dashboardRewards',
// },
