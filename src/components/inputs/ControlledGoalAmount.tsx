import { Box, Input, InputGroup, InputProps, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { useCurrencyFormatter } from '../../modules/project/pages/projectView/hooks/useCurrencyFormatter'
import { ProjectGoalCurrency } from '../../types'
import { centsToDollarsFormatted, commaFormatted } from '../../utils'

type Props = UseControllerProps<FieldValues> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    label: string
    currency: ProjectGoalCurrency
    description?: string
    error?: string
  }

export function ControlledGoalAmount(props: Props) {
  const { field } = useController(props)

  const [unformattedValue, setUnformattedValue] = useState(field.value || '')
  const [formattedValue, setFormattedValue] = useState('')

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  useEffect(() => {
    setFormattedValue(
      props.currency === ProjectGoalCurrency.Usdcent
        ? centsToDollarsFormatted(field.value)
        : commaFormatted(field.value),
    )
  }, [unformattedValue, props.currency, field.value])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (field?.onBlur) {
      field.onBlur()
    }

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length > 12) {
      value = value.substring(0, 11)
    }

    setUnformattedValue(value)

    if (field?.onChange) {
      field.onChange(value)
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const usdAmount = formatUsdAmount(field.value)
  const satsAmount = formatSatsAmount(field.value)

  return (
    <VStack display="flex" alignItems="flex-start" width="100%">
      <Text fontSize="16px" fontWeight="500">
        {props.label}
      </Text>
      {props.description && (
        <Text fontSize="14px" fontWeight="400">
          {props.description}
        </Text>
      )}
      <InputGroup width={props.width || '100%'}>
        <Box position="relative" width="100%">
          <Input
            {...props}
            variant="outline"
            colorScheme="primary.400"
            ref={props.inputRef}
            isDisabled={props.isDisabled}
            onBlur={handleBlur}
            onChange={handleChange}
            value={formattedValue}
            pl={props.currency === ProjectGoalCurrency.Usdcent ? '2rem' : '3rem'}
            fontSize="16px"
            fontWeight="400"
          />
          <Text
            position="absolute"
            top="50%"
            left="1rem"
            transform="translateY(-50%)"
            pointerEvents="none"
            color={props.isDisabled ? 'neutral.400' : 'neutral.600'}
            opacity={props.isDisabled ? 0.5 : 1}
          >
            {props.currency === ProjectGoalCurrency.Usdcent ? '$' : 'Sats'}
          </Text>
        </Box>
        <InputRightElement width="50%" justifyContent="flex-end" pr={2}>
          <Text
            fontSize="16px"
            fontWeight="400"
            color={props.isDisabled ? 'neutral.400' : 'neutral.600'}
            opacity={props.isDisabled ? 0.5 : 1}
          >
            {props.currency === ProjectGoalCurrency.Btcsat ? usdAmount : satsAmount}
          </Text>
        </InputRightElement>
      </InputGroup>
      {props.error && (
        <Text fontSize="14px" fontWeight="400" color="secondary.red">
          {props.error}
        </Text>
      )}
    </VStack>
  )
}
