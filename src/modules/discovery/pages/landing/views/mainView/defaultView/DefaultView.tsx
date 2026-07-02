import { useQuery } from '@apollo/client'
import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

import { fetchCharityProjectsData, fetchFeaturedProject } from '@/api/airtable.ts'
import { Head } from '@/config/Head.tsx'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import {
  LeaderboardPeriod,
  OrderByDirection,
  ProjectCategory,
  ProjectFundingStrategy,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  useGetUserIpCountryQuery,
  useLeaderboardGlobalProjectsQuery,
  useProjectsForLandingPageQuery,
} from '@/types/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import {
  QUERY_LANDING_ABOVE_FOLD,
  QUERY_LANDING_ANNOUNCEMENTS,
  QUERY_LANDING_CATEGORY_SECTION,
  QUERY_LANDING_OTHER_SECTION,
} from '../../../graphql/landingPageQueries.ts'
import {
  LandingAboveFoldQueryData,
  LandingAnnouncementsQueryData,
  LandingCategorySectionQueryData,
  LandingCategorySectionQueryVariables,
  LandingOtherSectionQueryData,
} from '../../../graphql/landingPageTypes.ts'
import { TopProjects } from './components/TopProjects.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { CategoryKey, CuratedProjects } from './sections/CuratedProjects.tsx'
import { GeyserNewsAndAnnouncements } from './sections/GeyserNewsAndAnnouncements.tsx'
import { HowGeyserWorks } from './sections/HowGeyserWorks.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { ProjectsInYourRegion } from './sections/ProjectsInYourRegion.tsx'

const CATEGORY_SECTION_GROUP_SIZE = 2
const LANDING_CATEGORY_ORDER = [
  ProjectCategory.Education,
  ProjectCategory.Community,
  ProjectCategory.Culture,
  ProjectCategory.Tool,
  ProjectCategory.Cause,
] as const

const CURATED_PROJECTS_COUNT = 6
const NO_OF_REGION_PROJECTS_TO_LOAD = 6

const CURATED_CATEGORY_INPUT: Record<Exclude<CategoryKey, 'featured'>, ProjectCategory> = {
  community: ProjectCategory.Community,
  culture: ProjectCategory.Culture,
  education: ProjectCategory.Education,
  tools: ProjectCategory.Tool,
}

type FeaturedAirtableResponse = {
  records: Array<{ fields: { Name?: string; Type?: string } }>
}

type CharityAirtableResponse = {
  records: Array<{ fields: { projectId?: number } }>
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

const sortProjectsByIds = <T extends { id: string | number }>(projects: T[], ids: number[]) => {
  const order = new Map(ids.map((id, index) => [String(id), index]))

  return [...projects].sort(
    (firstProject, secondProject) =>
      (order.get(String(firstProject.id)) ?? Number.MAX_SAFE_INTEGER) -
      (order.get(String(secondProject.id)) ?? Number.MAX_SAFE_INTEGER),
  )
}

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)
  const [activeCuratedCategory, setActiveCuratedCategory] = useState<CategoryKey>('featured')
  const [featuredProjectNames, setFeaturedProjectNames] = useState<string[]>([])
  const [featuredProjectsLoading, setFeaturedProjectsLoading] = useState(true)
  const [featuredProjectsError, setFeaturedProjectsError] = useState(false)
  const [charityProjectIds, setCharityProjectIds] = useState<number[]>([])
  const [charityProjectsLoading, setCharityProjectsLoading] = useState(false)
  const defaultSeoContent = getAiSeoPageContent('default')

  const categoryGroups = LANDING_CATEGORY_ORDER.reduce<(typeof LANDING_CATEGORY_ORDER)[number][][]>(
    (groups, category, index) => {
      const groupIndex = Math.floor(index / CATEGORY_SECTION_GROUP_SIZE)

      if (!groups[groupIndex]) {
        groups[groupIndex] = []
      }

      groups[groupIndex].push(category)

      return groups
    },
    [],
  )

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

  const loadCharityProjects = useCallback(async () => {
    setCharityProjectsLoading(true)

    try {
      const response = (await fetchCharityProjectsData()) as CharityAirtableResponse
      const projectIds = response.records
        .map((record) => record.fields.projectId)
        .filter((projectId): projectId is number => Boolean(projectId))

      setCharityProjectIds(
        projectIds.length > CURATED_PROJECTS_COUNT
          ? [...projectIds].sort(() => Math.random() - 0.5).slice(0, CURATED_PROJECTS_COUNT)
          : projectIds,
      )
    } finally {
      setCharityProjectsLoading(false)
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

  useEffect(() => {
    if (showBelowTheFold && charityProjectIds.length === 0 && !charityProjectsLoading) {
      loadCharityProjects()
    }
  }, [charityProjectIds.length, charityProjectsLoading, loadCharityProjects, showBelowTheFold])

  const {
    data: featuredProjectsData,
    error: featuredProjectsQueryError,
    loading: featuredProjectsQueryLoading,
    refetch: refetchFeaturedProjects,
  } = useQuery<LandingAboveFoldQueryData>(QUERY_LANDING_ABOVE_FOLD, {
    skip: featuredProjectNames.length === 0,
    variables: {
      input: {
        where: { names: featuredProjectNames },
        pagination: { take: featuredProjectNames.length },
      },
    },
  })

  const activeCuratedCategoryInput =
    activeCuratedCategory === 'featured' ? undefined : CURATED_CATEGORY_INPUT[activeCuratedCategory]
  const {
    data: categoryRowsData,
    error: categoryRowsError,
    loading: categoryRowsLoading,
    refetch: refetchCategoryRows,
  } = useLeaderboardGlobalProjectsQuery({
    skip: !activeCuratedCategoryInput,
    variables: {
      input: {
        top: CURATED_PROJECTS_COUNT,
        period: LeaderboardPeriod.Month,
        category: activeCuratedCategoryInput,
      },
    },
  })
  const categoryProjectRows = useMemo(
    () => categoryRowsData?.leaderboardGlobalProjectsGet ?? [],
    [categoryRowsData?.leaderboardGlobalProjectsGet],
  )
  const categoryProjectNames = useMemo(
    () => categoryProjectRows.map((projectRow) => projectRow.projectName),
    [categoryProjectRows],
  )
  const {
    data: categoryProjectsData,
    error: categoryProjectsError,
    loading: categoryProjectsLoading,
    refetch: refetchCategoryProjects,
  } = useQuery<LandingAboveFoldQueryData>(QUERY_LANDING_ABOVE_FOLD, {
    skip: categoryProjectNames.length === 0,
    variables: {
      input: {
        where: { names: categoryProjectNames },
        pagination: { take: categoryProjectNames.length },
      },
    },
  })
  const featuredProjects = useMemo(
    () => sortProjectsByNames(featuredProjectsData?.projectsGet.projects ?? [], featuredProjectNames),
    [featuredProjectNames, featuredProjectsData?.projectsGet.projects],
  )
  const categoryProjects = useMemo(
    () => sortProjectsByNames(categoryProjectsData?.projectsGet.projects ?? [], categoryProjectNames),
    [categoryProjectNames, categoryProjectsData?.projectsGet.projects],
  )
  const {
    data: otherSectionData,
    error: otherSectionError,
    loading: otherSectionLoading,
    refetch: refetchOtherSection,
  } = useQuery<LandingOtherSectionQueryData>(QUERY_LANDING_OTHER_SECTION, {
    skip: !showBelowTheFold,
  })
  const {
    data: announcementsData,
    error: announcementsError,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useQuery<LandingAnnouncementsQueryData>(QUERY_LANDING_ANNOUNCEMENTS, {
    skip: !showBelowTheFold,
  })
  const { data: charityProjectsData, loading: charityProjectsQueryLoading } = useQuery<LandingAboveFoldQueryData>(
    QUERY_LANDING_ABOVE_FOLD,
    {
      skip: !showBelowTheFold || charityProjectIds.length === 0,
      variables: {
        input: {
          where: { ids: charityProjectIds },
          pagination: { take: charityProjectIds.length },
        },
      },
    },
  )
  const charityProjects = useMemo(
    () => sortProjectsByIds(charityProjectsData?.projectsGet.projects ?? [], charityProjectIds),
    [charityProjectIds, charityProjectsData?.projectsGet.projects],
  )
  const { data: userIpCountryData, loading: userIpCountryLoading } = useGetUserIpCountryQuery({
    skip: !showBelowTheFold,
  })
  const { data: regionalProjectsData, loading: regionalProjectsLoading } = useProjectsForLandingPageQuery({
    skip: !showBelowTheFold || userIpCountryLoading || !userIpCountryData?.userIpCountry,
    variables: {
      input: {
        where: {
          fundingStrategy: ProjectFundingStrategy.TakeItAll,
          countryCode: userIpCountryData?.userIpCountry,
          status: ProjectsGetWhereInputStatus.Active,
        },
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.LaunchedAt,
          },
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.Balance,
          },
        ],
        pagination: {
          take: NO_OF_REGION_PROJECTS_TO_LOAD,
        },
      },
    },
  })

  return (
    <VStack w="full" spacing={10} paddingTop={{ base: '4px', lg: '6px' }}>
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
                name: 'Bitcoin Campaigns',
                path: getPath('discoveryCampaigns'),
                description: 'Discover new and upcoming all-or-nothing Bitcoin project ideas.',
              },
              {
                name: 'Bitcoin Fundraisers',
                path: getPath('discoveryFundraisers'),
                description: 'Support creator and humanitarian fundraisers worldwide.',
              },
              {
                name: 'Impact Funds',
                path: getPath('discoveryImpactFunds'),
                description: 'Explore impact-focused Bitcoin funding programs and outcomes.',
              },
            ],
          })}
        </script>
      </Head>
      <VStack w="full" spacing={20} paddingBottom={40}>
        <CuratedProjects
          activeCategory={activeCuratedCategory}
          categoryError={Boolean(categoryRowsError || categoryProjectsError)}
          categoryLoading={categoryRowsLoading || categoryProjectsLoading}
          categoryProjectRows={categoryProjectRows}
          categoryProjects={categoryProjects}
          featuredError={featuredProjectsError || Boolean(featuredProjectsQueryError)}
          featuredLoading={featuredProjectsLoading || featuredProjectsQueryLoading}
          featuredProjects={featuredProjects}
          onCategoryChange={setActiveCuratedCategory}
          onRetryCategory={() => {
            refetchCategoryRows()
            if (categoryProjectNames.length > 0) {
              refetchCategoryProjects()
            }
          }}
          onRetryFeatured={() => {
            loadFeaturedProjects()
            if (featuredProjectNames.length > 0) {
              refetchFeaturedProjects()
            }
          }}
        />

        {showBelowTheFold && (
          <>
            {categoryGroups.map((categoryGroup, index) => (
              <Fragment key={`landing-category-group-${index}`}>
                {categoryGroup.map((category) => (
                  <LandingCategorySectionContainer key={category} category={category} />
                ))}
                {index === categoryGroups.length - 1 && (
                  <ProjectsDisplayMostFundedThisWeek
                    title={t('Other fundraisers')}
                    categories={[ProjectCategory.Advocacy, ProjectCategory.Other]}
                    noRightContent
                    error={Boolean(otherSectionError)}
                    latestProjects={otherSectionData?.latest.projects}
                    loading={otherSectionLoading}
                    onRetry={() => refetchOtherSection()}
                    posts={otherSectionData?.posts}
                  />
                )}
                {index === 0 && (
                  <>
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
                {index === 1 && (
                  <CharityProjects
                    loading={charityProjectsLoading || charityProjectsQueryLoading}
                    projects={charityProjects}
                  />
                )}
                {index === 2 && (
                  <>
                    <ProjectsInYourRegion
                      loading={userIpCountryLoading || regionalProjectsLoading}
                      projects={regionalProjectsData?.projectsGet.projects}
                    />
                    <HowGeyserWorks />
                    <HeroesMainPage />
                  </>
                )}
                {index === 3 && <TopProjects />}
              </Fragment>
            ))}
            <NewsletterSignup />
          </>
        )}
      </VStack>
    </VStack>
  )
}

const LandingCategorySectionContainer = ({ category }: { category: ProjectCategory }) => {
  const { data, error, loading, refetch } = useQuery<
    LandingCategorySectionQueryData,
    LandingCategorySectionQueryVariables
  >(QUERY_LANDING_CATEGORY_SECTION, {
    variables: {
      category,
      mostFundedCategory: category,
    },
  })

  return (
    <ProjectsDisplayMostFundedThisWeek
      category={category}
      error={Boolean(error)}
      latestProjects={data?.latest.projects}
      loading={loading}
      onRetry={() => refetch()}
      posts={data?.posts}
      trendingGroups={data?.trending}
    />
  )
}
