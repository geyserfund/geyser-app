import { Collapse, HStack, Icon, Link, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PiQuestion } from 'react-icons/pi'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ROOTSTOCK_COMPATIBLE_WALLETS_URL } from '@/shared/utils/external/rootstock.ts'
import { commaFormatted } from '@/utils/index.ts'

import { RootstockPayoutFormData } from '../hooks/usePayoutWithRootstockForm.ts'

type RootstockPayoutFormProps = {
  form: UseFormReturn<RootstockPayoutFormData>
  satsAmount?: number
  /** Optional sats reserved / deducted for gas, shown when > 0 */
  gasReservedSats?: number
  disablePassword?: boolean
  disableRootstockAddress?: boolean
  showRootstockAddress?: boolean
}

/** RootstockPayoutForm: Form for native RBTC payout with destination address and password */
export const RootstockPayoutForm: React.FC<RootstockPayoutFormProps> = ({
  form,
  satsAmount,
  gasReservedSats,
  disablePassword,
  disableRootstockAddress,
  showRootstockAddress = true,
}) => {
  const { control } = form
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const remainingSats =
    typeof satsAmount === 'number' && typeof gasReservedSats === 'number' && gasReservedSats > 0
      ? Math.max(satsAmount - gasReservedSats, 0)
      : undefined

  return (
    <VStack w="full" spacing={6} alignItems="start">
      {showRootstockAddress && (
        <VStack w="full" spacing={4} alignItems="start">
          <Feedback variant={FeedBackVariant.INFO} w="full">
            <Body>
              {t("Don't have a Rootstock wallet yet? See compatible wallets")}{' '}
              <Link
                href={ROOTSTOCK_COMPATIBLE_WALLETS_URL}
                isExternal
                textDecoration="underline"
                color="inherit"
                _hover={{ textDecoration: 'underline', color: 'inherit' }}
              >
                {t('here')}
              </Link>
              .
            </Body>
          </Feedback>
          <ControlledTextInput
            name="rootstockAddress"
            label={t('Rootstock address')}
            control={control}
            size="md"
            isDisabled={disableRootstockAddress}
            placeholder="0x..."
          />
        </VStack>
      )}

      {remainingSats !== undefined && (
        <Body size="sm" color="neutral1.11">
          {t('Estimated network fee reserved')}: {commaFormatted(gasReservedSats || 0)} sats.{' '}
          {t('You will receive approximately')} {commaFormatted(remainingSats)} sats.
        </Body>
      )}

      {!disablePassword && (
        <VStack w="full" spacing={2} alignItems="start">
          <HStack spacing={2} alignItems="center">
            <Body size="sm" color="neutral1.11">
              {t('Account password')}
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
