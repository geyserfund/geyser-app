import { VStack } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '@/context'
import { useListenFundingContributionSuccess } from '@/modules/project/funding/hooks/useListenFundingContributionSuccess'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { Body } from '@/shared/components/typography'
import { VITE_APP_STRIPE_API_KEY } from '@/shared/constants/config/env'

const stripePromiseByAccount = new Map<string, ReturnType<typeof loadStripe>>()

const getStripePromiseForAccount = (stripeAccountId: string) => {
  let stripePromise = stripePromiseByAccount.get(stripeAccountId)
  if (!stripePromise) {
    stripePromise = loadStripe(VITE_APP_STRIPE_API_KEY, { stripeAccount: stripeAccountId })
    stripePromiseByAccount.set(stripeAccountId, stripePromise)
  }

  return stripePromise
}

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    backgroundColor: colors.utils.pbg,
    width: '100%',
  },
}))

export const PaymentStripe = () => {
  const classes = useStyles()

  useListenFundingContributionSuccess()

  const [isCompleted, setIsCompleted] = useState(false)

  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const stripeAccountId = fundingPaymentDetails.fiat?.stripeAccountId || ''
  const stripeClientSecret = useMemo(() => {
    const clientSecret = fundingPaymentDetails.fiat?.stripeClientSecret
    if (!clientSecret) return ''
    if (!clientSecret.includes('%')) return clientSecret

    try {
      return decodeURIComponent(clientSecret)
    } catch {
      return clientSecret
    }
  }, [fundingPaymentDetails.fiat?.stripeClientSecret])

  const handleStripeComplete = useCallback(() => {
    setIsCompleted(true)
  }, [])

  const stripeOptions = useMemo(() => {
    if (!stripeClientSecret) return undefined

    return {
      clientSecret: stripeClientSecret,
      onComplete: handleStripeComplete,
    }
  }, [stripeClientSecret, handleStripeComplete])

  const stripePromise = useMemo(() => {
    if (!stripeAccountId) return undefined
    return getStripePromiseForAccount(stripeAccountId)
  }, [stripeAccountId])

  if (!stripeClientSecret || !stripeOptions) {
    return null
  }

  if (!stripeAccountId) {
    console.error('Missing stripeAccountId for Stripe direct-charge checkout initialization')
    return (
      <Body size="sm" light>
        {t('Unable to initialize card checkout. Please refresh and try again.')}
      </Body>
    )
  }

  if (!stripePromise) {
    return null
  }

  return (
    <VStack w="full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={stripeOptions}>
        <EmbeddedCheckout className={classes.container} />
      </EmbeddedCheckoutProvider>
      <Body size="sm" light>
        {t('This checkout is charged in USD. Your bank or card issuer may convert the amount to your local currency.')}
      </Body>
      {isCompleted && (
        <Body size="sm" light>
          {t(
            'The payment will be processed by Stripe. You will be re-directed to the success screen after the payment confirms',
          )}
        </Body>
      )}
    </VStack>
  )
}
