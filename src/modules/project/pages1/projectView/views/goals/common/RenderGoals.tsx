import { Box, Divider, HStack, Text, useTheme, VStack } from '@chakra-ui/react'
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
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useProjectGoalsAPI } from '@/modules/project/API/useProjectGoalsAPI'
import { inProgressGoalsAtom } from '@/modules/project/state/goalsAtom'
import { getPath } from '@/shared/constants'

import { CardLayout, SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { ProjectGoalFragment, useProjectGoalOrderingUpdateMutation } from '../../../../../../../types'
import { useGoalsAtom, useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { useGoalsModal } from '../../../hooks/useGoalsModal'
import { useProjectDefaultGoal } from '../../body/hooks/useProjectDefaultGoal'
import { GoalCompleted, GoalInProgress } from '../components'

export const RenderGoals = () => {
  const { project, loading: projectLoading } = useProjectAtom()

  const navigate = useNavigate()

  const { queryInProgressGoals, queryCompletedGoals } = useProjectGoalsAPI(true)

  const { inProgressGoals, completedGoals } = useGoalsAtom()
  const { onGoalModalOpen, isGoalinEditMode } = useGoalsModal()

  const setInProgressGoals = useSetAtom(inProgressGoalsAtom)

  const { priorityGoal } = useProjectDefaultGoal({
    defaultGoalId: project?.defaultGoalId,
    balanceUsdCent: project?.balanceUsdCent ?? 0,
    inProgressGoals,
  })

  const [updateProjectGoalOrdering] = useProjectGoalOrderingUpdateMutation({
    onCompleted(data) {
      if (data.projectGoalOrderingUpdate) {
        setInProgressGoals(data.projectGoalOrderingUpdate)
      }
    },
  })

  const [items, setItems] = useState(inProgressGoals)
  const [activeId, setActiveId] = useState(null)

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

  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items?.findIndex((item: ProjectGoalFragment) => item.id === active.id)
      const newIndex = items?.findIndex((item: ProjectGoalFragment) => item.id === over.id)

      const newItems = arrayMove(items ?? [], oldIndex ?? 0, newIndex ?? 0)

      const initialGoalsOrder = items?.map((item) => Number(item.id))
      const newGoalsOrder = newItems?.map((item) => Number(item.id))

      if (!compareProjectGoalOrder(initialGoalsOrder, newGoalsOrder)) {
        setItems(newItems)

        updateProjectGoalOrdering({
          variables: { input: { projectId: project.id, projectGoalIdsOrder: newGoalsOrder } },
          onError: () => setItems(items),
        })
      }
    }

    setActiveId(null)
  }

  const handleEditGoalModalOpen = (goal: ProjectGoalFragment) => {
    onGoalModalOpen(goal)
  }

  const loading = projectLoading || queryInProgressGoals.loading || queryCompletedGoals.loading
  const hasInProgressGoals = inProgressGoals && inProgressGoals.length > 0
  const hasCompletedGoals = completedGoals && completedGoals.length > 0

  const renderCompletedGoals = () => {
    if (hasCompletedGoals) {
      return completedGoals?.map((goal: ProjectGoalFragment) => {
        if (goal) {
          return <GoalCompleted key={goal.id} goal={goal} />
        }
      })
    }

    return <Text>There are no goals available.</Text>
  }

  useEffect(() => {
    let number: any

    if (!loading && !hasInProgressGoals && !hasCompletedGoals) {
      number = setInterval(() => {
        navigate(getPath('project', project.name))
      }, 500)
    }

    return () => {
      clearInterval(number)
    }
  }, [loading, hasInProgressGoals, hasCompletedGoals, navigate, project])

  if (loading) {
    return <RenderGoalsSkeleton />
  }

  return (
    <VStack width="100%" alignItems="flex-start" spacing={6}>
      {hasInProgressGoals && (
        <VStack alignItems="flex-start" spacing={4} width="100%">
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
                  editMode={isGoalinEditMode}
                  handleEditGoalModalOpen={handleEditGoalModalOpen}
                  isPriorityGoal={goal.id === priorityGoal?.id}
                />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <PresentationalGoalItem
                  goal={items?.find((item) => item.id === activeId) ?? ({} as ProjectGoalFragment)}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </VStack>
      )}
      {hasCompletedGoals && hasInProgressGoals && <Divider borderColor="neutral1.6" />}
      {hasCompletedGoals && (
        <VStack alignItems="flex-start" gap={'20px'} width="100%">
          {renderCompletedGoals()}
        </VStack>
      )}
    </VStack>
  )
}

const SortableItem = ({
  goal,
  editMode,
  handleEditGoalModalOpen,
  isPriorityGoal,
}: {
  goal: ProjectGoalFragment
  editMode: boolean
  handleEditGoalModalOpen: (goal: ProjectGoalFragment) => void
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
    opacity: isDragging ? 0 : 1,
  }

  return (
    <Box ref={setNodeRef} sx={style} {...attributes}>
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

const PresentationalGoalItem = ({ goal }: { goal: ProjectGoalFragment }) => {
  const theme = useTheme()
  const boxShadowColor = theme.colors.neutral[0]
  return (
    <Box display="flex" boxShadow={`0 -50px 30px -4px ${boxShadowColor}, 0 50px 30px -4px ${boxShadowColor}`}>
      <GoalInProgress goal={goal} isEditing={true} onOpenGoalModal={() => {}} listeners={[]} />
    </Box>
  )
}

export const RenderGoalsSkeleton = () => {
  return (
    <CardLayout dense noborder flexDirection="column" width="100%" alignItems="flex-start" spacing={6}>
      <VStack alignItems="flex-start" spacing={4} width="100%">
        {[1, 2].map((i) => {
          return (
            <VStack w="full" key={i} alignItems="start" spacing={1}>
              <SkeletonLayout height="32px" width="400px" />
              <SkeletonLayout height="30px" width="200px" />
              <HStack width="100%" alignItems="start">
                <VStack flex={1} spacing={1}>
                  <SkeletonLayout height="24px" width="100%" />
                  <HStack w="100%" justifyContent="space-between">
                    <SkeletonLayout height="16px" width="90px" />
                    <SkeletonLayout height="16px" width="150px" />
                  </HStack>
                </VStack>
                <SkeletonLayout height="24px" width="155px" />
              </HStack>
            </VStack>
          )
        })}
      </VStack>

      <Divider borderColor="neutral1.6" />

      <VStack alignItems="flex-start" gap={'20px'} width="100%">
        {[1, 2].map((i) => {
          return (
            <VStack w="full" key={i} alignItems="start" spacing={1}>
              <SkeletonLayout height="32px" width="400px" />
              <SkeletonLayout height="30px" width="200px" />
              <HStack w="100%" justifyContent="space-between">
                <SkeletonLayout height="16px" width="90px" />
                <SkeletonLayout height="16px" width="150px" />
              </HStack>
            </VStack>
          )
        })}
      </VStack>
    </CardLayout>
  )
}
