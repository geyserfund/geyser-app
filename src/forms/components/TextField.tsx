import { FormControl, Input, InputProps } from '@chakra-ui/react'
import { Control, Controller, FieldValue } from 'react-hook-form'

import { FieldContainer } from './FieldContainer'

export type TextFieldProps = InputProps & {
  name: string
  placeholder?: string
  label?: string
  caption?: string
  required?: boolean
  control: Control<FieldValue<any>, any>
}

export const TextField = ({
  control,
  name,
  placeholder,
  required,
  label,
  caption,
  ...props
}: TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl>
          <FieldContainer
            title={
              <>
                {label || name}
                {required ? '*' : ''}
              </>
            }
            subtitle={caption}
            error={
              fieldState.error
                ? fieldState.error.message?.toString() || ''
                : null
            }
          >
            <Input
              type="text"
              placeholder={placeholder || 'Type here'}
              {...props}
              {...field}
            />
          </FieldContainer>
        </FormControl>
      )}
    />
  )
}
