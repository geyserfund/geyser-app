import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { MUTATION_CREATE_PROJECT_GOAL, MUTATION_UPDATE_PROJECT_GOAL } from '../../../../../graphql/mutations/goals'
import { ProjectGoal, ProjectGoalCurrency } from '../../../../../types'
import { dollarsToCents } from '../../../../../utils'

type FormValues = Record<string, string | number | ProjectGoalCurrency>

const MIN_GOAL_TARGET_AMOUNT_US_DOLLARS = 10
const MIN_GOAL_TARGET_AMOUNT_SATS = 10000
const MAX_GOAL_TARGET_AMOUNT = 2000000000

const goalFormSchema = (amountContributed: number) =>
  yup
    .object({
      title: yup.string().required('Title is required').max(50, 'Title must be at most 50 characters long'),
      description: yup.string().max(400, 'Description must be at most 400 characters long'),
      targetAmount: yup
        .number()
        .typeError('Amount is required')
        .required('Amount is required')
        .min(
          amountContributed,
          'The Goal amount is lower than your funded amount. Please choose a Goal amount that is higher than the current Goal’s funded amount.',
        )
        .max(
          MAX_GOAL_TARGET_AMOUNT,
          'The target amount cannot exceed 2,000,000,000 USD or 2,000,000,000 Sats. Come on!',
        )
        .test(
          'currency-based-minimum',
          'Target amount does not meet the minimum requirement of 10$ USD or 10,000 Sats if the currency is denominated in Bitcoin',
          function (value) {
            const { currency } = this.parent
            if (currency === ProjectGoalCurrency.Usdcent) {
              return value >= MIN_GOAL_TARGET_AMOUNT_US_DOLLARS
            }

            if (currency === ProjectGoalCurrency.Btcsat) {
              return value >= MIN_GOAL_TARGET_AMOUNT_SATS
            }

            return true
          },
        ),
      currency: yup.string().required('Currency is required'),
    })
    .required()

export const useProjectGoalForm = (
  goal: ProjectGoal | null,
  projectId: string,
  onClose: () => void,
  refetch: () => void,
) => {
  const { control, handleSubmit, reset, watch, formState, setValue, trigger } = useForm<FormValues>({
    resolver: yupResolver(goalFormSchema(goal?.amountContributed || 0)),
    defaultValues: {
      title: '',
      description: '',
      targetAmount: 0,
      currency: ProjectGoalCurrency.Usdcent,
      projectId,
      emojiUnifiedCode: '',
    },
    mode: 'onChange',
  })

  const { errors, isDirty, isValid } = formState

  const enableSubmit = isDirty && isValid

  const [createProjectGoal, { loading: creating, error: createError }] = useMutation(MUTATION_CREATE_PROJECT_GOAL)
  const [updateProjectGoal, { loading: updating, error: updateError }] = useMutation(MUTATION_UPDATE_PROJECT_GOAL)

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title || '',
        description: goal.description || '',
        targetAmount:
          goal.currency === ProjectGoalCurrency.Btcsat ? goal.targetAmount || 0 : goal.targetAmount / 100 || 0,
        currency: goal.currency,
        projectId,
        emojiUnifiedCode: goal.emojiUnifiedCode || '',
      })
    } else {
      reset({
        title: '',
        description: '',
        targetAmount: '',
        currency: ProjectGoalCurrency.Usdcent,
        projectId,
        emojiUnifiedCode: '',
      })
    }
  }, [goal, reset, projectId])

  useEffect(() => {
    reset()
  }, [onClose, reset])

  const onSubmit = async (formData: FormValues) => {
    try {
      const trimmedTitle = typeof formData.title === 'string' ? formData.title.trim() : ''
      const targetAmount =
        formData.currency === ProjectGoalCurrency.Usdcent
          ? dollarsToCents(Number(formData.targetAmount))
          : formData.targetAmount

      if (goal) {
        const { data } = await updateProjectGoal({
          variables: {
            input: {
              title: trimmedTitle,
              description: formData.description,
              targetAmount,
              currency: formData.currency,
              projectGoalId: goal.id,
              emojiUnifiedCode: formData.emojiUnifiedCode,
            },
          },
        })
        if (data) {
          reset()
          refetch()
          onClose()
        }
      } else {
        const { data } = await createProjectGoal({
          variables: {
            input: {
              title: trimmedTitle,
              description: formData.description,
              targetAmount,
              currency: formData.currency,
              projectId: formData.projectId,
              emojiUnifiedCode: formData.emojiUnifiedCode,
            },
          },
        })
        if (data) {
          reset()
          refetch()
          onClose()
        }
      }
    } catch (error) {
      console.error('Error submitting project goal:', error)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    loading: creating || updating,
    error: createError || updateError,
    watch,
    errors,
    reset,
    enableSubmit,
    setValue,
    trigger,
  }
}
