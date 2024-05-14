import { Box, Input, InputGroup, InputProps, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { useBTCConverter } from '../../helpers'
import { Satoshis, USDCents } from '../../types'
import { ProjectGoalCurrency } from '../../types'
import { commaFormatted } from '../../utils'

type Props = UseControllerProps<FieldValues> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    label: string
    currency: ProjectGoalCurrency
    description?: string
  }

export function ControlledGoalAmount(props: Props) {
  const { field } = useController(props)

  const [unformattedValue, setUnformattedValue] = useState(field.value || '')

  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

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

  const formattedUsdAmount = useCallback(() => {
    const amount = getUSDAmount(field.value as Satoshis)
    if (amount < 1) return 'less than $1'
    return `$${commaFormatted(Math.round(amount))}`
  }, [getUSDAmount, field.value])

  const formattedSatsAmount = useCallback(() => {
    const amount = getSatoshisFromUSDCents(field.value as USDCents)
    if (amount < 1) return '0 sats'
    return `${commaFormatted(Math.round(amount * 100))} sats`
  }, [getSatoshisFromUSDCents, field.value])

  const formattedValue = commaFormatted(unformattedValue)

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
            {props.currency === ProjectGoalCurrency.Btcsat ? formattedUsdAmount() : formattedSatsAmount()}
          </Text>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}
