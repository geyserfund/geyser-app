import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  StackProps,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FieldContainer } from '../form'
import { Body } from '../typography'

export type ControlledTextInputProps = UseControllerProps<any, any> &
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
    displayValue?: string
    fontSize?: string
    numberOnly?: boolean
    minimal?: boolean
    containerProps?: StackProps
  }

export const ControlledTextInput = (props: ControlledTextInputProps) => {
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
    if (props.numberOnly) {
      const numericValue = e.target.value.replace(/[^0-9]/g, '')
      e.target.value = numericValue
    }

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

  const title =
    props.label || props.infoTooltip ? (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <Body size={props.size || 'lg'} medium>
          {props.label}
        </Body>
        {props.infoTooltip && props.infoTooltip}
      </div>
    ) : null

  const InputContent = (
    <InputGroup size={props.size || 'md'}>
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
        value={props.displayValue || field?.value || props.value || ''}
        isInvalid={Boolean(error)}
        fontSize={props.fontSize || 'md'}
      />
      {props.rightAddon && (
        <InputRightAddon padding={0} borderRadius="0 8px 8px 0" backgroundColor="transparent">
          {props.rightAddon}
        </InputRightAddon>
      )}
    </InputGroup>
  )

  if (props.minimal) {
    return (
      <VStack spacing={1} alignItems="start" w="100%" minHeight="56px">
        <FormControl isInvalid={Boolean(error)} h="100%">
          {InputContent}
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </VStack>
    )
  }

  return (
    <FieldContainer
      size={props.size}
      required={props.required}
      title={title}
      subtitle={props.description}
      error={error}
      {...props.containerProps}
    >
      {InputContent}
    </FieldContainer>
  )
}
