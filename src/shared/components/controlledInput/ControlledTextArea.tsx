import { Textarea, TextareaProps } from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FieldContainer } from '../form'
import { Body } from '../typography'

type Props = UseControllerProps<any, any> &
  TextareaProps & {
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

  const label = props.label ? (
    <Body size={props.size || 'md'} medium>
      {props.label}
    </Body>
  ) : null

  const description = props.description ? (
    <Body size={'md'} light pr={{ base: 0, lg: 2 }} mb={2}>
      {props.description}
    </Body>
  ) : null

  return (
    <FieldContainer title={label} subtitle={description} error={props.error}>
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
