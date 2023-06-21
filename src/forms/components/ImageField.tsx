import { FormControl, InputProps, Text } from '@chakra-ui/react'
import { Control, Controller, FieldValue } from 'react-hook-form'

import { FileUpload } from '../../components/molecules'
import { UploadBox } from '../../components/ui'

export type ImageFieldProps = InputProps & {
  name: string
  placeholder?: string
  caption?: string
  label?: string
  required?: boolean
  control: Control<FieldValue<any>, any>
}

export const ImageField = ({
  control,
  name,
  placeholder,
  caption,
  required,
  label,
  ...props
}: ImageFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl>
          <Text mb={2}>
            {label || name}
            {required ? '*' : ''}
          </Text>
          <FileUpload
            showcase
            caption={caption}
            src={field.value}
            onUploadComplete={field.onChange}
            onDeleteClick={() => field.onChange('')}
            childrenOnLoading={<UploadBox loading />}
          >
            <UploadBox
              h={10}
              title={field.value ? 'Change image' : undefined}
            />
          </FileUpload>
          {fieldState.error && (
            <Text mt={4} color="secondary.red">
              {fieldState.error.message?.toString() || ''}
            </Text>
          )}
        </FormControl>
      )}
    />
  )
}
