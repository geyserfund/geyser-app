import { Text, Textarea, TextareaProps, VStack } from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props = UseControllerProps<FieldValues> &
  Omit<TextareaProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    label: string
    description?: string
    error?: string
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
    <VStack display="flex" alignItems="flex-start" width="100%">
      <Text fontSize="16px" fontWeight="500">
        {props.label}
      </Text>
      {props.description && (
        <Text fontSize="14px" fontWeight="400">
          {props.description}
        </Text>
      )}
      <Textarea
        {...field}
        {...props}
        ref={props.inputRef}
        onBlur={handleBlur}
        onChange={handleChange}
        width={props.width || '100%'}
        value={field.value || ''}
        rows={props.rows || 3}
        resize="none"
      />
      {props.error && (
        <Text fontSize="14px" fontWeight="400" color="secondary.red">
          {props.error}
        </Text>
      )}
    </VStack>
  )
}
