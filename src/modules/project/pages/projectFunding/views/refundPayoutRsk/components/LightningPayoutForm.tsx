import { Collapse, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

import { LightningPayoutFormData } from '../hooks/usePayoutWithLightningForm.ts'

type LightningPayoutFormProps = {
  form: UseFormReturn<LightningPayoutFormData>
  satsAmount?: number
  disablePassword?: boolean
}

/** LightningPayoutForm: Form component for Lightning payout with address and password fields */
export const LightningPayoutForm: React.FC<LightningPayoutFormProps> = ({ form, satsAmount, disablePassword }) => {
  const { control } = form
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  return (
    <VStack w="full" spacing={6} alignItems="start">
      <ControlledTextInput
        name="lightningAddress"
        label={t('Enter your lightning address')}
        control={control}
        size="md"
      />

      {!disablePassword && (
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
            </VStack>
          </Collapse>
        </VStack>
      )}
    </VStack>
  )
}
