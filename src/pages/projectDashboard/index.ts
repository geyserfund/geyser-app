import { ProjectContributors } from './ProjectContributors'
import { ProjectDashboard } from './ProjectDashboard'
import { ProjectDescription } from './ProjectDescription'
import { ProjectDetails } from './ProjectDetails'
import { ProjectFundingSettings } from './ProjectFundingSettings'
import { ProjectSettings } from './ProjectSettings'
import { ProjectStats } from './ProjectStats'

// This is exported as part of the CreatorDashboard chunk for code-splitting
const CreatorDashboard = {
  ProjectContributors,
  ProjectDashboard,
  ProjectDescription,
  ProjectDetails,
  ProjectFundingSettings,
  ProjectSettings,
  ProjectStats,
}

export default CreatorDashboard
