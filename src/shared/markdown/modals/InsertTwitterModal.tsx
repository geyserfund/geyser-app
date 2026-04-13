import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { type UseModalReturn, useModal } from '@/shared/hooks/useModal.tsx'

import { TextField } from '../components/TextField'
import { validateTwitterUrl } from '../validations/twitter.ts'

type TwitterModalValues = {
  url: string
}

export const useInsertTwitterModal = (onSubmit: SubmitHandler<TwitterModalValues>) => {
  return useModal<{ onSubmit: SubmitHandler<TwitterModalValues> }>({}, { onSubmit })
}

/** Modal used by the markdown toolbar to insert tweet URLs using the legacy project UI. */
export const InsertTwitterModal = ({
  props: { onSubmit },
  isOpen,
  onClose,
}: UseModalReturn<{ onSubmit: SubmitHandler<TwitterModalValues> }>) => {
  const schema = yup.object({
    url: yup.string().required(t('URL is required')).test('twitter', t('Must be a valid twitter URL'), validateTwitterUrl),
  })

  const form = useForm<TwitterModalValues>({
    resolver: yupResolver(schema),
  })

  return (
    <Modal title={t('Insert tweet')} isOpen={isOpen} onClose={onClose}>
      <form
        style={{ width: '100%' }}
        onSubmit={(event) => {
          event.stopPropagation()
          event.preventDefault()
          form.handleSubmit(onSubmit)(event)
        }}
      >
        <VStack spacing={4} width="100%">
          <TextField control={form.control} name="url" label={t('Tweet URL')} required width="100%" />
          <Button w="100%" variant="solid" colorScheme="primary1" type="submit">
            {t('Insert')}
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
