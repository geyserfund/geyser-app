import { Button, ButtonProps, Stack, StackProps } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  ControlledTextInput,
  ControlledTextInputProps,
} from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import {
  BeehiivNewsletterPreferenceKey,
  BeehiivTag,
  DEFAULT_BEEHIIV_NEWSLETTER_TAGS,
} from '@/shared/constants/beehiiv.ts'
import { useBeehiivNewsletterSubscribeMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const schema = yup.object({
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
})

type SubscriptionFormData = {
  email: string
}

type SubscribeFormProps = StackProps & {
  /** Beehiiv newsletter preferences to enable when the subscriber is created. */
  preferences?: Partial<Record<BeehiivNewsletterPreferenceKey, boolean>>
  tags?: BeehiivTag[]
  buttonProps?: ButtonProps
  inputProps?: Omit<ControlledTextInputProps, 'control' | 'name' | 'error'>
}

/** Inline email subscription form that creates a Beehiiv subscriber. */
export const SubscribeForm = ({
  preferences,
  tags = DEFAULT_BEEHIIV_NEWSLETTER_TAGS,
  buttonProps,
  inputProps,
  ...props
}: SubscribeFormProps) => {
  const toast = useNotification()

  const [submitting, setSubmitting] = useState(false)
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

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      setSubmitting(true)

      await subscribeToBeehiivNewsletter({
        variables: {
          input: {
            email: data.email,
            newsletterMonthly: preferences?.newsletterMonthly ?? true,
            productUpdates: preferences?.productUpdates ?? true,
            projectSpotlights: preferences?.projectSpotlights ?? true,
            tags,
          },
        },
      })

      reset()

      toast.success({
        title: t('Successfully subscribed'),
      })
    } catch {
      toast.error({
        title: t('Something went wrong.'),
        description: t('Please try again'),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Stack
      as="form"
      style={{ width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="800px"
      spacing={4}
      alignItems="flex-start"
      direction={{ base: 'column', md: 'row' }}
      {...props}
    >
      <ControlledTextInput
        name="email"
        size="lg"
        control={control}
        placeholder={t('satoshi@gmx.com')}
        error={errors.email?.message}
        required
        {...inputProps}
        containerProps={{ flex: 1, w: 'full', ...(inputProps?.containerProps ?? {}) }}
      />
      <Button
        size="xl"
        variant="outline"
        width={{ base: 'full', md: 'auto' }}
        minWidth={{ md: '150px' }}
        colorScheme="gray"
        type="submit"
        isLoading={submitting}
        {...buttonProps}
      >
        {buttonProps?.children ?? t('Get Updates')}
      </Button>
    </Stack>
  )
}
