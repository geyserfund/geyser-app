import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createSubscriber } from '@/api/flodesk.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { FollowBellIllurationsUrl } from '@/shared/constants/index.ts'
import { useNotification } from '@/utils/index.ts'

const schema = yup.object({
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
})

type SubscriptionFormData = {
  email: string
}

interface SubscriptionFormProps {
  title?: string
  segmentIds?: string[]
  customFields?: Record<string, string>
  isOpen: boolean
  onClose: () => void
}

export const SubscriptionForm = ({ title, segmentIds, customFields, isOpen, onClose }: SubscriptionFormProps) => {
  const toast = useNotification()

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const resetForm = () => {
    onClose()
    setSuccess(false)
    setSubmitting(false)
    reset()
  }

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      setSubmitting(true)
      let records = {} as any

      records = {
        email: data.email,
        custom_fields: customFields,
      }

      records.segment_ids = segmentIds

      await createSubscriber(records)

      setSuccess(true)

      toast.success({
        title: t('Succesfully subscribed'),
      })
      setTimeout(() => {
        resetForm()
      }, 3000)
    } catch (error) {
      toast.error({
        title: t('Something went wrong.'),
        description: t('Please try again'),
      })
    }

    setSubmitting(false)
  }

  const renderContent = () => {
    if (success) {
      return (
        <VStack spacing={6} w="full" align="flex-start" p={4}>
          <HStack w="full" justifyContent="center">
            <Image height="200px" width="auto" src={FollowBellIllurationsUrl} alt="Email illustration" />
          </HStack>
          <VStack align="flex-start" spacing={2}>
            <Body medium>{t('You have successfully subscribed!')}</Body>
            <Body light>{t('Thank you for joining our community.')}</Body>
          </VStack>
        </VStack>
      )
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <ControlledTextInput
            name="email"
            control={control}
            label={t('Email')}
            placeholder={t('Enter your email')}
            error={errors.email?.message}
            required
          />
          <Button type="submit" colorScheme="primary1" isLoading={submitting}>
            {t('Subscribe')}
          </Button>
        </VStack>
      </form>
    )
  }

  return (
    <Modal title={title ?? t('Subscribe')} isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </Modal>
  )
}
