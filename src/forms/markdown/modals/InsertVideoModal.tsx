import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Modal } from '../../../components/layouts/Modal'
import { useModal, UseModalReturn } from '../../../hooks/useModal'
import { TextField } from '../../components/TextField'
import { validateYouTubeUrl } from '../../validations/youtube'

const schema = yup.object({
  url: yup
    .string()
    .required('URL is required')
    .test('youtube', 'Must be a valid youtube URL', validateYouTubeUrl),
})

export interface MarkdownVideo {
  url: string
}

export const useInsertVideoModal = (onSubmit: SubmitHandler<MarkdownVideo>) => {
  return useModal<{ onSubmit: SubmitHandler<MarkdownVideo> }>({}, { onSubmit })
}

export const InsertVideoModal = ({
  props: { onSubmit },
  ...modal
}: UseModalReturn<{ onSubmit: SubmitHandler<MarkdownVideo> }>) => {
  const form = useForm<MarkdownVideo>({
    resolver: yupResolver(schema),
  })

  return (
    <Modal title="Insert video" {...modal}>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
        }}
      >
        <VStack spacing={4}>
          <TextField
            control={form.control}
            name="url"
            label="Youtube URL"
            required
          />
          <Button w="100%" variant="primary" type="submit">
            Insert
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
