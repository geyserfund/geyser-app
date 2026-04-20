import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretLeft, PiCaretRight, PiCheck } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useFilterContext } from '@/context/filter.tsx'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '@/modules/discovery/graphql/queries/projectsQuery.ts'
import {
  ProjectCategoryLabel,
  ProjectCategoryList,
  ProjectSubCategoryMap,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
} from '@/shared/constants/platform/projectCategory.ts'
import { PageSectionHeader } from '@/shared/components/layouts/PageSectionHeader.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import {
  CampaignsSeoImageUrl,
  FundraisersSeoImageUrl,
  getPath,
  GeyserMainSeoImageUrl,
  PathName,
} from '@/shared/constants/index.ts'
import { useQueryWithPagination } from '@/shared/hooks/useQueryWithPagination.tsx'
import {
  type GlobalProjectLeaderboardRow,
  type ProjectForLandingPageFragment,
  LeaderboardPeriod,
  OrderByDirection,
  ProjectCategory,
  ProjectFundingStrategy,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  ProjectSubCategory,
  useGetUserIpCountryQuery,
  useLeaderboardGlobalProjectsQuery,
} from '@/types/index.ts'

import { RenderProjectList } from './navView/components/RenderProjectList.tsx'
import { ProjectsRegionCountryFilter } from './ProjectsRegionCountryFilter.tsx'

type SortOption = 'most_funded_this_month' | 'most_funded' | 'most_recent'
type ProjectTypeFilter = 'all' | 'fundraisers' | 'campaigns'
type CategoryFilterOptionValue = 'all' | `category:${ProjectCategory}` | `subCategory:${ProjectSubCategory}`
type FilterDropdownOption<T extends string> = {
  dividerBefore?: boolean
  label: string
  value: T
}
type CategoryTab = {
  category?: ProjectCategory
  label: string
  path: string
  subCategory?: ProjectSubCategory
}
type EmptyStateSuggestion = {
  ctaLabel: string
  to: {
    pathname: string
    search: string
  }
}
type TranslateFn = (key: string) => string

const PAGE_SIZE = 20
const SORT_SEARCH_PARAM = 'sort'
const MOST_FUNDED_THIS_MONTH_PAGE_SIZE = 30

const getBaseProjectsPath = (projectTypeFilter: ProjectTypeFilter) => {
  if (projectTypeFilter === 'campaigns') {
    return getPath('discoveryCampaigns')
  }

  if (projectTypeFilter === 'fundraisers') {
    return getPath('discoveryFundraisers')
  }

  return getPath('discoveryProjects')
}

const getProjectsCategoryPath = (projectTypeFilter: ProjectTypeFilter, category: ProjectCategory) => {
  if (projectTypeFilter === 'campaigns') {
    return getPath('discoveryCampaignsCategory', category)
  }

  if (projectTypeFilter === 'fundraisers') {
    return getPath('discoveryFundraisersCategory', category)
  }

  return getPath('discoveryProjectsCategory', category)
}

const getProjectsSubCategoryPath = (projectTypeFilter: ProjectTypeFilter, subCategory: ProjectSubCategory) => {
  if (projectTypeFilter === 'campaigns') {
    return getPath('discoveryCampaignsSubCategory', subCategory)
  }

  if (projectTypeFilter === 'fundraisers') {
    return getPath('discoveryFundraisersSubCategory', subCategory)
  }

  return getPath('discoveryProjectsSubCategory', subCategory)
}

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

const getHeadContent = (projectTypeFilter: ProjectTypeFilter, t: TranslateFn) => {
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

const getSortOption = (sortParam: string | null, supportsMostFundedThisMonth: boolean): SortOption => {
  if (sortParam === 'most_funded') {
    return 'most_funded'
  }

  if (sortParam === 'most_recent') {
    return 'most_recent'
  }

  if (sortParam === 'most_funded_this_week' || sortParam === 'most_funded_this_month') {
    return supportsMostFundedThisMonth ? 'most_funded_this_month' : 'most_funded'
  }

  return supportsMostFundedThisMonth ? 'most_funded_this_month' : 'most_funded'
}

const ProjectCategoryEmoji: Record<ProjectCategory, string> = {
  [ProjectCategory.Education]: '🎓',
  [ProjectCategory.Community]: '🤝',
  [ProjectCategory.Culture]: '🎨',
  [ProjectCategory.Advocacy]: '⚖️',
  [ProjectCategory.Tool]: '🛠',
  [ProjectCategory.Cause]: '🤲',
  [ProjectCategory.Other]: '✨',
}

const ProjectSubCategoryEmoji: Record<ProjectSubCategory, string> = {
  [ProjectSubCategory.Course]: '📚',
  [ProjectSubCategory.ContentCreator]: '🎥',
  [ProjectSubCategory.Journalism]: '📰',
  [ProjectSubCategory.Podcast]: '🎙️',
  [ProjectSubCategory.Book]: '📖',
  [ProjectSubCategory.Event]: '🎉',
  [ProjectSubCategory.Meetup]: '🍻',
  [ProjectSubCategory.HackerSpace]: '💻',
  [ProjectSubCategory.CircularEconomy]: '🌊',
  [ProjectSubCategory.Film]: '🎬',
  [ProjectSubCategory.Collectible]: '🧩',
  [ProjectSubCategory.Game]: '🎮',
  [ProjectSubCategory.Art]: '🎨',
  [ProjectSubCategory.Music]: '🎵',
  [ProjectSubCategory.Lobby]: '📣',
  [ProjectSubCategory.LegalFund]: '⚖️',
  [ProjectSubCategory.Promotion]: '🚀',
  [ProjectSubCategory.OsSoftware]: '🛠',
  [ProjectSubCategory.Hardware]: '🔧',
  [ProjectSubCategory.App]: '📱',
  [ProjectSubCategory.Humanitarian]: '🌍',
  [ProjectSubCategory.Fundraiser]: '💸',
  [ProjectSubCategory.Travel]: '✈️',
  [ProjectSubCategory.Medical]: '🩺',
  [ProjectSubCategory.Other]: '✨',
}

const getCategoryTabs = (projectTypeFilter: ProjectTypeFilter, t: TranslateFn) => {
  const featuredTabs: CategoryTab[] = [
    {
      label: `🔥 ${t('Trending')}`,
      path: getBaseProjectsPath(projectTypeFilter),
    },
    {
      label: `📍 ${t('In your region')}`,
      path:
        projectTypeFilter === 'campaigns'
          ? getPath('discoveryCampaignsInYourRegion')
          : projectTypeFilter === 'fundraisers'
          ? getPath('discoveryFundraisersInYourRegion')
          : getPath('discoveryProjectsInYourRegion'),
    },
    {
      label: `🌊 ${t('Circular Economies')}`,
      path: getProjectsSubCategoryPath(projectTypeFilter, ProjectSubCategory.CircularEconomy),
      subCategory: ProjectSubCategory.CircularEconomy,
    },
    {
      label: `🎓 ${t('Education')}`,
      path: getProjectsCategoryPath(projectTypeFilter, ProjectCategory.Education),
      category: ProjectCategory.Education,
    },
    {
      label: `🛠 ${t('Open Source')}`,
      path: getProjectsSubCategoryPath(projectTypeFilter, ProjectSubCategory.OsSoftware),
      subCategory: ProjectSubCategory.OsSoftware,
    },
    {
      label: `🌍 ${t('Humanitarian')}`,
      path: getProjectsSubCategoryPath(projectTypeFilter, ProjectSubCategory.Humanitarian),
      subCategory: ProjectSubCategory.Humanitarian,
    },
    {
      label: `🤲 ${t('Causes')}`,
      path: getProjectsCategoryPath(projectTypeFilter, ProjectCategory.Cause),
      category: ProjectCategory.Cause,
    },
    {
      label: `⚖️ ${t('Legal & Advocacy')}`,
      path: getProjectsCategoryPath(projectTypeFilter, ProjectCategory.Advocacy),
      category: ProjectCategory.Advocacy,
    },
    {
      label: `🤝 ${t('Community')}`,
      path: getProjectsCategoryPath(projectTypeFilter, ProjectCategory.Community),
      category: ProjectCategory.Community,
    },
  ]

  const existingPaths = new Set(featuredTabs.map((tab) => tab.path))
  const getProjectCategoryLabel = (category: ProjectCategory) => ProjectCategoryLabel[category] ?? category
  const getProjectSubCategoryLabel = (subCategory: ProjectSubCategory) =>
    ProjectSubCategoryLabel[subCategory] ?? subCategory
  const remainingTabs: CategoryTab[] = [
    ...ProjectCategoryList.map((category) => ({
      label: `${ProjectCategoryEmoji[category]} ${t(getProjectCategoryLabel(category))}`,
      path: getProjectsCategoryPath(projectTypeFilter, category),
      category,
    })),
    ...ProjectSubCategoryList.map((subCategory) => ({
      label: `${ProjectSubCategoryEmoji[subCategory]} ${t(getProjectSubCategoryLabel(subCategory))}`,
      path: getProjectsSubCategoryPath(projectTypeFilter, subCategory),
      subCategory,
    })),
  ].filter((tab) => !existingPaths.has(tab.path))

  return [...featuredTabs, ...remainingTabs]
}

const getParentCategoryForSubCategory = (subCategory: ProjectSubCategory) => {
  return ProjectCategoryList.find((category) => ProjectSubCategoryMap[category].includes(subCategory))
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
    return getProjectsSubCategoryPath(nextProjectTypeFilter, subCategory as ProjectSubCategory)
  }

  if (isCategoryRoute && category) {
    return getProjectsCategoryPath(nextProjectTypeFilter, category as ProjectCategory)
  }

  return getBaseProjectsPath(nextProjectTypeFilter)
}

/** Renders the unified discovery projects page with funding-strategy URL filters. */
export const Projects = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabListRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const {
    filters: { category, countryCode: filterCountryCode, region, search, subCategory, tagIds },
  } = useFilterContext()

  const projectTypeFilter = getProjectTypeFilter(location.pathname)
  const projectTypeFilters = useMemo<Array<{ key: ProjectTypeFilter; label: string; path: string }>>(
    () => [
      { key: 'all', label: t('All project types'), path: getPath('discoveryProjects') },
      { key: 'fundraisers', label: t('Fundraisers'), path: getPath('discoveryFundraisers') },
      { key: 'campaigns', label: t('Campaigns'), path: getPath('discoveryCampaigns') },
    ],
    [t],
  )
  const shouldFilterByUserRegion =
    location.pathname === getPath('discoveryProjectsInYourRegion') ||
    location.pathname === getPath('discoveryFundraisersInYourRegion') ||
    location.pathname === getPath('discoveryCampaignsInYourRegion')
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const isCategoryRoute = pathSegments.includes(PathName.category)
  const isSubCategoryRoute = pathSegments.includes(PathName.subCategory)
  const categoryTabs = useMemo(() => getCategoryTabs(projectTypeFilter, t), [projectTypeFilter, t])
  const currentTabIndex = Math.max(
    categoryTabs.findIndex((tab) => tab.path === location.pathname),
    0,
  )
  const selectedCategoryFilterValue = useMemo<CategoryFilterOptionValue>(() => {
    if (subCategory) {
      return `subCategory:${subCategory as ProjectSubCategory}`
    }

    if (category) {
      return `category:${category as ProjectCategory}`
    }

    return 'all'
  }, [category, subCategory])
  const categoryFilterOptions = useMemo<FilterDropdownOption<CategoryFilterOptionValue>[]>(
    () => [
      { value: 'all', label: t('All Categories') },
      ...ProjectCategoryList.map((projectCategory) => ({
        value: `category:${projectCategory}` as const,
        label: t(ProjectCategoryLabel[projectCategory] ?? projectCategory),
      })),
      ...ProjectSubCategoryList.map((projectSubCategory) => ({
        dividerBefore: projectSubCategory === ProjectSubCategoryList[0],
        value: `subCategory:${projectSubCategory}` as const,
        label: t(ProjectSubCategoryLabel[projectSubCategory] ?? projectSubCategory),
      })),
    ],
    [t],
  )

  const {
    data: userIpCountryData,
    error: userIpCountryError,
    loading: loadingCountryCode,
    refetch: refetchUserIpCountry,
  } = useGetUserIpCountryQuery({
    skip: !shouldFilterByUserRegion,
  })

  const countryCode = shouldFilterByUserRegion ? userIpCountryData?.userIpCountry?.trim() || undefined : undefined
  const isRegionLookupFailed = shouldFilterByUserRegion && !loadingCountryCode && !countryCode
  const hasSearchFilter = Boolean(search?.trim())
  const tagFiltersCount = tagIds?.length ?? 0
  const supportsMostFundedThisMonth = !hasSearchFilter && tagFiltersCount === 0
  const sort = getSortOption(searchParams.get(SORT_SEARCH_PARAM), supportsMostFundedThisMonth)
  const sortOptions = useMemo<FilterDropdownOption<SortOption>[]>(
    () =>
      supportsMostFundedThisMonth
        ? [
            { value: 'most_funded_this_month', label: t('Most funded this month') },
            { value: 'most_funded', label: t('Most funded') },
            { value: 'most_recent', label: t('Most recent') },
          ]
        : [
            { value: 'most_funded', label: t('Most funded') },
            { value: 'most_recent', label: t('Most recent') },
          ],
    [supportsMostFundedThisMonth, t],
  )
  const shouldUseMostFundedThisMonth = sort === 'most_funded_this_month' && supportsMostFundedThisMonth

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
        skip: shouldUseMostFundedThisMonth || (shouldFilterByUserRegion && (!countryCode || loadingCountryCode)),
      },
      query: QUERY_PROJECTS_FOR_LANDING_PAGE,
      queryName: ['projectsGet', 'projects'],
      where,
    })

  const {
    data: mostFundedThisMonthData,
    error: mostFundedThisMonthError,
    loading: isMostFundedThisMonthLoading,
    refetch: refetchMostFundedThisMonth,
  } = useLeaderboardGlobalProjectsQuery({
    skip: !shouldUseMostFundedThisMonth || (shouldFilterByUserRegion && (!countryCode || loadingCountryCode)),
    variables: {
      input: {
        period: LeaderboardPeriod.Month,
        top: MOST_FUNDED_THIS_MONTH_PAGE_SIZE,
        fundingStrategy: getFundingStrategy(projectTypeFilter),
        countryCode: countryCode ?? filterCountryCode,
        region,
        category,
        subCategory,
      },
    },
  })
  const mostFundedThisMonthProjects = useMemo<GlobalProjectLeaderboardRow[]>(
    () => mostFundedThisMonthData?.leaderboardGlobalProjectsGet || [],
    [mostFundedThisMonthData?.leaderboardGlobalProjectsGet],
  )
  const projects = shouldUseMostFundedThisMonth ? [] : data
  const projectRows = shouldUseMostFundedThisMonth ? mostFundedThisMonthProjects : undefined
  const projectsError = shouldUseMostFundedThisMonth ? mostFundedThisMonthError : error
  const projectsLoading = shouldUseMostFundedThisMonth ? isMostFundedThisMonthLoading : isLoading
  const toolbarDividerColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')

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

  useEffect(() => {
    const activeTab = tabRefs.current[currentTabIndex]
    if (!activeTab) return

    activeTab.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [currentTabIndex])

  const handleSortChange = (nextSort: SortOption) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    const shouldClearSortParam =
      (supportsMostFundedThisMonth && nextSort === 'most_funded_this_month') ||
      (!supportsMostFundedThisMonth && nextSort === 'most_funded')

    if (shouldClearSortParam) {
      nextSearchParams.delete(SORT_SEARCH_PARAM)
    } else {
      nextSearchParams.set(SORT_SEARCH_PARAM, nextSort)
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  const handleRegionCountryChange = ({ countryCode, region }: { countryCode?: string; region?: string }) => {
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

  const getNextSearchParamsWithCategorySelection = ({
    category,
    subCategory,
  }: {
    category?: ProjectCategory
    subCategory?: ProjectSubCategory
  }) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (category) {
      nextSearchParams.set('category', category)
      nextSearchParams.delete('subCategory')
    } else if (subCategory) {
      nextSearchParams.set('subCategory', subCategory)
      nextSearchParams.delete('category')
    } else {
      nextSearchParams.delete('category')
      nextSearchParams.delete('subCategory')
    }

    return nextSearchParams
  }

  const handleCategoryFilterChange = (nextValue: CategoryFilterOptionValue) => {
    const nextCategory = nextValue.startsWith('category:')
      ? (nextValue.replace('category:', '') as ProjectCategory)
      : undefined
    const nextSubCategory = nextValue.startsWith('subCategory:')
      ? (nextValue.replace('subCategory:', '') as ProjectSubCategory)
      : undefined
    const nextSearchParams = getNextSearchParamsWithCategorySelection({
      category: nextCategory,
      subCategory: nextSubCategory,
    })

    navigate(
      {
        pathname: nextSubCategory
          ? getProjectsSubCategoryPath(projectTypeFilter, nextSubCategory)
          : nextCategory
          ? getProjectsCategoryPath(projectTypeFilter, nextCategory)
          : getBaseProjectsPath(projectTypeFilter),
        search: nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : '',
      },
      {
        preventScrollReset: true,
      },
    )
  }

  const getSuggestedViewDestination = useCallback(
    (options: {
      nextCategory?: ProjectCategory
      nextCountryCode?: string
      nextProjectTypeFilter?: ProjectTypeFilter
      nextRegion?: string
      nextShouldFilterByUserRegion?: boolean
      nextSubCategory?: ProjectSubCategory
    }) => {
      const resolvedCategory =
        'nextCategory' in options ? options.nextCategory : (category as ProjectCategory | undefined)
      const resolvedSubCategory =
        'nextSubCategory' in options ? options.nextSubCategory : (subCategory as ProjectSubCategory | undefined)
      const resolvedCountryCode = 'nextCountryCode' in options ? options.nextCountryCode : filterCountryCode
      const resolvedRegion = 'nextRegion' in options ? options.nextRegion : region
      const resolvedProjectTypeFilter = options.nextProjectTypeFilter ?? projectTypeFilter
      const resolvedShouldFilterByUserRegion = options.nextShouldFilterByUserRegion ?? shouldFilterByUserRegion
      const nextSearchParams = new URLSearchParams(searchParams)

      if (resolvedCategory) {
        nextSearchParams.set('category', resolvedCategory)
      } else {
        nextSearchParams.delete('category')
      }

      if (resolvedSubCategory) {
        nextSearchParams.set('subCategory', resolvedSubCategory)
      } else {
        nextSearchParams.delete('subCategory')
      }

      if (resolvedCountryCode) {
        nextSearchParams.set('countryCode', resolvedCountryCode)
      } else {
        nextSearchParams.delete('countryCode')
      }

      if (resolvedRegion) {
        nextSearchParams.set('region', resolvedRegion)
      } else {
        nextSearchParams.delete('region')
      }

      const nextPathname = resolvedShouldFilterByUserRegion
        ? getProjectTypePath({
            category: resolvedCategory,
            isCategoryRoute: Boolean(resolvedCategory),
            isSubCategoryRoute: Boolean(resolvedSubCategory),
            nextProjectTypeFilter: resolvedProjectTypeFilter,
            shouldFilterByUserRegion: true,
            subCategory: resolvedSubCategory,
          })
        : resolvedSubCategory
        ? getProjectsSubCategoryPath(resolvedProjectTypeFilter, resolvedSubCategory)
        : resolvedCategory
        ? getProjectsCategoryPath(resolvedProjectTypeFilter, resolvedCategory)
        : getBaseProjectsPath(resolvedProjectTypeFilter)

      return {
        pathname: nextPathname,
        search: nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : '',
      }
    },
    [category, filterCountryCode, projectTypeFilter, region, searchParams, shouldFilterByUserRegion, subCategory],
  )

  const emptyStateMessage = useMemo(() => {
    const resultsLabel =
      sort === 'most_funded_this_month'
        ? t('trending {{projectType}}', {
            projectType:
              projectTypeFilter === 'campaigns'
                ? t('campaigns')
                : projectTypeFilter === 'fundraisers'
                ? t('fundraisers')
                : t('projects'),
          })
        : sort === 'most_recent'
        ? t('recent {{projectType}}', {
            projectType:
              projectTypeFilter === 'campaigns'
                ? t('campaigns')
                : projectTypeFilter === 'fundraisers'
                ? t('fundraisers')
                : t('projects'),
          })
        : t('{{projectType}}', {
            projectType:
              projectTypeFilter === 'campaigns'
                ? t('campaigns')
                : projectTypeFilter === 'fundraisers'
                ? t('fundraisers')
                : t('projects'),
          })

    if (subCategory) {
      return t('There are no {{resultsLabel}} in {{filterLabel}}', {
        resultsLabel,
        filterLabel: t(ProjectSubCategoryLabel[subCategory] ?? subCategory),
      })
    }

    if (category) {
      return t('There are no {{resultsLabel}} in {{filterLabel}}', {
        resultsLabel,
        filterLabel: t(ProjectCategoryLabel[category] ?? category),
      })
    }

    if (shouldFilterByUserRegion) {
      return t('There are no {{resultsLabel}} in your region', {
        resultsLabel,
      })
    }

    return t('There are no {{resultsLabel}} matching this filter', {
      resultsLabel,
    })
  }, [category, projectTypeFilter, shouldFilterByUserRegion, sort, subCategory, t])

  const emptyStateSuggestion = useMemo<EmptyStateSuggestion | undefined>(() => {
    if (projectTypeFilter === 'campaigns') {
      return {
        ctaLabel: t('Fundraisers'),
        to: getSuggestedViewDestination({ nextProjectTypeFilter: 'fundraisers' }),
      }
    }

    if (projectTypeFilter === 'fundraisers') {
      return {
        ctaLabel: t('All project types'),
        to: getSuggestedViewDestination({ nextProjectTypeFilter: 'all' }),
      }
    }

    if (subCategory) {
      const parentCategory = getParentCategoryForSubCategory(subCategory as ProjectSubCategory)

      if (parentCategory) {
        return {
          ctaLabel: t(ProjectCategoryLabel[parentCategory] ?? parentCategory),
          to: getSuggestedViewDestination({
            nextCategory: parentCategory,
            nextSubCategory: undefined,
          }),
        }
      }
    }

    if (category) {
      return {
        ctaLabel: t('All Categories'),
        to: getSuggestedViewDestination({
          nextCategory: undefined,
          nextSubCategory: undefined,
        }),
      }
    }

    if (shouldFilterByUserRegion || filterCountryCode || region) {
      return {
        ctaLabel: t('Worldwide'),
        to: getSuggestedViewDestination({
          nextCountryCode: undefined,
          nextRegion: undefined,
          nextShouldFilterByUserRegion: false,
        }),
      }
    }

    return undefined
  }, [
    category,
    filterCountryCode,
    getSuggestedViewDestination,
    projectTypeFilter,
    region,
    shouldFilterByUserRegion,
    subCategory,
    t,
  ])

  const scrollTabs = (direction: 'left' | 'right') => {
    const element = tabListRef.current
    if (!element) return

    element.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    })
  }

  const handleRetry = () => {
    if (shouldFilterByUserRegion && !countryCode) {
      refetchUserIpCountry()
      return
    }

    if (shouldUseMostFundedThisMonth) {
      refetchMostFundedThisMonth()
      return
    }

    refetch()
  }

  const headContent = getHeadContent(projectTypeFilter, t)

  return (
    <>
      <Head title={headContent.title} description={headContent.description} image={headContent.image} />

      <VStack w="full" spacing={7} alignItems="start">
        <PageSectionHeader title={headContent.title} subtitle={headContent.description} />

        <Tabs
          w="full"
          variant="secondary"
          index={currentTabIndex}
          onChange={(index) => {
            const nextTab = categoryTabs[index] ?? categoryTabs[0]
            const nextSearchParams = getNextSearchParamsWithCategorySelection({
              category: nextTab?.category,
              subCategory: nextTab?.subCategory,
            })

            navigate(
              {
                pathname: nextTab?.path ?? getBaseProjectsPath(projectTypeFilter),
                search: nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : '',
              },
              {
                preventScrollReset: true,
              },
            )
          }}
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
              {categoryTabs.map((tab, index) => (
                <Tab
                  key={tab.path}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
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

        <HStack
          w="full"
          spacing={2}
          whiteSpace="nowrap"
          flexShrink={0}
          overflowX="auto"
          sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <HStack spacing={2} whiteSpace="nowrap" flexShrink={0}>
            <ProjectsToolbarSelect
              options={projectTypeFilters.map((filter) => ({
                label: filter.label,
                value: filter.key,
              }))}
              value={projectTypeFilter}
              onChange={handleProjectTypeChange}
            />
            <Divider
              display={{ base: 'none', md: 'block' }}
              orientation="vertical"
              height="24px"
              borderColor={toolbarDividerColor}
            />
            <ProjectsToolbarSelect
              defaultLabel={t('All Categories')}
              options={categoryFilterOptions}
              value={selectedCategoryFilterValue}
              onChange={handleCategoryFilterChange}
            />
            <Divider
              display={{ base: 'none', md: 'block' }}
              orientation="vertical"
              height="24px"
              borderColor={toolbarDividerColor}
            />
            <ProjectsRegionCountryFilter
              countryCode={filterCountryCode}
              region={region}
              onChange={handleRegionCountryChange}
            />
          </HStack>

          <HStack spacing={2} whiteSpace="nowrap" flexShrink={0}>
            <Divider
              display={{ base: 'none', md: 'block' }}
              orientation="vertical"
              height="24px"
              borderColor={toolbarDividerColor}
            />
            <ProjectsToolbarSelect options={sortOptions} value={sort} onChange={handleSortChange} />
          </HStack>
        </HStack>

        {shouldFilterByUserRegion && loadingCountryCode ? <RenderProjectList projects={[]} loading /> : null}

        {!loadingCountryCode && isRegionLookupFailed ? (
          <VStack alignItems="start" spacing={3}>
            <Body>
              {userIpCountryError ? t('Failed to determine your region') : t('We could not determine your region')}
            </Body>
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={handleRetry}>
              {t('Retry')}
            </Button>
          </VStack>
        ) : null}

        {!loadingCountryCode && !isRegionLookupFailed && projectsError ? (
          <VStack alignItems="start" spacing={3}>
            <Body>{t('Failed to fetch projects')}</Body>
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={handleRetry}>
              {t('Retry')}
            </Button>
          </VStack>
        ) : null}

        {!loadingCountryCode && !isRegionLookupFailed && !projectsError ? (
          <RenderProjectList
            projects={projects}
            loading={projectsLoading}
            projectRows={projectRows}
            emptyState={<ProjectsFilterEmptyState message={emptyStateMessage} suggestion={emptyStateSuggestion} />}
            trendingAmountLabel={t('raised this month')}
            hideTrendingBelowUsd={100}
            isLoadingMore={shouldUseMostFundedThisMonth ? undefined : isLoadingMore}
            noMoreItems={shouldUseMostFundedThisMonth ? undefined : noMoreItems}
            fetchNext={shouldUseMostFundedThisMonth ? undefined : fetchNext}
          />
        ) : null}
      </VStack>
    </>
  )
}

type ProjectsFilterEmptyStateProps = {
  message: string
  suggestion?: EmptyStateSuggestion
}

const ProjectsFilterEmptyState = ({ message, suggestion }: ProjectsFilterEmptyStateProps) => {
  const { t } = useTranslation()
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

  return (
    <VStack w="full" borderWidth="1px" borderColor={borderColor} borderRadius="12px" padding={{ base: 4, md: 5 }}>
      <HStack
        w="full"
        justifyContent="center"
        spacing={1}
        whiteSpace="nowrap"
        overflowX="auto"
        color="neutral1.11"
        fontSize="sm"
      >
        <Body>{message}.</Body>
        {suggestion ? (
          <>
            <Body>{t('See')}</Body>
            <Button
              as={Link}
              to={suggestion.to}
              variant="unstyled"
              minWidth="unset"
              height="auto"
              lineHeight="inherit"
              fontSize="sm"
              fontWeight={400}
              color="neutral1.11"
              cursor="pointer"
              textDecoration="underline"
              _hover={{ textDecoration: 'underline' }}
              _active={{ textDecoration: 'underline' }}
              padding={0}
            >
              {suggestion.ctaLabel}
            </Button>
            <Body>{t('instead')}.</Body>
          </>
        ) : (
          <Body>{t('Try a broader filter or clear your current selection')}.</Body>
        )}
      </HStack>
    </VStack>
  )
}

type ProjectsToolbarSelectProps<T extends string> = {
  defaultLabel?: string
  onChange: (value: T) => void
  options: Array<FilterDropdownOption<T>>
  value: T
}

const ProjectsToolbarSelect = <T extends string>({
  defaultLabel,
  onChange,
  options,
  value,
}: ProjectsToolbarSelectProps<T>) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const selectedOption = options.find((option) => option.value === value)
  const buttonLabel = selectedOption?.label ?? defaultLabel ?? ''

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-start" closeOnBlur>
      <PopoverTrigger>
        <Button
          variant="ghost"
          colorScheme="neutral1"
          size="sm"
          rightIcon={<Icon as={PiCaretDown} />}
          fontSize="sm"
          fontWeight={400}
          paddingX={0}
          minWidth="unset"
          color="neutral1.11"
        >
          {buttonLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent width="240px" maxWidth="calc(100vw - 32px)">
        <PopoverBody padding={2}>
          <VStack align="stretch" spacing={1} maxHeight="360px" overflowY="auto" paddingRight={1}>
            {options.map((option) => {
              const isSelected = option.value === value

              return (
                <VStack key={option.value} align="stretch" spacing={1}>
                  {option.dividerBefore ? <Divider borderColor="blackAlpha.200" /> : null}
                  <Button
                    variant="ghost"
                    justifyContent="space-between"
                    width="full"
                    fontWeight={isSelected ? 600 : 400}
                    paddingX={3}
                    onClick={() => {
                      onChange(option.value)
                      onClose()
                    }}
                  >
                    <Body>{option.label}</Body>
                    <Box minWidth="16px">{isSelected ? <Icon as={PiCheck} /> : null}</Box>
                  </Button>
                </VStack>
              )
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
