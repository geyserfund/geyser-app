import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUnlock } from 'react-icons/fa'
import { MdAdd, MdModeEdit } from 'react-icons/md'

import { CardLayout } from '../../../../../../../components/layouts'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { ProjectGoal } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { useProjectContext } from '../../../../../context'
import { useProjectGoals } from '../../../hooks/useProjectGoals'
import { GoalCompleted, GoalInProgress } from '../components'
import { GoalModal } from '../components/GoalModal'

export const Goals = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectContext()
  const [editMode, setEditMode] = useState(false)
  const isMobile = useMobileMode()

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [goalModalData, setGoalModalData] = useState<ProjectGoal | null>(null)

  const { inProgressGoals, completedGoals } = useProjectGoals()

  if (!project) {
    return null
  }

  const handleGoalModalOpen = (goal: ProjectGoal | null) => {
    setGoalModalData(goal)
    setIsGoalModalOpen(true)
  }

  const handleGoalModalClose = () => {
    setIsGoalModalOpen(false)
    setGoalModalData(null)
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const renderInProgressGoals = () => {
    if (inProgressGoals && inProgressGoals.length > 0) {
      return inProgressGoals.map((goal: ProjectGoal) => {
        if (goal) {
          return <GoalInProgress key={goal.id} goal={goal} isEditing={editMode} onOpenGoalModal={handleGoalModalOpen} />
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  const renderCompletedGoals = () => {
    if (completedGoals && completedGoals.length > 0) {
      return completedGoals.map((goal: ProjectGoal) => {
        if (goal) {
          return <GoalCompleted key={goal.id} goal={goal} isEditing={editMode} onOpenGoalModal={handleGoalModalOpen} />
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
            {isProjectOwner && editMode && (
              <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                <Button
                  variant="primary"
                  padding="8px 10px"
                  width={isMobile ? '100%' : '192px'}
                  size="md"
                  borderRadius="8px"
                  mt={5}
                  mb={5}
                  rightIcon={<MdAdd fontSize="18px" />}
                  onClick={() => handleGoalModalOpen(null)}
                >
                  {t('Add Goal')}
                </Button>
              </Box>
            )}
          </>
        )}
        {completedGoals && completedGoals?.length > 0 && (
          <>
            <TitleDivider badge={completedGoals?.length}>{t('Completed Goals')}</TitleDivider>
            <VStack alignItems="flex-start" gap={30} width="100%">
              {renderCompletedGoals()}
            </VStack>
          </>
        )}
      </CardLayout>

      <GoalModal isOpen={isGoalModalOpen} onClose={handleGoalModalClose} projectId={project?.id} goal={goalModalData} />
    </>
  )
}
