import { Input, InputProps, Text, VStack } from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props = UseControllerProps<any, any> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    description?: string
    label: string
    error?: string
  }

export function ControlledTextInput(props: Props) {
  const { field } = useController(props)

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

  return (
    <VStack display="flex" alignItems="flex-start" width="100%">
      {props.label && (
        <Text fontSize="16px" fontWeight="500">
          {props.label}
        </Text>
      )}
      {props.description && (
        <Text fontSize="14px" fontWeight="400">
          {props.description}
        </Text>
      )}
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
      />
      {props.error && (
        <Text fontSize="14px" fontWeight="400" color="secondary.red">
          {props.error}
        </Text>
      )}
    </VStack>
  )
}
