import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useProjectGoalsAPI } from '@/modules/project/API/useProjectGoalsAPI'
import {
  MANAGED_CIRCULAR_GRANT_GOAL_TITLE,
  MANAGED_CIRCULAR_GRANT_MAX_TARGET_SATS,
} from '@/modules/project/domain/managedCircularGrant.ts'

import { dollarsToCents } from '../../../../../shared/utils/formatData/helperFunctions.ts'
import {
  ProjectGoalCreateInput,
  ProjectGoalCurrency,
  ProjectGoalFragment,
} from '../../../../../types/generated/graphql.ts'
import { useNotification } from '../../../../../utils/tools/Notification.tsx'

type FormValues = ProjectGoalCreateInput

const MIN_GOAL_TARGET_AMOUNT_US_DOLLARS = 10
const MIN_GOAL_TARGET_AMOUNT_SATS = 10000
const MAX_GOAL_TARGET_AMOUNT = 2_147_483_647

const goalFormSchema = (amountContributed: number, maxTargetAmount: number) =>
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
        .max(maxTargetAmount, `The target amount cannot exceed ${maxTargetAmount.toLocaleString()}.`)
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

type UseProjectGoalFormProps = {
  goal: ProjectGoalFragment | null
  projectId: string
  onClose: () => void
  onGoalCreated?: () => void
  managedCircularGrant?: boolean
}

export const useProjectGoalForm = ({
  goal,
  projectId,
  onClose,
  onGoalCreated,
  managedCircularGrant = false,
}: UseProjectGoalFormProps) => {
  const toast = useNotification()

  let isBTC = goal?.currency === ProjectGoalCurrency.Btcsat
  const amountContributed = isBTC ? goal?.amountContributed || 0 : (goal?.amountContributed || 0) / 100

  const { control, handleSubmit, reset, watch, formState, setValue, trigger } = useForm<FormValues>({
    resolver: yupResolver(
      goalFormSchema(
        amountContributed,
        managedCircularGrant ? MANAGED_CIRCULAR_GRANT_MAX_TARGET_SATS : MAX_GOAL_TARGET_AMOUNT,
      ),
    ) as any,
    defaultValues: {
      title: managedCircularGrant ? MANAGED_CIRCULAR_GRANT_GOAL_TITLE : '',
      description: '',
      targetAmount: 0,
      currency: managedCircularGrant ? ProjectGoalCurrency.Btcsat : ProjectGoalCurrency.Usdcent,
      projectId,
      emojiUnifiedCode: '',
    },
    mode: 'onBlur',
  })

  const { errors, isDirty, isValid } = formState

  const enableSubmit = isDirty && isValid

  const { createProjectGoal, updateProjectGoal } = useProjectGoalsAPI()

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title || '',
        description: goal.description || '',
        targetAmount: isBTC ? goal.targetAmount || 0 : goal.targetAmount / 100 || 0,
        currency: goal.currency,
        projectId,
        emojiUnifiedCode: goal.emojiUnifiedCode || '',
      })
    } else {
      reset({
        title: managedCircularGrant ? MANAGED_CIRCULAR_GRANT_GOAL_TITLE : '',
        description: '',
        targetAmount: 0,
        currency: managedCircularGrant ? ProjectGoalCurrency.Btcsat : ProjectGoalCurrency.Usdcent,
        projectId,
        emojiUnifiedCode: '',
      })
    }
  }, [goal, reset, projectId, isBTC, managedCircularGrant])

  const onSubmit = (formData: FormValues) => {
    try {
      if (!goal) {
        isBTC = formData.currency === ProjectGoalCurrency.Btcsat
      }

      const trimmedTitle = typeof formData.title === 'string' ? formData.title.trim() : ''
      const targetAmount = isBTC ? formData.targetAmount : dollarsToCents(Number(formData.targetAmount))

      if (goal) {
        updateProjectGoal.execute({
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
          onCompleted() {
            reset()
            onClose()
          },
        })
      } else {
        createProjectGoal.execute({
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
          onCompleted() {
            reset()
            onClose()
            toast.success({
              title: 'Successfully created project goal!',
            })
            onGoalCreated?.()
          },
        })
      }
    } catch (error) {
      console.error('Error submitting project goal:', error)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    loading: createProjectGoal.loading || updateProjectGoal.loading,
    error: createProjectGoal.error || updateProjectGoal.error,
    watch,
    errors,
    reset,
    enableSubmit,
    setValue,
    trigger,
  }
}
