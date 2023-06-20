import { FormControl, Input, InputProps, Text } from '@chakra-ui/react'
import { Control, Controller, FieldValue } from 'react-hook-form'

export type TextFieldProps = InputProps & {
  name: string
  placeholder?: string
  label?: string
  required?: boolean
  control: Control<FieldValue<any>, any>
}

export const TextField = ({
  control,
  name,
  placeholder,
  required,
  label,
  ...props
}: TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl>
          <Text mb={2}>
            {label || name}
            {required ? '*' : ''}
          </Text>
          <Input
            type="text"
            placeholder={placeholder || 'Type here'}
            {...props}
            {...field}
          />
          {fieldState.error && (
            <Text mt={4} color="secondary.red">
              {fieldState.error.message?.toString() || ''}
            </Text>
          )}
        </FormControl>
      )}
    />
  )
}
