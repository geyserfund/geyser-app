import { Collapse, HStack, Icon, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { PiQuestion } from 'react-icons/pi'

import Loader from '@/components/ui/Loader'
import { LNAddressEvaluationState } from '@/modules/project/pages/projectCreation/hooks/useWalletForm.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { lightModeColors } from '@/shared/styles'

import { LightningAddressValidation, LightningPayoutFormData } from '../hooks/usePayoutWithLightningForm.ts'

type LightningPayoutFormProps = {
  form: UseFormReturn<LightningPayoutFormData>
  disablePassword?: boolean
  lightningAddress: LightningAddressValidation
}

/** LightningPayoutForm: Form component for Lightning payout with address and password fields */
export const LightningPayoutForm: React.FC<LightningPayoutFormProps> = ({
  form,
  disablePassword,
  lightningAddress,
}) => {
  const { control } = form
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const renderLightningAddressRightElement = () => {
    if (lightningAddress.evaluating) {
      return <Loader size="md" />
    }

    switch (lightningAddress.state) {
      case LNAddressEvaluationState.FAILED:
        return <BsFillXCircleFill color={lightModeColors.secondary.red} size="20px" />
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill color={lightModeColors.primary[500]} size="20px" />
      default:
        return null
    }
  }

  return (
    <VStack w="full" spacing={6} alignItems="start">
      <ControlledTextInput
        name="lightningAddress"
        label={t('Enter your lightning address')}
        control={control}
        size="md"
        type="email"
        onBlur={() => {
          lightningAddress.validate().catch(() => undefined)
        }}
        error={lightningAddress.error}
        rightElement={renderLightningAddressRightElement()}
      />

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
            </VStack>
          </Collapse>
        </VStack>
      )}
    </VStack>
  )
}
