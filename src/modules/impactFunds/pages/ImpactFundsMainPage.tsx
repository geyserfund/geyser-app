import { Box, Spinner, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { ImpactFundsDonatePreferencesModal } from '@/modules/impactFunds/components/mainPage/ImpactFundsDonatePreferencesModal.tsx'
import { ImpactFundsFeaturedPartnerFundSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsFeaturedPartnerFundSection.tsx'
import { ImpactFundsFundSponsorsSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsFundSponsorsSection.tsx'
import { ImpactFundsHeroSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsHeroSection.tsx'
import { ImpactFundsHowItWorksSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsHowItWorksSection.tsx'
import { ImpactFundsProvenImpactSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsProvenImpactSection.tsx'
import { ImpactFundsSuccessStoriesSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsSuccessStoriesSection.tsx'
import { ImpactFundsTrustNetworkSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsTrustNetworkSection.tsx'
import { ImpactFundsTrustPillarsSection } from '@/modules/impactFunds/components/mainPage/ImpactFundsTrustPillarsSection.tsx'
import { IMPACT_FUNDS_IMAGE_URL } from '@/modules/impactFunds/utils/constants.ts'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import {
  impactFundsCommunityLeadersFallback,
  impactFundsHowItWorksSteps,
  impactFundsSuccessStoriesFallback,
  impactFundsTrustPillars,
} from '@/modules/impactFunds/utils/mainPageContent.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getAiSeoPageContent, getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { standardPadding } from '@/shared/styles/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import { type ImpactFundsQuery, ProjectSubCategory, useImpactFundsQuery } from '@/types'

const numberFormatter = new Intl.NumberFormat()

/** Slug for the fund shown in Partner Funds (single card). */
const LATIN_AMERICA_IMPACT_FUND_NAME = 'latam-impact-fund'

type ImpactFundListItem = ImpactFundsQuery['impactFunds'][number]

/** Main landing page for browsing live Impact Funds and understanding how the program works. */
export const ImpactFundsMainPage = () => {
  const donateModal = useDisclosure()
  const { data, loading, error } = useImpactFundsQuery()
  const impactFundsSeoContent = getAiSeoPageContent('impactFunds')
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const pageSpacing = { base: 6, lg: 8 }

  const cardImageBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const cardSurfaceBg = useColorModeValue('white', 'neutral1.3')
  const sectionPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const sectionSecondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const sectionMutedTextColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const sectionCardShadow = '0 4px 14px rgba(15, 23, 42, 0.05)'
  const interactiveCardShadow = '0 4px 14px rgba(15, 23, 42, 0.05)'
  const interactiveCardHoverShadow = '0 10px 24px rgba(15, 23, 42, 0.10)'

  const pageHead = (
    <Head
      title={impactFundsSeoContent.title}
      description={impactFundsSeoContent.description}
      image={IMPACT_FUNDS_IMAGE_URL}
      keywords={impactFundsSeoContent.keywords}
      url={`https://geyser.fund${getPath('discoveryImpactFunds')}`}
    >
      <script type="application/ld+json">
        {buildCollectionPageJsonLd({
          name: 'Geyser Impact Fund',
          description: impactFundsSeoContent.description,
          path: getPath('discoveryImpactFunds'),
          about: impactFundsSeoContent.about,
          keywords: impactFundsSeoContent.keywords,
          items: [
            {
              name: 'Impact Fund',
              path: getPath('discoveryImpactFunds'),
              description: 'Fund a Bitcoin-backed impact fund.',
            },
            {
              name: 'Humanitarian Fundraisers',
              path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.Humanitarian),
              description: 'Support humanitarian causes backed by bitcoiners worldwide.',
            },
            {
              name: 'New Campaign Ideas',
              path: getPath('discoveryCampaigns'),
              description: 'Discover all-or-nothing campaigns launching new Bitcoin projects.',
            },
          ],
        })}
      </script>
    </Head>
  )

  const contentContainerProps = {
    w: '100%' as const,
    maxWidth: `${dimensions.maxWidth + 24 * 2}px`,
    mx: 'auto' as const,
    px: standardPadding,
    paddingBottom: { base: 28, lg: 10 } as const,
  }

  if (loading) {
    return (
      <>
        {pageHead}
        <Box {...contentContainerProps}>
          <CardLayout>
            <VStack py={8}>
              <Spinner />
            </VStack>
          </CardLayout>
        </Box>
      </>
    )
  }

  if (error) {
    return (
      <>
        {pageHead}
        <Box {...contentContainerProps}>
          <CardLayout>
            <Body>{t('Failed to load impact funds.')}</Body>
          </CardLayout>
        </Box>
      </>
    )
  }

  const impactFunds = data?.impactFunds || []

  const getFundAmountDisplay = (fund: ImpactFundListItem) => {
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

    return fund.amountCommitted === 0 ? awardedAmountDisplay : committedAmountDisplay
  }

  const totalDistributedSats = impactFunds.reduce((total, fund) => total + (fund.metrics.awardedTotalSats || 0), 0)
  const totalProjectsFunded = impactFunds.reduce((total, fund) => total + (fund.metrics.projectsFundedCount || 0), 0)

  const latinAmericaImpactFund = impactFunds.find((f) => f.name === LATIN_AMERICA_IMPACT_FUND_NAME)

  /** Union of `liveSponsors` from every impact fund (deduped by sponsor id). */
  const sponsorById = new Map<string, { id: string; name: string; image?: string | null; url?: string | null }>()
  for (const fund of impactFunds) {
    for (const sponsor of fund.liveSponsors) {
      const key = String(sponsor.id)
      if (!sponsorById.has(key)) {
        sponsorById.set(key, {
          id: key,
          name: sponsor.name,
          image: sponsor.image,
          url: sponsor.url,
        })
      }
    }
  }

  const aggregatedSponsors = Array.from(sponsorById.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  )

  return (
    <>
      {pageHead}

      <ImpactFundsHeroSection onDonateClick={donateModal.onOpen} />

      <ImpactFundsDonatePreferencesModal
        isOpen={donateModal.isOpen}
        onClose={donateModal.onClose}
        impactFunds={impactFunds}
      />

      <Box {...contentContainerProps}>
        <VStack align="stretch" spacing={pageSpacing}>
          <ImpactFundsTrustPillarsSection
            pillars={impactFundsTrustPillars}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <ImpactFundsHowItWorksSection
            steps={impactFundsHowItWorksSteps}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <ImpactFundsProvenImpactSection
            totalDistributedSatsFormatted={`${numberFormatter.format(totalDistributedSats)} sats`}
            totalProjectsFundedFormatted={numberFormatter.format(totalProjectsFunded)}
          />

          <ImpactFundsTrustNetworkSection
            leaders={impactFundsCommunityLeadersFallback}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
            cardSurfaceBg={cardSurfaceBg}
            sectionCardShadow={sectionCardShadow}
          />

          <ImpactFundsSuccessStoriesSection
            stories={impactFundsSuccessStoriesFallback}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
            cardSurfaceBg={cardSurfaceBg}
            sectionCardShadow={sectionCardShadow}
          />

          <ImpactFundsFundSponsorsSection
            sponsors={aggregatedSponsors}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
            sectionMutedTextColor={sectionMutedTextColor}
            cardSurfaceBg={cardSurfaceBg}
          />

          {impactFunds.length === 0 ? (
            <CardLayout>
              <Body>{t('No live impact funds yet.')}</Body>
            </CardLayout>
          ) : (
            <>
              {latinAmericaImpactFund ? (
                <ImpactFundsFeaturedPartnerFundSection
                  fundName={latinAmericaImpactFund.name}
                  title={latinAmericaImpactFund.title}
                  heroImage={latinAmericaImpactFund.heroImage}
                  cardImageBg={cardImageBg}
                  amountDisplay={getFundAmountDisplay(latinAmericaImpactFund)}
                  sponsors={latinAmericaImpactFund.liveSponsors.map((s) => ({
                    id: String(s.id),
                    name: s.name,
                    image: s.image,
                    url: s.url,
                  }))}
                  sectionPrimaryTextColor={sectionPrimaryTextColor}
                  sectionSecondaryTextColor={sectionSecondaryTextColor}
                  sectionMutedTextColor={sectionMutedTextColor}
                  interactiveCardShadow={interactiveCardShadow}
                  interactiveCardHoverShadow={interactiveCardHoverShadow}
                />
              ) : null}
            </>
          )}
        </VStack>
        <UserExternalLinksComponent />
      </Box>
    </>
  )
}
