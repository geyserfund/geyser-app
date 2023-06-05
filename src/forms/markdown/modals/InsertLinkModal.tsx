import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Modal } from '../../../components/layouts/Modal'
import { useModal, UseModalReturn } from '../../../hooks/useModal'
import { TextField } from '../../components/TextField'

const schema = yup.object({
  label: yup.string(),
  url: yup.string().required('URL is required').url('Must be a valid URL'),
})

export interface MarkdownLink {
  label?: string
  url: string
}

export const useInsertLinkModal = (onSubmit: SubmitHandler<MarkdownLink>) => {
  return useModal<{ onSubmit: SubmitHandler<MarkdownLink> }>({}, { onSubmit })
}

export const InsertLinkModal = ({
  props: { onSubmit },
  ...modal
}: UseModalReturn<{ onSubmit: SubmitHandler<MarkdownLink> }>) => {
  const form = useForm<MarkdownLink>({
    resolver: yupResolver(schema),
  })

  return (
    <Modal title="Insert link" {...modal}>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
        }}
      >
        <VStack spacing={4}>
          <TextField control={form.control} name="url" label="URL" required />
          <TextField control={form.control} name="label" label="Label" />
          <Button w="100%" variant="primary" type="submit">
            Insert
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
