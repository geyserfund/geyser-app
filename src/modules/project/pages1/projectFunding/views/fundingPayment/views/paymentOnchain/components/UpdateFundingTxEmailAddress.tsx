import { Button, Stack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { PiMailbox } from 'react-icons/pi'
import * as yup from 'yup'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { ControlledTextInput } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { useFundingTxEmailUpdateMutation } from '@/types'
import { useNotification } from '@/utils'

const schema = yup
  .object({
    email: yup.string().email('Must be a valid email').required('This is required'),
  })
  .required()

export const UpdateFundingTxEmailAddress = () => {
  const { fundingTx } = useFundingTxAtom()
  const { formState } = useFundingFormAtom()

  const toast = useNotification()

  const [updatedEmail, setUpdatedEmail] = useState(formState.email)

  const [updateEmail, { loading }] = useFundingTxEmailUpdateMutation({
    onCompleted(data) {
      toast.success({
        title: t('Email updated'),
        description: t('Your email has been updated.'),
      })
      setUpdatedEmail(data.fundingTxEmailUpdate.email || '')
    },
    onError(error) {
      toast.error({
        title: t('Error'),
        description: t('An error occurred while updating your email.'),
      })
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: { email: string }) => {
    updateEmail({
      variables: {
        input: {
          email: data.email,
          fundingTxId: fundingTx.id,
        },
      },
    })
  }

  return (
    <Feedback
      w="full"
      variant={FeedBackVariant.NEUTRAL}
      title={t('Get notified (optional)')}
      icon={<PiMailbox size="24px" />}
    >
      <VStack w="full" alignItems={'start'}>
        <Body size="lg" medium>
          {t('Get notified via email (optional)')}
        </Body>

        {updatedEmail ? (
          <VStack w="full" spacing="20px" alignItems="start">
            <Body size="sm">
              <Trans
                i18nKey="Check your email ({{email}}) to receive notifications about transaction confirmation."
                values={{ email: updatedEmail }}
              >
                {'Check your email ({{email}}) to receive notifications about transaction confirmation.'}
              </Trans>
            </Body>

            <Button variant="secondary" w="full" onClick={() => setUpdatedEmail('')}>
              {t('Send to new email')}
            </Button>
          </VStack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
              <VStack w="full" spacing="0px" alignItems="start">
                <ControlledTextInput
                  name="email"
                  control={control}
                  flex={1}
                  placeholder={t('Enter notified by email (optional)')}
                />
                <Body size="xs">{t('Enter your email to receive transaction confirmation')}</Body>
              </VStack>
              <Button
                type="submit"
                w={{ base: 'full', lg: 'auto' }}
                variant="solid"
                colorScheme="primary1"
                isLoading={isSubmitting || loading}
              >
                {t('Confirm')}
              </Button>
            </Stack>
          </form>
        )}
      </VStack>
    </Feedback>
  )
}
