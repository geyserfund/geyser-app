import { Textarea, TextareaProps } from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FieldContainer } from '../form'

type Props = UseControllerProps<any, any> &
  Omit<TextareaProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    label: string
    description?: string
    error?: React.ReactNode
    resize?: 'none' | 'vertical' | 'horizontal'
  }

export function ControlledTextArea(props: Props) {
  const { field } = useController(props)

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (field?.onBlur) {
      field.onBlur()
    }

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (field?.onChange) {
      field.onChange(e)
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <FieldContainer title={props.label} subtitle={props.description} error={props.error}>
      <Textarea
        {...field}
        {...props}
        ref={props.inputRef}
        borderColor="neutral.200"
        borderRadius="8px"
        borderWidth="1px"
        onBlur={handleBlur}
        onChange={handleChange}
        width={props.width || '100%'}
        value={field.value || ''}
        rows={props.rows || 3}
        resize={props.resize || 'none'}
      />
    </FieldContainer>
  )
}
