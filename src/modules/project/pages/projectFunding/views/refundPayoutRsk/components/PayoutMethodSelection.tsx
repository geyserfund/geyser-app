import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'

import { PayoutMethod } from '../types.ts'

export const PayoutMethodSelection = ({
  selectedMethod,
  setSelectedMethod,
}: {
  selectedMethod: PayoutMethod
  setSelectedMethod: (method: PayoutMethod) => void
}) => {
  return (
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
  )
}
