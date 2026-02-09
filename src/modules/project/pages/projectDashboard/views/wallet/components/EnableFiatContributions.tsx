import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

import { StripeConnectOnboardingCard } from './StripeConnectOnboardingCard.tsx'

type EnableFiatContributionsProps = CardLayoutProps & {
  isIdentityVerified?: boolean
  isTiaProject: boolean
  projectId?: string | number | bigint
  onRequireVerification: () => void
}

export const EnableFiatContributions = ({
  isIdentityVerified,
  isTiaProject,
  projectId,
  onRequireVerification,
  ...props
}: EnableFiatContributionsProps) => {
  const [payoutMode, setPayoutMode] = useState<'BTC' | 'USD'>('BTC')
  const [isStripeReady, setIsStripeReady] = useState(false)
  const isBitcoinMode = payoutMode === 'BTC' && !isStripeReady

  return (
    <CardLayout padding={4} {...props}>
      <VStack w="full" alignItems="start" spacing={4}>
        <HStack w="full" justifyContent="space-between">
          <Body size="lg" medium>
            {t('Fiat contributions')}
          </Body>
        </HStack>

        <Body size="sm" light>
          {t('Enable contributors to pay with debit/credit card, Apple Pay, bank transfer or 20+ fiat methods.')}
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
            cursor="pointer"
            onClick={() => setPayoutMode('BTC')}
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
                'Contributors pay with fiat through credit card or bank transfer, and you receive Bitcoin in your wallet. A third-party processing fee applies.',
              )}
            </Body>
          </VStack>

          <StripeConnectOnboardingCard
            compact
            withCard
            selected={!isBitcoinMode}
            onSelect={() => setPayoutMode('USD')}
            isIdentityVerified={Boolean(isIdentityVerified)}
            isTiaProject={isTiaProject}
            projectId={projectId}
            onRequireVerification={onRequireVerification}
            onReadyStateChange={setIsStripeReady}
          />
        </VStack>
      </VStack>
    </CardLayout>
  )
}
