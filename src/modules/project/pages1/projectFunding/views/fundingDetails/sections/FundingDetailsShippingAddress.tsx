import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { fundingFormShippingAvailabilityAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { isShippingAddressValidAtom } from '@/modules/project/funding/state/shippingAddressAtom.ts'
import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H1 } from '@/shared/components/typography/index.ts'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'

export type ShippingAddressFormData = {
  id?: string
  fullName: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
}

// New sub-component for form fields
interface ShippingAddressFormFieldsProps {
  control: any // Control from react-hook-form
  errors: any // Errors from react-hook-form
  countryOptions: { label: string; value: string }[]
}

const ShippingAddressFormFields: React.FC<ShippingAddressFormFieldsProps> = ({ control, errors, countryOptions }) => {
  return (
    <VStack w="full" spacing={4}>
      <ControlledTextInput
        name="fullName"
        control={control}
        label={t('Full Name')}
        placeholder={t('Raymond Holt')}
        error={errors.fullName?.message}
        required
      />
      <ControlledTextInput
        name="streetAddress"
        control={control}
        label={t('Street Address')}
        description={t('Include unit/apartment/suite no. if applicable')}
        placeholder={t('123 Main St, Unit 123')}
        error={errors.streetAddress?.message}
        required
      />
      <HStack w="full" spacing={{ base: 4, lg: 8 }}>
        <ControlledCustomSelect
          width="100%"
          name="country"
          control={control}
          label={t('Country')}
          error={errors.country?.message}
          options={countryOptions}
          placeholder={t('Select')}
          required
        />
        <ControlledTextInput
          name="state"
          control={control}
          label={t('State / Region')}
          placeholder={t('California')}
          error={errors.state?.message}
          required
        />
      </HStack>
      <HStack w="full" spacing={{ base: 4, lg: 8 }}>
        <ControlledTextInput
          name="city"
          control={control}
          label={t('City')}
          placeholder={t('San Francisco')}
          error={errors.city?.message}
          required
        />
        <ControlledTextInput
          name="postalCode"
          control={control}
          label={t('Postal code')}
          placeholder={t('12345')}
          error={errors.postalCode?.message}
          required
        />
      </HStack>
    </VStack>
  )
}

export const FundingDetailsShippingAddress = ({ form }: { form: UseFormReturn<ShippingAddressFormData> }) => {
  const { formState: fundingFormState } = useFundingFormAtom()
  const shippingAvailability = useAtomValue(fundingFormShippingAvailabilityAtom)
  const countries = useAtomValue(countriesAtom)

  const setIsShippingAddressValid = useSetAtom(isShippingAddressValidAtom)

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.code,
  }))

  const {
    control,
    formState: { errors, isValid },
  } = form

  useEffect(() => {
    if (isValid === false) {
      setIsShippingAddressValid(false)
    }
  }, [isValid, setIsShippingAddressValid])

  if (!fundingFormState.needsShipping || (shippingAvailability && shippingAvailability.length === 0)) return null

  return (
    <CardLayout mobileDense width="100%" position="relative">
      <VStack w="full" alignItems="flex-start" spacing={4}>
        <VStack w="full" alignItems="flex-start" spacing={0}>
          <H1 size="2xl" bold>
            {t('Shipping Address')}
          </H1>
          <Body size="sm" light>
            {t(
              'You are purchasing a physical item that requires shipping. This data is stored securely and deleted after a period of 3 months.',
            )}
          </Body>
        </VStack>

        <ShippingAddressFormFields control={control} errors={errors} countryOptions={countryOptions} />
      </VStack>
    </CardLayout>
  )
}
