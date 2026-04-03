import { HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCheckCircle, PiInfinity, PiTarget } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Step 2 section for selecting the best fundraising model. */
export const FundraiserTypeSection = () => {
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')

  const openFundraiserList = useMemo(
    () => [
      t('Ongoing work and evolving projects'),
      t('Community support and donation-driven momentum'),
      t('Experiments without fixed budgets'),
      t('Flexible goals and milestones'),
    ],
    [],
  )

  const campaignList = useMemo(
    () => [
      t('Production costs and fixed budgets'),
      t('One-time launches and deliverables'),
      t('Milestone-driven funding'),
      t('High-trust structured campaigns'),
    ],
    [],
  )

  return (
    <StartPageSectionShell id="fundraiser-type">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Choose the fundraiser that fits your project')}</H2>
        <Body size="lg" maxWidth="850px" muted>
          {t('Two powerful fundraising models designed for different project needs and delivery constraints.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <PlaybookCard>
          <VStack alignItems="flex-start" spacing={4}>
            <HStack spacing={3}>
              <VStack
                width="44px"
                height="44px"
                borderRadius="12px"
                justifyContent="center"
                alignItems="center"
                backgroundColor={iconBackground}
              >
                <PiInfinity size={24} />
              </VStack>
              <VStack alignItems="flex-start" spacing={0}>
                <H3 bold>{t('Open Fundraiser')}</H3>
                <Body size="sm" muted>
                  {t('Take-it-all model')}
                </Body>
              </VStack>
            </HStack>
            <Body size="sm" muted>
              {t(
                'Contributions come in as they happen. Any amount helps, and work can continue regardless of hitting a specific target.',
              )}
            </Body>
            <VStack alignItems="flex-start" spacing={2} width="100%">
              <Body size="sm" bold>
                {t('Best for')}
                {':'}
              </Body>
              {openFundraiserList.map((item) => (
                <HStack key={item} alignItems="flex-start" spacing={2}>
                  <PiCheckCircle size={18} />
                  <Body size="sm">{item}</Body>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </PlaybookCard>

        <PlaybookCard>
          <VStack alignItems="flex-start" spacing={4}>
            <HStack spacing={3}>
              <VStack
                width="44px"
                height="44px"
                borderRadius="12px"
                justifyContent="center"
                alignItems="center"
                backgroundColor={iconBackground}
              >
                <PiTarget size={24} />
              </VStack>
              <VStack alignItems="flex-start" spacing={0}>
                <H3 bold>{t('All-or-Nothing Campaign')}</H3>
                <Body size="sm" muted>
                  {t('Goal-based model')}
                </Body>
              </VStack>
            </HStack>
            <Body size="sm" muted>
              {t(
                'Best for projects that need a minimum budget to deliver. Supporters feel protected by the model and confidence often increases.',
              )}
            </Body>
            <VStack alignItems="flex-start" spacing={2} width="100%">
              <Body size="sm" bold>
                {t('Best for')}
                {':'}
              </Body>
              {campaignList.map((item) => (
                <HStack key={item} alignItems="flex-start" spacing={2}>
                  <PiCheckCircle size={18} />
                  <Body size="sm">{item}</Body>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </PlaybookCard>
      </SimpleGrid>

      <PlaybookCard backgroundColor={useColorModeValue('primary1.50', 'primary1.900')}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <VStack alignItems="flex-start" spacing={2}>
            <H3 size="md" bold>
              {t('Choose Open Fundraiser if')}
              {':'}
            </H3>
            <Body size="sm" muted>
              {t('Your project can start with any amount and grow over time')}
            </Body>
          </VStack>
          <VStack alignItems="flex-start" spacing={2}>
            <H3 size="md" bold>
              {t('Choose All-or-Nothing if')}
              {':'}
            </H3>
            <Body size="sm" muted>
              {t('Your project depends on reaching a minimum budget before delivery starts')}
            </Body>
          </VStack>
        </SimpleGrid>
      </PlaybookCard>
    </StartPageSectionShell>
  )
}
