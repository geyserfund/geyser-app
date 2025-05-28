import { Checkbox, CheckboxProps, VStack } from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

import { Body } from '../typography'

type Props = UseControllerProps<any, any> &
  CheckboxProps & {
    label: string
    error?: string
    defaultChecked?: boolean
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
    <VStack alignItems="flex-start" width="100%">
      <Checkbox {...field} {...props} onChange={handleChange} defaultChecked={props.defaultValue || false}>
        <Body size={props.size || 'md'} color="neutral.700">
          {props.label}
        </Body>
      </Checkbox>
      {props.error && (
        <Body size="sm" fontWeight="400" color="secondary.red">
          {props.error}
        </Body>
      )}
    </VStack>
  )
}
