import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'

import { StripeConnectOnboardingCard } from './StripeConnectOnboardingCard.tsx'

type EnableFiatContributionsProps = {
  isTiaProject: boolean
  projectId?: string | number | bigint
}

export const EnableFiatContributions = ({ isTiaProject, projectId }: EnableFiatContributionsProps) => {
  const [isStripeReady, setIsStripeReady] = useState(false)
  const isBitcoinMode = !isStripeReady

  return (
    <VStack w="full" alignItems="start" spacing={4}>
      <HStack w="full" justifyContent="space-between">
        <Body size="xl" medium>
          {t('Fiat contributions') + ' (' + t('optional') + ')'}
        </Body>
      </HStack>

      <Body size="sm" light>
        {t(
          'Enable contributors to pay with debit/credit card, Apple Pay, bank transfer or 20+ fiat methods. This can also be configured later from your project dashboard.',
        )}
      </Body>

      <VStack w="full" alignItems="start" spacing={3}>
        <HStack spacing={2}>
          <Body size="md" medium>
            {t('Choose a configuration')}
          </Body>
          <Body size="sm" light color="neutral1.7">
            {t('(only one can be selected)')}
          </Body>
        </HStack>

        <VStack
          w="full"
          borderWidth="1px"
          borderColor={isBitcoinMode ? 'primary1.8' : 'neutral1.4'}
          borderRadius="16px"
          p={6}
          alignItems="start"
          spacing={3}
        >
          <HStack w="full" justifyContent="space-between">
            <Body size="lg" medium>
              {t('Receive in Bitcoin')}
            </Body>
            {!isStripeReady && (
              <Body size="sm" medium color={isBitcoinMode ? 'primary1.9' : 'neutral1.8'}>
                {t('Default')}
              </Body>
            )}
          </HStack>
          <Body size="md" light>
            {t(
              'Contributors pay with fiat through credit card or bank transfer, and you receive Bitcoin in your wallet. A 3.5% third-party processing fee applies.',
            )}
          </Body>
        </VStack>

        <StripeConnectOnboardingCard
          compact
          withCard
          selected={!isBitcoinMode}
          isTiaProject={isTiaProject}
          projectId={projectId}
          onReadyStateChange={setIsStripeReady}
        />
      </VStack>
    </VStack>
  )
}
