import { Box, Button, HStack, Icon, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { LiveProgressAqua } from '@/shared/components/feedback/LiveProgressAqua.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'

const IMPACT_HEADER_ICON_URL = 'https://storage.googleapis.com/geyser-projects-media/app/impact/impact_header_icon.png'
const GEYSER_IMPACT_PROJECT_NAME = 'geyserimpact'

/** Arbitrary values for demo - to be replaced with real data */
const CURRENT_SATS = 4334234
const GOAL_SATS = 10000000
const PROGRESS_PERCENTAGE = (CURRENT_SATS / GOAL_SATS) * 100

export const ImpactFund = () => {
  return (
    <VStack w="full" gap={10} mx="auto">
      {/* Header Section */}
      <VStack w="full" gap={4} textAlign="center" maxW="900px">
        <HStack>
          <Image src={IMPACT_HEADER_ICON_URL} alt="Impact Fund" height="80px" width="auto" />
          <H1 bold fontStyle="italic" color="utils.text">
            {t('IMPACT FUND')}
          </H1>
        </HStack>

        <H2 size={{ base: 'lg', lg: 'xl' }} bold>
          {t('Powering Bitcoin adoption through funding high-impact Geyser initiatives.')}
        </H2>
        <Body size="md" muted textAlign="center" maxW="700px">
          {t(
            'A community powered pool of sats we deploy to the most impactful Bitcoin initiatives on Geyser. When the pool hits 10M sats, we distribute it to verified builders and causes driving adoption',
          )}
        </Body>
      </VStack>

      {/* Live Wallet Section */}
      <CardLayout w="full" gap={6} padding={6}>
        <VStack w="full" gap={4}>
          {/* Live indicator and amount */}
          <HStack gap={2} alignItems="center">
            <Box w={2} h={2} borderRadius="full" backgroundColor="secondary.green" />
            <Body size="md" medium>
              {t('Impact Fund live wallet')}
            </Body>
          </HStack>

          {/* Large sats amount */}
          <H1 size={{ base: '3xl', lg: '4xl' }} bold>
            {commaFormatted(CURRENT_SATS)} {t('sats')}
          </H1>

          {/* Progress bar */}
          <Box w="full">
            <LiveProgressAqua
              value={PROGRESS_PERCENTAGE}
              height={40}
              flowSpeedSec={20}
              radius={24}
              label=""
              showPercent={false}
              removeLiveDot={true}
            />
          </Box>

          {/* Bottom row with links and button */}
          <HStack w="full" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={4} paddingTop={2}>
            <HStack as={Link} to={getPath('project', GEYSER_IMPACT_PROJECT_NAME)} gap={1} alignItems="center">
              <Body size="md">{t('Live Wallet')}</Body>
              <Icon as={PiArrowUpRight} boxSize={4} />
            </HStack>

            <Body size="md" muted>
              {t('Next deployment at 10M sats')}
            </Body>

            <Button
              as={Link}
              to={getPath('fundingStart', GEYSER_IMPACT_PROJECT_NAME)}
              size="lg"
              colorScheme="primary1"
              borderRadius="full"
            >
              {t('Donate to Impact Fund')}
            </Button>
          </HStack>
        </VStack>
      </CardLayout>
    </VStack>
  )
}
