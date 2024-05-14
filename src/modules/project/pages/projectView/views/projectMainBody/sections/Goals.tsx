import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUnlock } from 'react-icons/fa'
import { MdAdd, MdModeEdit } from 'react-icons/md'

import { CardLayout } from '../../../../../../../components/layouts'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { ProjectGoal } from '../../../../../../../types'
import { useProjectContext } from '../../../../../context'
import { useProjectGoals } from '../../../hooks/useProjectGoals'
import { GoalCompleted, GoalInProgress } from '../components'
import { GoalDeleteModal } from '../components/GoalDeleteModal'
import { GoalModal } from '../components/GoalModal'

export const Goals = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner, refetch: refetchProject } = useProjectContext()
  const [editMode, setEditMode] = useState(false)

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [goalModalData, setGoalModalData] = useState<ProjectGoal | null>(null)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState<ProjectGoal | null>(null)

  const { inProgressGoals, completedGoals, refetch } = useProjectGoals()

  if (!project) {
    return null
  }

  const handleCreateGoalModalOpen = () => {
    setGoalModalData(null)
    setIsGoalModalOpen(true)
  }

  const handleEditGoalModalOpen = (goal: ProjectGoal | null) => {
    setGoalModalData(goal)
    setIsGoalModalOpen(true)
  }

  const handleGoalModalClose = () => {
    setGoalModalData(null)
    setIsGoalModalOpen(false)
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const openDeleteModal = (goal: ProjectGoal) => {
    setGoalToDelete(goal)
    setIsConfirmDeleteOpen(true)
    setIsGoalModalOpen(false)
  }

  const closeDeleteModal = () => {
    setIsConfirmDeleteOpen(false)
    setGoalToDelete(null)
  }

  const renderInProgressGoals = () => {
    if (inProgressGoals && inProgressGoals.length > 0) {
      return inProgressGoals.map((goal: ProjectGoal) => {
        if (goal) {
          return (
            <GoalInProgress key={goal.id} goal={goal} isEditing={editMode} onOpenGoalModal={handleEditGoalModalOpen} />
          )
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  const renderCompletedGoals = () => {
    if (completedGoals && completedGoals.length > 0) {
      return completedGoals.map((goal: ProjectGoal) => {
        if (goal) {
          return (
            <GoalCompleted key={goal.id} goal={goal} isEditing={editMode} onOpenGoalModal={handleEditGoalModalOpen} />
          )
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  const renderRightAction = () => {
    if (isProjectOwner && editMode) {
      return (
        <IconButtonComponent
          aria-label="is-editing-goal"
          noBorder
          variant="solid"
          onClick={handleEditMode}
          icon={<FaUnlock fontSize="16px" />}
        />
      )
    }

    if (isProjectOwner) {
      return (
        <IconButtonComponent
          aria-label="edit-goal"
          noBorder
          variant="ghost"
          onClick={handleEditMode}
          icon={<MdModeEdit fontSize="16px" />}
        />
      )
    }
  }

  if (inProgressGoals?.length === 0 && completedGoals?.length === 0) {
    return null
  }

  return (
    <>
      <CardLayout flexDirection="column" width="100%" alignItems="flex-start" spacing="25px" mobileDense>
        {inProgressGoals && inProgressGoals?.length > 0 && (
          <>
            <TitleDivider badge={inProgressGoals?.length} rightAction={renderRightAction()}>
              {t('Goals')}
            </TitleDivider>
            <VStack alignItems="flex-start" gap={30} width="100%">
              {renderInProgressGoals()}
            </VStack>
          </>
        )}
        {completedGoals && completedGoals?.length > 0 && (
          <>
            <TitleDivider badge={completedGoals?.length} rightAction={!inProgressGoals && renderRightAction()}>
              {t('Completed Goals')}
            </TitleDivider>
            <VStack alignItems="flex-start" gap={30} width="100%">
              {renderCompletedGoals()}
            </VStack>
          </>
        )}
        {isProjectOwner && editMode && (
          <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Button
              variant="primary"
              padding="8px 10px"
              width={{ base: '100%', lg: '192px' }}
              size="md"
              borderRadius="8px"
              mt={5}
              mb={5}
              rightIcon={<MdAdd fontSize="18px" />}
              onClick={handleCreateGoalModalOpen}
            >
              {t('Add Goal')}
            </Button>
          </Box>
        )}
      </CardLayout>

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={handleGoalModalClose}
        projectId={project?.id}
        openDeleteModal={openDeleteModal}
        goal={goalModalData || null}
        refetch={refetch}
      />

      <GoalDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={closeDeleteModal}
        goal={goalToDelete}
        refetch={refetch}
        refetchProject={refetchProject}
      />
    </>
  )
}
