import { createContext, useContext, useState } from 'react'

import { Project } from '../types'

export enum MobileViews {
  description = 'description',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
}

type ProjectState = {
  project: Project
  updateProject?: (updateProject: Project) => void
}

type ProjectContextProps = {
  mobileView: MobileViews
  setMobileView: (view: MobileViews) => void
} & ProjectState

const defaultProjectContext = {
  mobileView: MobileViews.description,
  setMobileView(view: MobileViews) {},
  project: {} as Project,
}

export const ProjectContext = createContext<ProjectContextProps>(
  defaultProjectContext,
)

export const useProjectContext = () => useContext(ProjectContext)

export const ProjectProvider = ({
  project,
  updateProject,
  children,
}: { children: React.ReactNode } & ProjectState) => {
  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  )

  return (
    <ProjectContext.Provider
      value={{ mobileView, setMobileView, project, updateProject }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
