import { Box, Button, HStack, Icon, IconButton, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useCallback } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { PiInfo, PiPlus, PiTrash } from 'react-icons/pi'
import * as yup from 'yup'

import { ControlledAmountInput } from '@/shared/components/controlledInput/ControlledAmountInput.tsx'
import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledSwitchInput } from '@/shared/components/controlledInput/ControlledSwitchInput.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { ProjectShippingConfigType, RewardCurrency, ShippingConfigFragment } from '@/types'
import { useMobileMode } from '@/utils/index.ts'

import { ProjectShippingConfigTypeOptions } from './constants.ts'

interface ShippingRate {
  country: string // Can be 'default' or a country code
  baseRate?: number | null
  incrementRate?: number | null
  sameAsDefault: boolean
}

interface ShippingFeesFormValues {
  name: string
  feesModel: ProjectShippingConfigType
  shippingAvailability: 'worldwide' | 'specificCountries'
  shippingRates: ShippingRate[]
}

export const DEFAULT_COUNTRY_CODE = 'DEFAULT'

const defaultFormValues = {
  name: '',
  feesModel: ProjectShippingConfigType.Flat,
  shippingAvailability: 'worldwide',
  shippingRates: [{ country: DEFAULT_COUNTRY_CODE, sameAsDefault: false, baseRate: null, incrementRate: null }],
} as ShippingFeesFormValues

const shippingRateSchema = (feesModel: ProjectShippingConfigType) => {
  return yup.object().shape({
    country: yup.string().required(t('Country is required')).min(1, t('Country is required')),
    sameAsDefault: yup.boolean().required(),
    baseRate: yup
      .number()
      .transform((value) => (isNaN(value) || value === null || value === undefined ? null : Number(value)))
      .nullable()
      .when('sameAsDefault', {
        is: false,
        then: (schema) =>
          schema
            .typeError(t('Base rate must be a number'))
            .min(1, t('Invalid amount'))
            .required(t('Base rate is required')),
        otherwise: (schema) => schema.optional(),
      }),
    incrementRate: yup
      .number()
      .transform((value) => (isNaN(value) || value === null || value === undefined ? null : Number(value)))
      .nullable()
      .when(['sameAsDefault'], {
        is(sameAsDefault: boolean) {
          console.log('what is happening here', !sameAsDefault && feesModel === ProjectShippingConfigType.Incremental)
          return !sameAsDefault && feesModel === ProjectShippingConfigType.Incremental
        },
        then: (schema) =>
          schema
            .typeError(t('Increment rate must be a number'))
            .min(1, t('Invalid increment rate'))
            .required(t('Increment rate is required')),
        otherwise: (schema) => schema.optional(),
      }),
  })
}

const shippingFeesSchema: yup.ObjectSchema<ShippingFeesFormValues> = yup.object().shape({
  name: yup.string().required(t('Name is required')),
  feesModel: yup
    .string()
    .oneOf([
      ProjectShippingConfigType.Flat,
      ProjectShippingConfigType.PerUnit,
      ProjectShippingConfigType.Incremental,
    ] as const)
    .required(t('Fees model is required')) as yup.StringSchema<ProjectShippingConfigType>,
  shippingAvailability: yup
    .string()
    .oneOf(['worldwide', 'specificCountries'] as const)
    .required(t('Shipping availability is required')) as yup.StringSchema<'worldwide' | 'specificCountries'>,
  shippingRates: yup
    .array()
    .when(['feesModel'], {
      is: (feesModel: ProjectShippingConfigType) => feesModel === ProjectShippingConfigType.Incremental,
      then: (schema) => schema.of(shippingRateSchema(ProjectShippingConfigType.Incremental)),
    })
    .when(['feesModel'], {
      is: (feesModel: ProjectShippingConfigType) => feesModel === ProjectShippingConfigType.Flat,
      then: (schema) => schema.of(shippingRateSchema(ProjectShippingConfigType.Flat)),
    })
    .when(['feesModel'], {
      is: (feesModel: ProjectShippingConfigType) => feesModel === ProjectShippingConfigType.PerUnit,
      then: (schema) => schema.of(shippingRateSchema(ProjectShippingConfigType.PerUnit)),
    })
    .min(1, t('At least one shipping rate is required'))
    .test(
      'at-least-one-specific-country',
      t('At least one specific country must be added when not shipping worldwide'),
      function (value) {
        const { shippingAvailability } = this.parent
        if (shippingAvailability === 'specificCountries') {
          return value ? value.filter((rate) => rate.country !== DEFAULT_COUNTRY_CODE).length > 0 : false
        }

        return true
      },
    ) as yup.ArraySchema<ShippingRate[], yup.AnyObject, any, any>,
})

type ShippingConfigFormProps = {
  data?: ShippingConfigFragment | null
  onSubmit: (data: ShippingFeesFormValues) => void
  isSubmitting?: boolean
}

export const ShippingConfigForm = ({ onSubmit, isSubmitting, data }: ShippingConfigFormProps) => {
  const countries = useAtomValue(countriesAtom)
  const isMobile = useMobileMode()

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.code,
  }))

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<ShippingFeesFormValues>({
    resolver: yupResolver(shippingFeesSchema),
    defaultValues: data
      ? {
          name: data.name,
          feesModel: data.type,
          shippingAvailability: data.globalShipping ? 'worldwide' : 'specificCountries',
          shippingRates: data?.shippingRates?.map((rate) => ({
            country: rate.country,
            baseRate: rate.baseRate || 0,
            incrementRate: rate.incrementRate || 0,
            sameAsDefault: rate.sameAsDefault || false,
          })),
        }
      : defaultFormValues,
    mode: 'onChange',
    context: { feesModel: ProjectShippingConfigType.Flat },
  })

  const watchedFeesModel = watch('feesModel')
  const isIncremental = watchedFeesModel === ProjectShippingConfigType.Incremental

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippingRates',
  })

  const watchedShippingRates = useWatch({ control, name: 'shippingRates' })

  const handleOnSubmitClick = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    handleSubmit(onSubmit)(event)
  }

  console.log('errors', errors)

  const getShippingErrors = useCallback(() => {
    const errorsForShippingRates = []

    if (errors.shippingRates?.message) {
      errorsForShippingRates.push(errors.shippingRates.message)
    }

    if (errors.shippingRates?.root?.message) {
      errorsForShippingRates.push(errors.shippingRates?.root.message)
    }

    if (Array.isArray(errors.shippingRates) && isMobile) {
      for (const rateError of errors.shippingRates) {
        if (rateError?.country?.message) errorsForShippingRates.push(rateError.country.message)
        if (rateError?.baseRate?.message) errorsForShippingRates.push(rateError.baseRate.message)
        if (rateError?.incrementRate?.message) errorsForShippingRates.push(rateError.incrementRate.message)
      }
    }

    if (errorsForShippingRates.length === 0) return null

    return (
      <VStack w="full" alignItems="flex-start" paddingTop={2} spacing={0}>
        {errorsForShippingRates.map((error) => (
          <Body size="xs" light key={error} color={'error.11'}>
            {error}
          </Body>
        ))}
      </VStack>
    )
  }, [errors, isMobile])

  return (
    <VStack id="shipping-fees-form" as="form" onSubmit={handleOnSubmitClick} gap={6} w="full" px={2}>
      <ControlledTextInput
        name="name"
        control={control}
        label={t('Name')}
        placeholder={t('Enter a name to remember this fees configuration')}
        error={errors.name?.message}
      />

      <FieldContainer title={t('Fees model')} error={errors.feesModel?.message} w="full">
        <Controller
          name="feesModel"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              paddingTop={2}
              onChange={(val) => {
                field.onChange(val)
                trigger('shippingRates')
              }}
            >
              <VStack alignItems="flex-start">
                {ProjectShippingConfigTypeOptions.map((model) => (
                  <Radio key={model.value} value={model.value}>
                    <HStack flexWrap={'wrap'} alignItems={'flex-end'}>
                      <Body size="md">{model.label}</Body>
                      <Body size="sm" light>
                        {model.description}{' '}
                        <TooltipPopover
                          content={
                            <VStack alignItems="flex-start">
                              {model.info.map((info) => (
                                <Body key={info} size="sm" light textAlign="left">
                                  {info}
                                </Body>
                              ))}
                            </VStack>
                          }
                        >
                          <span>
                            <Icon as={PiInfo} />
                          </span>
                        </TooltipPopover>
                      </Body>
                    </HStack>
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          )}
        />
      </FieldContainer>

      <FieldContainer title={t('Shipping Availability')} error={errors.shippingAvailability?.message} w="full">
        <Controller
          name="shippingAvailability"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              paddingTop={2}
              onChange={(val) => {
                field.onChange(val)
                trigger('shippingRates')
              }}
            >
              <VStack alignItems="flex-start">
                <Radio value="worldwide">
                  <Body size="md">{t('Ships Worldwide')}</Body>
                </Radio>
                <Radio value="specificCountries">
                  <HStack alignItems="center">
                    <Body size="md">{t('Ships to certain countries')}</Body>
                    <TooltipPopover
                      text={t('If selected, only the countries selected below will be eligible for shipping')}
                      placement="top"
                    >
                      <Box as="span">
                        <Icon as={PiInfo} />
                      </Box>
                    </TooltipPopover>
                  </HStack>
                </Radio>
              </VStack>
            </RadioGroup>
          )}
        />
      </FieldContainer>

      <VStack w="full" alignItems="flex-start" spacing={6}>
        <FieldContainer
          title={t('Shipping rates')}
          subtitle={t(
            'Default rate is applied to any region not specified for worldwide shipping. If worldwide shipping is not available, all available countries must be listed below.',
          )}
          error={getShippingErrors()}
          w="full"
        >
          <VStack w="full" alignItems="flex-start" spacing={3} paddingTop={2}>
            <HStack w="full" justifyContent="space-between" px={1}>
              <Box flex={5}>
                <Body size="sm" medium>
                  {t('Country')}
                </Body>
              </Box>
              <Box flex={3}>
                <Body size="sm" medium>
                  {t('Base rate ($)')}
                </Body>
              </Box>
              {isIncremental && (
                <Box flex={3}>
                  <Body size="sm" medium>
                    {t('Increment rate ($)')}
                  </Body>
                </Box>
              )}
              <Box flex={3}>
                <Body size="sm" medium>
                  {t('Same as Default')}
                </Body>
              </Box>
              <Box flex={1} />
            </HStack>

            {fields.map((item, index) => {
              const currentShippingRate = watchedShippingRates?.[index]
              if (!currentShippingRate) return null
              const isDefaultRow = currentShippingRate.country === DEFAULT_COUNTRY_CODE
              const sameAsDefaultChecked = Boolean(currentShippingRate.sameAsDefault)

              const handleSameAsDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { checked } = e.target
                setValue(`shippingRates.${index}.sameAsDefault`, checked)
                if (checked) {
                  setValue(`shippingRates.${index}.baseRate`, null)
                  if (isIncremental) {
                    setValue(`shippingRates.${index}.incrementRate`, null)
                  }
                }

                trigger(`shippingRates.${index}.baseRate`)
                if (isIncremental) {
                  trigger(`shippingRates.${index}.incrementRate`)
                }
              }

              return (
                <HStack key={item.id} w="full" spacing={2} alignItems="flex-start">
                  <Box flex={5}>
                    {isDefaultRow ? (
                      <HStack
                        paddingX={3}
                        paddingY={0.5}
                        paddingTop={1}
                        borderRadius="6px"
                        width="full"
                        height="32px"
                        backgroundColor="neutral1.3"
                        alignItems="center"
                        maxWidth="200px"
                      >
                        <Body size="sm">{t('Default')}</Body>
                      </HStack>
                    ) : (
                      <ControlledCustomSelect
                        name={`shippingRates.${index}.country`}
                        control={control}
                        options={countryOptions.filter(
                          (option) =>
                            !(watchedShippingRates || []).find((r, i) => i !== index && r.country === option.value) ||
                            option.value === currentShippingRate.country,
                        )}
                        placeholder={isMobile ? t('Select') : t('Select Country')}
                        size="sm"
                        disableErrorLabel={isMobile}
                      />
                    )}
                  </Box>
                  <Box flex={3}>
                    <ControlledAmountInput
                      name={`shippingRates.${index}.baseRate`}
                      control={control}
                      placeholder="0"
                      maxWidth="80px"
                      currency={RewardCurrency.Usdcent}
                      size="sm"
                      textAlign="center"
                      onFocus={() =>
                        setValue(`shippingRates.${index}.sameAsDefault`, false, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                      disableErrorLabel={isMobile}
                    />
                  </Box>
                  {isIncremental && (
                    <Box flex={3}>
                      <ControlledAmountInput
                        name={`shippingRates.${index}.incrementRate`}
                        control={control}
                        placeholder="0"
                        maxWidth="80px"
                        currency={RewardCurrency.Usdcent}
                        size="sm"
                        textAlign="center"
                        onFocus={() =>
                          setValue(`shippingRates.${index}.sameAsDefault`, false, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        disableErrorLabel={isMobile}
                      />
                    </Box>
                  )}
                  <HStack flex={3} justifyContent="center">
                    {!isDefaultRow && (
                      <ControlledSwitchInput
                        name={`shippingRates.${index}.sameAsDefault`}
                        control={control}
                        onChange={handleSameAsDefaultChange}
                        isChecked={sameAsDefaultChecked}
                      />
                    )}
                  </HStack>

                  <Box w="40px" pt={1}>
                    {!isDefaultRow ? (
                      <IconButton
                        aria-label={t('Remove country rate')}
                        icon={<PiTrash />}
                        onClick={() => remove(index)}
                        variant="ghost"
                        size="sm"
                      />
                    ) : null}
                  </Box>
                </HStack>
              )
            })}
          </VStack>
        </FieldContainer>
        <Button
          variant="surface"
          colorScheme="neutral1"
          size="md"
          leftIcon={<PiPlus />}
          onClick={() => {
            append({ country: '', sameAsDefault: true, baseRate: 0, incrementRate: 0 })
            trigger('shippingRates')
          }}
          isDisabled={fields.length >= countryOptions.length + 1}
        >
          {t('Add new country')}
        </Button>
      </VStack>

      <HStack w="full" justifyContent="flex-start"></HStack>

      <Button type="submit" colorScheme="primary1" size="lg" width="full" isLoading={isSubmitting}>
        {t('Save')}
      </Button>
    </VStack>
  )
}
