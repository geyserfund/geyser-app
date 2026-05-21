import { t } from 'i18next'
import * as yup from 'yup'

export const AON_GOAL_MIN_DURATION_IN_DAYS = 1
export const AON_GOAL_MAX_DURATION_IN_DAYS = 75

export const allOrNothingGoalFormSchema = yup.object({
  amount: yup
    .number()
    .required(t('Amount is required'))
    .min(210000, t('Goal must be at least 210,000 sats'))
    .typeError(t('Amount must be a number')),
  duration: yup
    .number()
    .required(t('Duration is required'))
    .min(AON_GOAL_MIN_DURATION_IN_DAYS, t('Duration must be at least 1 day'))
    .max(
      AON_GOAL_MAX_DURATION_IN_DAYS,
      t('Duration cannot be longer than {{days}} days', { days: AON_GOAL_MAX_DURATION_IN_DAYS }),
    )
    .typeError(t('Duration must be a number')),
  launchDate: yup.date().optional().typeError(t('Launch date must be a valid date')),
  amountUSD: yup.number().optional().typeError(t('Amount must be a number')),
})

export type AllOrNothingGoalFormValues = yup.InferType<typeof allOrNothingGoalFormSchema>
