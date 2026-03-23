import { useApolloClient, useMutation } from '@apollo/client'
import { Button, Stack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { decryptSeed, generateKeysFromSeedHex } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { currentSwapIdAtom, SwapData } from '@/modules/project/funding/state'
import { currentSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { refundedSwapDataAtom, removeRefundedSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { MUTATION_PAYMENT_SWAP_REFUND_TX_BROADCAST } from '@/modules/project/graphql/mutation/TxBroadcastMutation.ts'
import { QUERY_PAYMENT_BY_ONCHAIN_SWAP_ID } from '@/modules/project/graphql/queries/paymentQuery.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'
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
    accountPassword: yup.string(),
  })
  .required()

interface ClaimRefundFormProps {
  onSuccess?: Function
  showUpload?: boolean
  refundFile?: SwapData
}

type PaymentByOnChainSwapIdQuery = {
  payment?: {
    id: string | number | bigint
  } | null
}

export const ClaimRefundForm = ({ onSuccess, showUpload, refundFile }: ClaimRefundFormProps) => {
  const apolloClient = useApolloClient()
  const toast = useNotification()
  const { initiateRefund, initiateRefundToGetRefundTx, loading } = useRefund()
  useUserAccountKeys()

  const currentSwapId = useAtomValue(currentSwapIdAtom)
  const refundFileFromAtom = useAtomValue(currentSwapAtom)
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)
  const setRefundedSwapData = useSetAtom(refundedSwapDataAtom)
  const removeRefundFile = useSetAtom(removeRefundedSwapAtom)
  const [isSubmittingBackend, setIsSubmittingBackend] = useState(false)
  const [paymentSwapRefundTxBroadcast] = useMutation(MUTATION_PAYMENT_SWAP_REFUND_TX_BROADCAST)

  const resolvedRefundFile = refundFile || refundFileFromAtom
  const requiresAccountPassword = Boolean(resolvedRefundFile && !resolvedRefundFile.privateKey)

  const form = useForm<{ bitcoinAddress: string; accountPassword?: string }>({
    resolver: yupResolver(schema),
  })
  const { handleSubmit, control, setError } = form

  const initiateRefundViaBackend = useCallback(
    async (refundAddress: string, nextRefundFile: SwapData) => {
      const signedTxHex = await initiateRefundToGetRefundTx(refundAddress, nextRefundFile)

      if (!signedTxHex) {
        return false
      }

      setIsSubmittingBackend(true)

      try {
        let paymentId: string | number | bigint | undefined

        try {
          const { data } = await apolloClient.query<PaymentByOnChainSwapIdQuery>({
            query: QUERY_PAYMENT_BY_ONCHAIN_SWAP_ID,
            variables: {
              input: {
                onChainSwapId: nextRefundFile.id,
              },
            },
            fetchPolicy: 'network-only',
          })

          paymentId = data?.payment?.id ?? undefined
        } catch (error: any) {
          const queryErrorMessage = error?.message || ''

          if (queryErrorMessage.includes('could not find funding tx with swap ID')) {
            return null
          }

          throw error
        }

        if (!paymentId) {
          return null
        }

        const { data: broadcastData } = await paymentSwapRefundTxBroadcast({
          variables: {
            input: {
              paymentId,
              signedTxHex,
            },
          },
        })

        if (!broadcastData?.paymentSwapRefundTxBroadcast.success) {
          throw new Error(t('Failed to broadcast refund transaction'))
        }

        const refundTxId = broadcastData.paymentSwapRefundTxBroadcast.txHash || nextRefundFile.refundTx

        setRefundedSwapData({
          ...nextRefundFile,
          refundTx: refundTxId,
        })
        removeRefundFile(nextRefundFile.id)

        return true
      } catch (error) {
        toast.error({
          title: t('Refund failed'),
          description: t('Please try again'),
        })
        return false
      } finally {
        setIsSubmittingBackend(false)
      }
    },
    [apolloClient, initiateRefundToGetRefundTx, paymentSwapRefundTxBroadcast, removeRefundFile, setRefundedSwapData, toast],
  )

  const onSubmit = useCallback(
    async ({ bitcoinAddress, accountPassword }: { bitcoinAddress: string; accountPassword?: string }) => {
      let nextRefundFile = resolvedRefundFile

      if (requiresAccountPassword) {
        if (!resolvedRefundFile) {
          return
        }

        if (!userAccountKeys?.encryptedSeed) {
          toast.error({
            title: t('Unable to find your account keys'),
            description: t('Please refresh the page and try again.'),
          })
          return
        }

        try {
          const decryptedSeed = await decryptSeed(userAccountKeys.encryptedSeed, accountPassword || '')
          const accountKeys = generateKeysFromSeedHex(decryptedSeed)

          setUserAccountKeyPair({ privateKey: accountKeys.privateKey, publicKey: accountKeys.publicKey })

          nextRefundFile = {
            ...resolvedRefundFile,
            privateKey: accountKeys.privateKey,
            publicKey: accountKeys.publicKey,
            address: accountKeys.address,
          }
        } catch (error) {
          setError('accountPassword', { message: t('Invalid password') })
          return
        }
      }

      let successful = false

      if (nextRefundFile?.id) {
        const backendResult = await initiateRefundViaBackend(bitcoinAddress, nextRefundFile)

        if (backendResult === true) {
          successful = true
        } else if (backendResult === null) {
          successful = await initiateRefund(bitcoinAddress, nextRefundFile)
        }
      } else {
        successful = await initiateRefund(bitcoinAddress, nextRefundFile)
      }

      if (successful) {
        toast.success({
          title: 'Refund initiated successfully',
        })
        if (onSuccess) {
          onSuccess()
        }
      }
    },
    [
      initiateRefundViaBackend,
      initiateRefund,
      onSuccess,
      requiresAccountPassword,
      resolvedRefundFile,
      setError,
      setUserAccountKeyPair,
      toast,
      userAccountKeys?.encryptedSeed,
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
          {requiresAccountPassword && (
            <VStack spacing={0} flex={1} alignItems={'start'}>
              <ControlledTextInput
                id="refund-account-password-input"
                name="accountPassword"
                type="password"
                placeholder={t('Enter your account password')}
                control={control}
              />
              <Body size="xs" light>
                {t('Enter your account password to unlock the key required to sign this refund transaction.')}
              </Body>
            </VStack>
          )}
          <Button
            id="initiate-refund-button"
            type="submit"
            size="lg"
            w={{ base: 'full', lg: 'auto' }}
            variant="solid"
            colorScheme="primary1"
            isLoading={loading || isSubmittingBackend}
            isDisabled={!showUpload && !resolvedRefundFile && !currentSwapId}
          >
            {t('Initiate refund')}
          </Button>
        </Stack>
      </VStack>
    </form>
  )
}
