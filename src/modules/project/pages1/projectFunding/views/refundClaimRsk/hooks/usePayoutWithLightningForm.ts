import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

/** Form data interface for Lightning payout */
export type LightningPayoutFormData = {
  lightningAddress: string
  accountPassword: string
}

/** Validation schema for Lightning payout form */
export const lightningPayoutSchema = yup.object({
  lightningAddress: yup
    .string()
    .required(t('Lightning address is required'))
    .test('valid-lightning-address', t('Please enter a valid Lightning address or Bolt 12 address'), (value) => {
      if (!value) return false
      // Basic validation for Lightning address format
      return value.includes('@') || value.toLowerCase().startsWith('ln') || value.toLowerCase().startsWith('lnurl')
    }),
  accountPassword: yup.string().required(t('Account password is required')),
})

/** Custom hook for Lightning payout form management */
export const usePayoutWithLightningForm = (onSubmit: (data: LightningPayoutFormData) => Promise<void> | void) => {
  const form = useForm<LightningPayoutFormData>({
    resolver: yupResolver(lightningPayoutSchema),
    mode: 'onBlur',
    defaultValues: {
      lightningAddress: '',
      accountPassword: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = form

  const enableSubmit = isValid && isDirty

  const handleFormSubmit = handleSubmit(onSubmit)

  return {
    control,
    errors,
    enableSubmit,
    handleSubmit: handleFormSubmit,
    reset,
    watch,
    form,
  }
}
