import { atom } from 'jotai'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import {
  ProjectSubscriptionStartMutationVariables,
  RecurringContributionRenewalCreateMutationVariables,
  RecurringDonationCreateMutationVariables,
  recurringIntervals,
  recurringPaymentMethods,
} from '@/modules/project/recurring/graphql'
import { ORIGIN } from '@/shared/constants/config/env.ts'
import { getPath } from '@/shared/constants/index.ts'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import {
  ContributionCreateInput,
  ContributionPaymentsInput,
  FundingResourceType,
  ProjectFundingStrategy,
  StrikePaymentRail,
  UserMeFragment,
} from '@/types/generated/graphql'
import { toInt } from '@/utils'

import { userAccountKeysAtom } from '../../../auth/state/userAccountKeysAtom.ts'
import {
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../../pages/projectFunding/views/fundingPayment/state/paymentMethodAtom.ts'
import { sourceResourceAtom } from '../../pages/projectView/state/sourceActivityAtom.ts'
import { fundingProjectAtom, guardianBadgesCostAtoms, tipAtoms } from './fundingFormAtom'
import { fundingFormStateAtom } from './fundingFormAtom'
import type { FundFormType, FundingProjectState } from './fundingFormAtom.ts'
import { recurringContributionRenewalAtom } from './recurringContributionRenewalAtom.ts'
import { selectedGoalIdAtom } from './selectedGoalAtom'

type BuildContributionCreateInputArgs = {
  formState: FundFormType
  fundingProject: FundingProjectState
  user?: UserMeFragment | null
  projectGoalId?: string | null
  sourceResource: { resourceId?: string | number; resourceType?: FundingResourceType }
  referrerHeroId?: string | null
  geyserTip: { sats: number }
  guardianBadgesCosts: { sats: number }
  paymentsInput: ContributionPaymentsInput
}

const buildContributionCreateInput = ({
  formState,
  fundingProject,
  user,
  projectGoalId,
  sourceResource,
  referrerHeroId,
  geyserTip,
  guardianBadgesCosts,
  paymentsInput,
}: BuildContributionCreateInputArgs): ContributionCreateInput => {
  const {
    donationAmount,
    email,
    comment,
    media,
    privateComment,
    followProject,
    subscribeToGeyserEmails,
    geyserTipPercent,
    guardianBadges,
  } = formState

  const anonymous = !user || !user.id

  const geyserTipPercentage =
    guardianBadgesCosts.sats > 0 && donationAmount > 0
      ? ((geyserTip.sats + guardianBadgesCosts.sats) * 100) / donationAmount
      : geyserTipPercent > 0
      ? geyserTipPercent
      : undefined
  const sanitizedReferrerHeroId = user?.heroId && referrerHeroId === user.heroId ? undefined : referrerHeroId

  const input: ContributionCreateInput = {
    refundable: false,
    projectId: toInt(fundingProject?.id),
    projectGoalId,
    anonymous,
    donationAmount: toInt(donationAmount),
    geyserTipPercentage,
    referrerHeroId: sanitizedReferrerHeroId,
    metadataInput: {
      ...(email && { email }),
      ...(media && { media }),
      ...(comment && { comment }),
      ...(privateComment && { privateComment }),
      ...(followProject && { followProject }),
      ...(subscribeToGeyserEmails && { subscribeToGeyserEmails }),
      ...(guardianBadges.length > 0 && { guardianBadges }),
    },
    sourceResourceInput: {
      resourceId: sourceResource.resourceId ? `${sourceResource.resourceId}` : `${fundingProject?.id}`,
      resourceType: sourceResource.resourceType || FundingResourceType.Project,
    },
    paymentsInput,
  }

  if (isManagedRecoverableGrantProject(fundingProject)) {
    if (input.metadataInput) input.metadataInput.guardianBadges = undefined
  }

  return input
}

/** Formatted Funding Input data, for Fund Mutation */
export const formattedFundingInputAtom = atom((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProject = get(fundingProjectAtom)
  const user = get(authUserAtom)
  const projectGoalId = get(selectedGoalIdAtom)
  const sourceResource = get(sourceResourceAtom)
  const referrerHeroId = get(referrerHeroIdAtom)
  const geyserTip = get(tipAtoms)
  const guardianBadgesCosts = get(guardianBadgesCostAtoms)

  const paymentsInput = get(paymentsInputAtom)

  return buildContributionCreateInput({
    formState,
    fundingProject,
    user,
    projectGoalId,
    sourceResource,
    referrerHeroId,
    geyserTip,
    guardianBadgesCosts,
    paymentsInput,
  })
})

const recurringMetadataInputAtom = atom((get) => {
  const { email, media, comment, privateComment, followProject, subscribeToGeyserEmails } = get(fundingFormStateAtom)

  return {
    ...(email && { email }),
    ...(media && { media }),
    ...(comment && { comment }),
    ...(privateComment && { privateComment }),
    ...(followProject && { followProject }),
    ...(subscribeToGeyserEmails && { subscribeToGeyserEmails }),
  }
})

export const formattedRecurringDonationInputAtom = atom<RecurringDonationCreateMutationVariables>((get) => {
  const fundingProject = get(fundingProjectAtom)
  const formState = get(fundingFormStateAtom)
  const user = get(authUserAtom)
  const intendedPaymentMethod = get(intendedPaymentMethodAtom)
  const metadataInput = get(recurringMetadataInputAtom)
  const paymentsInput = get(recurringPaymentsInputAtom)
  const stripeEnabled = Boolean(fundingProject.paymentMethods?.fiat?.stripe)

  const paymentMethod =
    intendedPaymentMethod === PaymentMethods.fiatSwap
      ? stripeEnabled
        ? recurringPaymentMethods.stripe
        : recurringPaymentMethods.banxa
      : recurringPaymentMethods.bitcoin
  const amount =
    paymentMethod === recurringPaymentMethods.bitcoin ? formState.donationAmount : formState.donationAmountUsdCent

  return {
    input: {
      projectId: toInt(fundingProject.id),
      paymentMethod,
      interval: formState.recurringInterval || recurringIntervals.monthly,
      amount,
      ...(formState.geyserTipPercent > 0 && { geyserTipPercentage: formState.geyserTipPercent }),
      anonymous: !user || !user.id,
      paymentsInput,
      metadataInput,
    },
  }
})

export const formattedProjectSubscriptionStartInputAtom = atom<ProjectSubscriptionStartMutationVariables>((get) => {
  const formState = get(fundingFormStateAtom)
  const fundingProject = get(fundingProjectAtom)
  const user = get(authUserAtom)
  const intendedPaymentMethod = get(intendedPaymentMethodAtom)
  const metadataInput = get(recurringMetadataInputAtom)
  const paymentsInput = get(recurringPaymentsInputAtom)
  const stripeEnabled = Boolean(fundingProject.paymentMethods?.fiat?.stripe)

  return {
    input: {
      projectSubscriptionPlanId: toInt(formState.subscription.subscriptionId),
      paymentMethod:
        intendedPaymentMethod === PaymentMethods.fiatSwap
          ? stripeEnabled
            ? recurringPaymentMethods.stripe
            : recurringPaymentMethods.banxa
          : recurringPaymentMethods.bitcoin,
      anonymous: !user || !user.id,
      paymentsInput,
      metadataInput,
    },
  }
})

export const formattedRecurringContributionRenewalInputAtom =
  atom<RecurringContributionRenewalCreateMutationVariables | null>((get) => {
    const renewal = get(recurringContributionRenewalAtom)
    const paymentsInput = get(recurringPaymentsInputAtom)

    if (!renewal) {
      return null
    }

    return {
      input: {
        managementNonce: renewal.managementNonce,
        anonymous: !renewal.userId,
        paymentsInput,
      },
    }
  })

/** Funding Input after request */
export const fundingInputAfterRequestAtom = atom<
  | ({ user?: UserMeFragment | null; lightningPreImageHex?: string; onChainPreImageHex?: string } & Record<
      string,
      unknown
    >)
  | null
>(null)

export const setFundingInputAfterRequestAtom = atom(
  null,
  (get, set, input: Record<string, unknown> & { lightningPreImageHex?: string; onChainPreImageHex?: string }) => {
    const user = get(authUserAtom)
    set(fundingInputAfterRequestAtom, { ...input, user })
  },
)

export const contributionCreatePreImagesAtom = atom<{
  lightning?: { preimageHex: string; preimageHash: string }
  onChain?: { preimageHex: string; preimageHash: string }
}>({})

export const contributionAddPaymentPreImagesAtom = atom<{
  lightning?: { preimageHex: string; preimageHash: string }
}>({})

export const anonymousRecoveryCodeAtom = atom<string>('')

/** Reset funding input after request */
export const resetFundingInputAfterRequestAtom = atom(null, (_, set) => {
  set(fundingInputAfterRequestAtom, null)
  set(contributionCreatePreImagesAtom, {
    lightning: { preimageHex: '', preimageHash: '' },
    onChain: { preimageHex: '', preimageHash: '' },
  })
  set(contributionAddPaymentPreImagesAtom, {
    lightning: { preimageHex: '', preimageHash: '' },
  })
  set(anonymousRecoveryCodeAtom, '')
})

/** Payments input for fiat-only contribution creation */
export const fiatOnlyPaymentsInputAtom = atom<ContributionPaymentsInput>((get) => {
  const fundingProject = get(fundingProjectAtom)

  if (fundingProject.fundingStrategy !== ProjectFundingStrategy.TakeItAll) {
    return {}
  }

  const stripeReady = isManagedRecoverableGrantProject(fundingProject)
    ? fundingProject.paymentMethods?.managedRecoverableGrant?.stripe
    : fundingProject.paymentMethods?.fiat?.stripe

  if (!stripeReady) {
    return {}
  }

  return {
    fiat: {
      create: true,
      stripe: {
        returnUrl: `${ORIGIN}${getPath('fundingAwaitingSuccess', fundingProject?.name)}`,
      },
    },
  }
})

const buildBoltzSwapInput = (claimPublicKey?: string | null, claimAddress?: string | null) => ({
  create: true,
  boltz: {
    // For logged-out users, keys are generated right before the mutation is sent.
    claimPublicKey: claimPublicKey ?? '',
    claimAddress: claimAddress ?? '',
    preimageHash: '',
  },
})

const recurringPaymentsInputAtom = atom<ContributionPaymentsInput>((get) => {
  const fundingProject = get(fundingProjectAtom)
  const intendedPaymentMethod = get(intendedPaymentMethodAtom)
  const stripeEnabled = Boolean(fundingProject.paymentMethods?.fiat?.stripe)

  if (intendedPaymentMethod === PaymentMethods.fiatSwap) {
    if (stripeEnabled) {
      return get(fiatOnlyPaymentsInputAtom)
    }

    const userAccountKeys = get(userAccountKeysAtom)
    const lightningToRskSwap = buildBoltzSwapInput(
      userAccountKeys?.rskKeyPair?.publicKey,
      userAccountKeys?.rskKeyPair?.address,
    )

    return {
      fiatToLightningSwap: {
        create: true,
        banxa: {
          fiatCurrency: 'USD',
          returnUrl: `${ORIGIN}${getPath('fundingCallback', fundingProject.name)}`,
        },
      },
      lightningToRskSwap,
    }
  }

  return get(paymentsInputAtom)
})

const paymentsInputAtom = atom<ContributionPaymentsInput>((get) => {
  const fundingProject = get(fundingProjectAtom)
  const userAccountKeys = get(userAccountKeysAtom)
  const intendedPaymentMethod = get(intendedPaymentMethodAtom)

  const paymentsInput: ContributionPaymentsInput = {}

  const claimPublicKey = userAccountKeys?.rskKeyPair?.publicKey
  const claimAddress = userAccountKeys?.rskKeyPair?.address
  const lightningBoltzSwapInput = buildBoltzSwapInput(claimPublicKey, claimAddress)
  const onChainBoltzSwapInput = buildBoltzSwapInput(claimPublicKey, claimAddress)
  const stripeEnabled = Boolean(fundingProject.paymentMethods?.fiat?.stripe)
  const managedRecoverableGrant = isManagedRecoverableGrantProject(fundingProject)

  if (managedRecoverableGrant) {
    if (intendedPaymentMethod === PaymentMethods.fiatSwap) {
      if (fundingProject.paymentMethods?.managedRecoverableGrant?.stripe) {
        paymentsInput.fiat = {
          create: true,
          stripe: { returnUrl: `${ORIGIN}${getPath('fundingAwaitingSuccess', fundingProject.name)}` },
        }
      }
    } else if (
      intendedPaymentMethod === PaymentMethods.lightning &&
      fundingProject.paymentMethods?.managedRecoverableGrant?.strikeLightning
    ) {
      paymentsInput.strike = { create: true, rail: StrikePaymentRail.Lightning }
    } else if (
      intendedPaymentMethod === PaymentMethods.onChain &&
      fundingProject.paymentMethods?.managedRecoverableGrant?.strikeOnChain
    ) {
      paymentsInput.strike = { create: true, rail: StrikePaymentRail.OnChain }
    }

    return paymentsInput
  }

  const supportsPrismSwaps =
    fundingProject.fundingStrategy === ProjectFundingStrategy.TakeItAll ||
    fundingProject.fundingStrategy === ProjectFundingStrategy.AllOrNothing

  if (
    fundingProject.fundingStrategy === ProjectFundingStrategy.TakeItAll &&
    intendedPaymentMethod === PaymentMethods.fiatSwap &&
    stripeEnabled
  ) {
    paymentsInput.fiat = {
      create: true,
      stripe: {
        returnUrl: `${ORIGIN}${getPath('fundingAwaitingSuccess', fundingProject?.name)}`,
      },
    }
  }

  if (supportsPrismSwaps) {
    paymentsInput.lightningToRskSwap = lightningBoltzSwapInput
    paymentsInput.onChainToRskSwap = onChainBoltzSwapInput
  }

  return paymentsInput
})
