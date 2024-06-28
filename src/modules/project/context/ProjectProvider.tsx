import { createContext, PropsWithChildren, useContext } from 'react'

import { useInitProject, UseInitProjectProps, UseInitProjectReturn } from './hooks/useInitProject'

type ProjectState = UseInitProjectProps

type ProjectContextProps = UseInitProjectReturn

export const ProjectContext = createContext<ProjectContextProps | null>(null)

export const useProjectContext = () => {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProjectContext must be usd inside ProjectProvider')
  }

  return context
}

export const ProjectProvider = ({ children, ...props }: PropsWithChildren<ProjectState>) => {
  const {
    queryProject,
    queryCompletedGoals,
    queryInProgressGoals,
    queryProjectWallet,
    queryProjectRewards,
    queryProjectEntries,
    queryUnpublishedProjectEntries,
    queryProjectDetails,
  } = useInitProject({
    ...props,
  })

  return (
    <ProjectContext.Provider
      value={{
        queryProject,
        queryCompletedGoals,
        queryInProgressGoals,
        queryProjectWallet,
        queryProjectRewards,
        queryProjectEntries,
        queryUnpublishedProjectEntries,
        queryProjectDetails,
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
