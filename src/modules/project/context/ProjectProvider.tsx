import { captureException } from '@sentry/react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getPath, PathName } from '../../../constants'
import { useAuthContext } from '../../../context/auth'
import { useNavContext } from '../../../context/nav'
import { useProjectState } from '../../../hooks/graphqlState'
import { useModal } from '../../../hooks/useModal'
import {
  ProjectFragment,
  useProjectUnplublishedEntriesQuery,
  UserMeFragment,
  useWalletLimitQuery,
  WalletLimitsFragment,
} from '../../../types'
// import { MilestoneAdditionModal } from '../pages/projectView/views/projectMainBody/components'
import { ProjectCreatorModal } from '../pages/projectView/views/projectNavigation/components/ProjectCreatorModal'

export enum MobileViews {
  description = 'description',
  rewards = 'rewards',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
  entries = 'entries',
  goals = 'goals',
  insights = 'insights',
  contributors = 'contributors',
  manageRewards = 'manage-rewards',
  createReward = 'create-reward',
  editReward = 'edit-reward',
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
  isProjectOwner: boolean | undefined
  loading?: boolean
  saving?: boolean
  isDirty?: boolean
  error: any
  onMilestonesModalOpen(): void
  onCreatorModalOpen(): void
  refetch: any
  walletLimits: WalletLimitsFragment
}

export const ProjectContext = createContext<ProjectContextProps | null>(null)

export const useProjectContext = ({
  ownerAccessOnly = false,
}: {
  ownerAccessOnly?: boolean
} = {}) => {
  const navigate = useNavigate()
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProjectContext must be usd inside ProjectProvider')
  }

  useEffect(() => {
    if (ownerAccessOnly && context.isProjectOwner === false) {
      navigate(getPath('notAuthorized'))
    }
  }, [context, navigate, ownerAccessOnly])

  return context
}

export const ProjectProvider = ({ projectId, children }: { children: React.ReactNode } & ProjectState) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { setNavData } = useNavContext()

  const [mobileView, setMobileView] = useState<MobileViews>(MobileViews.description)
  const [isProjectOwner, setIsProjectOwner] = useState<boolean | undefined>()

  const { user } = useAuthContext()

  const creatorModal = useModal()
  const milestonesModal = useModal()
  const { error, project, loading, updateProject, saveProject, isDirty, saving, refetch } = useProjectState(projectId, {
    fetchPolicy: 'network-only',
    onError() {
      captureException(error, {
        tags: {
          'not-found': 'projectGet',
          'error.on': 'query error',
        },
      })
      navigate(getPath('projectNotFound'))
    },
    onCompleted(data) {
      if (!data?.projectGet) {
        captureException(data, {
          tags: {
            'not-found': 'projectGet',
            'error.on': 'invalid data',
          },
        })
        navigate(getPath('projectNotFound'))
        return
      }

      const { projectGet: project } = data

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

  const [walletLimits, setWalletLimits] = useState<WalletLimitsFragment>({} as WalletLimitsFragment)

  useProjectUnplublishedEntriesQuery({
    variables: {
      where: { name: project?.name },
    },
    skip: !project || !isProjectOwner,
    onCompleted(data) {
      if (data.projectGet && updateProject) {
        updateProject({
          ...data.projectGet,
          entries: project ? [...project.entries, ...data.projectGet.entries] : data.projectGet.entries,
        })
      }
    },
  })

  useWalletLimitQuery({
    variables: {
      getWalletId: project?.wallets[0]?.id,
    },
    skip: !project || !project.wallets[0] || !project.wallets[0].id,
    onCompleted(data) {
      if (data.getWallet.limits) {
        setWalletLimits(data.getWallet.limits)
      }
    },
  })

  const updateProjectOwner = useCallback((project: ProjectFragment, user: UserMeFragment) => {
    if (project.id && project.owners[0]?.user.id === user.id) {
      setIsProjectOwner(true)
    } else {
      setIsProjectOwner(false)
    }
  }, [])

  useEffect(() => {
    if (!project || !user) {
      return
    }

    updateProjectOwner(project, user)
  }, [project, user, updateProjectOwner])

  useEffect(() => {
    const view = getViewFromPath(location.pathname)
    if (view) {
      setMobileView(view)
    }
  }, [location.pathname])

  // const onMilestonesSubmit = (newMilestones: ProjectMilestone[]) => {
  //   updateProject({ milestones: newMilestones })
  //   milestonesModal.onClose()
  // }

  return (
    <ProjectContext.Provider
      value={{
        mobileView,
        setMobileView,
        project,
        walletLimits,
        isProjectOwner,
        updateProject,
        saveProject,
        isDirty,
        saving,
        error,
        loading,
        refetch,
        onCreatorModalOpen: creatorModal.onOpen,
        onMilestonesModalOpen: milestonesModal.onOpen,
      }}
    >
      {children}
      {project && isProjectOwner && (
        <>
          <ProjectCreatorModal {...creatorModal} />
          {/* <MilestoneAdditionModal {...milestonesModal} onSubmit={onMilestonesSubmit} project={project} /> */}
        </>
      )}
    </ProjectContext.Provider>
  )
}

const getViewFromPath = (path: string) => {
  if (path.includes(PathName.projectManageRewards)) {
    if (path.includes(PathName.projectCreateReward)) {
      return MobileViews.createReward
    }

    if (path.includes(PathName.projectEditReward)) {
      return MobileViews.editReward
    }

    return MobileViews.manageRewards
  }

  if (path.includes(PathName.projectRewards)) {
    return MobileViews.rewards
  }

  if (path.includes(PathName.projectGoals)) {
    return MobileViews.goals
  }

  if (path.includes(PathName.projectEntries)) {
    return MobileViews.entries
  }

  if (path.includes(PathName.projectInsights)) {
    return MobileViews.insights
  }

  if (path.includes(PathName.projectContributors)) {
    return MobileViews.contributors
  }

  return ''
}
