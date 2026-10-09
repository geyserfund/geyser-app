import { useQuery } from '@apollo/client'
import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { LATIN_AMERICA_COUNTRY_CODES } from '@/shared/constants/platform/regionCountryCodes.ts'
import { brandColors } from '@/shared/styles/brandPalette.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import type { ProjectsGetWhereInput } from '@/types/index.ts'
import {
  OrderByDirection,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  useLandingAboveFoldQuery,
  useLandingCircularGrantsByFilterLazyQuery,
} from '@/types/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { QUERY_LANDING_ANNOUNCEMENTS } from '../../../graphql/landingPageQueries.ts'
import type { LandingAnnouncementsQueryData } from '../../../graphql/landingPageTypes.ts'
import { type CircularGrantLandingFilter, CircularGrantFilterBar } from './sections/CircularGrantFilterBar.tsx'
import { CircularGrantProjects, getCircularGrantProjectsQueryVariables } from './sections/CircularGrantProjects.tsx'
import {
  CircularGrantsFocus,
  FieldPartnerCaseStudy,
  FieldPartnersPanel,
  SupportMovementBand,
} from './sections/CircularGrantsMission.tsx'
import { CuratedProjects } from './sections/CuratedProjects.tsx'
import { GeyserNewsAndAnnouncements } from './sections/GeyserNewsAndAnnouncements.tsx'
import { LatamImpactFundApplication } from './sections/LatamImpactFundApplication.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'

const CURATED_PROJECTS_COUNT = 3
const REGION_FILTER_TAKE = 3

/** Region rows keyed by filter; module-level so the query variables keep a stable identity between renders. */
const REGION_FILTER_ROWS: Record<
  Exclude<CircularGrantLandingFilter, 'featured'>,
  { title: string; where: ProjectsGetWhereInput }
> = {
  africa: { title: 'Circular Grants in Africa', where: { region: 'Africa' } },
  'latin-america': {
    title: 'Circular Grants in Latin America',
    where: { countryCodes: [...LATIN_AMERICA_COUNTRY_CODES] },
  },
}

/** Full-bleed burnt ochre band that raised cards sit on (see DESIGN.md). */
const OchreBand = ({ children }: { children: ReactNode }) => (
  <Box
    w="full"
    bg={brandColors.burntOchre}
    paddingY={{ base: 10, lg: 16 }}
    sx={{
      // Paints the band edge to edge without widening the page (no horizontal scroll).
      boxShadow: `0 0 0 100vmax ${brandColors.burntOchre}`,
      clipPath: 'inset(0 -100vmax)',
    }}
  >
    {children}
  </Box>
)

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)
  const [circularGrantFilter, setCircularGrantFilter] = useState<CircularGrantLandingFilter>('featured')
  const defaultSeoContent = getAiSeoPageContent('default')
  const { donateModalElement, openDonateModal } = useImpactFundsDonateModal()

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
  } = useLandingAboveFoldQuery({
    variables: {
      input: {
        where: {
          isCircularGrant: true,
          status: ProjectsGetWhereInputStatus.Active,
        },
        pagination: { take: CURATED_PROJECTS_COUNT },
        orderBy: [
          { direction: OrderByDirection.Desc, field: ProjectsOrderByField.Balance },
          { direction: OrderByDirection.Desc, field: ProjectsOrderByField.LaunchedAt },
        ],
      },
    },
  })

  const featuredProjects = featuredProjectsData?.projectsGet.projects ?? []
  const {
    data: announcementsData,
    error: announcementsError,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useQuery<LandingAnnouncementsQueryData>(QUERY_LANDING_ANNOUNCEMENTS, {
    skip: !showBelowTheFold,
  })
  const isFeaturedFilter = circularGrantFilter === 'featured'

  /** Warm the cache for both region filters after first paint so switching chips renders without a loading state. */
  const [prefetchRegionProjects] = useLandingCircularGrantsByFilterLazyQuery()
  useEffect(() => {
    const timer = setTimeout(() => {
      Object.values(REGION_FILTER_ROWS).forEach(({ where }) => {
        const variables = getCircularGrantProjectsQueryVariables({
          where,
          take: REGION_FILTER_TAKE,
          includeSuccessful: true,
        })
        prefetchRegionProjects({ variables: variables.ongoing })
        prefetchRegionProjects({ variables: variables.successful })
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [prefetchRegionProjects])

  const focusBand = (
    <OchreBand>
      <CircularGrantsFocus />
    </OchreBand>
  )

  return (
    <VStack w="full" spacing={10} paddingTop={{ base: 1, lg: 1.5 }}>
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
      <VStack w="full" spacing={{ base: 12, lg: 20 }} paddingBottom={{ base: 16, lg: 20 }}>
        <VStack w="full" spacing={{ base: 4, lg: 6 }} align="stretch">
          <CircularGrantFilterBar activeFilter={circularGrantFilter} onChange={setCircularGrantFilter} />

          <VStack w="full" spacing={{ base: 10, lg: 12 }} align="stretch">
            {isFeaturedFilter ? (
              <CuratedProjects
                featuredError={Boolean(featuredProjectsQueryError)}
                featuredLoading={featuredProjectsQueryLoading}
                featuredProjects={featuredProjects}
                onRetryFeatured={() => refetchFeaturedProjects()}
              />
            ) : (
              <CircularGrantProjects
                title={REGION_FILTER_ROWS[circularGrantFilter].title}
                description=""
                take={REGION_FILTER_TAKE}
                where={REGION_FILTER_ROWS[circularGrantFilter].where}
                includeSuccessful
              />
            )}
            {/* Kept at a fixed position in this list so it stays mounted when the filter changes. */}
            {focusBand}
            {isFeaturedFilter ? (
              <CircularGrantProjects
                title="Recent Circular Grants"
                description=""
                take={3}
                emptyStateText="No recent Circular Grants found"
                showDiscoverMore={false}
              />
            ) : null}
          </VStack>
        </VStack>

        <VStack w="full" spacing={{ base: 6, lg: 8 }} align="stretch">
          <FieldPartnersPanel />
          <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 8 }}>
            <FieldPartnerCaseStudy />
            <LatamImpactFundApplication />
          </SimpleGrid>
        </VStack>

        <OchreBand>
          <SupportMovementBand
            onSupportImpactFund={() =>
              openDonateModal({
                defaultCategoryIds: [CIRCULAR_GRANTS_CATEGORY_ID],
              })
            }
          />
        </OchreBand>

        {showBelowTheFold && (
          <>
            <HeroesMainPage />
            <GeyserNewsAndAnnouncements
              giveawayEndAt={announcementsData?.acelerandoVipLeaderboard.endAt}
              giveawayError={Boolean(announcementsError)}
              giveawayLoading={announcementsLoading}
              onGiveawayRetry={() => refetchAnnouncements()}
              projectAnnouncements={announcementsData?.geyserAnnouncements ?? []}
            />
          </>
        )}

        <NewsletterSignup />
      </VStack>
    </VStack>
  )
}
