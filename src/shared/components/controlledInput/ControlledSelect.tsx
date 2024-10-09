import { InputGroup, Select } from '@chakra-ui/react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FieldContainer } from '../form'
import { Body } from '../typography'

type Props = UseControllerProps<any, any> & {
  width?: string | number
  label: string
  options: { value: string; label: string }[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: () => void
  isDisabled?: boolean
  description?: string
  placeholder?: string
  error?: React.ReactNode
  defaultValue?: string | null
  size?: 'sm' | 'md' | 'lg'
}

export function ControlledSelect(props: Props) {
  const { field } = useController(props)

  return (
    <FieldContainer
      title={
        <Body size="sm" medium>
          {props.label}
        </Body>
      }
      subtitle={props.description}
      error={props.error}
    >
      <InputGroup width={props.width || '100%'}>
        <Select
          {...field}
          size={props.size}
          onChange={(e) => {
            field.onChange(e)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          onBlur={() => {
            field.onBlur()
            if (props.onBlur) {
              props.onBlur()
            }
          }}
          value={field.value || props.defaultValue}
          isDisabled={props.isDisabled}
          placeholder={props.defaultValue ? undefined : props.placeholder}
          borderColor="neutral.200"
          borderRadius="8px"
          borderWidth="1px"
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputGroup>
    </FieldContainer>
  )
}
