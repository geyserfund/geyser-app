import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  MUTATION_CREATE_PROJECT_GOAL,
  MUTATION_DELETE_PROJECT_GOAL,
  MUTATION_UPDATE_PROJECT_GOAL,
} from '../../../../../graphql/mutations/goals'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../types'

type FormValues = Record<string, string | number | ProjectGoalCurrency>

export const useProjectGoalForm = (
  goal: ProjectGoal | null,
  projectId: string,
  onClose: () => void,
  refetch: () => void,
) => {
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      targetAmount: 0,
      currency: ProjectGoalCurrency.Usdcent,
      projectId,
    },
  })

  const [createProjectGoal, { loading: creating, error: createError }] = useMutation(MUTATION_CREATE_PROJECT_GOAL)
  const [updateProjectGoal, { loading: updating, error: updateError }] = useMutation(MUTATION_UPDATE_PROJECT_GOAL)
  const [deleteProjectGoal, { loading: deleting, error: deleteError }] = useMutation(MUTATION_DELETE_PROJECT_GOAL)

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title || '',
        description: goal.description || '',
        targetAmount: goal.targetAmount || 0,
        currency: goal.currency,
        projectId,
      })
    }
  }, [goal, reset, projectId])

  useEffect(() => {
    reset()
  }, [onClose, reset])

  const onSubmit = async (formData: FormValues) => {
    try {
      if (goal) {
        const { data } = await updateProjectGoal({
          variables: {
            input: {
              title: formData.title,
              description: formData.description,
              targetAmount: Number(formData.targetAmount),
              currency: formData.currency,
              projectGoalId: goal.id,
            },
          },
        })
        if (data) {
          refetch()
          onClose()
        }
      } else {
        const { data } = await createProjectGoal({
          variables: {
            input: {
              title: formData.title,
              description: formData.description,
              targetAmount: Number(formData.targetAmount),
              currency: formData.currency,
              projectId: formData.projectId,
            },
          },
        })
        if (data) {
          refetch()
          onClose()
        }
      }
    } catch (error) {
      console.error('Error submitting project goal:', error)
    }
  }

  const handleDelete = async (projectGoalId: bigint) => {
    try {
      const { data } = await deleteProjectGoal({
        variables: {
          projectGoalId,
        },
      })
      if (data) {
        refetch()
        onClose()
      }
    } catch (error) {
      console.error('Error deleting project goal:', error)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    handleDelete,
    loading: creating || updating || deleting,
    error: createError || updateError || deleteError,
    watch,
  }
}
