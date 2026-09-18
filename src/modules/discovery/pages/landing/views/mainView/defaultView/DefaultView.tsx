import { useQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { Head } from '@/config/Head.tsx'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { LATIN_AMERICA_COUNTRY_CODES } from '@/shared/constants/platform/regionCountryCodes.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import type { USDCents } from '@/types/index.ts'
import { ProjectsGetWhereInputStatus, useImpactFundsQuery } from '@/types/index.ts'
import { getShortAmountLabel } from '@/utils/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { QUERY_LANDING_ABOVE_FOLD, QUERY_LANDING_ANNOUNCEMENTS } from '../../../graphql/landingPageQueries.ts'
import { LandingAboveFoldQueryData, LandingAnnouncementsQueryData } from '../../../graphql/landingPageTypes.ts'
import { ActiveImpactFunds } from './sections/ActiveImpactFunds.tsx'
import { type CircularGrantLandingFilter, CircularGrantFilterBar } from './sections/CircularGrantFilterBar.tsx'
import { CircularGrantProjects } from './sections/CircularGrantProjects.tsx'
import { CircularGrantSuccessStory } from './sections/CircularGrantSuccessStory.tsx'
import { CuratedProjects } from './sections/CuratedProjects.tsx'
import { GeyserNewsAndAnnouncements } from './sections/GeyserNewsAndAnnouncements.tsx'
import { HowGeyserWorks } from './sections/HowGeyserWorks.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'

const CURATED_PROJECTS_COUNT = 6

type FeaturedAirtableResponse = {
  records: Array<{ fields: { Name?: string; Type?: string } }>
}

const normalizeProjectName = (name: string) => name.replace(/[^a-z0-9]/gi, '')

const sortProjectsByNames = <T extends { name: string }>(projects: T[], names: string[]) => {
  const order = new Map(names.map((name, index) => [normalizeProjectName(name), index]))

  return [...projects].sort(
    (firstProject, secondProject) =>
      (order.get(normalizeProjectName(firstProject.name)) ?? Number.MAX_SAFE_INTEGER) -
      (order.get(normalizeProjectName(secondProject.name)) ?? Number.MAX_SAFE_INTEGER),
  )
}

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)
  const [circularGrantFilter, setCircularGrantFilter] = useState<CircularGrantLandingFilter>('featured')
  const [featuredProjectNames, setFeaturedProjectNames] = useState<string[]>([])
  const [featuredProjectsLoading, setFeaturedProjectsLoading] = useState(true)
  const [featuredProjectsError, setFeaturedProjectsError] = useState(false)
  const defaultSeoContent = getAiSeoPageContent('default')
  const { donateModalElement } = useImpactFundsDonateModal()
  const { getSatoshisFromUSDCents } = useBTCConverter()
  const { data: impactFundsData } = useImpactFundsQuery()

  const latinAmericaImpactFund = impactFundsData?.impactFunds.find((fund) => fund.name === 'latam-impact-fund')
  const labifCommittedAmount = (() => {
    if (latinAmericaImpactFund?.amountCommitted === null || latinAmericaImpactFund?.amountCommitted === undefined) {
      return t('120,000,000 sats')
    }

    const amountSats =
      latinAmericaImpactFund.amountCommitted === 0
        ? latinAmericaImpactFund.metrics.awardedTotalSats
        : latinAmericaImpactFund.amountCommittedCurrency === 'USDCENT'
        ? getSatoshisFromUSDCents(latinAmericaImpactFund.amountCommitted as USDCents)
        : latinAmericaImpactFund.amountCommitted

    return `${getShortAmountLabel(amountSats, true)} sats`
  })()

  const loadFeaturedProjects = useCallback(async () => {
    setFeaturedProjectsLoading(true)
    setFeaturedProjectsError(false)

    try {
      const response = (await fetchFeaturedProject()) as FeaturedAirtableResponse
      const projectNames = response.records
        .map((record) => record.fields)
        .filter((data) => data.Type === 'project' && data.Name)
        .map((data) => data.Name as string)
        .slice(0, CURATED_PROJECTS_COUNT)

      setFeaturedProjectNames(projectNames)
    } catch (_error) {
      setFeaturedProjectsError(true)
      setFeaturedProjectNames([])
    } finally {
      setFeaturedProjectsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFeaturedProjects()
  }, [loadFeaturedProjects])

  useEffect(() => {
    /** Wait for initial content to render before showing below-the-fold content */
    const timer = setTimeout(() => {
      setShowBelowTheFold(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const {
    data: featuredProjectsData,
    error: featuredProjectsQueryError,
    loading: featuredProjectsQueryLoading,
    refetch: refetchFeaturedProjects,
  } = useQuery<LandingAboveFoldQueryData>(QUERY_LANDING_ABOVE_FOLD, {
    skip: featuredProjectNames.length === 0,
    variables: {
      input: {
        where: {
          names: featuredProjectNames,
          isCircularGrant: true,
          statuses: [ProjectsGetWhereInputStatus.Active, ProjectsGetWhereInputStatus.Closed],
        },
        pagination: { take: featuredProjectNames.length },
      },
    },
  })

  const featuredProjects = useMemo(
    () => sortProjectsByNames(featuredProjectsData?.projectsGet.projects ?? [], featuredProjectNames),
    [featuredProjectNames, featuredProjectsData?.projectsGet.projects],
  )
  const {
    data: announcementsData,
    error: announcementsError,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useQuery<LandingAnnouncementsQueryData>(QUERY_LANDING_ANNOUNCEMENTS, {
    skip: !showBelowTheFold,
  })
  return (
    <VStack w="full" spacing={10} paddingTop={{ base: '4px', lg: '6px' }}>
      {donateModalElement}
      <Head
        title={defaultSeoContent.title}
        description={defaultSeoContent.description}
        image={GeyserMainSeoImageUrl}
        keywords={defaultSeoContent.keywords}
        url="https://geyser.fund/"
      >
        <script type="application/ld+json">
          {buildCollectionPageJsonLd({
            name: 'Geyser Discovery',
            description: defaultSeoContent.description,
            path: '/',
            about: defaultSeoContent.about,
            keywords: defaultSeoContent.keywords,
            items: [
              {
                name: 'Circular Grants',
                path: getPath('discoveryCircularGrants'),
                description: 'Back vetted local projects with reusable, debt-free capital.',
              },
              {
                name: 'Regional Partner Fund',
                path: getPath('discoveryImpactFunds'),
                description: 'Explore regional partner funding programs and outcomes.',
              },
            ],
          })}
        </script>
      </Head>
      <VStack w="full" spacing={20} paddingBottom={40}>
        <CircularGrantFilterBar activeFilter={circularGrantFilter} onChange={setCircularGrantFilter} />

        {circularGrantFilter === 'featured' ? (
          <CuratedProjects
            featuredError={featuredProjectsError || Boolean(featuredProjectsQueryError)}
            featuredLoading={featuredProjectsLoading || featuredProjectsQueryLoading}
            featuredProjects={featuredProjects}
            onRetryFeatured={() => {
              loadFeaturedProjects()
              if (featuredProjectNames.length > 0) {
                refetchFeaturedProjects()
              }
            }}
          />
        ) : (
          <CircularGrantProjects
            title={circularGrantFilter === 'africa' ? 'Circular Grants in Africa' : 'Circular Grants in Latin America'}
            take={6}
            where={{
              ...(circularGrantFilter === 'africa'
                ? { region: 'Africa' }
                : { countryCodes: [...LATIN_AMERICA_COUNTRY_CODES] }),
            }}
            includeSuccessful
          />
        )}

        <CircularGrantSuccessStory />

        <ActiveImpactFunds labifCommittedAmount={labifCommittedAmount} />

        {showBelowTheFold && (
          <>
            <HowGeyserWorks />
            <HeroesMainPage />
            <GeyserNewsAndAnnouncements
              giveawayEndAt={announcementsData?.acelerandoVipLeaderboard.endAt}
              giveawayError={Boolean(announcementsError)}
              giveawayLoading={announcementsLoading}
              onGiveawayRetry={() => refetchAnnouncements()}
              projectAnnouncements={announcementsData?.geyserAnnouncements ?? []}
            />
            <NewsletterSignup />
          </>
        )}
      </VStack>
    </VStack>
  )
}
