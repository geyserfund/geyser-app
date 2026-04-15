import { Alert, AlertIcon, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'

export enum LaunchPaymentMethod {
  Lightning = 'lightning',
  Onchain = 'onchain',
  CreditCard = 'credit-card',
}

const getPaymentMethodOptions = () => [
  {
    id: LaunchPaymentMethod.Lightning,
    title: t('Lightning'),
    description: t('Pay instantly with a Lightning invoice.'),
  },
  {
    id: LaunchPaymentMethod.Onchain,
    title: t('On-chain'),
    description: t('Pay from a Bitcoin wallet using an on-chain transaction.'),
  },
  {
    id: LaunchPaymentMethod.CreditCard,
    title: t('Credit Card (Stripe)'),
    description: t('Pay in USD with card checkout powered by Stripe.'),
  },
]

export const LaunchPaymentMethodTabs = ({
  selectedMethod,
  onSelectMethod,
}: {
  selectedMethod: LaunchPaymentMethod
  onSelectMethod: (method: LaunchPaymentMethod) => void
}) => {
  const paymentMethodOptions = getPaymentMethodOptions()

  return (
    <HStack w="full" spacing={3} alignItems="stretch">
      {paymentMethodOptions.map((option) => (
        <Button
          key={option.id}
          variant={selectedMethod === option.id ? 'solid' : 'soft'}
          colorScheme={selectedMethod === option.id ? 'primary1' : 'neutral1'}
          onClick={() => onSelectMethod(option.id)}
          flex={1}
        >
          {option.title}
        </Button>
      ))}
    </HStack>
  )
}

export const LaunchPaymentMethodSelection = ({
  selectedMethod,
  paymentMethodError,
  isLoading,
  onSelectMethod,
  handleBack,
  handleNext,
}: {
  selectedMethod: LaunchPaymentMethod
  paymentMethodError?: string
  isLoading?: boolean
  onSelectMethod: (method: LaunchPaymentMethod) => void
  handleBack: () => void
  handleNext: (method: LaunchPaymentMethod) => void
}) => {
  const paymentMethodOptions = getPaymentMethodOptions()

  const continueButtonProps = {
    onClick: () => handleNext(selectedMethod),
    isLoading,
    isDisabled: isLoading,
  }

  const backButtonProps = {
    onClick: handleBack,
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Choose payment method')}
      continueButtonProps={continueButtonProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" alignItems="stretch" spacing={4}>
        {paymentMethodError ? (
          <Alert status="warning" borderRadius={8}>
            <AlertIcon />
            <Body>{paymentMethodError}</Body>
          </Alert>
        ) : null}
        {paymentMethodOptions.map((option) => {
          const isSelected = selectedMethod === option.id

          return (
            <CardLayout
              key={option.id}
              hover
              onClick={() => onSelectMethod(option.id)}
              borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
              outline={isSelected ? '2px solid' : 'none'}
              outlineColor={isSelected ? 'primary1.9' : 'transparent'}
              _hover={{
                borderColor: isSelected ? 'primary1.9' : 'neutral1.9',
                cursor: 'pointer',
              }}
            >
              <Body bold>{option.title}</Body>
              <Body size="sm" light>
                {option.description}
              </Body>
            </CardLayout>
          )
        })}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
