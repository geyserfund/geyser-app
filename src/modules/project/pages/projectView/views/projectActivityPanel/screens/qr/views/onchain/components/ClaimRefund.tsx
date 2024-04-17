import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { FeedbackCard } from './FeedbackCard'

const schema = yup
  .object({
    bitcoinAddress: yup.string().email('Must be a valid email').required('This is required'),
  })
  .required()

export const ClaimRefund = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ bitcoinAddress: string }>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (val: { bitcoinAddress: string }) => {}

  return (
    <FeedbackCard variant="primary" title={t('Claim refund')}>
      <Body2>
        {t(
          'Do you wish to initiate a refund now? You can request a refund at any time if you have your refund file ready.',
        )}
      </Body2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="10px">
          <FormControl isInvalid={Boolean(errors.bitcoinAddress)}>
            <FormLabel>{t('Refund address')}</FormLabel>
            <Input id="bitcoinAddress" placeholder={t('Enter your Bitcoin address')} {...register('bitcoinAddress')} />
            <Body2 color="neutral.600">{t('Enter Bitcoin on-chain address on which you wish to get a refund.')}</Body2>
            <FormErrorMessage>{errors.bitcoinAddress && errors.bitcoinAddress.message}</FormErrorMessage>
          </FormControl>
          <Body2>
            {t(
              'If previously provided, your email will be pre-filled, but still editable. Otherwise, if you want you can enter your email to receive transaction confirmation and status updates.',
            )}
          </Body2>
          <Button type="submit" w="full" variant="primary" mt={4} isLoading={isSubmitting}>
            {t('Confirm')}
          </Button>
        </VStack>
      </form>
    </FeedbackCard>
  )
}
