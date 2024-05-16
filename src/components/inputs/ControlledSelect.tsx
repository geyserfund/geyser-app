import { InputGroup, Select, Text, VStack } from '@chakra-ui/react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props = UseControllerProps<FieldValues> & {
  width?: string | number
  label: string
  options: { value: string; label: string }[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: () => void
  isDisabled?: boolean
  description?: string
  placeholder?: string
  defaultValue?: string | null
}

export function ControlledSelect(props: Props) {
  const { field } = useController(props)

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
      <InputGroup width={props.width || '100%'}>
        <Select
          {...field}
          onChange={(e) => {
            field.onChange(e.target.value)
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
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputGroup>
    </VStack>
  )
}
