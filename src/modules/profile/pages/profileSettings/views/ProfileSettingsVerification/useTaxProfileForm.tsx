import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { LegalEntityType, useUserTaxProfileQuery, useUserTaxProfileUpdateMutation } from '@/types/index.ts'

export type TaxProfileFormData = {
  legalEntityType: LegalEntityType
  fullName?: string
  country?: string
  state?: string
  taxId?: string
}

// Define Yup validation schema
const taxProfileSchema = yup.object().shape({
  // Add validation for legalEntity itself
  legalEntityType: yup
    .mixed<LegalEntityType>()
    .oneOf(Object.values(LegalEntityType), t('Invalid legal entity type'))
    .required(),
  fullName: yup.string().when('legalEntity', {
    is: LegalEntityType.NonProfit,
    then: (schema) => schema.required(t('Full name is required for Non-profits')),
    otherwise: (schema) => schema.optional(),
  }),
  country: yup.string().when('legalEntityType', {
    is: LegalEntityType.NonProfit,
    then: (schema) => schema.required(t('Country is required for Non-profits')),
    otherwise: (schema) => schema.optional(),
  }),
  state: yup.string().when(['legalEntityType', 'country'], {
    is: (legalEntityType: LegalEntityType | undefined, country: string | undefined) =>
      legalEntityType === LegalEntityType.NonProfit || country === 'US',
    then: (schema) => schema.required(t('Required for country US and Non-profits')),
    otherwise: (schema) => schema.optional(),
  }),
  taxId: yup.string().when('legalEntityType', {
    is: LegalEntityType.NonProfit,
    then: (schema) => schema.required(t('Tax ID is required for Non-profits')),
    otherwise: (schema) => schema.optional(),
  }),
})

export const useTaxProfileForm = ({ userId, onUpdate }: { userId: string; onUpdate?: () => void }) => {
  const form = useForm<TaxProfileFormData>({
    resolver: yupResolver(taxProfileSchema),
    defaultValues: {
      legalEntityType: LegalEntityType.Person,
    },
    mode: 'onBlur',
  })

  const [updateTaxProfile] = useUserTaxProfileUpdateMutation()

  useUserTaxProfileQuery({
    skip: !userId,
    variables: {
      where: {
        id: userId,
      },
    },
    onCompleted(data) {
      console.log(data)
      if (data?.user.taxProfile) {
        form.reset({
          legalEntityType: data.user.taxProfile.legalEntityType,
          fullName: data.user.taxProfile.fullName ?? undefined,
          country: data.user.taxProfile.country ?? undefined,
          state: data.user.taxProfile.state ?? undefined,
          taxId: data.user.taxProfile.taxId ?? undefined,
        })
      }
    },
  })

  const handleSubmit = form.handleSubmit((data: TaxProfileFormData) => {
    updateTaxProfile({
      variables: {
        input: data,
      },
      onCompleted() {
        onUpdate?.()
      },
    })
  })

  return { form, handleSubmit }
}
