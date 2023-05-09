import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../constants'
import { useProjectState } from '../hooks/graphqlState'
import { ProjectFragment } from '../types'
import { useAuthContext } from './auth'
import { useNavContext } from './nav'

export enum MobileViews {
  description = 'description',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
}

type ProjectState = {
  projectId?: string | number
}

type ProjectContextProps = {
  project: ProjectFragment | null
  updateProject: (updateProject: Partial<ProjectFragment>) => void
  saveProject: () => Promise<void>
  mobileView: MobileViews
  setMobileView: (view: MobileViews) => void
  isProjectOwner: boolean
  loading?: boolean
  error: any
}

const defaultProjectContext = {
  mobileView: MobileViews.description,
  setMobileView(_view: MobileViews) {},
  project: null,
  updateProject() {},
  async saveProject() {},
  isProjectOwner: false,
  loading: false,
  error: null,
}

export const ProjectContext = createContext<ProjectContextProps>(
  defaultProjectContext,
)

export const useProjectContext = () => useContext(ProjectContext)

export const ProjectProvider = ({
  projectId,
  children,
}: { children: React.ReactNode } & ProjectState) => {
  const navigate = useNavigate()
  const { setNavData } = useNavContext()
  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  )
  const [isProjectOwner, setIsProjectOwner] = useState(false)
  const { user } = useAuthContext()

  const { error, loading, project, updateProject, saveProject } =
    useProjectState(projectId || '', {
      skip: !projectId,

      onError() {
        console.log('ONEERROR')
        navigate(getPath('notFound'))
      },

      onCompleted(data) {
        if (!data?.project) {
          console.log('ON NO DATA')
          navigate(getPath('notFound'))
          return
        }

        const { project } = data

        setNavData({
          projectName: project.name,
          projectTitle: project.title,
          projectPath: getPath('project', project.name),
          projectOwnerIDs:
            project.owners.map((ownerInfo) => {
              return Number(ownerInfo.user.id || -1)
            }) || [],
        })
      },
    })

  useEffect(() => {
    if (!project) {
      return
    }

    if (project.id && project.owners[0]?.user.id === user.id) {
      setIsProjectOwner(true)
    } else {
      setIsProjectOwner(false)
    }
  }, [project, user])

  return (
    <ProjectContext.Provider
      value={{
        mobileView,
        setMobileView,
        project,
        isProjectOwner,
        updateProject,
        saveProject,
        error,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
