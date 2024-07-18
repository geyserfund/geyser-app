import { IconType } from 'react-icons'
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
import { useParams } from 'react-router-dom'

import { PathsMap } from '@/shared/constants'

import { ProjectProvider } from '../../context'
import { ProjectDashboard } from './ProjectDashboard'

enum DashboardType {
  settings = 'settings',
  analytics = 'analytics',
  features = 'features',
}

export type DashboardSection = {
  label: string
  path: keyof PathsMap
  type?: DashboardType
  icon: IconType
}

export const projectSections: Record<string, DashboardSection> = {
  analytics: {
    label: 'Analytics',
    path: 'dashboardAnalytics',
    type: DashboardType.analytics,
    icon: PiProjectorScreenChart,
  },
  sales: {
    label: 'Sales',
    path: 'dashboardSales',
    type: DashboardType.analytics,
    icon: PiBag,
  },
  accounting: {
    label: 'Sales',
    path: 'dashboardAccounting',
    type: DashboardType.analytics,
    icon: PiInvoice,
  },

  description: {
    label: 'Description',
    path: 'projectDashboard',
    type: DashboardType.settings,
    icon: PiPlanet,
  },
  details: {
    label: 'Links & tags',
    path: 'dashboardDetails',
    type: DashboardType.settings,
    icon: PiShapes,
  },
  story: {
    label: 'Story',
    path: 'dashboardStory',
    type: DashboardType.settings,
    icon: PiBookOpenText,
  },
  wallet: {
    label: 'Connect wallet',
    path: 'dashboardWallet',
    type: DashboardType.settings,
    icon: PiWallet,
  },
  nostr: {
    label: 'Nostr',
    path: 'dashboardNostr',
    type: DashboardType.settings,
    icon: PiPlugs,
  },
  settings: {
    label: 'Settings',
    path: 'dashboardSettings',
    type: DashboardType.settings,
    icon: PiGear,
    // status: {
    //   label: 'Status',
    //   path: 'dashboardStatus',
    // },
    // rewards: {
    //   label: 'Currency Denominations',
    //   path: 'dashboardRewards',
    // },
  },
  affiliate: {
    label: 'Affiliates',
    path: 'dashboardAffiliates',
    type: DashboardType.features,
    icon: PiUsersThree,
  },
}

export const ProjectDashboardPage = () => {
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <ProjectProvider projectId={projectId || ''}>
      <ProjectDashboard />
    </ProjectProvider>
  )
}
