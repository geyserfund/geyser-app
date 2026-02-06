import { Button, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { PiArrowSquareOut } from 'react-icons/pi'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useNotification } from '@/utils/index.ts'

import { fiatSwapCurrencies } from '../data.ts'
import { useCreateFiatSwapPayment } from '../hooks/useCreateFiatSwapPayment.ts'
import { BitcoinPurchaseNotice } from './BitcoinPurchaseNotice.tsx'

/** Component for handling fiat swap currency selection and payment */
export const FiatSwapForm: React.FC = () => {
  const toast = useNotification()

  const { createFiatSwapPayment, loading: isLoading } = useCreateFiatSwapPayment()

  const [selectedCurrency, setSelectedCurrency] = useState<SingleValue<{ label: string; value: string }>>()

  const handleCreateFiatSwapPayment = async () => {
    if (!selectedCurrency?.value) {
      toast.error({
        title: t('Please select a currency'),
      })
      return
    }

    await createFiatSwapPayment({ fiatCurrency: selectedCurrency.value })
  }

  return (
    <>
      <FieldContainer title={t('Currency')} subtitle={t('Select a currency supported by our payment provider')}>
        <CustomSelect
          width={'100%'}
          options={fiatSwapCurrencies}
          value={selectedCurrency}
          onChange={(value) => {
            setSelectedCurrency(value)
          }}
        />
      </FieldContainer>
      <Button
        width="100%"
        maxWidth="350px"
        size="lg"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<Icon as={PiArrowSquareOut} />}
        onClick={handleCreateFiatSwapPayment}
        isLoading={isLoading}
      >
        {isLoading ? t('Redirecting you to fiat payment') : t('Pay with Banxa')}
      </Button>
      <Body size="sm">{t('You will be redirected to Banxa our fiat payment provider to complete your payment.')}</Body>
      <BitcoinPurchaseNotice />
    </>
  )
}
