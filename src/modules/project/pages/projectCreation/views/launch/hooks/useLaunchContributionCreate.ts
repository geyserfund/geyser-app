import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useGenerateTransactionDataForClaimingRBTCToContract } from '@/modules/project/funding/hooks/useFundingAPI.ts'
import { useStripeEmbeddedTheme } from '@/modules/project/funding/hooks/useStripeEmbeddedTheme.ts'
import { keyPairAtom, parseLightningToRskSwapAtom, parseOnChainToRskSwapAtom, parseSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { generatePrivatePublicKeyPair } from '@/modules/project/funding/utils/helpers.ts'
import {
  decryptSeed,
  generateKeysFromSeedHex,
  generatePreImageHash,
  hasValidRskAccountKeys,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { GEYSER_LAUNCH_PROJECT_ID, ORIGIN } from '@/shared/constants/config/env.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { isPrismEnabled } from '@/shared/utils/project/isPrismEnabled.ts'
import {
  ContributionPaymentsInput,
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
  FundingResourceType,
  ProjectPageBodyFragment,
  QuoteCurrency,
  useContributionCreateMutation,
  useProjectPageBodyQuery,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { LAUNCH_FEE_USD_CENTS } from '../constants/launchFees.ts'
import { LaunchPaymentMethod } from '../views/LaunchPaymentMethodSelection.tsx'
import { ProjectLaunchStrategy } from '../views/LaunchStrategySelection.tsx'

type LaunchPrismAccountKeys = {
  publicKey: string
  address: string
  privateKey: string
}

type LaunchPreImage = {
  preimageHex: string
  preimageHash: string
}

type LaunchRequestContext = {
  accountKeys?: LaunchPrismAccountKeys
  lightningPreImage?: LaunchPreImage
  onChainPreImage?: LaunchPreImage
}

type LaunchAccountKeyResolution =
  | { status: 'ok'; accountKeys: LaunchPrismAccountKeys }
  | { status: 'prompt' }
  | { status: 'error'; error: string }

export type ContributionResult =
  | { ok: true; contribution: FundingContributionFragment; payments: FundingContributionPaymentDetailsFragment }
  | { ok: false; error: string; reason?: 'password_required' }

/** Encapsulates launch-fee contribution creation across Lightning, on-chain, Prism, and Stripe payment paths. */
export const useLaunchContributionCreate = (strategy: ProjectLaunchStrategy) => {
  const toast = useNotification()
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const usdRate = useAtomValue(usdRateAtom)
  const storedPassword = useAtomValue(accountPasswordAtom)
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)
  const setKeyPair = useSetAtom(keyPairAtom)
  const parseResponseToSwap = useSetAtom(parseSwapAtom)
  const parseResponseToOnChainToRskSwap = useSetAtom(parseOnChainToRskSwapAtom)
  const parseResponseToLightningToRskSwap = useSetAtom(parseLightningToRskSwapAtom)

  const { getSatoshisFromUSDCents } = useBTCConverter()
  const stripeEmbeddedTheme = useStripeEmbeddedTheme()

  const { data: launchPaymentProjectData, loading: launchPaymentProjectLoading } = useProjectPageBodyQuery({
    variables: {
      where: {
        id: GEYSER_LAUNCH_PROJECT_ID,
      },
    },
  })

  const launchPaymentProject = launchPaymentProjectData?.projectGet

  const { generateTransactionForLightningToRskSwap, generateTransactionForOnChainToRskSwap } =
    useGenerateTransactionDataForClaimingRBTCToContract(launchPaymentProject)

  const donationAmount = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])

  const returnUrl = useMemo(() => {
    if (project.name) {
      return `${ORIGIN}/project/${project.name}/funding/success`
    }

    return `${ORIGIN}/`
  }, [project.name])

  const defaultAccountKeys = useMemo<LaunchPrismAccountKeys>(
    () => ({
      publicKey: userAccountKeys?.rskKeyPair?.publicKey || userAccountKeyPair?.publicKey || '',
      address: userAccountKeys?.rskKeyPair?.address || '',
      privateKey: userAccountKeyPair?.privateKey || '',
    }),
    [
      userAccountKeyPair?.privateKey,
      userAccountKeyPair?.publicKey,
      userAccountKeys?.rskKeyPair?.address,
      userAccountKeys?.rskKeyPair?.publicKey,
    ],
  )

  const [contributionCreate, { loading }] = useContributionCreateMutation()

  const resolvePrismAccountKeys = useCallback(
    async (passwordOverride?: string): Promise<LaunchAccountKeyResolution> => {
      if (hasValidRskAccountKeys(defaultAccountKeys)) {
        return {
          status: 'ok',
          accountKeys: defaultAccountKeys,
        }
      }

      if (!userAccountKeys?.encryptedSeed) {
        return {
          status: 'prompt',
        }
      }

      const password = passwordOverride || storedPassword
      if (!password) {
        return {
          status: 'prompt',
        }
      }

      try {
        const decryptedSeed = await decryptSeed(userAccountKeys.encryptedSeed, password)
        const accountKeys = generateKeysFromSeedHex(decryptedSeed)
        setUserAccountKeyPair({
          privateKey: accountKeys.privateKey,
          publicKey: accountKeys.publicKey,
        })

        return {
          status: 'ok',
          accountKeys,
        }
      } catch (error) {
        if (!passwordOverride) {
          return {
            status: 'prompt',
          }
        }

        return {
          status: 'error',
          error: error instanceof Error ? error.message : t('Invalid password'),
        }
      }
    },
    [defaultAccountKeys, setUserAccountKeyPair, storedPassword, userAccountKeys?.encryptedSeed],
  )

  const processContributionResponse = useCallback(
    (
      contribution: FundingContributionFragment,
      payments: FundingContributionPaymentDetailsFragment,
      requestContext: LaunchRequestContext,
      targetProject?: ProjectPageBodyFragment | null,
    ) => {
      const contributionInfo = {
        projectTitle: project?.title,
        projectId: project?.id,
        reference: contribution.uuid,
        contributionId: contribution.id,
        bitcoinQuote: contribution.bitcoinQuote,
        datetime: contribution.createdAt,
      }

      if (payments.onChainSwap?.swapJson) {
        parseResponseToSwap(payments.onChainSwap, contributionInfo)
      }

      if (payments.onChainToRskSwap?.swapJson) {
        parseResponseToOnChainToRskSwap(payments.onChainToRskSwap, contributionInfo, requestContext.accountKeys)

        if (requestContext.accountKeys && requestContext.onChainPreImage) {
          generateTransactionForOnChainToRskSwap({
            payment: payments.onChainToRskSwap,
            preImages: requestContext.onChainPreImage,
            accountKeys: requestContext.accountKeys,
          }).catch((error) => {
            toast.error({
              title: t('Unable to prepare on-chain payment'),
              description: error instanceof Error ? error.message : t('Please refresh and try again.'),
            })
          })
        }
      }

      if (payments.lightningToRskSwap?.swapJson) {
        parseResponseToLightningToRskSwap(payments.lightningToRskSwap, contributionInfo, requestContext.accountKeys)

        if (requestContext.accountKeys && requestContext.lightningPreImage) {
          generateTransactionForLightningToRskSwap({
            contribution,
            payment: payments.lightningToRskSwap,
            preImages: requestContext.lightningPreImage,
            accountKeys: requestContext.accountKeys,
          }).catch((error) => {
            toast.error({
              title: t('Unable to prepare Lightning payment'),
              description: error instanceof Error ? error.message : t('Please refresh and try again.'),
            })
          })
        }
      }

      if (!targetProject) {
        toast.warning({
          title: t('Launch payment details are still loading'),
        })
      }
    },
    [
      generateTransactionForLightningToRskSwap,
      generateTransactionForOnChainToRskSwap,
      parseResponseToLightningToRskSwap,
      parseResponseToOnChainToRskSwap,
      parseResponseToSwap,
      project?.id,
      project?.title,
      toast,
    ],
  )

  const createContribution = useCallback(
    async (method: LaunchPaymentMethod, passwordOverride?: string): Promise<ContributionResult> => {
      if (!user?.id || !project?.id || !usdRate) {
        return { ok: false, error: t('Unable to create contribution. Please try again.') }
      }

      if (!launchPaymentProject) {
        return { ok: false, error: t('Launch payment details are still loading. Please try again.') }
      }

      const sharedInput = {
        projectId: GEYSER_LAUNCH_PROJECT_ID,
        anonymous: false,
        refundable: false,
        donationAmount,
        metadataInput: {
          email: user.email,
          privateComment: JSON.stringify({
            paidLaunch: true,
            projectId: project.id,
            launchStrategy: strategy,
          }),
          followProject: true,
        },
        orderInput: {
          bitcoinQuote: {
            quote: usdRate,
            quoteCurrency: QuoteCurrency.Usd,
          },
          items: [],
        },
        sourceResourceInput: {
          resourceId: project.id.toString(),
          resourceType: FundingResourceType.Project,
        },
      }

      const paymentsInput: ContributionPaymentsInput = {}
      const requestContext: LaunchRequestContext = {}
      const prismEnabled = isPrismEnabled(launchPaymentProject)

      if (method === LaunchPaymentMethod.CreditCard) {
        paymentsInput.fiat = {
          create: true,
          stripe: {
            returnUrl,
            theme: stripeEmbeddedTheme,
          },
        }
      }

      if (method === LaunchPaymentMethod.Lightning) {
        if (prismEnabled) {
          const accountKeyResolution = await resolvePrismAccountKeys(passwordOverride)

          if (accountKeyResolution.status === 'prompt') {
            return {
              ok: false,
              error: t('Please confirm your account password to continue.'),
              reason: 'password_required',
            }
          }

          if (accountKeyResolution.status === 'error') {
            return {
              ok: false,
              error: accountKeyResolution.error,
              reason: 'password_required',
            }
          }

          const lightningPreImage = generatePreImageHash()
          requestContext.accountKeys = accountKeyResolution.accountKeys
          requestContext.lightningPreImage = lightningPreImage
          paymentsInput.lightningToRskSwap = {
            create: true,
            boltz: {
              claimPublicKey: accountKeyResolution.accountKeys.publicKey,
              claimAddress: accountKeyResolution.accountKeys.address,
              preimageHash: lightningPreImage.preimageHash,
            },
          }
        } else {
          paymentsInput.lightning = {
            create: true,
          }
        }
      }

      if (method === LaunchPaymentMethod.Onchain) {
        if (prismEnabled) {
          const accountKeyResolution = await resolvePrismAccountKeys(passwordOverride)

          if (accountKeyResolution.status === 'prompt') {
            return {
              ok: false,
              error: t('Please confirm your account password to continue.'),
              reason: 'password_required',
            }
          }

          if (accountKeyResolution.status === 'error') {
            return {
              ok: false,
              error: accountKeyResolution.error,
              reason: 'password_required',
            }
          }

          const onChainPreImage = generatePreImageHash()
          requestContext.accountKeys = accountKeyResolution.accountKeys
          requestContext.onChainPreImage = onChainPreImage
          paymentsInput.onChainToRskSwap = {
            create: true,
            boltz: {
              claimPublicKey: accountKeyResolution.accountKeys.publicKey,
              claimAddress: accountKeyResolution.accountKeys.address,
              preimageHash: onChainPreImage.preimageHash,
            },
          }
        } else {
          const keyPair = generatePrivatePublicKeyPair()
          setKeyPair(keyPair)
          paymentsInput.onChainSwap = {
            create: true,
            boltz: {
              swapPublicKey: keyPair.publicKey.toString('hex'),
            },
          }
        }
      }

      try {
        const result = await contributionCreate({
          variables: {
            input: {
              ...sharedInput,
              paymentsInput,
            },
          },
        })

        if (!result.data?.contributionCreate) {
          return { ok: false, error: t('Failed to create contribution. Please try again.') }
        }

        const { contribution, payments } = result.data.contributionCreate

        if (method === LaunchPaymentMethod.CreditCard) {
          if (!payments.fiat?.stripeClientSecret || !payments.fiat?.stripeAccountId) {
            return {
              ok: false,
              error: t('Unable to initialize card checkout. Please choose another payment method or try again.'),
            }
          }
        }

        processContributionResponse(contribution, payments, requestContext, launchPaymentProject)

        return { ok: true, contribution, payments }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : t('Something went wrong. Please try again.')
        return { ok: false, error: message }
      }
    },
    [
      contributionCreate,
      donationAmount,
      launchPaymentProject,
      processContributionResponse,
      project?.id,
      resolvePrismAccountKeys,
      returnUrl,
      setKeyPair,
      strategy,
      stripeEmbeddedTheme,
      usdRate,
      user?.email,
      user?.id,
    ],
  )

  return {
    createContribution,
    loading,
    launchPaymentProjectLoading,
  }
}
