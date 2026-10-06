import { useQuery } from '@apollo/client'
import { SimpleGrid, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { fetchFeaturedProject } from '@/api/airtable.ts'
import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { LATIN_AMERICA_COUNTRY_CODES } from '@/shared/constants/platform/regionCountryCodes.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import { ProjectsGetWhereInputStatus } from '@/types/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { QUERY_LANDING_ABOVE_FOLD, QUERY_LANDING_ANNOUNCEMENTS } from '../../../graphql/landingPageQueries.ts'
import { LandingAboveFoldQueryData, LandingAnnouncementsQueryData } from '../../../graphql/landingPageTypes.ts'
import { type CircularGrantLandingFilter, CircularGrantFilterBar } from './sections/CircularGrantFilterBar.tsx'
import { CircularGrantProjects } from './sections/CircularGrantProjects.tsx'
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

          {circularGrantFilter === 'featured' ? (
            <VStack w="full" spacing={{ base: 10, lg: 12 }} align="stretch">
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
              <CircularGrantProjects
                title="Recent Circular Grants"
                description=""
                take={3}
                emptyStateText="No recent Circular Grants found"
                showDiscoverMore={false}
              />
            </VStack>
          ) : (
            <CircularGrantProjects
              title={
                circularGrantFilter === 'africa' ? 'Circular Grants in Africa' : 'Circular Grants in Latin America'
              }
              take={6}
              where={{
                ...(circularGrantFilter === 'africa'
                  ? { region: 'Africa' }
                  : { countryCodes: [...LATIN_AMERICA_COUNTRY_CODES] }),
              }}
              includeSuccessful
            />
          )}
        </VStack>

        <CircularGrantsFocus />

        <VStack w="full" spacing={{ base: 6, lg: 8 }} align="stretch">
          <FieldPartnersPanel />
          <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 8 }}>
            <FieldPartnerCaseStudy />
            <LatamImpactFundApplication />
          </SimpleGrid>
        </VStack>

        <SupportMovementBand
          onSupportImpactFund={() =>
            openDonateModal({
              defaultCategoryIds: [CIRCULAR_GRANTS_CATEGORY_ID],
            })
          }
        />

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
