import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MUTATION_CREATE_PROJECT_GOAL } from '../../../../../graphql/mutations/goals'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../types'

type FormValues = Record<string, string | number | ProjectGoalCurrency>

export const useProjectGoalForm = (goal: ProjectGoal | null, projectId: string, onClose: () => void) => {
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      targetAmount: 0,
      currency: ProjectGoalCurrency.Usdcent,
      projectId,
    },
  })

  const [createProjectGoal, { loading, error }] = useMutation(MUTATION_CREATE_PROJECT_GOAL)

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
        onClose()
      }
    } catch (error) {
      console.error('Error creating project goal:', error)
    }
  }

  return { control, handleSubmit: handleSubmit(onSubmit), loading, error, watch }
}
