import { HStack, Switch, SwitchProps, VStack } from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

import { Body } from '../typography'

type Props = UseControllerProps<any, any> &
  Omit<SwitchProps, 'size'> & {
    label?: string
    labelComponent?: React.ReactNode
    error?: string
    defaultChecked?: boolean
    switchPosition?: 'left' | 'right'
  }

export function ControlledSwitchInput({ switchPosition = 'right', ...props }: Props) {
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
    <VStack alignItems="flex-start" width="100%">
      <HStack>
        {switchPosition === 'right' && <>{label}</>}
        <Switch
          {...field}
          {...props}
          onChange={handleChange}
          sx={{ '--switch-track-width': '2.4rem' }}
          size="md"
          value={field?.value || props.value || false}
          defaultChecked={field?.value || props.value || false}
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
