import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useStripeEmbeddedTheme } from '@/modules/project/funding/hooks/useStripeEmbeddedTheme.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { GEYSER_LAUNCH_PROJECT_ID, ORIGIN } from '@/shared/constants/config/env.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import {
  FundingContributionFragment,
  FundingContributionPaymentDetailsFragment,
  FundingResourceType,
  QuoteCurrency,
  useContributionCreateMutation,
} from '@/types/index.ts'

import { LAUNCH_FEE_USD_CENTS } from '../constants/launchFees.ts'
import { LaunchPaymentMethod } from '../views/LaunchPaymentMethodSelection.tsx'
import { ProjectLaunchStrategy } from '../views/LaunchStrategySelection.tsx'

export type ContributionResult =
  | { ok: true; contribution: FundingContributionFragment; payments: FundingContributionPaymentDetailsFragment }
  | { ok: false; error: string }

/** Encapsulates `contributionCreate` mutation for launch-fee payments on both Lightning and Stripe paths. */
export const useLaunchContributionCreate = (strategy: ProjectLaunchStrategy) => {
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const usdRate = useAtomValue(usdRateAtom)
  const { getSatoshisFromUSDCents } = useBTCConverter()
  const stripeEmbeddedTheme = useStripeEmbeddedTheme()

  const donationAmount = getSatoshisFromUSDCents(LAUNCH_FEE_USD_CENTS[strategy])

  const returnUrl = useMemo(() => {
    if (project.name) {
      return `${ORIGIN}/project/${project.name}/funding/success`
    }

    return `${ORIGIN}/`
  }, [project.name])

  const [contributionCreate, { loading }] = useContributionCreateMutation()

  const createContribution = useCallback(
    async (method: LaunchPaymentMethod): Promise<ContributionResult> => {
      if (!user?.id || !project?.id || !usdRate) {
        return { ok: false, error: t('Unable to create contribution. Please try again.') }
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

      try {
        const result = await contributionCreate({
          variables: {
            input: {
              ...sharedInput,
              paymentsInput:
                method === LaunchPaymentMethod.Lightning
                  ? { lightning: { create: true } }
                  : {
                      fiat: {
                        create: true,
                        stripe: {
                          returnUrl,
                          theme: stripeEmbeddedTheme,
                        },
                      },
                    },
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
              error: t('Unable to initialize card checkout. Please choose Lightning or try again.'),
            }
          }
        }

        return { ok: true, contribution, payments }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : t('Something went wrong. Please try again.')
        return { ok: false, error: message }
      }
    },
    [
      contributionCreate,
      donationAmount,
      project?.id,
      returnUrl,
      strategy,
      stripeEmbeddedTheme,
      usdRate,
      user?.email,
      user?.id,
    ],
  )

  return { createContribution, loading }
}
