/* eslint-disable complexity */
import { ApolloError } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS,
  VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS,
} from '@/shared/constants/config/env.ts'
import { __development__ } from '@/shared/constants/index.ts'
import {
  ContributionCreateInput,
  ContributionCreateMutation,
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  FundingContributionFragment,
  PaymentFeePayer,
  PaymentFeeType,
  ProjectFundingStrategy,
  useContributionCreateMutation,
  usePaymentSwapClaimTxSetMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useCustomMutation } from '../../API/custom/useCustomMutation'
import { generateAccountKeys, generatePreImageHash } from '../../forms/accountPassword/keyGenerationHelper.ts'
import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import {
  createCallDataForBoltzClaimCall,
  createCallDataForBoltzClaimCallWithCallee,
} from '../../pages/projectFunding/utils/createCallDataForClaimCall.ts'
import { createCallDataForPrismDepositFor } from '../../pages/projectFunding/utils/createCallDataForPrismDepositFor.ts'
import { fundingFlowErrorAtom, fundingRequestErrorAtom } from '../state'
import { fundingContributionPartialUpdateAtom } from '../state/fundingContributionAtom.ts'
import {
  contributionCreatePreImagesAtom,
  fiatOnlyPaymentsInputAtom,
  formattedFundingInputAtom,
  setFundingInputAfterRequestAtom,
} from '../state/fundingContributionCreateInputAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '../state/fundingPaymentAtom.ts'
import {
  keyPairAtom,
  parseLightningToRskSwapAtom,
  parseOnChainToRskSwapAtom,
  parseSwapAtom,
} from '../state/swapAtom.ts'
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

  const { isLoggedIn } = useAuthContext()

  const { generateTransactionForLightningToRskSwap, generateTransactionForOnChainToRskSwap } =
    useGenerateTransactionDataForClaimingRBTCToContract()

  const formattedFundingInput = useAtomValue(formattedFundingInputAtom)
  const fiatOnlyPaymentsInput = useAtomValue(fiatOnlyPaymentsInputAtom)

  const setFundingInputAfterRequest = useSetAtom(setFundingInputAfterRequestAtom)
  const setContributionCreatePreImages = useSetAtom(contributionCreatePreImagesAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)

  const resetContribution = useResetContribution()

  const fundingContributionPartialUpdate = useSetAtom(fundingContributionPartialUpdateAtom)
  const fundingPaymentDetailsPartialUpdate = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)

  const parseResponseToSwap = useSetAtom(parseSwapAtom)
  const parseResponseToOnChainToRskSwap = useSetAtom(parseOnChainToRskSwapAtom)
  const parseResponseToLightningToRskSwap = useSetAtom(parseLightningToRskSwapAtom)

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
        fundingPaymentDetailsPartialUpdate({ ...data.contributionCreate.payments, fiatToLightningSwap: undefined })

        if (data.contributionCreate.payments.onChainSwap?.swapJson) {
          parseResponseToSwap(
            data.contributionCreate.payments.onChainSwap,
            {
              projectTitle: project?.title,
              projectId: project?.id,
              reference: data.contributionCreate.contribution.uuid,
              contributionId: data.contributionCreate.contribution.id,
              bitcoinQuote: data.contributionCreate.contribution.bitcoinQuote,
              datetime: data.contributionCreate.contribution.createdAt,
            },
            currentAccountKeys,
          )
        }

        if (data.contributionCreate.payments.onChainToRskSwap?.swapJson) {
          parseResponseToOnChainToRskSwap(
            data.contributionCreate.payments.onChainToRskSwap,
            {
              projectTitle: project?.title,
              projectId: project?.id,
              reference: data.contributionCreate.contribution.uuid,
              bitcoinQuote: data.contributionCreate.contribution.bitcoinQuote,
              contributionId: data.contributionCreate.contribution.id,
              datetime: data.contributionCreate.contribution.createdAt,
            },
            currentAccountKeys,
          )
          generateTransactionForOnChainToRskSwap({
            payment: data.contributionCreate.payments.onChainToRskSwap,
            preImages: preImages.onChain,
            accountKeys: currentAccountKeys,
          })
        }

        if (data.contributionCreate.payments.lightningToRskSwap?.swapJson) {
          parseResponseToLightningToRskSwap(
            data.contributionCreate.payments.lightningToRskSwap,
            {
              projectTitle: project?.title,
              projectId: project?.id,
              reference: data.contributionCreate.contribution.uuid,
              bitcoinQuote: data.contributionCreate.contribution.bitcoinQuote,
              datetime: data.contributionCreate.contribution.createdAt,
              contributionId: data.contributionCreate.contribution.id,
            },
            currentAccountKeys,
          )
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
        currentAccountKeys.publicKey = keyPair.publicKey.toString('hex')
        currentAccountKeys.privateKey = keyPair.privateKey?.toString('hex') || ''
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
        if (!isLoggedIn) {
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
      isLoggedIn,
    ],
  )

  const requestFundingFromContext = useCallback(
    (onCompleted?: (data: ContributionCreateMutation) => void) => requestFunding(formattedFundingInput, onCompleted),
    [requestFunding, formattedFundingInput],
  )

  const requestFiatOnlyFundingFromContext = useCallback(
    (onCompleted?: (data: ContributionCreateMutation) => void) =>
      requestFunding({ ...formattedFundingInput, paymentsInput: fiatOnlyPaymentsInput }, onCompleted),
    [requestFunding, formattedFundingInput, fiatOnlyPaymentsInput],
  )

  return {
    requestFundingOptions,
    requestFunding,
    requestFundingFromContext,
    requestFiatOnlyFundingFromContext,
  }
}

export const useGenerateTransactionDataForClaimingRBTCToContract = () => {
  const { project } = useProjectAtom()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)

  const [paymentSwapClaimTxSet] = usePaymentSwapClaimTxSetMutation()

  const geyserFeeTypes = new Set([
    PaymentFeeType.Platform,
    PaymentFeeType.Promotion,
    PaymentFeeType.Ambassador,
    PaymentFeeType.Tip,
  ])

  const getGeyserFeesAmount = (fees: ContributionLightningToRskSwapPaymentDetailsFragment['fees']) => {
    return fees.reduce((acc, fee) => {
      if (!fee.feeType) return acc
      if (!geyserFeeTypes.has(fee.feeType)) return acc
      return acc + fee.feeAmount
    }, 0)
  }

  const buildPrismClaimTxCallData = (params: {
    claimAmountSats: number
    geyserFeesAmount: number
    contributorAddress: string
    projectRskEoa: string
    refundAddress: string
    timelock: number
    preimage: string
    privateKey: string
  }) => {
    const {
      claimAmountSats,
      geyserFeesAmount,
      contributorAddress,
      projectRskEoa,
      refundAddress,
      timelock,
      preimage,
      privateKey,
    } = params

    console.log('VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS', VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS)
    console.log('VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS', VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS)

    if (!VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS || !VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS) {
      throw new Error('Missing Prism contract or Geyser operational address configuration')
    }

    const creatorAmountSats = claimAmountSats - geyserFeesAmount
    if (creatorAmountSats < 0) {
      throw new Error('Prism split amount is negative for creator')
    }

    if (creatorAmountSats + geyserFeesAmount !== claimAmountSats) {
      throw new Error('Prism split amounts do not sum to claim amount')
    }

    const depositCallData = createCallDataForPrismDepositFor({
      payer: contributorAddress as `0x${string}`,
      receivers: [projectRskEoa as `0x${string}`, VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS as `0x${string}`],
      amounts: [satsToWeiBigInt(creatorAmountSats), satsToWeiBigInt(geyserFeesAmount)],
    })

    return createCallDataForBoltzClaimCallWithCallee({
      preimage,
      amount: satsToWei(claimAmountSats),
      refundAddress,
      timelock,
      privateKey,
      callee: VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS as string,
      callData: depositCallData,
    })
  }

  const buildAonClaimTxCallData = (params: {
    claimAmountSats: number
    fees: ContributionLightningToRskSwapPaymentDetailsFragment['fees']
    contributorAddress: string
    refundAddress: string
    timelock: number
    preimage: string
    privateKey: string
  }) => {
    const { claimAmountSats, fees, contributorAddress, refundAddress, timelock, preimage, privateKey } = params

    const creatorFeesAmount = fees.reduce((acc, fee) => {
      if (fee.feePayer === PaymentFeePayer.Creator) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0)

    const contributorFeesAmount = fees.reduce((acc, fee) => {
      // Swap fees never make it to the contract, so should not be counted inside the contract
      if (fee.feePayer === PaymentFeePayer.Contributor && !fee.description?.includes('Swap fee')) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0)

    return createCallDataForBoltzClaimCall({
      contributorAddress,
      creatorFees: satsToWei(creatorFeesAmount),
      contributorFees: satsToWei(contributorFeesAmount),
      preimage,
      amount: satsToWei(claimAmountSats),
      refundAddress,
      timelock,
      privateKey,
      aonContractAddress: project?.aonGoal?.contractAddress || '',
    })
  }

  const generateTransactionForLightningToRskSwap = ({
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

    const swap = JSON.parse(swapJson)
    const claimAmountSats = payment.amountToClaim

    const contributorAddress = accountKeys?.address || userAccountKeys?.rskKeyPair?.address || ''
    if (!contributorAddress) {
      throw new Error('Missing contributor RSK address for swap claim')
    }

    const isAonProject = project?.fundingStrategy === ProjectFundingStrategy.AllOrNothing
    const projectRskEoa = project?.rskEoa || ''
    const geyserFeesAmount = getGeyserFeesAmount(fees)

    let claimTxCallDataHex = ''
    if (!isAonProject && projectRskEoa) {
      claimTxCallDataHex = buildPrismClaimTxCallData({
        claimAmountSats,
        geyserFeesAmount,
        contributorAddress,
        projectRskEoa,
        refundAddress: swap.refundAddress,
        timelock: swap.timeoutBlockHeight,
        preimage: preImages.preimageHex,
        privateKey: accountKeys?.privateKey || userAccountKeyPair?.privateKey || '',
      })
    } else {
      claimTxCallDataHex = buildAonClaimTxCallData({
        claimAmountSats,
        fees,
        contributorAddress,
        refundAddress: swap.refundAddress,
        timelock: swap.timeoutBlockHeight,
        preimage: preImages.preimageHex,
        privateKey: accountKeys?.privateKey || userAccountKeyPair?.privateKey || '',
      })
    }

    paymentSwapClaimTxSet({
      variables: {
        input: {
          paymentId: payment.paymentId,
          claimTxCallDataHex,
        },
      },
    })
  }

  const generateTransactionForOnChainToRskSwap = ({
    payment,
    preImages,
    accountKeys,
  }: {
    payment: ContributionOnChainToRskSwapPaymentDetailsFragment
    preImages: { preimageHex: string; preimageHash: string }
    accountKeys: { publicKey: string; address: string; privateKey: string }
  }) => {
    const { swapJson, fees } = payment

    const swap = JSON.parse(swapJson)
    const claimAmountSats = swap.claimDetails.amount
    const contributorAddress = accountKeys?.address || userAccountKeys?.rskKeyPair?.address || ''
    if (!contributorAddress) {
      throw new Error('Missing contributor RSK address for swap claim')
    }

    const isAonProject = project?.fundingStrategy === ProjectFundingStrategy.AllOrNothing
    const projectRskEoa = project?.rskEoa || ''
    const geyserFeesAmount = getGeyserFeesAmount(fees)

    let claimTxCallDataHex = ''
    if (!isAonProject && projectRskEoa) {
      claimTxCallDataHex = buildPrismClaimTxCallData({
        claimAmountSats,
        geyserFeesAmount,
        contributorAddress,
        projectRskEoa,
        refundAddress: swap.claimDetails.refundAddress,
        timelock: swap.claimDetails.timeoutBlockHeight,
        preimage: preImages.preimageHex,
        privateKey: accountKeys?.privateKey || userAccountKeyPair?.privateKey || '',
      })
    } else {
      claimTxCallDataHex = buildAonClaimTxCallData({
        claimAmountSats,
        fees,
        contributorAddress,
        refundAddress: swap.claimDetails.refundAddress,
        timelock: swap.claimDetails.timeoutBlockHeight,
        preimage: preImages.preimageHex,
        privateKey: accountKeys?.privateKey || userAccountKeyPair?.privateKey || '',
      })
    }

    paymentSwapClaimTxSet({
      variables: {
        input: {
          paymentId: payment.paymentId,
          claimTxCallDataHex,
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
  if (!Number.isSafeInteger(sats)) {
    throw new Error('Invalid sat amount for wei conversion')
  }

  return BigInt(sats) * 10000000000n
}

export const satsToWeiBigInt = (sats: number) => {
  return satsToWei(sats)
}
