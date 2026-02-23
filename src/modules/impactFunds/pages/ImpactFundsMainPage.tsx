import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiCoinsDuotone, PiHouse, PiRocketLaunchDuotone } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { useImpactFundsQuery } from '@/types'

import { DonationSponsorCTA } from '../components/DonationSponsorCTA.tsx'
import { ImpactFlowStrip } from '../components/ImpactFlowStrip.tsx'

const numberFormatter = new Intl.NumberFormat()
const usdFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const ImpactFundsMainPage = () => {
  const { data, loading, error } = useImpactFundsQuery()
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const pageSpacing = { base: 6, lg: 8 }
  const statMutedBg = useColorModeValue('neutral1.2', 'neutral1.2')
  const statMetricHoverBg = useColorModeValue('neutral1.3', 'neutral1.4')
  const statIconBg = useColorModeValue('primary1.100', 'primary1.900')
  const statIconColor = useColorModeValue('primary1.600', 'primary1.300')
  const statPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.11')
  const statSubtleColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const statTertiaryColor = useColorModeValue('neutral1.7', 'neutral1.9')

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
  const totalDistributedSats = impactFunds.reduce((total, fund) => total + (fund.metrics.awardedTotalSats || 0), 0)
  const totalProjectsFunded = impactFunds.reduce((total, fund) => total + (fund.metrics.projectsFundedCount || 0), 0)
  const totalDistributedUsd =
    usdRate > 0 ? usdFormatter.format(getUSDAmount(totalDistributedSats as Parameters<typeof getUSDAmount>[0])) : null

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

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box
          p={6}
          bg={statMutedBg}
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: statMetricHoverBg, transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex
              w="48px"
              h="48px"
              flexShrink={0}
              borderRadius="lg"
              alignItems="center"
              justifyContent="center"
              bg={statIconBg}
            >
              <Icon as={PiCoinsDuotone} boxSize={6} color={statIconColor} />
            </Flex>
            <VStack align="start" spacing={0}>
              <HStack spacing={2} align="baseline">
                <H2 size="xl" bold lineHeight={1.2} color={statPrimaryTextColor}>
                  {`${numberFormatter.format(totalDistributedSats)} sats`}
                </H2>
                {totalDistributedUsd && (
                  <Body size="xs" color={statTertiaryColor}>
                    {totalDistributedUsd}
                  </Body>
                )}
              </HStack>
              <Body
                size="xs"
                fontSize={{ base: '10px', md: '12px' }}
                color={statSubtleColor}
                textTransform="uppercase"
                letterSpacing="wide"
                fontWeight="medium"
                noOfLines={1}
                whiteSpace="nowrap"
              >
                {t('Total distributed')}
              </Body>
            </VStack>
          </HStack>
        </Box>
        <Box
          p={6}
          bg={statMutedBg}
          borderRadius="lg"
          transition="all 0.3s"
          _hover={{ bg: statMetricHoverBg, transform: 'translateY(-2px)' }}
        >
          <HStack spacing={4}>
            <Flex
              w="48px"
              h="48px"
              flexShrink={0}
              borderRadius="lg"
              alignItems="center"
              justifyContent="center"
              bg={statIconBg}
            >
              <Icon as={PiRocketLaunchDuotone} boxSize={6} color={statIconColor} />
            </Flex>
            <VStack align="start" spacing={0}>
              <H2 size="xl" bold lineHeight={1.2} color={statPrimaryTextColor}>
                {numberFormatter.format(totalProjectsFunded)}
              </H2>
              <Body
                size="xs"
                fontSize={{ base: '10px', md: '12px' }}
                color={statSubtleColor}
                textTransform="uppercase"
                letterSpacing="wide"
                fontWeight="medium"
                noOfLines={1}
                whiteSpace="nowrap"
              >
                {t('Total funded projects')}
              </Body>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Donation & Sponsor Section */}
      <DonationSponsorCTA
        title={t('Support Impact Funds')}
        description={t('Help us fund more impactful projects by donating to the fund or becoming a sponsor.')}
        donateProjectName={geyserImpactFundProjectId}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {impactFunds.map((fund) => {
          const committedAmountDisplay = getCommittedAmountDisplay({
            amountCommitted: fund.amountCommitted,
            amountCommittedCurrency: fund.amountCommittedCurrency,
            usdRate,
            getUSDAmount,
            getSatoshisFromUSDCents,
          })
          const awardedAmountDisplay = getSatsAmountDisplay({
            amountSats: fund.metrics.awardedTotalSats,
            usdRate,
            getUSDAmount,
          })
          const amountDisplay = fund.amountCommitted === 0 ? awardedAmountDisplay : committedAmountDisplay

          return (
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
                      {amountDisplay && (
                        <VStack align="end" spacing={0} flexShrink={0}>
                          <Body size="md" bold whiteSpace="nowrap" lineHeight={1.2} textAlign="right">
                            {amountDisplay.primary}
                          </Body>
                          {amountDisplay.secondary && (
                            <Body size="xs" whiteSpace="nowrap" lineHeight={1.2} textAlign="right" color="neutral1.8">
                              {amountDisplay.secondary}
                            </Body>
                          )}
                        </VStack>
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
          )
        })}
      </SimpleGrid>

      {impactFunds.length === 0 && (
        <CardLayout>
          <Body>{t('No live impact funds yet.')}</Body>
        </CardLayout>
      )}
    </VStack>
  )
}
