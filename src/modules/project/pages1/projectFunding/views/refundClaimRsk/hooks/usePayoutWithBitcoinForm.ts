import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

/** Form data interface for Bitcoin On-Chain payout */
export type BitcoinPayoutFormData = {
  bitcoinAddress: string
  accountPassword: string
}

/** Validation schema for Bitcoin On-Chain payout form */
export const bitcoinPayoutSchema = yup.object({
  bitcoinAddress: yup
    .string()
    .required(t('Bitcoin address is required'))
    .test('valid-bitcoin-address', t('Please enter a valid Bitcoin address'), (value) => {
      if (!value) return false
      // Basic validation for Bitcoin address format (supports legacy, segwit, and bech32)
      const bitcoinAddressRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/
      return bitcoinAddressRegex.test(value)
    }),
  accountPassword: yup.string().required(t('Account password is required')),
})

/** Custom hook for Bitcoin On-Chain payout form management */
export const usePayoutWithBitcoinForm = (onSubmit: (data: BitcoinPayoutFormData) => Promise<void> | void) => {
  const form = useForm<BitcoinPayoutFormData>({
    resolver: yupResolver(bitcoinPayoutSchema),
    mode: 'onBlur',
    defaultValues: {
      bitcoinAddress: '',
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
