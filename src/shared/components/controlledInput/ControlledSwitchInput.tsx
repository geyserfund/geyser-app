import { HStack, Switch, SwitchProps, VStack } from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

import { Body } from '../typography'

type Props = UseControllerProps<any, any> &
  Omit<SwitchProps, 'size'> & {
    label: string
    error?: string
    defaultChecked?: boolean
  }

export function ControlledSwitchInput(props: Props) {
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
      <HStack>
        <Body size="sm" medium>
          {props.label}
        </Body>
        <Switch
          {...field}
          {...props}
          onChange={handleChange}
          sx={{ '--switch-track-width': '2.4rem' }}
          value={field?.value || props.value || false}
          defaultChecked={field?.value || props.value || false}
        />
      </HStack>
      {props.error && (
        <Body size="sm" fontWeight="400" color="secondary.red">
          {props.error}
        </Body>
      )}
    </VStack>
  )
}
