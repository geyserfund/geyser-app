import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../constants'
import { useProjectState } from '../hooks/graphqlState'
import { useModal } from '../hooks/useModal'
import {
  MilestoneAdditionModal,
  RewardAdditionModal,
} from '../pages/projectView/projectMainBody/components'
import {
  ProjectFragment,
  ProjectMilestone,
  ProjectRewardForCreateUpdateFragment,
} from '../types'
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
  isProjectOwner: boolean | undefined
  loading?: boolean
  saving?: boolean
  isDirty?: boolean
  error: any
  onRewardsModalOpen(props?: {
    reward?: ProjectRewardForCreateUpdateFragment
  }): void
  onMilestonesModalOpen(): void
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

export const ProjectProvider = ({
  projectId,
  children,
}: { children: React.ReactNode } & ProjectState) => {
  const navigate = useNavigate()
  const { setNavData } = useNavContext()
  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  )
  const [isProjectOwner, setIsProjectOwner] = useState<boolean | undefined>()
  const { user } = useAuthContext()

  const milestonesModal = useModal()
  const rewardsModal = useModal<{
    reward?: ProjectRewardForCreateUpdateFragment
  }>()

  const {
    error,
    loading,
    project,
    updateProject,
    saveProject,
    isDirty,
    saving,
  } = useProjectState(projectId, {
    fetchPolicy: 'network-only',
    onError() {
      navigate(getPath('notFound'))
    },
    onCompleted(data) {
      if (!data?.project) {
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

  const onRewardSubmit = (
    reward: ProjectRewardForCreateUpdateFragment,
    isEdit: boolean,
  ) => {
    if (!project) {
      return
    }

    if (isEdit) {
      const newRewards = project.rewards?.map((pr) => {
        if (pr.id === reward.id) {
          return reward
        }

        return pr
      })

      updateProject({ rewards: newRewards })

      return
    }

    const newRewards = project.rewards || []

    updateProject({ rewards: [...newRewards, reward] })
  }

  const onMilestonesSubmit = (newMilestones: ProjectMilestone[]) => {
    updateProject({ milestones: newMilestones })
    milestonesModal.onClose()
  }

  return (
    <ProjectContext.Provider
      value={{
        mobileView,
        setMobileView,
        project,
        isProjectOwner,
        updateProject,
        saveProject,
        isDirty,
        saving,
        error,
        loading,
        onRewardsModalOpen: rewardsModal.onOpen,
        onMilestonesModalOpen: milestonesModal.onOpen,
      }}
    >
      {children}
      {project && isProjectOwner && (
        <>
          <MilestoneAdditionModal
            {...milestonesModal}
            onSubmit={onMilestonesSubmit}
            project={project}
          />
          <RewardAdditionModal
            {...rewardsModal}
            isSatoshi={false}
            onSubmit={onRewardSubmit}
            project={project}
          />
        </>
      )}
    </ProjectContext.Provider>
  )
}
