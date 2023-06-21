import { FormControl } from '@chakra-ui/react'
import { Control, Controller, FieldValue } from 'react-hook-form'

import { FileUpload } from '../../components/molecules'
import { UploadBox } from '../../components/ui'
import { FieldContainer } from './FieldContainer'

export type ImageFieldProps = {
  name: string
  caption?: string
  label?: string
  required?: boolean
  control: Control<FieldValue<any>, any>
}

export const ImageField = ({
  control,
  name,
  caption,
  required,
  label,
}: ImageFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl>
          <FieldContainer
            title={
              <>
                {label || name}
                {required ? '*' : ''}
              </>
            }
            subtitle={caption}
            error={
              fieldState.error
                ? fieldState.error.message?.toString() || ''
                : null
            }
          >
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
          </FieldContainer>
        </FormControl>
      )}
    />
  )
}
