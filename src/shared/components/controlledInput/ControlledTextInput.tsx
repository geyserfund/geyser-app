import { Input, InputGroup, InputProps, InputRightAddon } from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FieldContainer } from '../form'

type Props = UseControllerProps<any, any> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    description?: string
    label?: string
    error?: React.ReactNode
    rightAddon?: React.ReactNode
    required?: boolean
  }

export function ControlledTextInput(props: Props) {
  const { field, formState } = useController(props)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (field?.onBlur) {
      field.onBlur()
    }

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field?.onChange) {
      field.onChange(e)
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const error = formState.errors[props.name]?.message
    ? `${formState.errors[props.name]?.message}`
    : props.error
    ? props.error
    : ''

  return (
    <FieldContainer required={props.required} title={props.label} subtitle={props.description} error={props.error}>
      <InputGroup>
        <Input
          {...field}
          {...props}
          variant="outline"
          colorScheme="primary.400"
          borderColor="neutral.200"
          borderRadius="8px"
          borderWidth="2px"
          ref={props.inputRef}
          isDisabled={props.isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          width={props.width || '100%'}
          value={field?.value || props.value || ''}
          isInvalid={Boolean(error)}
        />
        {props.rightAddon && <InputRightAddon>{props.rightAddon}</InputRightAddon>}
      </InputGroup>
    </FieldContainer>
  )
}
