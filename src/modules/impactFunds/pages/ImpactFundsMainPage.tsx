import { Box, Button, HStack, Icon, LinkBox, LinkOverlay, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiHouse } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { useImpactFundsQuery } from '@/types'

import { DonationSponsorCTA } from '../components/DonationSponsorCTA.tsx'
import { ImpactFlowStrip } from '../components/ImpactFlowStrip.tsx'

export const ImpactFundsMainPage = () => {
  const { data, loading, error } = useImpactFundsQuery()
  const pageSpacing = { base: 10, lg: 12 }

  // Hardcoded Geyser Impact Fund project ID
  const geyserImpactFundProjectId = '1'
  const pageHead = <Head title={t('Impact Funds')} description={t('Support and apply to Geyser Impact Funds.')} />

  if (loading) {
    return (
      <VStack align="stretch" spacing={pageSpacing} paddingTop={{ base: 2, lg: 6 }} paddingBottom={8}>
        {pageHead}
        <CardLayout>
          <VStack py={8}>
            <Spinner />
          </VStack>
        </CardLayout>
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack align="stretch" spacing={pageSpacing} paddingTop={{ base: 2, lg: 6 }} paddingBottom={8}>
        {pageHead}
        <CardLayout>
          <Body>{t('Failed to load impact funds.')}</Body>
        </CardLayout>
      </VStack>
    )
  }

  const impactFunds = data?.impactFunds || []

  return (
    <VStack align="stretch" spacing={pageSpacing} paddingTop={{ base: 2, lg: 6 }} paddingBottom={8}>
      {pageHead}

      <VStack w="full" gap={4} alignItems="start">
        <HStack w="full" justifyContent="space-between" alignItems="start">
          <VStack gap={0} alignItems="start">
            <H2 size={{ base: 'xl', lg: '3xl' }} bold>
              {t('Impact Funds')}
            </H2>
            <Body size="md" textAlign="center">
              {t('Powering Bitcoin adoption through funding high-impact initiatives on Geyser.')}
            </Body>
          </VStack>
          <Button
            as={Link}
            to={getPath('discoveryLanding')}
            variant="ghost"
            colorScheme="neutral1"
            size="lg"
            leftIcon={<Icon as={PiHouse} />}
          >
            {t('Home')}
          </Button>
        </HStack>

        <ImpactFlowStrip />
      </VStack>

      {/* Donation & Sponsor Section */}
      <DonationSponsorCTA
        title={t('Support Impact Funds')}
        description={t('Help us fund more impactful projects by donating to the fund or becoming a sponsor.')}
        donateProjectName={geyserImpactFundProjectId}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {impactFunds.map((fund) => (
          <CardLayout
            key={fund.id}
            dense
            p={0}
            overflow="hidden"
            borderRadius="12px"
            border="1px solid"
            borderColor="neutral1.6"
            boxShadow="0 4px 16px rgba(0, 0, 0, 0.1)"
            bgImage={fund.heroImage || ''}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
          >
            <LinkBox w="full">
              <VStack w="full" spacing={0} align="stretch">
                <Box h={{ base: '240px', lg: '380px' }} />
                <VStack w="full" bg="utils.pbg" pt={5} pb={5} align="start" spacing={3}>
                  <HStack w="full" justifyContent="space-between" alignItems="baseline" spacing={3} px={5}>
                    <H2 size="xl" bold lineHeight={1.2} flex={1}>
                      <LinkOverlay as={Link} to={getPath('impactFunds', encodeURIComponent(fund.name))}>
                        {fund.title}
                      </LinkOverlay>
                    </H2>
                    {fund.amountCommitted !== null && fund.amountCommitted !== undefined && (
                      <Body size="md" bold whiteSpace="nowrap" lineHeight={1.2} textAlign="right">
                        {`₿${new Intl.NumberFormat().format(fund.amountCommitted)}`}
                      </Body>
                    )}
                  </HStack>
                  {fund.subtitle && (
                    <Body size="md" lineHeight={1.4} px={5}>
                      {fund.subtitle}
                    </Body>
                  )}
                  <HStack w="full" px={5} spacing={3}>
                    <Button
                      as={Link}
                      to={getPath('impactFunds', encodeURIComponent(fund.name))}
                      size="md"
                      flex={1}
                      variant="outline"
                      colorScheme="neutral1"
                      borderRadius="8px"
                    >
                      {t('Learn More')}
                    </Button>
                    <Button
                      as={Link}
                      to={getPath('impactFunds', encodeURIComponent(fund.name))}
                      size="md"
                      flex={1}
                      colorScheme="primary1"
                      borderRadius="8px"
                    >
                      {t('Submit your application')}
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </LinkBox>
          </CardLayout>
        ))}
      </SimpleGrid>

      {impactFunds.length === 0 && (
        <CardLayout>
          <Body>{t('No live impact funds yet.')}</Body>
        </CardLayout>
      )}
    </VStack>
  )
}
