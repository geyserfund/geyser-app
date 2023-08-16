import {
  FormControl,
  FormControlProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react'
import { Control, Controller, FieldValue } from 'react-hook-form'

import { FieldContainer, FieldContainerProps } from './FieldContainer'

export type ReactHookTextAreaProps = TextareaProps & {
  name: string
  placeholder?: string
  label?: string
  caption?: string
  required?: boolean
  control: Control<FieldValue<any>, any>
  formControlProps: FormControlProps
  fieldContainerProps: Omit<FieldContainerProps, 'children'>
}

export const ReactHookTextArea = ({
  control,
  name,
  placeholder,
  required,
  label,
  caption,
  formControlProps,
  fieldContainerProps,
  ...props
}: ReactHookTextAreaProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl {...formControlProps}>
          <FieldContainer
            title={
              label && (
                <>
                  {label}
                  {required ? '*' : ''}
                </>
              )
            }
            subtitle={caption}
            error={
              fieldState.error
                ? fieldState.error.message?.toString() || ''
                : null
            }
            {...fieldContainerProps}
          >
            <Textarea
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
