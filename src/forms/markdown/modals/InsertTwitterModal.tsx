import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { Modal } from '../../../components/layouts/Modal'
import { useModal, UseModalReturn } from '../../../hooks/useModal'
import { TextField } from '../../components/TextField'
import { validateTwitterUrl } from '../../validations/twitter'

const schema = yup.object({
  url: yup
    .string()
    .required('URL is required')
    .test('twitter', 'Must be a valid twitter URL', validateTwitterUrl),
})

export interface MarkdownTwitter {
  url: string
}

export const useInsertTwitterModal = (
  onSubmit: SubmitHandler<MarkdownTwitter>,
) => {
  return useModal<{ onSubmit: SubmitHandler<MarkdownTwitter> }>(
    {},
    { onSubmit },
  )
}

export const InsertTwitterModal = ({
  props: { onSubmit },
  ...modal
}: UseModalReturn<{ onSubmit: SubmitHandler<MarkdownTwitter> }>) => {
  const { t } = useTranslation()
  const form = useForm<MarkdownTwitter>({
    resolver: yupResolver(schema),
  })

  return (
    <Modal title={t('Insert tweet')} {...modal}>
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
            label="Tweet URL"
            required
          />
          <Button w="100%" variant="primary" type="submit">
            {t('Insert')}
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
