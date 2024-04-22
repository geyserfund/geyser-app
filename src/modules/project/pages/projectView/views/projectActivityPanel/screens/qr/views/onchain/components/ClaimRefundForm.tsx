import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { TextField } from '../../../../../../../../../../../forms/components/TextField'
import { useNotification } from '../../../../../../../../../../../utils'
import { useRefundFileValue } from '../../../../../../../../../funding/state'
import { useRefund } from '../hooks/useRefund'
import { validateBitcoinAddress } from '../utils/validateAddress'
import { RefundFileInput } from './RefundFileInput'

const schema = yup
  .object({
    bitcoinAddress: yup
      .string()
      .required('Address is required to claim funds')
      .test((value) => validateBitcoinAddress(value)),
  })
  .required()

interface ClaimRefundFormProps {
  onSuccess?: Function
}

export const ClaimRefundForm = ({ onSuccess }: ClaimRefundFormProps) => {
  const { toast } = useNotification()
  const refundFile = useRefundFileValue()
  const { initiateRefund, loading } = useRefund()

  const { handleSubmit, control } = useForm<{ bitcoinAddress: string }>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ bitcoinAddress }: { bitcoinAddress: string }) => {
    const successful = await initiateRefund(bitcoinAddress)
    if (successful) {
      toast({
        title: 'Refund initiated successfully',
        status: 'success',
      })
      if (onSuccess) {
        onSuccess()
      }
    }
  }

  console.log('checking refund file', refundFile)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="10px" alignItems="start">
        {!refundFile && <RefundFileInput name="refundFile" label={t('Upload refund file')} />}

        <TextField
          name="bitcoinAddress"
          label={t('Enter refund address')}
          placeholder={t('Enter your Bitcoin address')}
          control={control}
        />
        <Body2 color="neutral.600">{t('Enter Bitcoin on-chain address on which you wish to get a refund.')}</Body2>

        <Button type="submit" w="full" variant="primary" isLoading={loading} isDisabled={!refundFile}>
          {t('Initiate refund')}
        </Button>
      </VStack>
    </form>
  )
}
