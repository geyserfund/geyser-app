import { Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { postCampaignLaunchRegistration } from '@/api/airtable.ts'
import { ControlledTextArea } from '@/shared/components/controlledInput/ControlledTextArea.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { useNotification } from '@/utils/index.ts'

type CampaignRegisterFormData = {
  email: string
  description: string
}

const campaignRegisterSchema = yup.object().shape({
  email: yup.string().required(t('Email is required')).email(t('Invalid email address')),
  description: yup.string().required(t('Description is required')),
})

/** RegisterCampaignLaunch: CTA card to register interest for campaign launch */
export const RegisterCampaignLaunch = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const toast = useNotification()
  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CampaignRegisterFormData>({
    resolver: yupResolver(campaignRegisterSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      description: '',
    },
  })

  const onSubmit = async (data: CampaignRegisterFormData) => {
    try {
      setSubmitting(true)
      await postCampaignLaunchRegistration(data)
      toast.success({
        title: t('Campaign launch registered'),
        description: t('You will be notified when the campaign launch is available'),
      })
      reset()
      onClose()
    } catch (error) {
      toast.error({
        title: t('Something went wrong.'),
        description: t('Please try again'),
      })
    }

    setSubmitting(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={t('Register your campaign launch')}
      subtitle={t('Interested in launching an All or Nothing campaign? Register interest below!.')}
    >
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} w="full" gap={4} align="stretch">
        <VStack w="full" gap={4}>
          <ControlledTextInput
            name="email"
            control={control}
            label={t('Email')}
            placeholder={t('Enter your email')}
            error={errors.email?.message}
            isRequired
          />

          <ControlledTextArea
            name="description"
            control={control}
            label={t('Description')}
            placeholder={t('Tell us about your campaign')}
            error={errors.description?.message}
            isRequired
            rows={5}
          />
        </VStack>

        <HStack w="full" justify="center">
          <Button type="submit" colorScheme="primary1" variant="solid" size="lg" isLoading={submitting}>
            {t('Register now')}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}
