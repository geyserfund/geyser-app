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
}

type ProjectContextProps = {
  project: Project
  updateProject: (updateProject: Project) => void
  mobileView: MobileViews
  setMobileView: (view: MobileViews) => void
  isProjectOwner: boolean
}

const defaultProjectContext = {
  mobileView: MobileViews.description,
  setMobileView(view: MobileViews) {},
  project: {} as Project,
  updateProject() {},
  isProjectOwner: false,
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
  const [isProjectOwner, setIsProjectOwner] = useState(false)
  const { user } = useAuthContext()

  useEffect(() => {
    if (project.id && project.owners[0].user.id === user.id) {
      setIsProjectOwner(true)
    } else {
      setIsProjectOwner(false)
    }
  }, [project.id, user])

  const handleUpdateProject = (value: Project) => {
    if (updateProject) {
      updateProject(value)
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        mobileView,
        setMobileView,
        project,
        isProjectOwner,
        updateProject: handleUpdateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
