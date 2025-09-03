import { Collapse, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

import { BitcoinPayoutFormData } from '../hooks/usePayoutWithBitcoinForm.ts'

type BitcoinPayoutFormProps = {
  form: UseFormReturn<BitcoinPayoutFormData>
  satsAmount?: number
}

/** BitcoinPayoutForm: Form component for Bitcoin On-Chain payout with address and password fields */
export const BitcoinPayoutForm: React.FC<BitcoinPayoutFormProps> = ({ form, satsAmount }) => {
  const { control } = form
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  return (
    <VStack w="full" spacing={6} alignItems="start">
      <ControlledTextInput name="bitcoinAddress" label={t('Enter your Bitcoin address')} control={control} size="md" />

      <VStack w="full" spacing={2} alignItems="start">
        <Body size="md" medium>
          {t('Enter your account password')}
        </Body>
        <ControlledTextInput name="accountPassword" control={control} type="password" placeholder="" size="md" />

        <Body
          size="xs"
          color="primary1.9"
          cursor="pointer"
          onClick={() => setShowForgotPassword(!showForgotPassword)}
          textDecoration="underline"
        >
          {t('Forgot your password')}?
        </Body>

        <Collapse in={showForgotPassword}>
          <VStack spacing={2} alignItems="start" pt={2}>
            <Body size="sm" light>
              {t(
                "Without your password, you won't be able to claim the funds of the project. Geyser cannot recover this password for you.",
              )}
            </Body>
            <Body size="sm" light>
              {t(
                'If you have forgotten your password, the funds will be returned contributors after a period of 30 days.',
              )}
            </Body>
          </VStack>
        </Collapse>
      </VStack>
    </VStack>
  )
}
