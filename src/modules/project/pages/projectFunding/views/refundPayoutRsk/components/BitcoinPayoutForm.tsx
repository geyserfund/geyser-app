import { Collapse, HStack, Icon, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { PiQuestion } from 'react-icons/pi'
import { UseFormReturn } from 'react-hook-form'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

import { BitcoinPayoutFormData } from '../hooks/usePayoutWithBitcoinForm.ts'

type BitcoinPayoutFormProps = {
  form: UseFormReturn<BitcoinPayoutFormData>
  satsAmount?: number
  disablePassword?: boolean
  disableBitcoinAddress?: boolean
  showBitcoinAddress?: boolean
}

/** BitcoinPayoutForm: Form component for Bitcoin On-Chain payout with address and password fields */
export const BitcoinPayoutForm: React.FC<BitcoinPayoutFormProps> = ({
  form,
  satsAmount,
  disablePassword,
  disableBitcoinAddress,
  showBitcoinAddress = true,
}) => {
  const { control } = form
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  return (
    <VStack w="full" spacing={6} alignItems="start">
      {showBitcoinAddress && (
        <ControlledTextInput
          name="bitcoinAddress"
          label={t('Enter your Bitcoin address')}
          control={control}
          size="md"
          isDisabled={disableBitcoinAddress}
        />
      )}

      {!disablePassword && (
        <VStack w="full" spacing={2} alignItems="start">
          <HStack spacing={2} alignItems="center">
            <Body size="md" medium>
              {t('Enter your account password')}
            </Body>
            <Tooltip label={t('This is the password you configured during your project setup.')} hasArrow>
              <span>
                <Icon as={PiQuestion} color="neutral1.9" boxSize={4} cursor="help" />
              </span>
            </Tooltip>
          </HStack>
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
      )}
    </VStack>
  )
}
