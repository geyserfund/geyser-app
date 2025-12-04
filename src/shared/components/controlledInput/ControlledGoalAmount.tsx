import { Box, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { ProjectGoalCurrency } from '../../../types'
import { commaFormatted } from '../../utils/formatData'
import { useCurrencyFormatter } from '../../utils/hooks/useCurrencyFormatter.ts'
import { FieldContainer } from '../form'
import { Body } from '../typography'

type Props = UseControllerProps<any, any> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    label: string
    currency: ProjectGoalCurrency
    description?: string
    error?: string
  }

export const ControlledGoalAmount = (props: Props) => {
  const { field } = useController(props)

  const [unformattedValue, setUnformattedValue] = useState(field.value || '')
  const [formattedValue, setFormattedValue] = useState('')

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  useEffect(() => {
    setFormattedValue(commaFormatted(field.value))
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
    if (value.length > 10) {
      value = value.substring(0, 10)
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
  const satsAmount = formatSatsAmount(field.value * 100)

  return (
    <FieldContainer title={props.label} subtitle={props.description} error={props.error}>
      <InputGroup width={props.width || '100%'}>
        <Box position="relative" width="100%">
          <Input
            {...props}
            variant="outline"
            colorScheme="primary1.9"
            borderColor="neutral1.2"
            borderRadius="8px"
            borderWidth="2px"
            ref={props.inputRef}
            isDisabled={props.isDisabled}
            onBlur={handleBlur}
            onChange={handleChange}
            value={formattedValue}
            pl={props.currency === ProjectGoalCurrency.Usdcent ? '2rem' : '3rem'}
            fontSize="16px"
            fontWeight="400"
          />
          <Body
            size="md"
            position="absolute"
            top="50%"
            left="1rem"
            transform="translateY(-50%)"
            pointerEvents="none"
            color={props.isDisabled ? 'neutral1.9' : 'neutral1.11'}
            opacity={props.isDisabled ? 0.5 : 1}
          >
            {props.currency === ProjectGoalCurrency.Usdcent ? '$' : 'Sats'}
          </Body>
        </Box>
        <InputRightElement width="50%" justifyContent="flex-end" pr={2}>
          <Body size="md" color={props.isDisabled ? 'neutral1.9' : 'neutral.11'} opacity={props.isDisabled ? 0.5 : 1}>
            {props.currency === ProjectGoalCurrency.Btcsat ? usdAmount : satsAmount}
          </Body>
        </InputRightElement>
      </InputGroup>
    </FieldContainer>
  )
}
