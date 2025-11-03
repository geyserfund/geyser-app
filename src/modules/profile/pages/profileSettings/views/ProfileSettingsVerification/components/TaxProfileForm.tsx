import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { LegalEntityType } from '@/types/index.ts'

import { TaxProfileFormData } from '../useTaxProfileForm.tsx'

interface TaxProfileFormProps {
  form: UseFormReturn<TaxProfileFormData>
  isLoading?: boolean
}

/** TaxProfileForm: Form for collecting tax profile information. */
export const TaxProfileForm: React.FC<TaxProfileFormProps> = ({ form, isLoading }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = form

  const countries = useAtomValue(countriesAtom)

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.code,
  }))

  const formLegalEntity = watch('legalEntityType')

  const isNonProfit = formLegalEntity === LegalEntityType.NonProfit

  return (
    <VStack w="full" gap={4}>
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
    </VStack>
  )
}
