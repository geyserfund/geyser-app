import { VStack } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { t } from 'i18next'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '@/context'
import { useListenFundingSuccess } from '@/modules/project/funding/hooks/useListenFundingSuccess'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { Body } from '@/shared/components/typography'
import { VITE_APP_STRIPE_API_KEY } from '@/shared/constants/config/env'

const stripePromise = loadStripe(VITE_APP_STRIPE_API_KEY)

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    backgroundColor: colors.utils.pbg,
    width: '100%',
  },
}))

export const PaymentCard = () => {
  const classes = useStyles()

  useListenFundingSuccess()

  const [isCompleted, setIsCompleted] = useState(false)

  const { fundingTx } = useFundingTxAtom()

  if (!fundingTx.stripeClientSecret) {
    return null
  }

  return (
    <VStack w="full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret: fundingTx.stripeClientSecret,
          onComplete() {
            setIsCompleted(true)
          },
        }}
      >
        <EmbeddedCheckout className={classes.container} />
      </EmbeddedCheckoutProvider>
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
