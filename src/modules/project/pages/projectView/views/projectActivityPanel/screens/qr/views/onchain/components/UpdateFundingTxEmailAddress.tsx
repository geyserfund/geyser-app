import { Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { TbMailFilled } from 'react-icons/tb'
import * as yup from 'yup'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { TextField } from '../../../../../../../../../../../forms/components/TextField'
import { useFundingTxEmailUpdateMutation } from '../../../../../../../../../../../types'
import { useNotification } from '../../../../../../../../../../../utils'
import { useFundingContext } from '../../../../../../../../../context'
import { FeedbackCard } from './FeedbackCard'

const schema = yup
  .object({
    email: yup.string().email('Must be a valid email').required('This is required'),
  })
  .required()

export const UpdateFundingTxEmailAddress = () => {
  const {
    fundingTx,
    fundForm: { state },
  } = useFundingContext()
  const { toast } = useNotification()
  const [updatedEmail, setUpdatedEmail] = useState(state.email)

  const [updateEmail, { loading }] = useFundingTxEmailUpdateMutation({
    onCompleted(data) {
      toast({
        title: t('Email updated'),
        description: t('Your email has been updated.'),
        status: 'success',
      })
      setUpdatedEmail(data.fundingTxEmailUpdate.email || '')
    },
    onError(error) {
      toast({
        title: t('Error'),
        description: t('An error occurred while updating your email.'),
        status: 'error',
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
    <FeedbackCard
      w="full"
      variant="primary"
      title={t('Get notified (optional)')}
      icon={
        <HStack
          justifyContent="center"
          alignItems="center"
          height="24px"
          width="24px"
          bgColor={'primary.500'}
          borderRadius="4px"
        >
          <TbMailFilled size="14px" fill="neutral.1000" />
        </HStack>
      }
    >
      {updatedEmail ? (
        <VStack w="full" spacing="20px" alignItems="start">
          <Body2>
            <Trans
              i18nKey="Check your email ({{email}}) to receive notifications about transaction confirmation."
              values={{ email: updatedEmail }}
            >
              {'Check your email ({{email}}) to receive notifications about transaction confirmation.'}
            </Trans>
          </Body2>

          <Button variant="secondary" w="full" onClick={() => setUpdatedEmail('')}>
            {t('Send to new email')}
          </Button>
        </VStack>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="10px" alignItems="start">
            <TextField placeholder={t('Enter email address')} name="email" control={control} />
            <Body2>{t('Enter your email to receive transaction confirmation')}</Body2>
            <Button type="submit" w="full" variant="primary" mt={4} isLoading={isSubmitting || loading}>
              {t('Confirm')}
            </Button>
          </VStack>
        </form>
      )}
    </FeedbackCard>
  )
}
