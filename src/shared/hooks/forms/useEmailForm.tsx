import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { DEFAULT_BEEHIIV_NEWSLETTER_TAGS } from '@/shared/constants/beehiiv.ts'
import { useBeehiivNewsletterSubscribeMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const schema = yup.object({
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
})

type SubscriptionFormData = {
  email: string
}

export const useEmailForm = () => {
  const toast = useNotification()
  const [subscribeToBeehiivNewsletter] = useBeehiivNewsletterSubscribeMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      setSubmitting(true)
      await subscribeToBeehiivNewsletter({
        variables: {
          input: {
            email: data.email,
            newsletterMonthly: true,
            productUpdates: true,
            projectSpotlights: true,
            tags: DEFAULT_BEEHIIV_NEWSLETTER_TAGS,
          },
        },
      })

      setSubscribed(true)

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

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
    submitting,
    subscribed,
  }
}
