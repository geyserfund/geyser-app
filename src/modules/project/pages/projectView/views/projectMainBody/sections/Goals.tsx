import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUnlock } from 'react-icons/fa'
import { MdAdd, MdModeEdit } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { CardLayout } from '../../../../../../../components/layouts'
import { IconButtonComponent } from '../../../../../../../components/ui'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { ProjectGoal } from '../../../../../../../types'
import { useProjectContext } from '../../../../../context'
import { GoalCompleted, GoalInProgress } from '../components'

export const Goals = () => {
  const { t } = useTranslation()
  const { isProjectOwner, goals } = useProjectContext()
  const [editMode, setEditMode] = useState(false)

  const handleCreateGoalModalOpen = () => {
    goals.onGoalsModalOpen()
  }

  const handleEditGoalModalOpen = (goal: ProjectGoal) => {
    goals.onGoalsModalOpen(goal)
  }

  const hasInProgressGoals = goals.inProgressGoals && goals.inProgressGoals.length > 0
  const hasCompletedGoals = goals.completedGoals && goals.completedGoals.length > 0

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const renderInProgressGoals = () => {
    if (hasInProgressGoals) {
      return goals.inProgressGoals?.map((goal: ProjectGoal) => {
        if (goal) {
          return (
            <GoalInProgress key={uuidv4()} goal={goal} isEditing={editMode} onOpenGoalModal={handleEditGoalModalOpen} />
          )
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  const renderCompletedGoals = () => {
    if (hasCompletedGoals) {
      return goals.completedGoals?.map((goal: ProjectGoal) => {
        if (goal) {
          return (
            <GoalCompleted key={uuidv4()} goal={goal} isEditing={editMode} onOpenGoalModal={handleEditGoalModalOpen} />
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

  if (!hasInProgressGoals && !hasCompletedGoals) {
    return null
  }

  return (
    <>
      <CardLayout flexDirection="column" width="100%" alignItems="flex-start" gap={'30px'} mobileDense>
        {hasInProgressGoals && (
          <Box display="flex" flexDirection="column" gap={'20px'} width="100%">
            <Box width="100%" minHeight="50px" py={'10px'}>
              <TitleDivider badge={goals.inProgressGoals?.length} rightAction={renderRightAction()}>
                {t('Goals')}
              </TitleDivider>
            </Box>

            <VStack alignItems="flex-start" gap={'20px'} width="100%">
              {renderInProgressGoals()}
            </VStack>
          </Box>
        )}
        {hasCompletedGoals && (
          <Box display="flex" flexDirection="column" gap={'20px'} width="100%">
            <Box width="100%" minHeight="50px" py={'10px'}>
              <TitleDivider
                badge={goals.completedGoals?.length}
                rightAction={!hasInProgressGoals && renderRightAction()}
              >
                {t('Completed Goals')}
              </TitleDivider>
            </Box>
            <VStack alignItems="flex-start" gap={'20px'} width="100%">
              {renderCompletedGoals()}
            </VStack>
          </Box>
        )}
        {((isProjectOwner && editMode) || (!hasInProgressGoals && hasCompletedGoals && isProjectOwner)) && (
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
    </>
  )
}
