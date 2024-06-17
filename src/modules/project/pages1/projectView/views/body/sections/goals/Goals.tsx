import { Box, Button, Text, useTheme, VStack } from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUnlock } from 'react-icons/fa'
import { MdAdd, MdModeEdit } from 'react-icons/md'

import { IconButtonComponent } from '../../../../../../../../components/ui'
import { TitleDivider } from '../../../../../../../../components/ui/TitleDivider'
import { CardLayout } from '../../../../../../../../shared/components/layouts'
import { ProjectGoal, useProjectGoalOrderingUpdateMutation } from '../../../../../../../../types'
import { useProjectContext } from '../../../../../../context'
import { useProjectDefaultGoal } from '../../../../../../pages/projectView/views/projectActivityPanel/screens/info/hooks/useProjectDefaultGoal'
import { useGoalsModal } from '../../../../hooks/useGoalsModal'
import { useGoalsAtom, useProjectAtom } from '../../../../hooks/useProjectAtom'
import { GoalCompleted, GoalInProgress } from './components'

export const Goals = () => {
  const { t } = useTranslation()
  const { refetchInProgressGoals } = useProjectContext()
  const { isProjectOwner, project } = useProjectAtom()

  const { inProgressGoals, completedGoals } = useGoalsAtom()

  const { onGoalModalOpen } = useGoalsModal()

  const { priorityGoal } = useProjectDefaultGoal({
    defaultGoalId: project?.defaultGoalId,
    balanceUsdCent: project?.balanceUsdCent ?? 0,
    inProgressGoals,
  })

  const [updateProjectGoalOrdering] = useProjectGoalOrderingUpdateMutation({
    onCompleted() {
      refetchInProgressGoals()
    },
  })

  const [editMode, setEditMode] = useState(false)
  const [items, setItems] = useState(inProgressGoals)
  const [activeId, setActiveId] = useState(null)
  const [initialItemsOrder, setInitialItemsOrder] = useState<any[] | undefined>([])

  useEffect(() => {
    const x = window.scrollX
    const y = window.scrollY
    setItems(inProgressGoals)

    window.scrollTo(x, y)
  }, [inProgressGoals])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items?.findIndex((item: ProjectGoal) => item.id === active.id)
        const newIndex = items?.findIndex((item: ProjectGoal) => item.id === over.id)
        return arrayMove(items ?? [], oldIndex ?? 0, newIndex ?? 0)
      })
    }

    setActiveId(null)
  }

  const handleCreateGoalModalOpen = () => {
    onGoalModalOpen()
  }

  const handleEditGoalModalOpen = (goal: ProjectGoal) => {
    onGoalModalOpen(goal)
  }

  const hasInProgressGoals = inProgressGoals && inProgressGoals.length > 0
  const hasCompletedGoals = completedGoals && completedGoals.length > 0

  const handleEditMode = async () => {
    if (editMode) {
      const projectGoalIdsOrder = items?.map((item) => Number(item.id))

      if (!compareProjectGoalOrder(initialItemsOrder, projectGoalIdsOrder)) {
        updateProjectGoalOrdering({
          variables: { input: { projectId: project.id, projectGoalIdsOrder } },
        })
      }
    } else {
      setInitialItemsOrder(items?.map((item) => Number(item.id)))
    }

    setEditMode(!editMode)
  }

  const renderCompletedGoals = () => {
    if (hasCompletedGoals) {
      return completedGoals?.map((goal: ProjectGoal) => {
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
              <TitleDivider badge={inProgressGoals?.length} rightAction={renderRightAction()}>
                {t('Goals')}
              </TitleDivider>
            </Box>

            <VStack alignItems="flex-start" gap={'20px'} width="100%">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement]}
              >
                <SortableContext items={items ?? []} strategy={verticalListSortingStrategy}>
                  {items?.map((goal) => (
                    <SortableItem
                      key={goal.id}
                      goal={goal}
                      editMode={editMode}
                      handleEditGoalModalOpen={handleEditGoalModalOpen}
                      isPriorityGoal={goal.id === priorityGoal?.id}
                    />
                  ))}
                </SortableContext>
                <DragOverlay>
                  {activeId ? (
                    <PresentationalGoalItem goal={items?.find((item) => item.id === activeId) ?? ({} as ProjectGoal)} />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </VStack>
          </Box>
        )}
        {hasCompletedGoals && (
          <Box display="flex" flexDirection="column" gap={'20px'} width="100%">
            <Box width="100%" minHeight="50px" py={'10px'}>
              <TitleDivider badge={completedGoals?.length} rightAction={!hasInProgressGoals && renderRightAction()}>
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
  isPriorityGoal,
}: {
  key: string
  goal: ProjectGoal
  editMode: boolean
  handleEditGoalModalOpen: (goal: ProjectGoal) => void
  isPriorityGoal: boolean
}) => {
  const { listeners, setNodeRef, transform, transition, attributes, isDragging } = useSortable({
    id: goal.id.toString(),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    width: '100%',
    cursor: 'default',
    zIndex: isDragging ? 900 : 'auto',
    backgroundColor: 'neutral.0',
    opacity: isDragging ? 0 : 1,
  }

  return (
    <Box key={key} ref={setNodeRef} sx={style} {...attributes}>
      <GoalInProgress
        key={goal.id}
        goal={goal}
        isEditing={editMode}
        onOpenGoalModal={handleEditGoalModalOpen}
        listeners={listeners}
        isPriorityGoal={isPriorityGoal}
      />
    </Box>
  )
}

const compareProjectGoalOrder = (initialOrder: any, currentOrder: any) => {
  for (let i = 0; i < initialOrder.length; i++) {
    if (initialOrder[i] !== currentOrder[i]) return false
  }

  return true
}

const PresentationalGoalItem = ({ goal }: { goal: ProjectGoal }) => {
  const theme = useTheme()
  const boxShadowColor = theme.colors.neutral[0]
  return (
    <Box display="flex" boxShadow={`0 -50px 30px -4px ${boxShadowColor}, 0 50px 30px -4px ${boxShadowColor}`}>
      <GoalInProgress goal={goal} isEditing={true} onOpenGoalModal={() => {}} listeners={[]} />
    </Box>
  )
}
