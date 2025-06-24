import { StackProps } from '@chakra-ui/react'
import { MultiValue, SingleValue } from 'chakra-react-select'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { CustomSelect, CustomSelectProps } from '@/components/ui/CustomSelect.tsx'
import { FieldContainer, FieldContainerProps } from '@/shared/components/form/FieldContainer.tsx'

export interface ControlledCustomSelectProps<FormValues extends FieldValues, Option, IsMulti extends boolean = false>
  extends Omit<
      CustomSelectProps<Option, IsMulti>,
      'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'options'
    >,
    Pick<FieldContainerProps, 'info' | 'boldSubtitle' | 'boldTitle'> {
  name: Path<FormValues>
  label?: string
  control: Control<FormValues>
  containerProps?: StackProps
  defaultValue?: any
  onChange?: (value: SingleValue<Option> | MultiValue<Option>) => void
  onBlur?: () => void
  required?: boolean
  width?: string | number
  options: readonly Option[]
  description?: string
  placeholder?: string
  error?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  fontSize?: string
  disableErrorLabel?: boolean
  isDisabled?: boolean
}

export const ControlledCustomSelect = <FormValues extends FieldValues, Option, IsMulti extends boolean = false>(
  props: ControlledCustomSelectProps<FormValues, Option, IsMulti>,
) => {
  const { field, fieldState } = useController({ name: props.name, control: props.control })

  const getOptionValue = props.getOptionValue || ((opt: any) => opt?.value)

  const value = props.isMulti
    ? field.value
      ? props.options.filter((option) => field.value.includes(getOptionValue(option)))
      : []
    : field.value
    ? props.options.find((option) => getOptionValue(option) === field.value) || null
    : null

  return (
    <FieldContainer
      title={props.label}
      required={props.required}
      error={props.disableErrorLabel ? undefined : fieldState.error?.message}
      info={props.info}
      subtitle={props.description}
      size={props.size}
      boldSubtitle={props.boldSubtitle}
      boldTitle={props.boldTitle}
      {...props.containerProps}
    >
      <CustomSelect<Option, IsMulti>
        {...props}
        name={field.name}
        isDisabled={props.isDisabled}
        placeholder={props.placeholder}
        options={props.options}
        isMulti={props.isMulti}
        getOptionValue={props.getOptionValue}
        getOptionLabel={props.getOptionLabel}
        value={value}
        onChange={(selectedOption) => {
          let formValue: any
          if (props.isMulti) {
            formValue = (selectedOption as MultiValue<Option>)?.map((opt) => getOptionValue(opt))
          } else {
            const singleSelected = selectedOption as SingleValue<Option>
            formValue = singleSelected ? getOptionValue(singleSelected) : null
          }

          field.onChange(formValue)
          if (props.onChange) {
            props.onChange(selectedOption)
          }
        }}
        onBlur={() => {
          field.onBlur()
          if (props.onBlur) {
            props.onBlur()
          }
        }}
        isInvalid={Boolean(fieldState.error?.message)}
        errorBorderColor="error.9"
      />
    </FieldContainer>
  )
}
