import {
  PiBag,
  PiBell,
  PiBookOpen,
  PiCreditCard,
  PiCoins,
  PiFlagBannerFold,
  PiGear,
  PiHandbag,
  PiIdentificationCard,
  PiInvoice,
  PiMegaphone,
  PiPlanet,
  PiPlugs,
  PiProjectorScreenChart,
} from 'react-icons/pi'

export enum DashboardType {
  config = 'config',
  growth = 'growth',
  analytics = 'analytics',
  payments = 'payments',
  settings = 'settings',
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
    label: 'Promote',
    path: 'dashboardPromote',
    type: DashboardType.growth,
    icon: PiMegaphone,
  },
  {
    label: 'Matching',
    path: 'dashboardMatching',
    type: DashboardType.growth,
    icon: PiCoins,
  },
  {
    label: 'Payment Settings',
    path: 'dashboardWallet',
    type: DashboardType.payments,
    icon: PiCreditCard,
  },
  {
    label: 'Limits & Verification',
    path: 'dashboardLimitsVerification',
    type: DashboardType.payments,
    icon: PiIdentificationCard,
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
