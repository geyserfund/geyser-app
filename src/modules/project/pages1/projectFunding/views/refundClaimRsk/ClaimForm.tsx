import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { UseFormReturn } from 'react-hook-form'

import { Body } from '@/shared/components/typography/Body.tsx'

import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { BitcoinPayoutFormData } from './hooks/usePayoutWithBitcoinForm.ts'
import { LightningPayoutFormData } from './hooks/usePayoutWithLightningForm.ts'
import { PayoutMethod } from './types.ts'

export const ClaimForm = ({
  selectedMethod,
  setSelectedMethod,
  lightningForm,
  bitcoinForm,
  satsAmount,
}: {
  selectedMethod: PayoutMethod
  setSelectedMethod: (method: PayoutMethod) => void
  lightningForm: UseFormReturn<LightningPayoutFormData>
  bitcoinForm: UseFormReturn<BitcoinPayoutFormData>
  satsAmount: number
}) => {
  return (
    <>
      {/* Payout Method Selection */}
      <VStack w="full" spacing={4} alignItems="start">
        <Body size="md" medium>
          {t('Select a payout method')}
        </Body>
        <HStack w="full" spacing={4}>
          <Button
            flex={1}
            variant={selectedMethod === PayoutMethod.Lightning ? 'solid' : 'outline'}
            colorScheme={selectedMethod === PayoutMethod.Lightning ? 'primary1' : 'neutral1'}
            onClick={() => setSelectedMethod(PayoutMethod.Lightning)}
            borderColor="primary1.6"
            borderWidth="1px"
            p={6}
            height="auto"
            justifyContent="center"
            flexDirection="column"
          >
            <Body size="md" medium>
              {t('Bitcoin Lightning')}
            </Body>
            <Body size="sm">{t('Instant')}</Body>
          </Button>
          <Button
            flex={1}
            variant={selectedMethod === PayoutMethod.OnChain ? 'solid' : 'outline'}
            colorScheme={selectedMethod === PayoutMethod.OnChain ? 'primary1' : 'neutral1'}
            onClick={() => setSelectedMethod(PayoutMethod.OnChain)}
            borderColor="neutral1.6"
            borderWidth="1px"
            p={6}
            height="auto"
            justifyContent="center"
            flexDirection="column"
          >
            <Body size="md" medium>
              {t('Bitcoin On-Chain')}
            </Body>
            <Body size="sm">{t('~1 hour')}</Body>
          </Button>
        </HStack>
      </VStack>

      {/* Form Section */}

      {selectedMethod === PayoutMethod.Lightning ? (
        <LightningPayoutForm form={lightningForm} satsAmount={satsAmount} />
      ) : (
        <BitcoinPayoutForm form={bitcoinForm} satsAmount={satsAmount} />
      )}
    </>
  )
}
