import { captureException } from '@sentry/react'
import { useAtomValue } from 'jotai'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useGetHistoryRoute } from '../config'
import { routeMatchForProjectPageAtom } from '../config/routes/privateRoutesAtom'
import { getPath, PathName } from '../constants'
import {
  useFundingFlow,
  UseFundingFlowReturn,
  useFundingFormState,
  UseFundingFormStateReturn,
} from '../hooks'
import { useProjectState } from '../hooks/graphqlState'
import { useModal } from '../hooks/useModal'
import {
  MilestoneAdditionModal,
  RewardAdditionModal,
} from '../pages/projectView/projectMainBody/components'
import { ProjectCreatorModal } from '../pages/projectView/projectNavigation/components/ProjectCreatorModal'
import {
  ProjectFragment,
  ProjectMilestone,
  ProjectRewardForCreateUpdateFragment,
} from '../types'
import { useAuthContext } from './auth'
import { useNavContext } from './nav'

export enum MobileViews {
  description = 'description',
  rewards = 'rewards',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
  overview = 'overview',
  entries = 'entries',
  milestones = 'milestones',
  insights = 'insights',
  contributors = 'contributors',
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
  fundForm: UseFundingFormStateReturn
  fundingFlow: UseFundingFlowReturn
  isDirty?: boolean
  error: any
  onRewardsModalOpen(props?: {
    reward?: ProjectRewardForCreateUpdateFragment
  }): void
  onMilestonesModalOpen(): void
  onCreatorModalOpen(): void
  refetch: any
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
  const params = useParams<{ projectId: string }>()
  const location = useLocation()
  const routeMatchForProjectPage = useAtomValue(routeMatchForProjectPageAtom)
  const historyRoutes = useGetHistoryRoute()

  const lastRoute = historyRoutes[historyRoutes.length - 2] || ''

  const { setNavData } = useNavContext()

  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  )
  const [isProjectOwner, setIsProjectOwner] = useState<boolean | undefined>()
  const { user } = useAuthContext()

  const creatorModal = useModal()
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
    refetch,
  } = useProjectState(projectId, {
    fetchPolicy: 'network-only',
    onError(error) {
      captureException(error, {
        tags: {
          'not-found': 'projectGet',
          'error.on': 'query error',
        },
      })
      navigate(getPath('notFound'))
    },
    onCompleted(data) {
      if (!data?.projectGet) {
        captureException(data, {
          tags: {
            'not-found': 'projectGet',
            'error.on': 'invalid data',
          },
        })
        navigate(getPath('notFound'))
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

  const fundingFlow = useFundingFlow()

  const fundForm = useFundingFormState({
    rewards: project ? project.rewards : undefined,
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

  const shouldGoToOverviewPage = useMemo(
    () =>
      isProjectOwner &&
      params.projectId &&
      routeMatchForProjectPage &&
      !lastRoute.includes('launch') &&
      !(lastRoute.includes('project') && lastRoute.includes(params.projectId)),
    [params.projectId, isProjectOwner, routeMatchForProjectPage, lastRoute],
  )

  useEffect(() => {
    if (shouldGoToOverviewPage) {
      navigate(getPath('projectOverview', `${params.projectId}`))
    }
  }, [params.projectId, navigate, shouldGoToOverviewPage])

  useEffect(() => {
    const view = getViewFromPath(location.pathname)
    if (view) {
      setMobileView(view)
    }
  }, [location.pathname])

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
        fundForm,
        fundingFlow,
        refetch,
        onCreatorModalOpen: creatorModal.onOpen,
        onRewardsModalOpen: rewardsModal.onOpen,
        onMilestonesModalOpen: milestonesModal.onOpen,
      }}
    >
      {children}
      {project && isProjectOwner && (
        <>
          <ProjectCreatorModal {...creatorModal} />
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

const getViewFromPath = (path: string) => {
  if (path.includes(PathName.projectRewards)) {
    return MobileViews.rewards
  }

  if (path.includes(PathName.projectMilestones)) {
    return MobileViews.milestones
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

  if (path.includes(PathName.projectOverview)) {
    return MobileViews.overview
  }

  return ''
}
