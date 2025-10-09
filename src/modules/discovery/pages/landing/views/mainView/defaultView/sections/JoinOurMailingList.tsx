import { Button, HStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createSubscriber } from '@/api/flodesk.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { useNotification } from '@/utils/index.ts'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

const schema = yup.object({
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
})

type SubscriptionFormData = {
  email: string
}

export const JoinOurMailingList = () => {
  const toast = useNotification()

  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      setSubmitting(true)
      let records = {} as any

      records = {
        email: data.email,
      }

      await createSubscriber(records)

      reset()

      toast.success({
        title: t('Succesfully subscribed'),
      })
    } catch (error) {
      toast.error({
        title: t('Something went wrong.'),
        description: t('Please try again'),
      })
    }

    setSubmitting(false)
  }

  return (
    <ProjectRowLayout
      w="full"
      title={t('Join our mailing list')}
      subtext={t('Get our monthly project udpates and stay up to date to what is happening in the Bitcoin space')}
    >
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <HStack w="full" flexWrap="wrap" spacing={4} alignItems="flex-start">
          <ControlledTextInput
            name="email"
            size="lg"
            containerProps={{ maxWidth: '800px' }}
            backgroundColor="white"
            control={control}
            placeholder={t('satoshi@gmx.com')}
            error={errors.email?.message}
            required
          />
          <Button size="xl" variant="outline" minWidth="150px" colorScheme="gray" type="submit" isLoading={submitting}>
            {t('Get Updates')}
          </Button>
        </HStack>
      </form>
    </ProjectRowLayout>
  )
}
