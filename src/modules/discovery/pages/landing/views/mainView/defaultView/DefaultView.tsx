import { useQuery } from '@apollo/client'
import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { __development__ } from '@/shared/constants/config/env.ts'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { LATIN_AMERICA_COUNTRY_CODES } from '@/shared/constants/platform/regionCountryCodes.ts'
import { brandColors } from '@/shared/styles/brandPalette.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import type { ProjectsGetWhereInput } from '@/types/index.ts'
import {
  ProjectsGetWhereInputStatus,
  useLandingCircularGrantsByFilterLazyQuery,
  useLandingCircularGrantsByFilterQuery,
} from '@/types/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { QUERY_LANDING_ABOVE_FOLD, QUERY_LANDING_ANNOUNCEMENTS } from '../../../graphql/landingPageQueries.ts'
import { LandingAboveFoldQueryData, LandingAnnouncementsQueryData } from '../../../graphql/landingPageTypes.ts'
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
  const [featuredProjectNames, setFeaturedProjectNames] = useState<string[]>([])
  const [featuredProjectsLoading, setFeaturedProjectsLoading] = useState(true)
  const [featuredProjectsError, setFeaturedProjectsError] = useState(false)
  const defaultSeoContent = getAiSeoPageContent('default')
  const { donateModalElement, openDonateModal } = useImpactFundsDonateModal()

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
  /**
   * DEV ONLY: the curated list comes from Airtable names that do not exist in the dev database,
   * so fall back to whatever Circular Grants the dev backend has to fill the featured grid.
   */
  const useDevFeaturedProjects = __development__ && featuredProjects.length === 0
  const { data: devFeaturedData, loading: devFeaturedLoading } = useLandingCircularGrantsByFilterQuery({
    skip: !useDevFeaturedProjects,
    variables: { take: CURATED_PROJECTS_COUNT, where: { isCircularGrant: true } },
  })
  const devFeaturedProjects = useDevFeaturedProjects ? devFeaturedData?.projectsGet.projects ?? [] : []
  const hasDevFeaturedProjects = devFeaturedProjects.length > 0

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
                featuredError={
                  !hasDevFeaturedProjects && (featuredProjectsError || Boolean(featuredProjectsQueryError))
                }
                featuredLoading={
                  featuredProjectsLoading ||
                  featuredProjectsQueryLoading ||
                  (useDevFeaturedProjects && devFeaturedLoading)
                }
                featuredProjects={hasDevFeaturedProjects ? devFeaturedProjects : featuredProjects}
                onRetryFeatured={() => {
                  loadFeaturedProjects()
                  if (featuredProjectNames.length > 0) {
                    refetchFeaturedProjects()
                  }
                }}
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
