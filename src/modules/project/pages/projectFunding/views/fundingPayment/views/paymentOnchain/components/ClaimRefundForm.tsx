import { Button, Stack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { currentSwapIdAtom, SwapData } from '@/modules/project/funding/state'
import { currentSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'
import { usePaymentSwapRefundTxBroadcastMutation } from '@/types/index.ts'
import { useNotification } from '@/utils'
import { getBitcoinAddress } from '@/utils/lightning/bip21'

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
  const toast = useNotification()
  const { initiateRefund, initiateRefundToGetRefundTx, loading } = useRefund()

  const currentSwapId = useAtomValue(currentSwapIdAtom)
  const refundFileFromAtom = useAtomValue(currentSwapAtom)

  const [paymentSwapRefundTxBroadcast] = usePaymentSwapRefundTxBroadcastMutation()

  const { handleSubmit, control } = useForm<{ bitcoinAddress: string }>({
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(
    async ({ bitcoinAddress }: { bitcoinAddress: string }) => {
      if (refundFile?.contributionInfo?.paymentId) {
        const refundTransactionHex = await initiateRefundToGetRefundTx(bitcoinAddress, refundFile || refundFileFromAtom)

        if (!refundTransactionHex) {
          toast.error({
            title: 'Something went wrong',
            description: 'Please try again',
          })
          return
        }

        paymentSwapRefundTxBroadcast({
          variables: {
            input: {
              paymentId: refundFile?.contributionInfo?.paymentId,
              signedTxHex: refundTransactionHex,
            },
          },
          onCompleted(data) {
            if (data.paymentSwapRefundTxBroadcast.txHash) {
              toast.success({
                title: 'Refund initiated successfully',
              })
              if (onSuccess) {
                onSuccess()
              }
            }
          },
          onError(error) {
            toast.error({
              title: 'Something went wrong',
              description: 'Please try again',
            })
          },
        })
      } else {
        const successful = await initiateRefund(bitcoinAddress, refundFile || refundFileFromAtom)
        if (successful) {
          toast.success({
            title: 'Refund initiated successfully',
          })
          if (onSuccess) {
            onSuccess()
          }
        }
      }
    },
    [
      refundFile,
      refundFileFromAtom,
      onSuccess,
      initiateRefundToGetRefundTx,
      initiateRefund,
      paymentSwapRefundTxBroadcast,
      toast,
    ],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <VStack alignItems="start">
        {showUpload && <RefundFileInput name="refundFile" label={t('Upload refund file')} />}

        <Stack direction={{ base: 'column', md: 'row' }} w="full">
          <VStack spacing={0} flex={1} alignItems={'start'}>
            <ControlledTextInput
              id="refund-address-input"
              name="bitcoinAddress"
              placeholder={t('bc1ilyp21…')}
              control={control}
            />
            <Body size="xs" light>
              {t('Enter Bitcoin on-chain address on which you wish to get a refund.')}
            </Body>
          </VStack>
          <Button
            id="initiate-refund-button"
            type="submit"
            size="lg"
            w={{ base: 'full', lg: 'auto' }}
            variant="solid"
            colorScheme="primary1"
            isLoading={loading}
            isDisabled={!showUpload && !currentSwapId}
          >
            {t('Initiate refund')}
          </Button>
        </Stack>
      </VStack>
    </form>
  )
}
