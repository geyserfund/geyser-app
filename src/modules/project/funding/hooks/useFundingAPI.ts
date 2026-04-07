/* eslint-disable complexity */
import { ApolloError, useMutation } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  MUTATION_PROJECT_SUBSCRIPTION_START,
  MUTATION_RECURRING_CONTRIBUTION_RENEWAL_CREATE,
  MUTATION_RECURRING_DONATION_CREATE,
  ProjectSubscriptionStartMutation,
  ProjectSubscriptionStartMutationVariables,
  RecurringContributionCheckoutPayload,
  RecurringContributionRenewalCreateMutation,
  RecurringContributionRenewalCreateMutationVariables,
  RecurringDonationCreateMutation,
  RecurringDonationCreateMutationVariables,
  recurringFundingModes,
} from '@/modules/project/recurring/graphql'
import {
  ORIGIN,
  VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS,
  VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS,
} from '@/shared/constants/config/env.ts'
import { __development__, getPath } from '@/shared/constants/index.ts'
import {
  ContributionCreateInput,
  ContributionCreateMutation,
  ContributionLightningToRskSwapPaymentDetailsFragment,
  ContributionOnChainToRskSwapPaymentDetailsFragment,
  ContributionPaymentsInput,
  FundingContributionFragment,
  PaymentFeePayer,
  PaymentFeeType,
  ProjectFundingStrategy,
  useContributionCreateMutation,
  usePaymentSwapClaimTxSetMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils'

import { useCustomMutation } from '../../API/custom/useCustomMutation'
import {
  generateAccountKeys,
  generatePreImageHash,
  isValidRskPrivateKey,
} from '../../forms/accountPassword/keyGenerationHelper.ts'
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
  formattedProjectSubscriptionStartInputAtom,
  formattedRecurringContributionRenewalInputAtom,
  formattedRecurringDonationInputAtom,
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
import { useStripeEmbeddedTheme } from './useStripeEmbeddedTheme.ts'
import { useWebLNFlow } from './useWebLNFlow'

const hasBolt11 = true
const hasWebLN = true
const PAYMENT_SWAP_CLAIM_TX_SET_MAX_ATTEMPTS = 3
const PAYMENT_SWAP_CLAIM_TX_SET_RETRY_DELAY_MS = 400

const delay = async (ms: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const isRetryableClaimTxSetError = (error: unknown) => {
  if (!(error instanceof ApolloError)) return false

  return error.graphQLErrors.some(
    ({ message }) => message.includes('version conflict detected') || message.includes('OptimisticLockError'),
  )
}

const hasAnyPaymentDetails = (payments: RecurringContributionCheckoutPayload['payments']) =>
  Boolean(
    payments.lightning ||
      payments.onChainSwap ||
      payments.fiat ||
      payments.fiatToLightningSwap ||
      payments.lightningToRskSwap ||
      payments.onChainToRskSwap,
  )

const clonePaymentsInput = (paymentsInput?: ContributionPaymentsInput): ContributionPaymentsInput => ({
  ...(paymentsInput?.fiat && {
    fiat: {
      ...paymentsInput.fiat,
      ...(paymentsInput.fiat.stripe && {
        stripe: {
          ...paymentsInput.fiat.stripe,
        },
      }),
    },
  }),
  ...(paymentsInput?.fiatToLightningSwap && {
    fiatToLightningSwap: {
      ...paymentsInput.fiatToLightningSwap,
      ...(paymentsInput.fiatToLightningSwap.banxa && {
        banxa: {
          ...paymentsInput.fiatToLightningSwap.banxa,
        },
      }),
    },
  }),
  ...(paymentsInput?.lightning && {
    lightning: {
      ...paymentsInput.lightning,
    },
  }),
  ...(paymentsInput?.onChainSwap && {
    onChainSwap: {
      ...paymentsInput.onChainSwap,
      ...(paymentsInput.onChainSwap.boltz && {
        boltz: {
          ...paymentsInput.onChainSwap.boltz,
        },
      }),
    },
  }),
  ...(paymentsInput?.lightningToRskSwap && {
    lightningToRskSwap: {
      ...paymentsInput.lightningToRskSwap,
      ...(paymentsInput.lightningToRskSwap.boltz && {
        boltz: {
          ...paymentsInput.lightningToRskSwap.boltz,
        },
      }),
    },
  }),
  ...(paymentsInput?.onChainToRskSwap && {
    onChainToRskSwap: {
      ...paymentsInput.onChainToRskSwap,
      ...(paymentsInput.onChainToRskSwap.boltz && {
        boltz: {
          ...paymentsInput.onChainToRskSwap.boltz,
        },
      }),
    },
  }),
})

type UnifiedFundingResponse = {
  contribution: FundingContributionFragment
  payments: RecurringContributionCheckoutPayload['payments']
}

type ClaimPreImages = {
  lightning: { preimageHex: string; preimageHash: string }
  onChain: { preimageHex: string; preimageHash: string }
}

type FundingRequestContext = {
  accountKeys: { publicKey: string; address: string; privateKey: string }
  preImages: ClaimPreImages
}

const getInitialClaimPreImages = (): ClaimPreImages => ({
  lightning: { preimageHex: '', preimageHash: '' },
  onChain: { preimageHex: '', preimageHash: '' },
})

export const useFundingAPI = () => {
  const toast = useNotification()

  const { project, formState } = useFundingFormAtom()
  const stripeEmbeddedTheme = useStripeEmbeddedTheme()

  const { generateTransactionForLightningToRskSwap, generateTransactionForOnChainToRskSwap } =
    useGenerateTransactionDataForClaimingRBTCToContract()

  const formattedFundingInput = useAtomValue(formattedFundingInputAtom)
  const formattedRecurringDonationInput = useAtomValue(formattedRecurringDonationInputAtom)
  const formattedProjectSubscriptionStartInput = useAtomValue(formattedProjectSubscriptionStartInputAtom)
  const formattedRecurringContributionRenewalInput = useAtomValue(formattedRecurringContributionRenewalInputAtom)
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
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)
  const rskAccountKeys = useAtomValue(rskAccountKeysAtom)

  const applyStripePaymentConfig = useCallback(
    (input: ContributionCreateInput): ContributionCreateInput => {
      if (!project?.name || !input.paymentsInput?.fiat?.stripe) {
        return input
      }

      return {
        ...input,
        paymentsInput: {
          ...input.paymentsInput,
          fiat: {
            ...input.paymentsInput.fiat,
            stripe: {
              ...input.paymentsInput.fiat.stripe,
              returnUrl: `${ORIGIN}${getPath('fundingAwaitingSuccess', project.name)}`,
              theme: stripeEmbeddedTheme,
            },
          },
        },
      }
    },
    [project?.name, stripeEmbeddedTheme],
  )

  const defaultAccountKeys = useMemo(
    () => ({
      publicKey:
        userAccountKeys?.rskKeyPair?.publicKey || userAccountKeyPair?.publicKey || rskAccountKeys?.publicKey || '',
      address: userAccountKeys?.rskKeyPair?.address || rskAccountKeys?.address || '',
      privateKey: userAccountKeyPair?.privateKey || rskAccountKeys?.privateKey || '',
    }),
    [
      rskAccountKeys?.address,
      rskAccountKeys?.privateKey,
      rskAccountKeys?.publicKey,
      userAccountKeyPair?.privateKey,
      userAccountKeyPair?.publicKey,
      userAccountKeys?.rskKeyPair?.address,
      userAccountKeys?.rskKeyPair?.publicKey,
    ],
  )

  const handleFundingCompleted = useCallback(
    (payload: UnifiedFundingResponse, requestContext: FundingRequestContext) => {
      const { accountKeys, preImages } = requestContext

      try {
        fundingContributionPartialUpdate(payload.contribution)
        fundingPaymentDetailsPartialUpdate(payload.payments)

        if (payload.payments.onChainSwap?.swapJson) {
          parseResponseToSwap(
            payload.payments.onChainSwap,
            {
              projectTitle: project?.title,
              projectId: project?.id,
              reference: payload.contribution.uuid,
              contributionId: payload.contribution.id,
              bitcoinQuote: payload.contribution.bitcoinQuote,
              datetime: payload.contribution.createdAt,
            },
            accountKeys,
          )
        }

        if (payload.payments.onChainToRskSwap?.swapJson) {
          parseResponseToOnChainToRskSwap(
            payload.payments.onChainToRskSwap,
            {
              projectTitle: project?.title,
              projectId: project?.id,
              reference: payload.contribution.uuid,
              bitcoinQuote: payload.contribution.bitcoinQuote,
              contributionId: payload.contribution.id,
              datetime: payload.contribution.createdAt,
            },
            accountKeys,
          )
          generateTransactionForOnChainToRskSwap({
            payment: payload.payments.onChainToRskSwap,
            preImages: preImages.onChain,
            accountKeys,
          }).catch((error) => {
            setFundingRequestErrored(true)
            toast.error({
              title: 'Unable to prepare on-chain-to-RSK claim transaction',
              description: error instanceof Error ? error.message : 'Please refresh and try again',
            })
          })
        }

        if (payload.payments.lightningToRskSwap?.swapJson) {
          parseResponseToLightningToRskSwap(
            payload.payments.lightningToRskSwap,
            {
              projectTitle: project?.title,
              projectId: project?.id,
              reference: payload.contribution.uuid,
              bitcoinQuote: payload.contribution.bitcoinQuote,
              datetime: payload.contribution.createdAt,
              contributionId: payload.contribution.id,
            },
            accountKeys,
          )
          generateTransactionForLightningToRskSwap({
            contribution: payload.contribution,
            payment: payload.payments.lightningToRskSwap,
            preImages: preImages.lightning,
            accountKeys,
          }).catch((error) => {
            setFundingRequestErrored(true)
            toast.error({
              title: 'Unable to prepare Lightning-to-RSK claim transaction',
              description: error instanceof Error ? error.message : 'Please refresh and try again',
            })
          })
        }

        if (hasBolt11 && hasWebLN && webln && payload.payments.lightning && !__development__) {
          startWebLNFlow(payload.payments.lightning).catch(() => {
            toast.error({
              title: 'Something went wrong1',
              description: 'Please refresh the page and try again',
            })
          })
        }
      } catch (e) {
        setFundingRequestErrored(true)
        toast.error({
          title: 'Something went wrong2',
          description: e instanceof Error ? e.message : JSON.stringify(e),
        })
      }
    },
    [
      fundingContributionPartialUpdate,
      fundingPaymentDetailsPartialUpdate,
      generateTransactionForLightningToRskSwap,
      generateTransactionForOnChainToRskSwap,
      parseResponseToLightningToRskSwap,
      parseResponseToOnChainToRskSwap,
      parseResponseToSwap,
      project?.id,
      project?.title,
      setFundingRequestErrored,
      startWebLNFlow,
      toast,
    ],
  )

  const [contributionCreate, requestFundingOptions] = useCustomMutation(useContributionCreateMutation, {
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

  const buildFundingRequestContext = useCallback(
    (): FundingRequestContext => ({
      accountKeys: { ...defaultAccountKeys },
      preImages: getInitialClaimPreImages(),
    }),
    [defaultAccountKeys],
  )

  const handleRequestError = useCallback(
    (error: unknown, fallbackTitle: string) => {
      setFundingRequestErrored(true)
      toast.error({
        title: fallbackTitle,
        description: error instanceof Error ? error.message : 'Please refresh the page and try again',
      })
    },
    [setFundingRequestErrored, toast],
  )

  const [recurringDonationCreate, recurringDonationOptions] = useMutation<
    RecurringDonationCreateMutation,
    RecurringDonationCreateMutationVariables
  >(MUTATION_RECURRING_DONATION_CREATE, {
    onError(error: ApolloError) {
      if (error?.graphQLErrors[0]?.extensions?.code) {
        setError(error.graphQLErrors[0].extensions)
      }

      setFundingRequestErrored(true)
      toast.error({
        title: 'Something went wrong3',
        description: 'Please refresh the page and try again',
      })
    },
  })

  const [projectSubscriptionStart, projectSubscriptionStartOptions] = useMutation<
    ProjectSubscriptionStartMutation,
    ProjectSubscriptionStartMutationVariables
  >(MUTATION_PROJECT_SUBSCRIPTION_START, {
    onError(error: ApolloError) {
      if (error?.graphQLErrors[0]?.extensions?.code) {
        setError(error.graphQLErrors[0].extensions)
      }

      setFundingRequestErrored(true)
      toast.error({
        title: 'Something went wrong3',
        description: 'Please refresh the page and try again',
      })
    },
  })

  const [recurringContributionRenewalCreate, recurringContributionRenewalCreateOptions] = useMutation<
    RecurringContributionRenewalCreateMutation,
    RecurringContributionRenewalCreateMutationVariables
  >(MUTATION_RECURRING_CONTRIBUTION_RENEWAL_CREATE, {
    onError(error: ApolloError) {
      if (error?.graphQLErrors[0]?.extensions?.code) {
        setError(error.graphQLErrors[0].extensions)
      }

      setFundingRequestErrored(true)
      toast.error({
        title: 'Something went wrong3',
        description: 'Please refresh the page and try again',
      })
    },
  })

  const requestFunding = useCallback(
    async (
      input: ContributionCreateInput,
      onCompleted?: (
        data:
          | ContributionCreateMutation
          | RecurringDonationCreateMutation
          | ProjectSubscriptionStartMutation
          | RecurringContributionRenewalCreateMutation,
      ) => void,
    ) => {
      const { isValid, error } = validateFundingInput(input)
      const requestContext = buildFundingRequestContext()

      if (formState.fundingMode === recurringFundingModes.oneTime && !isValid) {
        toast.error({
          title: 'failed to generate invoice',
          description: error,
        })
        return
      }

      if (
        formState.fundingMode === recurringFundingModes.recurringDonation &&
        (!formattedRecurringDonationInput.input.projectId ||
          !formattedRecurringDonationInput.input.paymentMethod ||
          formattedRecurringDonationInput.input.amount <= 0)
      ) {
        toast.error({
          title: 'Unable to create recurring payment',
          description: 'Please refresh the page and try again',
        })
        return
      }

      if (
        formState.fundingMode === recurringFundingModes.membership &&
        (!formattedProjectSubscriptionStartInput.input.projectSubscriptionPlanId ||
          !formattedProjectSubscriptionStartInput.input.paymentMethod)
      ) {
        toast.error({
          title: 'Unable to create recurring payment',
          description: 'Please refresh the page and try again',
        })
        return
      }

      if (
        formattedRecurringContributionRenewalInput &&
        !formattedRecurringContributionRenewalInput.input.managementNonce &&
        !formattedRecurringContributionRenewalInput.input.id
      ) {
        toast.error({
          title: 'Unable to create recurring payment',
          description: 'Please refresh the page and try again',
        })
        return
      }

      resetContribution()

      const finalInput = { ...input }
      const recurringDonationVariables: RecurringDonationCreateMutationVariables = {
        input: {
          ...formattedRecurringDonationInput.input,
          paymentsInput: clonePaymentsInput(formattedRecurringDonationInput.input.paymentsInput),
          ...(formattedRecurringDonationInput.input.metadataInput && {
            metadataInput: {
              ...formattedRecurringDonationInput.input.metadataInput,
            },
          }),
        },
      }
      const projectSubscriptionStartVariables: ProjectSubscriptionStartMutationVariables = {
        input: {
          ...formattedProjectSubscriptionStartInput.input,
          paymentsInput: clonePaymentsInput(formattedProjectSubscriptionStartInput.input.paymentsInput),
          ...(formattedProjectSubscriptionStartInput.input.metadataInput && {
            metadataInput: {
              ...formattedProjectSubscriptionStartInput.input.metadataInput,
            },
          }),
        },
      }
      const recurringContributionRenewalVariables: RecurringContributionRenewalCreateMutationVariables | null =
        formattedRecurringContributionRenewalInput
          ? {
              input: {
                ...formattedRecurringContributionRenewalInput.input,
                paymentsInput: clonePaymentsInput(formattedRecurringContributionRenewalInput.input.paymentsInput),
              },
            }
          : null

      const paymentsInputToPrepare = recurringContributionRenewalVariables
        ? recurringContributionRenewalVariables.input.paymentsInput
        : formState.fundingMode === recurringFundingModes.recurringDonation
        ? recurringDonationVariables.input.paymentsInput
        : formState.fundingMode === recurringFundingModes.membership
        ? projectSubscriptionStartVariables.input.paymentsInput
        : finalInput.paymentsInput

      if (
        formState.fundingMode !== recurringFundingModes.oneTime &&
        project?.name &&
        paymentsInputToPrepare?.fiat?.stripe
      ) {
        paymentsInputToPrepare.fiat.stripe.returnUrl = `${ORIGIN}${getPath('fundingAwaitingSuccess', project.name)}`
        paymentsInputToPrepare.fiat.stripe.theme = stripeEmbeddedTheme
      }

      if (paymentsInputToPrepare?.onChainSwap?.boltz && !paymentsInputToPrepare.onChainSwap.boltz.swapPublicKey) {
        const keyPair = generatePrivatePublicKeyPair()
        setKeyPair(keyPair)
        requestContext.accountKeys.publicKey = keyPair.publicKey.toString('hex')
        requestContext.accountKeys.privateKey = keyPair.privateKey?.toString('hex') || ''
        paymentsInputToPrepare.onChainSwap.boltz.swapPublicKey = keyPair.publicKey.toString('hex')
      }

      const lightningToRskSwapInput = paymentsInputToPrepare?.lightningToRskSwap?.boltz
      const onChainToRskSwapInput = paymentsInputToPrepare?.onChainToRskSwap?.boltz

      if (lightningToRskSwapInput || onChainToRskSwapInput) {
        const ensureAccountKeys = () => {
          if (
            requestContext.accountKeys.publicKey &&
            requestContext.accountKeys.address &&
            isValidRskPrivateKey(requestContext.accountKeys.privateKey)
          ) {
            return requestContext.accountKeys
          }

          const generatedKeys = generateAccountKeys()
          setRskAccountKeys(generatedKeys)
          requestContext.accountKeys.publicKey = generatedKeys.publicKey
          requestContext.accountKeys.address = generatedKeys.address
          requestContext.accountKeys.privateKey = generatedKeys.privateKey

          return requestContext.accountKeys
        }

        const contributionPreImages: {
          lightning?: { preimageHex: string; preimageHash: string }
          onChain?: { preimageHex: string; preimageHash: string }
        } = {}

        if (lightningToRskSwapInput && !lightningToRskSwapInput.preimageHash) {
          const lightningPreImage = generatePreImageHash()
          contributionPreImages.lightning = lightningPreImage
          requestContext.preImages.lightning = lightningPreImage
          lightningToRskSwapInput.preimageHash = lightningPreImage.preimageHash
        }

        if (onChainToRskSwapInput && !onChainToRskSwapInput.preimageHash) {
          const onChainPreImage = generatePreImageHash()
          contributionPreImages.onChain = onChainPreImage
          requestContext.preImages.onChain = onChainPreImage
          onChainToRskSwapInput.preimageHash = onChainPreImage.preimageHash
        }

        if (contributionPreImages.lightning || contributionPreImages.onChain) {
          setContributionCreatePreImages(contributionPreImages)
        }

        if (lightningToRskSwapInput || onChainToRskSwapInput) {
          const accountKeys = ensureAccountKeys()
          if (lightningToRskSwapInput) {
            lightningToRskSwapInput.claimPublicKey = accountKeys.publicKey
            lightningToRskSwapInput.claimAddress = accountKeys.address
          }

          if (onChainToRskSwapInput) {
            onChainToRskSwapInput.claimPublicKey = accountKeys.publicKey
            onChainToRskSwapInput.claimAddress = accountKeys.address
          }
        }
      }

      if (recurringContributionRenewalVariables) {
        try {
          setFundingInputAfterRequest({ ...finalInput, fundingMode: formState.fundingMode })

          const result = await recurringContributionRenewalCreate({
            variables: recurringContributionRenewalVariables,
          })

          if (result.data?.recurringContributionRenewalCreate?.contribution) {
            const recurringCheckoutPayload = result.data.recurringContributionRenewalCreate
            if (!hasAnyPaymentDetails(recurringCheckoutPayload.payments)) {
              throw new Error('Could not create a renewal payment for this recurring contribution')
            }

            handleFundingCompleted(recurringCheckoutPayload, requestContext)

            if (onCompleted) {
              onCompleted({ recurringContributionRenewalCreate: recurringCheckoutPayload })
            }
          }
        } catch (error) {
          handleRequestError(error, 'Unable to create recurring payment')
        }

        return
      }

      if (formState.fundingMode === recurringFundingModes.recurringDonation) {
        try {
          setFundingInputAfterRequest({ ...finalInput, fundingMode: formState.fundingMode })

          const result = await recurringDonationCreate({
            variables: recurringDonationVariables,
          })

          if (result.data?.recurringDonationCreate?.contribution) {
            const recurringCheckoutPayload = result.data.recurringDonationCreate
            if (!hasAnyPaymentDetails(recurringCheckoutPayload.payments)) {
              throw new Error('Could not create a recurring payment for this contribution')
            }

            handleFundingCompleted(recurringCheckoutPayload, requestContext)

            if (onCompleted) {
              onCompleted({ recurringDonationCreate: recurringCheckoutPayload })
            }
          }
        } catch (error) {
          handleRequestError(error, 'Unable to create recurring payment')
        }

        return
      }

      if (formState.fundingMode === recurringFundingModes.membership) {
        try {
          setFundingInputAfterRequest({ ...finalInput, fundingMode: formState.fundingMode })

          const result = await projectSubscriptionStart({
            variables: projectSubscriptionStartVariables,
          })

          if (result.data?.projectSubscriptionStart?.contribution) {
            const recurringCheckoutPayload = result.data.projectSubscriptionStart
            if (!hasAnyPaymentDetails(recurringCheckoutPayload.payments)) {
              throw new Error('Could not create a recurring payment for this membership')
            }

            handleFundingCompleted(recurringCheckoutPayload, requestContext)

            if (onCompleted) {
              onCompleted({ projectSubscriptionStart: recurringCheckoutPayload })
            }
          }
        } catch (error) {
          handleRequestError(error, 'Unable to create recurring payment')
        }

        return
      }

      const inputWithStripePaymentConfig = applyStripePaymentConfig(finalInput)
      setFundingInputAfterRequest(inputWithStripePaymentConfig)

      await contributionCreate({
        variables: { input: inputWithStripePaymentConfig },
        onCompleted(data) {
          if (!data.contributionCreate || !data.contributionCreate.contribution) {
            setFundingRequestErrored(true)
            return
          }

          handleFundingCompleted(data.contributionCreate, requestContext)
          onCompleted?.(data)
        },
      })
    },
    [
      applyStripePaymentConfig,
      buildFundingRequestContext,
      contributionCreate,
      formState.fundingMode,
      formattedProjectSubscriptionStartInput,
      formattedRecurringContributionRenewalInput,
      formattedRecurringDonationInput,
      handleFundingCompleted,
      handleRequestError,
      projectSubscriptionStart,
      recurringContributionRenewalCreate,
      recurringDonationCreate,
      toast,
      setKeyPair,
      setFundingInputAfterRequest,
      setFundingRequestErrored,
      project?.name,
      resetContribution,
      setRskAccountKeys,
      setContributionCreatePreImages,
      stripeEmbeddedTheme,
    ],
  )

  const requestFundingFromContext = useCallback(
    (
      onCompleted?: (
        data:
          | ContributionCreateMutation
          | RecurringDonationCreateMutation
          | ProjectSubscriptionStartMutation
          | RecurringContributionRenewalCreateMutation,
      ) => void,
    ) => requestFunding(formattedFundingInput, onCompleted),
    [requestFunding, formattedFundingInput],
  )

  const requestFiatOnlyFundingFromContext = useCallback(
    (
      onCompleted?: (
        data:
          | ContributionCreateMutation
          | RecurringDonationCreateMutation
          | ProjectSubscriptionStartMutation
          | RecurringContributionRenewalCreateMutation,
      ) => void,
    ) =>
      requestFunding(
        formState.fundingMode === recurringFundingModes.oneTime
          ? { ...formattedFundingInput, paymentsInput: fiatOnlyPaymentsInput }
          : formattedFundingInput,
        onCompleted,
      ),
    [requestFunding, formattedFundingInput, fiatOnlyPaymentsInput, formState.fundingMode],
  )

  return {
    requestFundingOptions: {
      ...requestFundingOptions,
      loading:
        requestFundingOptions.loading ||
        recurringDonationOptions.loading ||
        projectSubscriptionStartOptions.loading ||
        recurringContributionRenewalCreateOptions.loading,
      error:
        requestFundingOptions.error ||
        recurringDonationOptions.error ||
        projectSubscriptionStartOptions.error ||
        recurringContributionRenewalCreateOptions.error,
    },
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

  const setPaymentSwapClaimTx = async (params: { paymentId: string; claimTxCallDataHex: string }) => {
    const { paymentId, claimTxCallDataHex } = params

    const attemptSet = async (attempt: number): Promise<void> => {
      try {
        const response = await paymentSwapClaimTxSet({
          variables: {
            input: {
              paymentId,
              claimTxCallDataHex,
            },
          },
        })

        if (!response.data?.paymentSwapClaimTxSet?.success) {
          throw new Error(`Failed to set swap claim transaction for payment ${paymentId}`)
        }
      } catch (error) {
        const canRetry = attempt < PAYMENT_SWAP_CLAIM_TX_SET_MAX_ATTEMPTS && isRetryableClaimTxSetError(error)

        if (!canRetry) {
          throw error instanceof Error
            ? error
            : new Error(`Failed to set swap claim transaction for payment ${paymentId}`)
        }

        await delay(PAYMENT_SWAP_CLAIM_TX_SET_RETRY_DELAY_MS * attempt)
        await attemptSet(attempt + 1)
      }
    }

    await attemptSet(1)
  }

  const generateTransactionForLightningToRskSwap = async ({
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

    await setPaymentSwapClaimTx({
      paymentId: payment.paymentId,
      claimTxCallDataHex,
    })
  }

  const generateTransactionForOnChainToRskSwap = async ({
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

    await setPaymentSwapClaimTx({
      paymentId: payment.paymentId,
      claimTxCallDataHex,
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
