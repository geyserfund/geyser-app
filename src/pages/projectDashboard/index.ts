import { ProjectDashboard } from './ProjectDashboard'
import { ProjectDashboardPage } from './ProjectDashboardPage'
import { ProjectSettings } from './sections/ProjectSettings'
import { ProjectStats } from './sections/ProjectStats'
import { ProjectStory } from './sections/ProjectStory'
import { ProjectContributors } from './sections/ProjectContributors'
import { ProjectDescription } from './sections/ProjectDescription'
import { ProjectDetails } from './sections/ProjectDetails'
import { ProjectWallet } from './sections/ProjectWallet'

// This is exported as part of the CreatorDashboard chunk for code-splitting

export {
  ProjectContributors,
  ProjectDashboard,
  ProjectDashboardPage,
  ProjectDescription,
  ProjectDetails,
  ProjectWallet as ProjectFundingSettings,
  ProjectSettings,
  ProjectStats,
  ProjectStory,
}
