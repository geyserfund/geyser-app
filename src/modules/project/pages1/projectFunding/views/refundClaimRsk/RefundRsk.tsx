import { Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React, { useState } from 'react'
import { PiX } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useNotification } from '@/utils/index.ts'

import { BitcoinPayoutForm } from './components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from './components/BitcoinPayoutProcessed.tsx'
import { LightningPayoutForm } from './components/LightningPayoutForm.tsx'
import { LightningPayoutProcessed } from './components/LightningPayoutProcessed.tsx'
import { usePayoutWithBitcoinForm } from './hooks/usePayoutWithBitcoinForm.ts'
import { BitcoinPayoutFormData } from './hooks/usePayoutWithBitcoinForm.ts'
import { usePayoutWithLightningForm } from './hooks/usePayoutWithLightningForm.ts'
import { LightningPayoutFormData } from './hooks/usePayoutWithLightningForm.ts'
import { PayoutMethod } from './types.ts'

type RefundRskProps = {
  isOpen: boolean
  onClose: () => void
  satsAmount?: number
}

/** RefundRsk: Component for handling refund payouts with Lightning or On-Chain Bitcoin */
export const RefundRsk: React.FC<RefundRskProps> = ({ isOpen, onClose, satsAmount }) => {
  const toast = useNotification()

  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(PayoutMethod.Lightning)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)

  const handleLightningSubmit = async (data: LightningPayoutFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual Lightning refund API call
      console.log('Lightning refund data:', data)

      // Simulate processing delay
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

      setIsProcessed(true)
      toast.success({
        title: t('Refund initiated successfully'),
        description: t('Your Lightning refund will be processed shortly'),
      })
    } catch (error) {
      console.error('Lightning refund error:', error)
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBitcoinSubmit = async (data: BitcoinPayoutFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual Bitcoin on-chain refund API call
      console.log('Bitcoin refund data:', data)

      // Simulate processing delay
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

      setIsProcessed(true)
      toast.success({
        title: t('Refund initiated successfully'),
        description: t('Your Bitcoin on-chain refund will be processed shortly'),
      })
    } catch (error) {
      console.error('Bitcoin refund error:', error)
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsProcessed(false)
    setIsSubmitting(false)
    onClose()
  }

  // Get form objects from both hooks
  const lightningForm = usePayoutWithLightningForm(handleLightningSubmit)
  const bitcoinForm = usePayoutWithBitcoinForm(handleBitcoinSubmit)

  const enableSubmit = selectedMethod === PayoutMethod.Lightning ? lightningForm.enableSubmit : bitcoinForm.enableSubmit

  const handleSubmit = () => {
    if (selectedMethod === PayoutMethod.Lightning) {
      lightningForm.handleSubmit()
    } else {
      bitcoinForm.handleSubmit()
    }
  }

  // Show processed screen after successful submission
  if (isProcessed) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="lg" title="">
        <VStack w="full" spacing={6} p={6}>
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Body size="sm" color="primary1.9">
              {selectedMethod === PayoutMethod.Lightning
                ? t('Payout Processed (Off-Chain)')
                : t('Payout Processed (On-Chain)')}
            </Body>
            <IconButton aria-label="Close modal" icon={<PiX />} variant="ghost" onClick={handleClose} />
          </HStack>

          {selectedMethod === PayoutMethod.Lightning ? (
            <LightningPayoutProcessed isRefund={true} onClose={handleClose} />
          ) : (
            <BitcoinPayoutProcessed isRefund={true} onClose={handleClose} />
          )}
        </VStack>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" title="">
      <VStack w="full" spacing={6} p={6}>
        {/* Header */}
        <HStack w="full" justifyContent="space-between" alignItems="center">
          <Body size="lg" medium>
            {t('Refunding Page - Off-Chain')}
          </Body>
          <HStack spacing={2}>
            {/* Demo Toggle Button */}
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => setIsProcessed(!isProcessed)}>
              {isProcessed ? t('Show Form') : t('Show Success')}
            </Button>
            <IconButton aria-label="Close modal" icon={<PiX />} variant="ghost" onClick={handleClose} />
          </HStack>
        </HStack>

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
              <Body size="sm" light>
                {t('Instant')}
              </Body>
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
              <Body size="sm" light>
                {t('~1 hour')}
              </Body>
            </Button>
          </HStack>
        </VStack>

        {/* Form Section */}
        <CardLayout w="full" p={6}>
          {selectedMethod === PayoutMethod.Lightning ? (
            <LightningPayoutForm form={lightningForm.form} satsAmount={satsAmount} />
          ) : (
            <BitcoinPayoutForm form={bitcoinForm.form} satsAmount={satsAmount} />
          )}
        </CardLayout>

        {/* Conditional Button - Submit in form view, Close in success view */}
        {!isProcessed ? (
          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            variant="solid"
            isLoading={isSubmitting}
            isDisabled={!enableSubmit}
            onClick={handleSubmit}
          >
            {t('Claim Refund')}
          </Button>
        ) : (
          <Button w="full" size="lg" colorScheme="neutral1" variant="outline" onClick={handleClose}>
            {t('Close')}
          </Button>
        )}
      </VStack>
    </Modal>
  )
}
