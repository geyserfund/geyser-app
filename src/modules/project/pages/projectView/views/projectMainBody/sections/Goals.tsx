import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUnlock } from 'react-icons/fa'
import { MdAdd, MdModeEdit } from 'react-icons/md'

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
  const [items, setItems] = useState(goals.inProgressGoals)

  useEffect(() => {
    const x = window.scrollX
    const y = window.scrollY
    setItems(goals.inProgressGoals)

    window.scrollTo(x, y)
  }, [goals.inProgressGoals])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items?.findIndex((item: ProjectGoal) => item.id === active.id)
        const newIndex = items?.findIndex((item: ProjectGoal) => item.id === over.id)
        return arrayMove(items ?? [], oldIndex ?? 0, newIndex ?? 0)
      })
    }
  }

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

  const renderCompletedGoals = () => {
    if (hasCompletedGoals) {
      return goals.completedGoals?.map((goal: ProjectGoal) => {
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
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items ?? []} strategy={verticalListSortingStrategy}>
                  {items?.map((goal, index) => (
                    <SortableItem
                      key={goal.id}
                      goal={goal}
                      editMode={editMode}
                      handleEditGoalModalOpen={handleEditGoalModalOpen}
                    />
                  ))}
                </SortableContext>
              </DndContext>
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

const SortableItem = ({
  key,
  goal,
  editMode,
  handleEditGoalModalOpen,
}: {
  key: string
  goal: ProjectGoal
  editMode: boolean
  handleEditGoalModalOpen: (goal: ProjectGoal) => void
}) => {
  const { listeners, setNodeRef, transform, transition } = useSortable({ id: goal.id.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    width: '100%',
    cursor: 'default',
  }

  return (
    <div key={key} ref={setNodeRef} style={style}>
      <GoalInProgress
        key={goal.id}
        goal={goal}
        isEditing={editMode}
        onOpenGoalModal={handleEditGoalModalOpen}
        listeners={listeners}
      />
    </div>
  )
}
