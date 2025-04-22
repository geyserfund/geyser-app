import { Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { LegalEntityType } from '@/types/index.ts'

// Define form data structure - Added legalEntity
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

interface TaxProfileFormProps {
  data: TaxProfileFormData
  onSubmit: SubmitHandler<TaxProfileFormData>
  isLoading?: boolean
}

/** TaxProfileForm: Form for collecting tax profile information. */
export const TaxProfileForm: React.FC<TaxProfileFormProps> = ({ data, onSubmit, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TaxProfileFormData>({
    resolver: yupResolver(taxProfileSchema),
    defaultValues: {
      legalEntityType: data.legalEntityType,
      fullName: data.fullName ?? undefined,
      country: data.country ?? undefined,
      state: data.state ?? undefined,
      taxId: data.taxId ?? undefined,
    },

    mode: 'onBlur',
  })

  useEffect(() => {
    reset(data)
  }, [data])

  const countries = useAtomValue(countriesAtom)

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.code,
  }))

  const formLegalEntity = watch('legalEntityType')

  const isNonProfit = formLegalEntity === LegalEntityType.NonProfit

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4} align="stretch">
        <ControlledCustomSelect
          name="legalEntityType"
          control={control}
          label="Entity type"
          placeholder={t('Legal entity type')}
          width="100%"
          options={[
            { label: t('Individual'), value: LegalEntityType.Person },
            { label: t('Non-profit'), value: LegalEntityType.NonProfit },
            { label: t('Company'), value: LegalEntityType.Company },
          ]}
        />

        <ControlledTextInput
          name="fullName"
          control={control}
          label={t('Full name')}
          error={errors.fullName?.message}
          required={isNonProfit}
          placeholder={t('Enter full name')}
        />

        <FieldContainer title={t('Tax Residency')} required={isNonProfit}>
          <HStack w="full" alignItems="start">
            <ControlledCustomSelect
              name="country"
              control={control}
              label=""
              placeholder={t('Country')}
              options={countryOptions ?? []}
            />
            <ControlledTextInput name="state" control={control} label="" placeholder={t('State')} />
          </HStack>
        </FieldContainer>

        <ControlledTextInput
          name="taxId"
          control={control}
          label={t('Tax ID')}
          error={errors.taxId?.message}
          required={isNonProfit}
          placeholder={t('Enter Tax ID')}
        />

        {isNonProfit && (
          <FieldContainer
            title={t('Incorporation Document')}
            subtitle={t(
              'Send us documents at  hello@geyser.fund, certifying you are a registered Charity with tax-deductible donations.',
            )}
            required={isNonProfit}
          />
        )}

        <Button type="submit" colorScheme="primary1" isLoading={isLoading}>
          {t('Save')}
        </Button>
      </VStack>
    </form>
  )
}
