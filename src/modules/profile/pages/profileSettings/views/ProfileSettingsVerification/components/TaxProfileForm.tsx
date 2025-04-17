import { Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { LegalEntityType, useProjectCountriesGetQuery } from '@/types/index.ts'

// Define form data structure - Added legalEntity
export type TaxProfileFormData = {
  legalEntityType: LegalEntityType
  fullName?: string
  country?: string
  state?: string
  taxId?: string
  incorporationDocument?: string
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
  incorporationDocument: yup
    .string()
    .url(t('Please enter a valid URL'))
    .when('legalEntityType', {
      is: LegalEntityType.NonProfit,
      then: (schema) => schema.required(t('Incorporation document link is required for Non-profits')),
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
      incorporationDocument: data.incorporationDocument ?? undefined,
    },

    mode: 'onBlur',
  })

  useEffect(() => {
    reset(data)
  }, [data])

  const { data: projectCountriesData } = useProjectCountriesGetQuery()

  const countryOptions = projectCountriesData?.projectCountriesGet.map((country) => ({
    label: country.country.name,
    value: country.country.code,
  }))

  const formLegalEntity = watch('legalEntityType')

  const isNonProfit = formLegalEntity === LegalEntityType.NonProfit
  const isCompany = formLegalEntity === LegalEntityType.Company

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

        {(isCompany || isNonProfit) && (
          <ControlledTextInput
            name="incorporationDocument"
            control={control}
            label={t('Incorporation Document Link')}
            description={t('For private documents, share access with hello@geyser.fund or contact us directly')}
            error={errors.incorporationDocument?.message}
            required={isNonProfit}
            placeholder={t('incorporation/registrationdocument.pdf')}
          />
        )}

        <Button type="submit" colorScheme="primary1" isLoading={isLoading}>
          {t('Save')}
        </Button>
      </VStack>
    </form>
  )
}
