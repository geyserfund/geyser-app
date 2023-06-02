import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Modal } from '../../../components/layouts/Modal'
import { useModal, UseModalReturn } from '../../../hooks/useModal'
import { ImageField } from '../../components/ImageField'
import { TextField } from '../../components/TextField'

const schema = yup.object({
  url: yup.string().required('Image is required'),
  label: yup.string(),
})

export interface MarkdownImage {
  url: string
  label?: string
}

export const useInsertImageModal = (onSubmit: SubmitHandler<MarkdownImage>) => {
  return useModal<{ onSubmit: SubmitHandler<MarkdownImage> }>({}, { onSubmit })
}

export const InsertImageModal = ({
  props: { onSubmit },
  ...modal
}: UseModalReturn<{ onSubmit: SubmitHandler<MarkdownImage> }>) => {
  const form = useForm<MarkdownImage>({
    resolver: yupResolver(schema),
  })

  return (
    <Modal title="Insert image" {...modal}>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
        }}
      >
        <VStack spacing={4}>
          <ImageField
            control={form.control}
            name="url"
            label="Image"
            required
          />
          <TextField control={form.control} name="label" label="Label" />
          <Button w="100%" variant="primary" type="submit">
            Insert
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
