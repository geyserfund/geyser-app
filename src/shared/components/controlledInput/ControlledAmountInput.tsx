import { Input, InputGroup, InputProps, InputRightAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { RewardCurrency } from '@/types'
import { toInt } from '@/utils'

import { FieldContainer } from '../form'
import { Body } from '../typography'

type Props = UseControllerProps<any, any> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    description?: string
    label?: string
    error?: React.ReactNode
    rightAddon?: React.ReactNode
    required?: boolean
    infoTooltip?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    currency: RewardCurrency
  }

export function ControlledAmountInput(props: Props) {
  const { field, formState } = useController(props)
  const [formattedValue, setFormattedValue] = useState('')

  useEffect(() => {
    if (field.value) {
      let initialValue = field.value
      if (props.currency === RewardCurrency.Usdcent) {
        initialValue = (initialValue / 100).toFixed(2)
      }

      setFormattedValue(initialValue.toString())
    } else {
      setFormattedValue('')
    }
  }, [field.value, props.currency])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    let formattedAmount = value
    if (props.currency === RewardCurrency.Usdcent) {
      formattedAmount = parseFloat(value).toFixed(2)
    } else {
      formattedAmount = toInt(value).toFixed(0)
    }

    setFormattedValue(formattedAmount)
    field.onChange(
      props.currency === RewardCurrency.Usdcent ? toInt(parseFloat(formattedAmount) * 100) : toInt(formattedAmount),
    )

    if (field?.onBlur) {
      field.onBlur()
    }

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setFormattedValue(value)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const error = formState.errors[props.name]?.message
    ? `${formState.errors[props.name]?.message}`
    : props.error
    ? props.error
    : ''

  const title =
    props.label || props.infoTooltip ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Body size="sm" medium>
          {props.label}
        </Body>
        {props.infoTooltip && props.infoTooltip}
      </div>
    ) : null

  return (
    <FieldContainer required={props.required} title={title} subtitle={props.description} error={error}>
      <InputGroup>
        <Input
          {...field}
          {...props}
          variant="outline"
          colorScheme="primary1.1"
          borderColor="neutral1.6"
          borderRadius="8px"
          borderWidth="1px"
          ref={props.inputRef}
          isDisabled={props.isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          width={props.width || '100%'}
          value={formattedValue}
          isInvalid={Boolean(error)}
          size={props.size || 'md'}
        />
        {props.rightAddon && <InputRightAddon>{props.rightAddon}</InputRightAddon>}
      </InputGroup>
    </FieldContainer>
  )
}
