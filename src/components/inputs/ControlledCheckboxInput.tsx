import { Checkbox, CheckboxProps, Text, VStack } from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props = UseControllerProps<FieldValues> &
  Omit<CheckboxProps, 'size'> & {
    label: string
    error?: string
  }

export function ControlledCheckboxInput(props: Props) {
  const { field } = useController(props)

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
      <Checkbox {...field} {...props} onChange={handleChange}>
        <Text fontSize="14px" color="neutral.700">
          {props.label}
        </Text>
      </Checkbox>
      {props.error && (
        <Text fontSize="14px" fontWeight="400" color="secondary.red">
          {props.error}
        </Text>
      )}
    </VStack>
  )
}
