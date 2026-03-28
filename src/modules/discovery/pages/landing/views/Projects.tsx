import { Button, Divider, HStack, IconButton, Select, Tab, TabList, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'

import { Head } from '@/config/Head.tsx'
import { useFilterContext } from '@/context/filter.tsx'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '@/modules/discovery/graphql/queries/projectsQuery.ts'
import { PageSectionHeader } from '@/shared/components/layouts/PageSectionHeader.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import {
  CampaignsSeoImageUrl,
  FundraisersSeoImageUrl,
  GeyserMainSeoImageUrl,
  getPath,
  PathName,
} from '@/shared/constants/index.ts'
import { useQueryWithPagination } from '@/shared/hooks/useQueryWithPagination.tsx'
import {
  ContributionsSummary,
  OrderByDirection,
  ProjectCategory,
  ProjectForLandingPageFragment,
  ProjectFundingStrategy,
  ProjectsGetWhereInputStatus,
  ProjectsMostFundedAllOrNothingRange,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  ProjectsMostFundedTakeItAllRange,
  ProjectSubCategory,
  useGetUserIpCountryQuery,
  useProjectsMostFundedAllOrNothingQuery,
  useProjectsMostFundedTakeItAllQuery,
} from '@/types/index.ts'

import { RenderProjectList } from './navView/components/RenderProjectList.tsx'
import { ProjectsRegionCountryFilter } from './ProjectsRegionCountryFilter.tsx'

type SortOption = 'most_funded' | 'most_recent'
type ProjectTypeFilter = 'all' | 'fundraisers' | 'campaigns'

const PAGE_SIZE = 20
const SORT_SEARCH_PARAM = 'sort'
const TRENDING_PAGE_SIZE = 30

const projectTypeFilters: Array<{ key: ProjectTypeFilter; label: string; path: string }> = [
  { key: 'all', label: t('Project Type'), path: getPath('discoveryProjects') },
  { key: 'fundraisers', label: t('Fundraisers'), path: getPath('discoveryFundraisers') },
  { key: 'campaigns', label: t('Campaigns'), path: getPath('discoveryCampaigns') },
]

const getProjectTypeFilter = (pathname: string): ProjectTypeFilter => {
  const rootSegment = pathname.split('/').filter(Boolean)[0]

  if (rootSegment === PathName.campaigns) {
    return 'campaigns'
  }

  if (rootSegment === PathName.fundraisers) {
    return 'fundraisers'
  }

  return 'all'
}

const getFundingStrategy = (projectTypeFilter: ProjectTypeFilter) => {
  if (projectTypeFilter === 'campaigns') {
    return ProjectFundingStrategy.AllOrNothing
  }

  if (projectTypeFilter === 'fundraisers') {
    return ProjectFundingStrategy.TakeItAll
  }

  return undefined
}

const getHeadContent = (projectTypeFilter: ProjectTypeFilter) => {
  if (projectTypeFilter === 'campaigns') {
    return {
      title: t('Campaigns'),
      description: t(
        'Explore All-or-Nothing Bitcoin crowdfunding campaigns on Geyser. Back bold ideas that only succeed when their goal is met.',
      ),
      image: CampaignsSeoImageUrl,
    }
  }

  if (projectTypeFilter === 'fundraisers') {
    return {
      title: t('Fundraisers'),
      description: t('Discover open fundraisers on Geyser. Fund Bitcoin projects you want to see come to life.'),
      image: FundraisersSeoImageUrl,
    }
  }

  return {
    title: t('Projects'),
    description: t('Discover projects on Geyser. Browse fundraisers and campaigns in one place.'),
    image: GeyserMainSeoImageUrl,
  }
}

const getCategoryTabs = (projectTypeFilter: ProjectTypeFilter) => {
  if (projectTypeFilter === 'campaigns') {
    return [
      {
        label: `🔥 ${t('Trending')}`,
        path: getPath('discoveryCampaigns'),
      },
      {
        label: `📍 ${t('In your region')}`,
        path: getPath('discoveryCampaignsInYourRegion'),
      },
      {
        label: `🌊 ${t('Circular Economies')}`,
        path: getPath('discoveryCampaignsSubCategory', ProjectSubCategory.CircularEconomy),
      },
      {
        label: `🎓 ${t('Education')}`,
        path: getPath('discoveryCampaignsCategory', ProjectCategory.Education),
      },
      {
        label: `🛠 ${t('Open Source')}`,
        path: getPath('discoveryCampaignsSubCategory', ProjectSubCategory.OsSoftware),
      },
      {
        label: `🌍 ${t('Humanitarian')}`,
        path: getPath('discoveryCampaignsSubCategory', ProjectSubCategory.Humanitarian),
      },
      {
        label: `🤲 ${t('Causes')}`,
        path: getPath('discoveryCampaignsCategory', ProjectCategory.Cause),
      },
      {
        label: `⚖️ ${t('Legal & Advocacy')}`,
        path: getPath('discoveryCampaignsCategory', ProjectCategory.Advocacy),
      },
      {
        label: `🤝 ${t('Community')}`,
        path: getPath('discoveryCampaignsCategory', ProjectCategory.Community),
      },
    ]
  }

  if (projectTypeFilter === 'fundraisers') {
    return [
      {
        label: `🔥 ${t('Trending')}`,
        path: getPath('discoveryFundraisers'),
      },
      {
        label: `📍 ${t('In your region')}`,
        path: getPath('discoveryFundraisersInYourRegion'),
      },
      {
        label: `🌊 ${t('Circular Economies')}`,
        path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.CircularEconomy),
      },
      {
        label: `🎓 ${t('Education')}`,
        path: getPath('discoveryFundraisersCategory', ProjectCategory.Education),
      },
      {
        label: `🛠 ${t('Open Source')}`,
        path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.OsSoftware),
      },
      {
        label: `🌍 ${t('Humanitarian')}`,
        path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.Humanitarian),
      },
      {
        label: `🤲 ${t('Causes')}`,
        path: getPath('discoveryFundraisersCategory', ProjectCategory.Cause),
      },
      {
        label: `⚖️ ${t('Legal & Advocacy')}`,
        path: getPath('discoveryFundraisersCategory', ProjectCategory.Advocacy),
      },
      {
        label: `🤝 ${t('Community')}`,
        path: getPath('discoveryFundraisersCategory', ProjectCategory.Community),
      },
    ]
  }

  return [
    {
      label: `🔥 ${t('Trending')}`,
      path: getPath('discoveryProjects'),
    },
    {
      label: `📍 ${t('In your region')}`,
      path: getPath('discoveryProjectsInYourRegion'),
    },
    {
      label: `🌊 ${t('Circular Economies')}`,
      path: getPath('discoveryProjectsSubCategory', ProjectSubCategory.CircularEconomy),
    },
    {
      label: `🎓 ${t('Education')}`,
      path: getPath('discoveryProjectsCategory', ProjectCategory.Education),
    },
    {
      label: `🛠 ${t('Open Source')}`,
      path: getPath('discoveryProjectsSubCategory', ProjectSubCategory.OsSoftware),
    },
    {
      label: `🌍 ${t('Humanitarian')}`,
      path: getPath('discoveryProjectsSubCategory', ProjectSubCategory.Humanitarian),
    },
    {
      label: `🤲 ${t('Causes')}`,
      path: getPath('discoveryProjectsCategory', ProjectCategory.Cause),
    },
    {
      label: `⚖️ ${t('Legal & Advocacy')}`,
      path: getPath('discoveryProjectsCategory', ProjectCategory.Advocacy),
    },
    {
      label: `🤝 ${t('Community')}`,
      path: getPath('discoveryProjectsCategory', ProjectCategory.Community),
    },
  ]
}

const getProjectTypePath = ({
  category,
  isCategoryRoute,
  isSubCategoryRoute,
  nextProjectTypeFilter,
  shouldFilterByUserRegion,
  subCategory,
}: {
  category?: string
  isCategoryRoute: boolean
  isSubCategoryRoute: boolean
  nextProjectTypeFilter: ProjectTypeFilter
  shouldFilterByUserRegion: boolean
  subCategory?: string
}) => {
  if (shouldFilterByUserRegion) {
    if (nextProjectTypeFilter === 'campaigns') {
      return getPath('discoveryCampaignsInYourRegion')
    }

    if (nextProjectTypeFilter === 'fundraisers') {
      return getPath('discoveryFundraisersInYourRegion')
    }

    return getPath('discoveryProjectsInYourRegion')
  }

  if (isSubCategoryRoute && subCategory) {
    if (nextProjectTypeFilter === 'fundraisers') {
      return getPath('discoveryFundraisersSubCategory', subCategory)
    }

    if (nextProjectTypeFilter === 'campaigns') {
      return getPath('discoveryCampaignsSubCategory', subCategory)
    }

    return getPath('discoveryProjectsSubCategory', subCategory)
  }

  if (isCategoryRoute && category) {
    if (nextProjectTypeFilter === 'fundraisers') {
      return getPath('discoveryFundraisersCategory', category)
    }

    if (nextProjectTypeFilter === 'campaigns') {
      return getPath('discoveryCampaignsCategory', category)
    }

    return getPath('discoveryProjectsCategory', category)
  }

  return projectTypeFilters.find((filter) => filter.key === nextProjectTypeFilter)?.path ?? getPath('discoveryProjects')
}

/** Renders the unified discovery projects page with funding-strategy URL filters. */
export const Projects = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabListRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const {
    filters: { category, countryCode: filterCountryCode, region, search, subCategory, tagIds },
  } = useFilterContext()

  const projectTypeFilter = getProjectTypeFilter(location.pathname)
  const shouldFilterByUserRegion =
    location.pathname === getPath('discoveryProjectsInYourRegion') ||
    location.pathname === getPath('discoveryFundraisersInYourRegion') ||
    location.pathname === getPath('discoveryCampaignsInYourRegion')
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const isCategoryRoute = pathSegments.includes(PathName.category)
  const isSubCategoryRoute = pathSegments.includes(PathName.subCategory)
  const categoryTabs = useMemo(() => getCategoryTabs(projectTypeFilter), [projectTypeFilter])
  const isTrendingTab = location.pathname === categoryTabs[0]?.path
  const currentTabIndex = Math.max(
    categoryTabs.findIndex((tab) => tab.path === location.pathname),
    0,
  )

  const { data: userIpCountryData, loading: loadingCountryCode } = useGetUserIpCountryQuery({
    skip: !shouldFilterByUserRegion,
  })

  const countryCode = shouldFilterByUserRegion ? userIpCountryData?.userIpCountry || undefined : undefined
  const sortParam = searchParams.get(SORT_SEARCH_PARAM)
  const sort: SortOption = sortParam === 'most_recent' ? 'most_recent' : 'most_funded'
  const hasRegionCountryFilter = Boolean(filterCountryCode || region)
  const shouldUseTrendingResults = isTrendingTab && !hasRegionCountryFilter

  const where = useMemo(
    () => ({
      category: category as ProjectCategory | undefined,
      countryCode: countryCode ?? filterCountryCode,
      fundingStrategy: getFundingStrategy(projectTypeFilter),
      region,
      search,
      status: ProjectsGetWhereInputStatus.Active,
      subCategory: subCategory as ProjectSubCategory | undefined,
      tagIds: tagIds?.length ? tagIds : undefined,
    }),
    [category, countryCode, filterCountryCode, projectTypeFilter, region, search, subCategory, tagIds],
  )

  const orderBy = useMemo<ProjectsOrderByInput[]>(() => {
    if (sort === 'most_recent') {
      return [
        {
          direction: OrderByDirection.Desc,
          field: ProjectsOrderByField.LaunchedAt,
        },
        {
          direction: OrderByDirection.Desc,
          field: ProjectsOrderByField.Balance,
        },
      ]
    }

    return [
      {
        direction: OrderByDirection.Desc,
        field: ProjectsOrderByField.Balance,
      },
      {
        direction: OrderByDirection.Desc,
        field: ProjectsOrderByField.LaunchedAt,
      },
    ]
  }, [sort])

  const { data, error, fetchNext, isLoading, isLoadingMore, noMoreItems, refetch } =
    useQueryWithPagination<ProjectForLandingPageFragment>({
      itemLimit: PAGE_SIZE,
      orderBy,
      options: {
        skip: shouldUseTrendingResults || (shouldFilterByUserRegion && loadingCountryCode),
      },
      query: QUERY_PROJECTS_FOR_LANDING_PAGE,
      queryName: ['projectsGet', 'projects'],
      where,
    })

  const {
    data: trendingCampaignsData,
    error: trendingCampaignsError,
    loading: isTrendingCampaignsLoading,
    refetch: refetchTrendingCampaigns,
  } = useProjectsMostFundedAllOrNothingQuery({
    skip: !shouldUseTrendingResults || projectTypeFilter === 'fundraisers',
    variables: {
      input: {
        range: ProjectsMostFundedAllOrNothingRange.Week,
        take: TRENDING_PAGE_SIZE,
      },
    },
  })

  const {
    data: trendingFundraisersData,
    error: trendingFundraisersError,
    loading: isTrendingFundraisersLoading,
    refetch: refetchTrendingFundraisers,
  } = useProjectsMostFundedTakeItAllQuery({
    skip: !shouldUseTrendingResults || projectTypeFilter === 'campaigns',
    variables: {
      input: {
        range: ProjectsMostFundedTakeItAllRange.Week,
        take: TRENDING_PAGE_SIZE,
      },
    },
  })

  const trendingProjects = useMemo<
    (ProjectForLandingPageFragment & {
      contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
    })[]
  >(() => {
    const fundraiserProjects =
      trendingFundraisersData?.projectsMostFundedTakeItAll.map((project) => ({
        ...project.project,
        contributionSummary: project.contributionsSummary ?? undefined,
      })) ?? []
    const campaignProjects =
      trendingCampaignsData?.projectsMostFundedAllOrNothing.map((project) => ({
        ...project.project,
        contributionSummary: undefined,
      })) ?? []

    if (projectTypeFilter === 'fundraisers') {
      return fundraiserProjects
    }

    if (projectTypeFilter === 'campaigns') {
      return campaignProjects
    }

    return [...fundraiserProjects, ...campaignProjects].sort((a, b) => {
      const aTrendingScore = a.contributionSummary?.contributionsTotalUsd ?? a.balanceUsdCent ?? 0
      const bTrendingScore = b.contributionSummary?.contributionsTotalUsd ?? b.balanceUsdCent ?? 0
      return bTrendingScore - aTrendingScore
    })
  }, [projectTypeFilter, trendingCampaignsData, trendingFundraisersData])

  const trendingError = trendingCampaignsError ?? trendingFundraisersError
  const isTrendingLoading =
    shouldUseTrendingResults &&
    ((projectTypeFilter !== 'fundraisers' && isTrendingCampaignsLoading) ||
      (projectTypeFilter !== 'campaigns' && isTrendingFundraisersLoading))
  const projects = shouldUseTrendingResults ? trendingProjects : data
  const projectsError = shouldUseTrendingResults ? trendingError : error
  const projectsLoading = shouldUseTrendingResults ? isTrendingLoading : isLoading

  useEffect(() => {
    const element = tabListRef.current
    if (!element) return

    const updateScrollState = () => {
      setCanScrollLeft(element.scrollLeft > 0)
      setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
    }

    updateScrollState()
    element.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [categoryTabs, location.pathname])

  const handleSortChange = (nextSort: SortOption) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextSort === 'most_funded') {
      nextSearchParams.delete(SORT_SEARCH_PARAM)
    } else {
      nextSearchParams.set(SORT_SEARCH_PARAM, nextSort)
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  const handleRegionCountryChange = ({
    countryCode,
    region,
  }: {
    countryCode?: string
    region?: string
  }) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (countryCode) {
      nextSearchParams.set('countryCode', countryCode)
      nextSearchParams.delete('region')
    } else if (region) {
      nextSearchParams.set('region', region)
      nextSearchParams.delete('countryCode')
    } else {
      nextSearchParams.delete('countryCode')
      nextSearchParams.delete('region')
    }

    const nextPathname =
      shouldFilterByUserRegion && (countryCode || region)
        ? getProjectTypePath({
            category,
            isCategoryRoute,
            isSubCategoryRoute,
            nextProjectTypeFilter: projectTypeFilter,
            shouldFilterByUserRegion: false,
            subCategory,
          })
        : location.pathname

    navigate(
      {
        pathname: nextPathname,
        search: nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : '',
      },
      { preventScrollReset: true },
    )
  }

  const handleProjectTypeChange = (nextProjectTypeFilter: ProjectTypeFilter) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (category) {
      nextSearchParams.set('category', category)
    } else {
      nextSearchParams.delete('category')
    }

    if (subCategory) {
      nextSearchParams.set('subCategory', subCategory)
    } else {
      nextSearchParams.delete('subCategory')
    }

    navigate(
      {
        pathname: getProjectTypePath({
          category,
          isCategoryRoute,
          isSubCategoryRoute,
          nextProjectTypeFilter,
          shouldFilterByUserRegion,
          subCategory,
        }),
        search: nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : '',
      },
      {
        preventScrollReset: true,
      },
    )
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    const element = tabListRef.current
    if (!element) return

    element.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    })
  }

  const handleRetry = () => {
    if (shouldUseTrendingResults) {
      if (projectTypeFilter !== 'fundraisers') {
        void refetchTrendingCampaigns()
      }

      if (projectTypeFilter !== 'campaigns') {
        void refetchTrendingFundraisers()
      }

      return
    }

    void refetch()
  }

  const headContent = getHeadContent(projectTypeFilter)

  return (
    <>
      <Head title={headContent.title} description={headContent.description} image={headContent.image} />

      <VStack w="full" spacing={7} alignItems="start">
        <PageSectionHeader title={headContent.title} subtitle={headContent.description} />

        <Tabs
          w="full"
          variant="secondary"
          index={currentTabIndex}
          onChange={(index) =>
            navigate(
              {
                pathname: categoryTabs[index]?.path ?? categoryTabs[0]?.path ?? getPath('discoveryProjects'),
                search: location.search,
              },
              {
                preventScrollReset: true,
              },
            )
          }
        >
          <HStack w="full" spacing={2} alignItems="center">
            {canScrollLeft ? (
              <IconButton
                aria-label={t('Scroll categories left')}
                icon={<PiCaretLeft />}
                variant="ghost"
                colorScheme="neutral1"
                onClick={() => scrollTabs('left')}
              />
            ) : null}

            <TabList
              ref={tabListRef}
              gap={4}
              overflowX="auto"
              sx={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {categoryTabs.map((tab) => (
                <Tab
                  key={tab.label}
                  fontSize={{ base: 'xs', sm: 'md' }}
                  color="neutral1.11"
                  _selected={{
                    color: 'neutral1.11',
                    borderColor: 'neutral1.8',
                  }}
                  whiteSpace="nowrap"
                  overflow="visible"
                  maxW="none"
                  title={tab.label}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            {canScrollRight ? (
              <IconButton
                aria-label={t('Scroll categories right')}
                icon={<PiCaretRight />}
                variant="ghost"
                colorScheme="neutral1"
                onClick={() => scrollTabs('right')}
              />
            ) : null}
          </HStack>
        </Tabs>

        <HStack w="full" justifyContent="space-between" spacing={4} alignItems="center" flexWrap="wrap">
          <HStack spacing={2} whiteSpace="nowrap" flexShrink={0}>
            <ProjectsRegionCountryFilter
              countryCode={filterCountryCode}
              region={region}
              onChange={handleRegionCountryChange}
            />
            <Divider orientation="vertical" height="24px" borderColor="blackAlpha.300" />
            <Select
              size="sm"
              maxW="180px"
              borderColor="neutral1.6"
              value={projectTypeFilter}
              onChange={(event) => handleProjectTypeChange(event.target.value as ProjectTypeFilter)}
            >
              {projectTypeFilters.map((filter) => (
                <option key={filter.key} value={filter.key}>
                  {filter.label}
                </option>
              ))}
            </Select>
          </HStack>

          <HStack spacing={2} marginLeft={{ base: 0, md: 'auto' }} whiteSpace="nowrap" flexShrink={0}>
            <Body size="sm" light whiteSpace="nowrap">
              {t('Sort by')}
            </Body>
            <Select
              size="sm"
              maxW="200px"
              borderColor="neutral1.6"
              value={sort}
              onChange={(event) => handleSortChange(event.target.value as SortOption)}
            >
              <option value="most_funded">{t('Most funded')}</option>
              <option value="most_recent">{t('Most recent')}</option>
            </Select>
          </HStack>
        </HStack>

        {shouldFilterByUserRegion && loadingCountryCode ? <RenderProjectList projects={[]} loading /> : null}

        {!loadingCountryCode && projectsError ? (
          <VStack alignItems="start" spacing={3}>
            <Body>{t('Failed to fetch projects')}</Body>
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={handleRetry}>
              {t('Retry')}
            </Button>
          </VStack>
        ) : null}

        {!loadingCountryCode && !projectsError ? (
          <RenderProjectList
            projects={projects}
            loading={projectsLoading}
            isLoadingMore={shouldUseTrendingResults ? undefined : isLoadingMore}
            noMoreItems={shouldUseTrendingResults ? undefined : noMoreItems}
            fetchNext={shouldUseTrendingResults ? undefined : fetchNext}
          />
        ) : null}
      </VStack>
    </>
  )
}
