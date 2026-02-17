import { ApolloError } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  generateAccountKeys,
  generatePreImageHash,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { useGenerateTransactionDataForClaimingRBTCToContract } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { contributionAddPaymentPreImagesAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { rskAccountKeysAtom } from '@/modules/project/funding/state/swapRskAtom.ts'
import { ORIGIN } from '@/shared/constants/config/env.ts'
import { getPath } from '@/shared/constants/index.ts'
import {
  ContributionFiatToLightningSwapPaymentDetailsBanxaInput,
  useFundingFiatSwapPaymentCreateMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { fiatFailureReasonAtom, FiatSwapStatus, fiatSwapStatusAtom } from '../atom/fiatSwapStatusAtom.ts'

type CreateFiatSwapPaymentParams = {
  fiatCurrency: string
  paymentMethodId?: string
}

export const useCreateFiatSwapPayment = () => {
  const toast = useNotification()

  const fundingContribution = useAtomValue(fundingContributionAtom)
  const project = useAtomValue(fundingProjectAtom)

  const updateFundingPaymentDetails = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)
  const setFiatSwapStatus = useSetAtom(fiatSwapStatusAtom)
  const setFiatFailureReason = useSetAtom(fiatFailureReasonAtom)
  const setRskAccountKeys = useSetAtom(rskAccountKeysAtom)
  const setContributionAddPaymentPreImages = useSetAtom(contributionAddPaymentPreImagesAtom)

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)
  const { generateTransactionForLightningToRskSwap } = useGenerateTransactionDataForClaimingRBTCToContract()

  const [createFiatSwapPaymentMutation, { loading }] = useFundingFiatSwapPaymentCreateMutation()

  const resolveAccountKeys = () => {
    const existingAccountKeys = {
      publicKey: userAccountKeys?.rskKeyPair?.publicKey || '',
      address: userAccountKeys?.rskKeyPair?.address || '',
      privateKey: userAccountKeyPair?.privateKey || '',
    }

    if (existingAccountKeys.publicKey && existingAccountKeys.address && existingAccountKeys.privateKey) {
      return existingAccountKeys
    }

    const generatedKeys = generateAccountKeys()
    setRskAccountKeys(generatedKeys)
    return {
      publicKey: generatedKeys.publicKey,
      address: generatedKeys.address,
      privateKey: generatedKeys.privateKey,
    }
  }

  const assertAccountKeysAreAvailable = (accountKeys: { publicKey: string; address: string; privateKey: string }) => {
    if (accountKeys.publicKey && accountKeys.address && accountKeys.privateKey) {
      return
    }

    throw new Error('Missing Rootstock account keys')
  }

  const processFiatSwapPaymentCreationResponse = async ({
    checkoutUrl,
    lightningToRskSwap,
    lightningPreImage,
    accountKeys,
    fiatToLightningSwap,
  }: {
    checkoutUrl?: string
    lightningToRskSwap?: NonNullable<
      NonNullable<
        Awaited<ReturnType<typeof createFiatSwapPaymentMutation>>['data']
      >['contributionPaymentsAdd']['payments']['lightningToRskSwap']
    > | null
    lightningPreImage: { preimageHex: string; preimageHash: string }
    accountKeys: { publicKey: string; address: string; privateKey: string }
    fiatToLightningSwap?: NonNullable<
      Awaited<ReturnType<typeof createFiatSwapPaymentMutation>>['data']
    >['contributionPaymentsAdd']['payments']['fiatToLightningSwap']
  }) => {
    if (!checkoutUrl || !lightningToRskSwap) {
      throw new Error('Could not initialize fiat-to-RSK payment')
    }

    window.open(checkoutUrl, '_blank')
    updateFundingPaymentDetails({
      fiatToLightningSwap,
      lightningToRskSwap,
    })
    setFiatSwapStatus(FiatSwapStatus.pending)
    setFiatFailureReason(null)

    try {
      await generateTransactionForLightningToRskSwap({
        contribution: fundingContribution,
        payment: lightningToRskSwap,
        preImages: lightningPreImage,
        accountKeys,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again'
      console.error('Failed to generate Lightning-to-RSK claim transaction', error)
      setFiatSwapStatus(FiatSwapStatus.failed)
      setFiatFailureReason(message)

      toast.error({
        title: 'Unable to prepare swap claim transaction',
        description: message,
      })
    }
  }

  const createFiatSwapPayment = async ({ fiatCurrency, paymentMethodId = '' }: CreateFiatSwapPaymentParams) => {
    if (!fiatCurrency) {
      throw new Error('Please select a currency')
    }

    const lightningPreImage = generatePreImageHash()
    setContributionAddPaymentPreImages({ lightning: lightningPreImage })

    const accountKeys = resolveAccountKeys()
    assertAccountKeysAreAvailable(accountKeys)

    const banxaInput = {
      fiatCurrency,
      paymentMethodId,
      returnUrl: `${ORIGIN}${getPath('fundingCallback', project.name)}`,
    } as ContributionFiatToLightningSwapPaymentDetailsBanxaInput

    try {
      const { data } = await createFiatSwapPaymentMutation({
        variables: {
          input: {
            contributionId: fundingContribution.id,
            paymentsInput: {
              fiatToLightningSwap: {
                create: true,
                banxa: banxaInput,
              },
              lightningToRskSwap: {
                create: true,
                boltz: {
                  claimPublicKey: accountKeys.publicKey,
                  claimAddress: accountKeys.address,
                  preimageHash: lightningPreImage.preimageHash,
                },
              },
            },
          },
        },
      })

      await processFiatSwapPaymentCreationResponse({
        checkoutUrl: data?.contributionPaymentsAdd.payments.fiatToLightningSwap?.checkoutUrl,
        lightningToRskSwap: data?.contributionPaymentsAdd.payments.lightningToRskSwap,
        lightningPreImage,
        accountKeys,
        fiatToLightningSwap: data?.contributionPaymentsAdd.payments.fiatToLightningSwap,
      })
    } catch (error) {
      const err = error as ApolloError
      const graphQLErrorMessage = err?.graphQLErrors?.[0]?.message
      const message = graphQLErrorMessage || (error instanceof Error ? error.message : 'Please try again')

      toast.error({
        title: 'Unable to start fiat payment',
        description: message,
      })
    }
  }

  return {
    createFiatSwapPayment,
    loading,
  }
}
