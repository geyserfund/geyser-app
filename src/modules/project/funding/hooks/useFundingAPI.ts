import { ApolloError } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { __development__ } from '@/shared/constants/index.ts'
import {
  ContributionCreateInput,
  ContributionCreateMutation,
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  FundingContributionFragment,
  PaymentFeePayer,
  useContributionCreateMutation,
  usePaymentSwapClaimTxSetMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useCustomMutation } from '../../API/custom/useCustomMutation'
import { generateAccountKeys, generatePreImageHash } from '../../forms/accountPassword/keyGenerationHelper.ts'
import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { createTransactionForBoltzClaimCall } from '../../pages1/projectFunding/utils/createCallData.ts'
import { fundingFlowErrorAtom, fundingRequestErrorAtom } from '../state'
import { fundingContributionPartialUpdateAtom } from '../state/fundingContributionAtom.ts'
import {
  contributionCreatePreImagesAtom,
  formattedFundingInputAtom,
  setFundingInputAfterRequestAtom,
} from '../state/fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '../state/fundingPaymentAtom.ts'
import { keyPairAtom, parseOnChainToRskSwapAtom, parseSwapAtom } from '../state/swapAtom.ts'
import { rskAccountKeysAtom } from '../state/swapRskAtom.ts'
import { generatePrivatePublicKeyPair, validateFundingInput } from '../utils/helpers'
import { webln } from '../utils/requestWebLNPayment'
import { useFundingFormAtom } from './useFundingFormAtom'
import { useResetContribution } from './useResetContribution.ts'
import { useWebLNFlow } from './useWebLNFlow'

const hasBolt11 = true
const hasWebLN = true

export const useFundingAPI = () => {
  const toast = useNotification()

  const { project } = useFundingFormAtom()
  const { generateTransactionForLightningToRskSwap, generateTransactionForOnChainToRskSwap } =
    useGenerateTransactionDataForClaimingRBTCToContract()

  const formattedFundingInput = useAtomValue(formattedFundingInputAtom)

  const setFundingInputAfterRequest = useSetAtom(setFundingInputAfterRequestAtom)
  const setContributionCreatePreImages = useSetAtom(contributionCreatePreImagesAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)

  const resetContribution = useResetContribution()

  const fundingContributionPartialUpdate = useSetAtom(fundingContributionPartialUpdateAtom)
  const fundingPaymentDetailsPartialUpdate = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)

  const parseResponseToSwap = useSetAtom(parseSwapAtom)
  const parseResponseToOnChainToRskSwap = useSetAtom(parseOnChainToRskSwapAtom)

  const startWebLNFlow = useWebLNFlow()

  const setKeyPair = useSetAtom(keyPairAtom)
  const setRskAccountKeys = useSetAtom(rskAccountKeysAtom)

  const preImages = useMemo(
    () => ({
      lightning: { preimageHex: '', preimageHash: '' },
      onChain: { preimageHex: '', preimageHash: '' },
    }),
    [],
  )

  // Used when user is logged out and does not have account keys
  const currentAccountKeys = useMemo(
    () => ({
      publicKey: '',
      address: '',
      privateKey: '',
    }),
    [],
  )

  const [contributionCreate, requestFundingOptions] = useCustomMutation(useContributionCreateMutation, {
    onCompleted(data) {
      try {
        if (!data.contributionCreate || !data.contributionCreate.contribution) {
          throw new Error('Undefined funding tx')
        }

        fundingContributionPartialUpdate(data.contributionCreate.contribution)
        fundingPaymentDetailsPartialUpdate({ ...data.contributionCreate.payments, fiatSwap: undefined })

        if (data.contributionCreate.payments.onChainSwap?.swapJson) {
          parseResponseToSwap(data.contributionCreate.payments.onChainSwap, {
            projectTitle: project?.title,
            reference: data.contributionCreate.contribution.uuid,
            bitcoinQuote: data.contributionCreate.contribution.bitcoinQuote,
            datetime: data.contributionCreate.contribution.createdAt,
          })
        }

        if (data.contributionCreate.payments.onChainToRskSwap?.swapJson) {
          parseResponseToOnChainToRskSwap(data.contributionCreate.payments.onChainToRskSwap, {
            projectTitle: project?.title,
            reference: data.contributionCreate.contribution.uuid,
            bitcoinQuote: data.contributionCreate.contribution.bitcoinQuote,
            datetime: data.contributionCreate.contribution.createdAt,
          })
          generateTransactionForOnChainToRskSwap({
            contribution: data.contributionCreate.contribution,
            payment: data.contributionCreate.payments.onChainToRskSwap,
            preImages: preImages.onChain,
            accountKeys: currentAccountKeys,
          })
        }

        if (data.contributionCreate.payments.lightningToRskSwap?.swapJson) {
          generateTransactionForLightningToRskSwap({
            contribution: data.contributionCreate.contribution,
            payment: data.contributionCreate.payments.lightningToRskSwap,
            preImages: preImages.lightning,
            accountKeys: currentAccountKeys,
          })
        }

        if (
          hasBolt11 &&
          hasWebLN &&
          webln &&
          data.contributionCreate.payments.lightning &&
          !data.contributionCreate.contribution.isSubscription &&
          !__development__
        ) {
          startWebLNFlow(data.contributionCreate.payments.lightning).catch(() => {
            toast.error({
              title: 'Something went wrong1',
              description: 'Please refresh the page and try again',
            })
          })
        }
      } catch (e) {
        setFundingRequestErrored(true)
        console.log('e', e)
        toast.error({
          title: 'Something went wrong2',
          description: e instanceof Error ? e.message : JSON.stringify(e),
        })
      }
    },
    onError(error: ApolloError) {
      if (error?.graphQLErrors[0] && error?.graphQLErrors[0]?.extensions?.code) {
        setError(error?.graphQLErrors[0].extensions)
      }

      setFundingRequestErrored(true)

      toast.error({
        title: 'Something went wrong3',
        description: 'Please refresh the page and try again',
      })
    },
  })

  const requestFunding = useCallback(
    async (input: ContributionCreateInput, onCompleted?: (data: ContributionCreateMutation) => void) => {
      const { isValid, error } = validateFundingInput(input)

      if (!isValid) {
        toast.error({
          title: 'failed to generate invoice',
          description: error,
        })
        return
      }

      resetContribution()

      const finalInput = { ...input }

      if (
        finalInput?.paymentsInput?.onChainSwap?.boltz &&
        !finalInput?.paymentsInput?.onChainSwap?.boltz.swapPublicKey
      ) {
        const keyPair = generatePrivatePublicKeyPair()
        setKeyPair(keyPair)
        finalInput.paymentsInput.onChainSwap.boltz.swapPublicKey = keyPair.publicKey.toString('hex')
      }

      if (finalInput?.paymentsInput?.lightningToRskSwap?.boltz && finalInput.paymentsInput.onChainToRskSwap?.boltz) {
        const lightningPreImage = generatePreImageHash()
        const onChainPreImage = generatePreImageHash()

        setContributionCreatePreImages({
          lightning: lightningPreImage,
          onChain: onChainPreImage,
        })

        preImages.lightning = lightningPreImage
        preImages.onChain = onChainPreImage

        finalInput.paymentsInput.lightningToRskSwap.boltz.preimageHash = lightningPreImage.preimageHash
        finalInput.paymentsInput.onChainToRskSwap.boltz.preimageHash = onChainPreImage.preimageHash

        // If the claim public key is not set (i.e user is not logged in or doesnot have one), generate a new account keys
        if (
          !finalInput.paymentsInput.lightningToRskSwap.boltz.claimPublicKey ||
          !finalInput.paymentsInput.onChainToRskSwap.boltz.claimPublicKey
        ) {
          const accountKeys = generateAccountKeys()
          setRskAccountKeys(accountKeys)

          finalInput.paymentsInput.lightningToRskSwap.boltz.claimPublicKey = accountKeys.publicKey
          finalInput.paymentsInput.lightningToRskSwap.boltz.claimAddress = accountKeys.address
          finalInput.paymentsInput.onChainToRskSwap.boltz.claimPublicKey = accountKeys.publicKey
          finalInput.paymentsInput.onChainToRskSwap.boltz.claimAddress = accountKeys.address

          currentAccountKeys.publicKey = accountKeys.publicKey
          currentAccountKeys.address = accountKeys.address
          currentAccountKeys.privateKey = accountKeys.privateKey
        }
      }

      setFundingInputAfterRequest(finalInput)

      await contributionCreate({ variables: { input: finalInput }, onCompleted })
    },
    [
      contributionCreate,
      toast,
      setKeyPair,
      setFundingInputAfterRequest,
      resetContribution,
      setRskAccountKeys,
      setContributionCreatePreImages,
      currentAccountKeys,
      preImages,
    ],
  )

  const requestFundingFromContext = useCallback(
    (onCompleted?: (data: ContributionCreateMutation) => void) => requestFunding(formattedFundingInput, onCompleted),
    [requestFunding, formattedFundingInput],
  )

  return {
    requestFundingOptions,
    requestFunding,
    requestFundingFromContext,
  }
}

const useGenerateTransactionDataForClaimingRBTCToContract = () => {
  const { project } = useProjectAtom()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)

  const [paymentSwapClaimTxSet] = usePaymentSwapClaimTxSetMutation()

  const generateTransactionForLightningToRskSwap = ({
    contribution,
    payment,
    preImages,
    accountKeys,
  }: {
    contribution: FundingContributionFragment
    payment: ContributionLightningToRskSwapPaymentDetailsFragment
    preImages: { preimageHex: string; preimageHash: string }
    accountKeys: { publicKey: string; address: string; privateKey: string }
  }) => {
    const { swapJson, fees } = payment

    const creatorFeesAmount = fees.reduce((acc, fee) => {
      if (fee.feePayer === PaymentFeePayer.Creator) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0)

    const contributorFeesAmount = fees.reduce((acc, fee) => {
      if (fee.feePayer === PaymentFeePayer.Contributor) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0)

    const swap = JSON.parse(swapJson)

    console.log('contributionCreatePreImages.lightning', preImages)

    const getTransactionForBoltzClaimCall = createTransactionForBoltzClaimCall({
      contributorAddress: accountKeys?.address || userAccountKeys?.rskKeyPair?.address || '',
      creatorFees: satsToWei(creatorFeesAmount),
      contributorFees: satsToWei(contributorFeesAmount),
      preimage: preImages.preimageHex,
      amount: satsToWei(payment.amountDue),
      refundAddress: swap.refundAddress,
      timelock: swap.timeoutBlockHeight,
      privateKey: accountKeys?.privateKey || userAccountKeyPair?.privateKey || '',
      aonContractAddress: project?.aonContractAddress || '',
    })
    console.log('getTransactionForBoltzClaimCall for LIGHTNING', getTransactionForBoltzClaimCall)
    paymentSwapClaimTxSet({
      variables: {
        input: {
          paymentId: payment.paymentId,
          claimTxCallDataHex: getTransactionForBoltzClaimCall,
        },
      },
    })
  }

  const generateTransactionForOnChainToRskSwap = ({
    contribution,
    payment,
    preImages,
    accountKeys,
  }: {
    contribution: FundingContributionFragment
    payment: ContributionOnChainToRskSwapPaymentDetailsFragment
    preImages: { preimageHex: string; preimageHash: string }
    accountKeys: { publicKey: string; address: string; privateKey: string }
  }) => {
    const { swapJson, fees } = payment

    const creatorFeesAmount = fees.reduce((acc, fee) => {
      if (fee.feePayer === PaymentFeePayer.Creator) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0)

    const contributorFeesAmount = fees.reduce((acc, fee) => {
      if (fee.feePayer === PaymentFeePayer.Contributor) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0)

    const swap = JSON.parse(swapJson)

    console.log('contributionCreatePreImages.onChain', preImages)
    console.log('swap.amount', swap)

    const getTransactionForBoltzClaimCall = createTransactionForBoltzClaimCall({
      contributorAddress: accountKeys?.address || userAccountKeys?.rskKeyPair?.address || '',
      creatorFees: satsToWei(creatorFeesAmount),
      contributorFees: satsToWei(contributorFeesAmount),
      preimage: preImages.preimageHex,
      amount: satsToWei(swap.claimDetails.amount),
      refundAddress: swap.claimDetails.refundAddress,
      timelock: swap.claimDetails.timeoutBlockHeight,
      privateKey: accountKeys?.privateKey || userAccountKeyPair?.privateKey || '',
      aonContractAddress: project?.aonContractAddress || '',
    })
    console.log('getTransactionForBoltzClaimCall for ONCHAIN', getTransactionForBoltzClaimCall)
    paymentSwapClaimTxSet({
      variables: {
        input: {
          paymentId: payment.paymentId,
          claimTxCallDataHex: getTransactionForBoltzClaimCall,
        },
      },
    })
  }

  return {
    generateTransactionForLightningToRskSwap,
    generateTransactionForOnChainToRskSwap,
  }
}

export const satsToWei = (sats: number) => {
  return sats * 10000000000
}
