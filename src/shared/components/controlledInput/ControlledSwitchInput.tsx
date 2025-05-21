import { HStack, StackProps, Switch, SwitchProps, VStack } from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

import { Body } from '../typography'

export type ControlledSwitchInputProps = UseControllerProps<any, any> &
  Omit<SwitchProps, 'size'> & {
    label?: string
    labelComponent?: React.ReactNode
    error?: string
    switchPosition?: 'left' | 'right'
    containerProps?: StackProps
  }

export function ControlledSwitchInput({
  switchPosition = 'right',
  containerProps,
  ...props
}: ControlledSwitchInputProps) {
  const { field } = useController(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field?.onChange) {
      field.onChange(e)
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const label = props.labelComponent ? props.labelComponent : <Body size="md">{props.label}</Body>

  return (
    <VStack alignItems="flex-start" width="100%" {...containerProps}>
      <HStack>
        {switchPosition === 'right' && <>{label}</>}
        <Switch
          {...field}
          onChange={handleChange}
          sx={{ '--switch-track-width': '2.4rem' }}
          size="md"
          value={field?.value || props.value || false}
          {...props}
        />
        {switchPosition === 'left' && <>{label}</>}
        {props.error && (
          <Body size="sm" color="error.9">
            {props.error}
          </Body>
        )}
      </HStack>
    </VStack>
  )
}
