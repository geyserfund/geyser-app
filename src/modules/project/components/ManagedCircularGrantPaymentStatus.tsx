import { Badge, HStack, Icon, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCheckCircle, PiWarningCircle } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

type ManagedPaymentReadiness = {
  stripe?: boolean | null
  strikeLightning?: boolean | null
  strikeOnChain?: boolean | null
}

export const ManagedCircularGrantPaymentStatus = ({ readiness }: { readiness?: ManagedPaymentReadiness | null }) => {
  const { t } = useTranslation()
  const stripeReady = Boolean(readiness?.stripe)
  const strikeReady = Boolean(readiness?.strikeLightning || readiness?.strikeOnChain)

  return (
    <VStack w="full" align="stretch" spacing={5}>
      <Body>
        {t(
          'Contributions to this Circular Grant are received in Geyser-managed accounts and attributed to its protected goal.',
        )}
      </Body>
      <ProviderStatus label={t('Stripe')} isReady={stripeReady} />
      <ProviderStatus label={t('Strike Bitcoin and Lightning')} isReady={strikeReady} />
      {!stripeReady && !strikeReady ? (
        <Body color="error.9">
          {t('At least one managed payment provider must be ready before this project can launch.')}
        </Body>
      ) : null}
    </VStack>
  )
}

const ProviderStatus = ({ label, isReady }: { label: string; isReady: boolean }) => {
  const { t } = useTranslation()

  return (
    <HStack border="1px solid" borderColor="neutral1.5" borderRadius="8px" px={5} py={4} justify="space-between">
      <HStack>
        <Icon as={isReady ? PiCheckCircle : PiWarningCircle} color={isReady ? 'primary1.9' : 'warning.9'} boxSize={6} />
        <Body bold>{label}</Body>
      </HStack>
      <Badge colorScheme={isReady ? 'primary1' : 'neutral1'}>{isReady ? t('Ready') : t('Unavailable')}</Badge>
    </HStack>
  )
}
