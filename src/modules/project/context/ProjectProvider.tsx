import { createContext, PropsWithChildren, useContext } from 'react'

import { useInitProject, UseInitProjectReturn } from './hooks/useInitProject'

type ProjectState = {
  /** Don't use together with projectName prop */
  projectId?: number
  /** Don't use together with projectId prop */
  projectName?: string
}

type ProjectContextProps = UseInitProjectReturn

export const ProjectContext = createContext<ProjectContextProps | null>(null)

export const useProjectContext = () => {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProjectContext must be usd inside ProjectProvider')
  }

  return context
}

export const ProjectProvider = ({ projectId, projectName, children }: PropsWithChildren<ProjectState>) => {
  const { refetchProject, refetchCompletedGoals, refetchInProgressGoals, refetchProjectWallet, refetchProjectRewards } =
    useInitProject({
      projectId,
      projectName,
      initializeGoals: true,
      initializeWallet: true,
    })

  return (
    <ProjectContext.Provider
      value={{
        refetchProject,
        refetchCompletedGoals,
        refetchInProgressGoals,
        refetchProjectWallet,
        refetchProjectRewards,
      }}
    >
      {children}
      {/* {project && isProjectOwner && (
        <>
          <ProjectCreatorModal {...creatorModal} />
          <GoalModal
            {...goalsModal}
            goal={currentGoal}
            projectId={project.id}
            refetch={goalsRefetch}
            openDeleteModal={onGoalDeleteModalOpen}
          />
          <GoalDeleteModal {...goalDeleteModal} goal={currentGoal} refetch={goalsRefetch} />
        </>
      )} */}
    </ProjectContext.Provider>
  )
}
