import { createContext, useContext, useEffect, useState } from 'react'

import { Project } from '../types'
import { useAuthContext } from './auth'

export enum MobileViews {
  description = 'description',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
}

type ProjectState = {
  project: Project
  updateProject?: (updateProject: Project) => void
  saveProject?: any
  saving?: boolean
}

type ProjectContextProps = {
  project: Project
  updateProject: (updateProject: Project) => void
  saveProject: any
  mobileView: MobileViews
  setMobileView: (view: MobileViews) => void
  isProjectOwner: boolean
  saving?: boolean
}

const defaultProjectContext = {
  mobileView: MobileViews.description,
  setMobileView(view: MobileViews) {},
  project: {} as Project,
  updateProject() {},
  saveProject() {},
  isProjectOwner: false,
  saving: false,
}

export const ProjectContext = createContext<ProjectContextProps>(
  defaultProjectContext,
)

export const useProjectContext = () => useContext(ProjectContext)

export const ProjectProvider = ({
  project,
  updateProject = () => {},
  saveProject = () => {},
  saving,
  children,
}: { children: React.ReactNode } & ProjectState) => {
  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  )
  const [isProjectOwner, setIsProjectOwner] = useState(false)
  const { user } = useAuthContext()

  useEffect(() => {
    if (project.id && project.owners[0].user.id === user.id) {
      setIsProjectOwner(true)
    } else {
      setIsProjectOwner(false)
    }
  }, [project.id, user])

  return (
    <ProjectContext.Provider
      value={{
        mobileView,
        setMobileView,
        project,
        isProjectOwner,
        updateProject,
        saveProject,
        saving,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
