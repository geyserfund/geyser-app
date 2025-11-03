import { Button, ButtonProps, HStack, StackProps } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createSubscriber } from '@/api/flodesk.ts'
import {
  ControlledTextInput,
  ControlledTextInputProps,
} from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { useNotification } from '@/utils/index.ts'

const schema = yup.object({
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
})

type SubscriptionFormData = {
  email: string
}

type SubscribeFormProps = StackProps & {
  buttonProps?: ButtonProps
  inputProps?: Omit<ControlledTextInputProps, 'control' | 'name' | 'error'>
}

export const SubscribeForm = ({ buttonProps, inputProps, ...props }: SubscribeFormProps) => {
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
    <HStack
      as="form"
      style={{ width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="800px"
      spacing={4}
      alignItems="flex-start"
      {...props}
    >
      <ControlledTextInput
        flex={1}
        name="email"
        size="lg"
        control={control}
        placeholder={t('satoshi@gmx.com')}
        error={errors.email?.message}
        required
        {...inputProps}
      />
      <Button
        size="xl"
        variant="outline"
        minWidth="150px"
        colorScheme="gray"
        type="submit"
        isLoading={submitting}
        {...buttonProps}
      >
        {buttonProps?.children ?? t('Get Updates')}
      </Button>
    </HStack>
  )
}
