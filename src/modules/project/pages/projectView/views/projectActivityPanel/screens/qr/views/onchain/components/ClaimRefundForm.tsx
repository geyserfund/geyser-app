import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Body2 } from '../../../../../../../../../../../components/typography'
import { TextField } from '../../../../../../../../../../../forms/components/TextField'
import { useNotification } from '../../../../../../../../../../../utils'
import { getBitcoinAddress } from '../../../../../../../../../../../utils/lightning/bip21'
import { currentSwapIdAtom, SwapData, useRefundFileValue } from '../../../../../../../../../funding/state'
import { useRefund } from '../hooks/useRefund'
import { validateBitcoinAddress } from '../utils/validateAddress'
import { RefundFileInput } from './RefundFileInput'

const schema = yup
  .object({
    bitcoinAddress: yup
      .string()
      .required('Address is required to claim funds')
      .test({
        test(value) {
          const bitcoinAddress = getBitcoinAddress(value)
          if (bitcoinAddress.valid && bitcoinAddress.address) {
            return validateBitcoinAddress(bitcoinAddress.address)
          }

          return validateBitcoinAddress(value)
        },
        message: t('The Bitcoin address you entered is invalid'),
      }),
  })
  .required()

interface ClaimRefundFormProps {
  onSuccess?: Function
  showUpload?: boolean
  refundFile?: SwapData
}

export const ClaimRefundForm = ({ onSuccess, showUpload, refundFile }: ClaimRefundFormProps) => {
  const { toast } = useNotification()
  const { initiateRefund, loading } = useRefund()

  const currentSwapId = useAtomValue(currentSwapIdAtom)

  const { handleSubmit, control } = useForm<{ bitcoinAddress: string }>({
    resolver: yupResolver(schema),
  })
  console.log('chekcing ClaimRefundForm refund', refundFile)

  const onSubmit = useCallback(
    async ({ bitcoinAddress }: { bitcoinAddress: string }) => {
      console.log('chekcing initiate refund', refundFile)
      const successful = await initiateRefund(bitcoinAddress, refundFile)
      if (successful) {
        toast({
          title: 'Refund initiated successfully',
          status: 'success',
        })
        if (onSuccess) {
          onSuccess()
        }
      }
    },
    [refundFile, onSuccess, initiateRefund, toast],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="10px" alignItems="start">
        {showUpload && <RefundFileInput name="refundFile" label={t('Upload refund file')} />}

        <TextField
          name="bitcoinAddress"
          label={t('Enter refund address')}
          placeholder={t('bc1ilyp21…')}
          control={control}
        />
        <Body2 color="neutral.600">{t('Enter Bitcoin on-chain address on which you wish to get a refund.')}</Body2>

        <Button type="submit" w="full" variant="primary" isLoading={loading} isDisabled={!showUpload && !currentSwapId}>
          {t('Initiate refund')}
        </Button>
      </VStack>
    </form>
  )
}
