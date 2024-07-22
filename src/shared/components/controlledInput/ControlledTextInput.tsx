import { Input, InputGroup, InputProps, InputRightAddon, Text, VStack } from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

type Props = UseControllerProps<any, any> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    description?: string
    label?: string
    error?: string
    rightAddon?: React.ReactNode
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
    <VStack alignItems="flex-start" width="100%" spacing={1}>
      {(props.label || props.description) && (
        <VStack spacing={0} alignItems="flex-start">
          {props.label && (
            <Text fontSize="16px" fontWeight="500">
              {props.label}
            </Text>
          )}
          {props.description && (
            <Text fontSize="12px" fontWeight="400">
              {props.description}
            </Text>
          )}
        </VStack>
      )}
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

      <Text fontSize="14px" fontWeight="400" color="secondary.red">
        {error}
      </Text>
    </VStack>
  )
}
