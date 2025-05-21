import { Box, Button, HStack, Icon, IconButton, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { PiInfo, PiPlus, PiTrash } from 'react-icons/pi'
import * as yup from 'yup'

import { ControlledAmountInput } from '@/shared/components/controlledInput/ControlledAmountInput.tsx'
import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledSwitchInput } from '@/shared/components/controlledInput/ControlledSwitchInput.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { RewardCurrency } from '@/types'

interface ShippingRate {
  country: string // Can be 'default' or a country code
  baseRate?: number | null
  incrementRate?: number | null
  sameAsDefault: boolean
}
interface ShippingFeesFormValues {
  name: string
  feesModel: 'flatRate' | 'perUnit' | 'baseIncremental'
  shippingAvailability: 'worldwide' | 'specificCountries'
  shippingRates: ShippingRate[]
}

const shippingRateSchema = yup.object().shape({
  country: yup.string().required(t('Country is required')),
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
          .min(0, t('Rate must be 0 or greater'))
          .required(t('Base rate is required')),
      otherwise: (schema) => schema.optional(),
    }),
  incrementRate: yup
    .number()
    .transform((value) => (isNaN(value) || value === null || value === undefined ? null : Number(value)))
    .nullable()
    .when(['sameAsDefault', '$feesModel'], {
      is: (sameAsDefault: boolean, feesModel?: string) => !sameAsDefault && feesModel === 'baseIncremental',
      then: (schema) =>
        schema
          .typeError(t('Increment rate must be a number'))
          .min(0, t('Rate must be 0 or greater'))
          .required(t('Increment rate is required')),
      otherwise: (schema) => schema.optional(),
    }),
})

const shippingFeesSchema: yup.ObjectSchema<ShippingFeesFormValues> = yup.object().shape({
  name: yup.string().required(t('Name is required')),
  feesModel: yup
    .string()
    .oneOf(['flatRate', 'perUnit', 'baseIncremental'] as const)
    .required(t('Fees model is required')) as yup.StringSchema<'flatRate' | 'perUnit' | 'baseIncremental'>,
  shippingAvailability: yup
    .string()
    .oneOf(['worldwide', 'specificCountries'] as const)
    .required(t('Shipping availability is required')) as yup.StringSchema<'worldwide' | 'specificCountries'>,
  shippingRates: yup
    .array()
    .of(shippingRateSchema)
    .min(1, t('At least one shipping rate is required'))
    .test(
      'at-least-one-specific-country',
      t('At least one specific country must be added when not shipping worldwide'),
      function (value) {
        const { shippingAvailability } = this.parent
        if (shippingAvailability === 'specificCountries') {
          return value ? value.filter((rate) => rate.country !== 'default').length > 0 : false
        }

        return true
      },
    ) as yup.ArraySchema<ShippingRate[], yup.AnyObject, any, any>,
})

export const ShippingConfig = () => {
  const shippingFeeModal = useModal()
  const isEdit = false
  const countries = useAtomValue(countriesAtom)

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
    defaultValues: {
      name: '',
      feesModel: 'flatRate',
      shippingAvailability: 'worldwide',
      shippingRates: [{ country: 'default', sameAsDefault: false, baseRate: null, incrementRate: null }],
    },
    mode: 'onBlur',
    context: { feesModel: 'flatRate' },
  })

  const watchedFeesModel = watch('feesModel')
  useEffect(() => {
    if (watchedFeesModel) {
      trigger('shippingRates')
    }
  }, [watchedFeesModel, trigger])

  const watchedShippingAvailability = watch('shippingAvailability')
  useEffect(() => {
    if (watchedShippingAvailability) {
      trigger('shippingRates')
    }
  }, [watchedShippingAvailability, trigger])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippingRates',
  })

  const watchedShippingRates = useWatch({ control, name: 'shippingRates' })

  const onSubmit = (data: ShippingFeesFormValues) => {
    console.log('Raw form data:', data)
    const processedRates = data.shippingRates.map((rate) => {
      if (rate.country !== 'default' && rate.sameAsDefault) {
        return { ...rate, baseRate: null, incrementRate: null }
      }

      return rate
    })
    console.log('Processed Data for submission:', { ...data, shippingRates: processedRates })
    shippingFeeModal.onClose()
  }

  const ShippingFeesModelOptions = [
    {
      label: t('Flat Rate'),
      description: t('One fee, regardless of quantity'),
      value: 'flatRate',
      info: [
        t(
          "Best for small, lightweight items where shipping cost doesn't change with quantity. eg: stickers, keychains, etc.",
        ),
        t('Calculation: If 1 item = $10,   then 2+ items = $10'),
      ],
    },
    {
      label: t('Per Unit'),
      description: t('Multiply fee by number of items'),
      value: 'perUnit',
      info: [
        t('Ideal when each item adds to the shipping cost. eg: laptops, books, etc.'),
        t('Calculation: If 1 item = $10,   then 2+ items = $20'),
      ],
    },
    {
      label: t('Incremental'),
      description: t('Base fee + extra charge per additional item'),
      value: 'baseIncremental',
      info: [
        t(
          'Great for items where shipping a few costs the same, but bulk adds extra fees. Set a base price, then add a small fee per item to balance the cost. eg: small electronics, apparel, etc.',
        ),
        t('Calculation: If 1 item = $10, increment rate = $2, then 2 items = $10 + (1×2) = $12'),
      ],
    },
  ]

  const getFirstShippingRateError = () => {
    if (errors.shippingRates) {
      if (typeof errors.shippingRates.message === 'string') {
        return errors.shippingRates.message
      }

      if (Array.isArray(errors.shippingRates)) {
        for (const rateError of errors.shippingRates) {
          if (rateError?.country?.message) return rateError.country.message
          if (rateError?.baseRate?.message) return rateError.baseRate.message
          if (rateError?.incrementRate?.message) return rateError.incrementRate.message
        }
      }
    }

    return undefined
  }

  return (
    <>
      <Button
        variant="solid"
        colorScheme="primary1"
        size="lg"
        width="full"
        rightIcon={<PiPlus />}
        onClick={shippingFeeModal.onOpen}
      >
        {t('Add shipping fees')}
      </Button>
      <Modal
        {...shippingFeeModal}
        title={isEdit ? t('Edit shipping fees') : t('Add shipping fees')}
        bodyProps={{ as: VStack, gap: 6, py: 6 }}
        size="3xl"
        scrollBehavior="inside"
      >
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={6} w="full" px={2}>
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
                    {ShippingFeesModelOptions.map((model) => (
                      <Radio key={model.value} value={model.value}>
                        <HStack>
                          <Body size="md">{model.label}</Body>
                          <Body size="sm" light>
                            — {model.description}
                          </Body>
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

          <FieldContainer
            title={t('Shipping rates')}
            subtitle={t(
              'Default rate is applied to any region not specified for worldwide shipping. If worldwide shipping is not available, all available countries must be listed below.',
            )}
            error={getFirstShippingRateError()}
            w="full"
          >
            <VStack w="full" alignItems="flex-start" spacing={3} paddingTop={2}>
              <HStack w="full" justifyContent="space-between" px={1}>
                <Box flex={1.5}>
                  <Body size="sm" medium>
                    {t('Country')}
                  </Body>
                </Box>
                <Box flex={1}>
                  <Body size="sm" medium>
                    {t('Base rate ($)')}
                  </Body>
                </Box>
                {watchedFeesModel === 'baseIncremental' && (
                  <Box flex={1}>
                    <Body size="sm" medium>
                      {t('Increment rate ($)')}
                    </Body>
                  </Box>
                )}
                <Box flex={1}>
                  <Body size="sm" medium>
                    {t('Same as Default')}
                  </Body>
                </Box>
                <Box w="40px" />
              </HStack>

              {fields.map((item, index) => {
                const currentShippingRate = watchedShippingRates?.[index]
                if (!currentShippingRate) return null
                const isDefaultRow = currentShippingRate.country === 'default'
                const sameAsDefaultChecked = Boolean(currentShippingRate.sameAsDefault)

                const handleSameAsDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked } = e.target
                  setValue(`shippingRates.${index}.sameAsDefault`, checked)
                  if (checked) {
                    setValue(`shippingRates.${index}.baseRate`, null)
                    if (watchedFeesModel === 'baseIncremental') {
                      setValue(`shippingRates.${index}.incrementRate`, null)
                    }
                  }

                  trigger(`shippingRates.${index}.baseRate`)
                  if (watchedFeesModel === 'baseIncremental') {
                    trigger(`shippingRates.${index}.incrementRate`)
                  }
                }

                return (
                  <HStack key={item.id} w="full" spacing={2} alignItems="flex-start">
                    <Box flex={1.5}>
                      {isDefaultRow ? (
                        <Body pt={2} size="md">
                          {t('Default')}
                        </Body>
                      ) : (
                        <ControlledCustomSelect
                          name={`shippingRates.${index}.country`}
                          control={control}
                          options={countryOptions.filter(
                            (option) =>
                              !(watchedShippingRates || []).find((r, i) => i !== index && r.country === option.value) ||
                              option.value === currentShippingRate.country,
                          )}
                          placeholder={t('Select Country')}
                          size="sm"
                          disableError
                        />
                      )}
                    </Box>
                    <Box flex={1}>
                      <ControlledAmountInput
                        name={`shippingRates.${index}.baseRate`}
                        control={control}
                        placeholder="0"
                        width="80px"
                        currency={RewardCurrency.Usdcent}
                        isDisabled={sameAsDefaultChecked && !isDefaultRow}
                        size="sm"
                        textAlign="center"
                      />
                    </Box>
                    {watchedFeesModel === 'baseIncremental' && (
                      <Box flex={1}>
                        <ControlledAmountInput
                          name={`shippingRates.${index}.incrementRate`}
                          control={control}
                          placeholder="0"
                          width="80px"
                          currency={RewardCurrency.Usdcent}
                          isDisabled={sameAsDefaultChecked && !isDefaultRow}
                          size="sm"
                          textAlign="center"
                        />
                      </Box>
                    )}
                    <HStack flex={1} justifyContent="center">
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

              <Button
                variant="surface"
                colorScheme="neutral1"
                size="md"
                leftIcon={<PiPlus />}
                onClick={() => append({ country: '', sameAsDefault: false, baseRate: null, incrementRate: null })}
                isDisabled={fields.length >= countryOptions.length + 1}
              >
                {t('Add new country')}
              </Button>
            </VStack>
          </FieldContainer>

          <Button type="submit" colorScheme="primary1" size="lg" width="full">
            {isEdit ? t('Save changes') : t('Add configuration')}
          </Button>
        </VStack>
      </Modal>
    </>
  )
}
