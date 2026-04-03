import { HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiArrowDown, PiCreditCard, PiShieldCheck, PiWallet } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Step 3 section for payouts, payments, and trust setup. */
export const PaymentSetupSection = () => {
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')

  const setupCards = useMemo(
    () => [
      {
        icon: PiWallet,
        title: t('Wallet setup'),
        description: t('Configure your Bitcoin wallet to receive funds while staying in control'),
        details: [t('Connect wallet'), t('Secure credentials'), t('Test with a small amount')],
      },
      {
        icon: PiArrowDown,
        title: t('Withdraw funds'),
        description: t('Withdrawals are manual and intentional so you decide when to move funds'),
        details: [t('One-click withdrawal'), t('Transaction history'), t('Export for accounting')],
      },
      {
        icon: PiShieldCheck,
        title: t('Verification'),
        description: t('Verification improves trust and can increase conversion confidence'),
        details: [t('Identity verification'), t('Social connections'), t('Trust signals')],
      },
      {
        icon: PiCreditCard,
        title: t('Contributor options'),
        description: t('Contributors can use Lightning, on-chain Bitcoin, and familiar fiat rails'),
        details: [t('Lightning'), t('On-chain BTC'), t('Card and fiat options')],
      },
    ],
    [],
  )

  return (
    <StartPageSectionShell id="payment-setup" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Set up how you get paid and build trust from day one')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t('Keep payout setup clear, secure, and understandable so supporters feel safe backing your project.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {setupCards.map((card) => (
          <PlaybookCard key={card.title}>
            <VStack alignItems="flex-start" spacing={4}>
              <HStack alignItems="flex-start" spacing={3}>
                <VStack
                  width="42px"
                  height="42px"
                  borderRadius="10px"
                  backgroundColor={iconBackground}
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <card.icon size={20} />
                </VStack>
                <VStack alignItems="flex-start" spacing={1}>
                  <H3 size="md" bold>
                    {card.title}
                  </H3>
                  <Body size="sm" muted>
                    {card.description}
                  </Body>
                </VStack>
              </HStack>

              <VStack alignItems="flex-start" spacing={2} paddingLeft={{ base: 0, md: 12 }}>
                {card.details.map((detail) => (
                  <HStack key={detail} spacing={2} alignItems="center">
                    <VStack width="6px" height="6px" borderRadius="full" backgroundColor="primary1.8" />
                    <Body size="sm">{detail}</Body>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </PlaybookCard>
        ))}
      </SimpleGrid>

      <PlaybookCard borderColor={useColorModeValue('primary1.300', 'primary1.600')}>
        <VStack alignItems="flex-start" spacing={3}>
          <H3 bold>{t('Self-custody made approachable')}</H3>
          <Body size="sm" muted>
            {t(
              'Creators retain control of funds while using setup guidance and trust cues that make contributors more confident during checkout.',
            )}
          </Body>
        </VStack>
      </PlaybookCard>
    </StartPageSectionShell>
  )
}
