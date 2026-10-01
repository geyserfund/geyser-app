import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { PiArrowsDownUp, PiCaretDown, PiCheck, PiStack, PiTag } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useFilterContext } from '@/context/filter.tsx'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '@/modules/discovery/graphql/queries/projectsQuery.ts'
import { PageSectionHeader } from '@/shared/components/layouts/PageSectionHeader.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import {
  CampaignsSeoImageUrl,
  FundraisersSeoImageUrl,
  getPath,
  GeyserMainSeoImageUrl,
  PathName,
} from '@/shared/constants/index.ts'
import {
  ProjectCategoryLabel,
  ProjectCategoryList,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
  ProjectSubCategoryMap,
} from '@/shared/constants/platform/projectCategory.ts'
import { getCircularGrantGeoWhere } from '@/shared/constants/platform/regionCountryCodes.ts'
import { useQueryWithPagination } from '@/shared/hooks/useQueryWithPagination.tsx'
import { getIsAonActive } from '@/shared/utils/hooks/useProjectToolKit.ts'
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
import { isActive } from '@/utils/validations/project.ts'

import { RenderProjectList } from './navView/components/RenderProjectList.tsx'
import { ProjectsRegionCountryFilter } from './ProjectsRegionCountryFilter.tsx'

type SortOption = 'most_funded_this_month' | 'most_funded' | 'most_recent'
type ProjectTypeFilter = 'all' | 'fundraisers' | 'campaigns' | 'circular-grants'
type CategoryFilterOptionValue = 'all' | `category:${ProjectCategory}` | `subCategory:${ProjectSubCategory}`
type FilterDropdownOption<T extends string> = {
  dividerBefore?: boolean
  label: string
  value: T
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

  if (projectTypeFilter === 'circular-grants') {
    return getPath('discoveryCircularGrantProjects')
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

  if (projectTypeFilter === 'circular-grants') {
    return getPath('discoveryCircularGrantProjectsCategory', category)
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

  if (projectTypeFilter === 'circular-grants') {
    return getPath('discoveryCircularGrantProjectsSubCategory', subCategory)
  }

  return getPath('discoveryProjectsSubCategory', subCategory)
}

const getIsSuccessfullyFundedCampaignsRoute = (pathname: string) => {
  return pathname === getPath('discoveryCampaignsSuccessfullyFunded')
}

const getProjectTypeFilter = (pathname: string): ProjectTypeFilter => {
  const rootSegment = pathname.split('/').filter(Boolean)[0]

  if (rootSegment === PathName.campaigns) {
    return 'campaigns'
  }

  if (rootSegment === PathName.fundraisers) {
    return 'fundraisers'
  }

  if (rootSegment === PathName.circularGrants) {
    return 'circular-grants'
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

const getIsCircularGrantFilter = (projectTypeFilter: ProjectTypeFilter) =>
  projectTypeFilter === 'circular-grants' ? true : undefined

const getProjectTypeLabel = (projectTypeFilter: ProjectTypeFilter, t: TranslateFn) => {
  if (projectTypeFilter === 'campaigns') {
    return t('campaigns')
  }

  if (projectTypeFilter === 'fundraisers') {
    return t('fundraisers')
  }

  if (projectTypeFilter === 'circular-grants') {
    return t('circular grants')
  }

  return t('projects')
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

  if (projectTypeFilter === 'circular-grants') {
    return {
      title: t('Circular Grants'),
      description: t('Discover circular grant projects on Geyser. Support reusable capital for local entrepreneurs.'),
      image: GeyserMainSeoImageUrl,
    }
  }

  return {
    title: t('Projects'),
    description: t('Discover projects on Geyser. Browse fundraisers and campaigns in one place.'),
    image: GeyserMainSeoImageUrl,
  }
}

const getDefaultSortOption = (
  projectTypeFilter: ProjectTypeFilter,
  supportsMostFundedThisMonth: boolean,
): SortOption => {
  if (projectTypeFilter === 'campaigns') {
    return 'most_recent'
  }

  return supportsMostFundedThisMonth ? 'most_funded_this_month' : 'most_funded'
}

const getSortOption = (
  sortParam: string | null,
  supportsMostFundedThisMonth: boolean,
  projectTypeFilter: ProjectTypeFilter,
): SortOption => {
  if (sortParam === 'most_funded') {
    return 'most_funded'
  }

  if (sortParam === 'most_recent') {
    return 'most_recent'
  }

  if (sortParam === 'most_funded_this_week' || sortParam === 'most_funded_this_month') {
    return supportsMostFundedThisMonth ? 'most_funded_this_month' : 'most_funded'
  }

  return getDefaultSortOption(projectTypeFilter, supportsMostFundedThisMonth)
}

const isCampaignProjectStillRaising = (project: ProjectForLandingPageFragment) => {
  return isActive(project.status) && getIsAonActive(project)
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

    if (nextProjectTypeFilter === 'circular-grants') {
      return getPath('discoveryCircularGrantProjectsInYourRegion')
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
  const {
    filters: { category, countryCode: filterCountryCode, region, search, subCategory, tagIds },
  } = useFilterContext()

  const projectTypeFilter = getProjectTypeFilter(location.pathname)
  const isSuccessfullyFundedCampaignsRoute = getIsSuccessfullyFundedCampaignsRoute(location.pathname)
  const projectTypeFilters = useMemo<Array<{ key: ProjectTypeFilter; label: string; path: string }>>(
    () => [
      { key: 'all', label: t('Projects'), path: getPath('discoveryProjects') },
      {
        key: 'circular-grants',
        label: t('Circular Grants'),
        path: getPath('discoveryCircularGrantProjects'),
      },
    ],
    [t],
  )
  const shouldFilterByUserRegion =
    location.pathname === getPath('discoveryProjectsInYourRegion') ||
    location.pathname === getPath('discoveryFundraisersInYourRegion') ||
    location.pathname === getPath('discoveryCampaignsInYourRegion') ||
    location.pathname === getPath('discoveryCircularGrantProjectsInYourRegion')
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const isCategoryRoute = pathSegments.includes(PathName.category)
  const isSubCategoryRoute = pathSegments.includes(PathName.subCategory)
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
  const supportsMostFundedThisMonth =
    !isSuccessfullyFundedCampaignsRoute &&
    projectTypeFilter !== 'circular-grants' &&
    !hasSearchFilter &&
    tagFiltersCount === 0
  const sort = getSortOption(searchParams.get(SORT_SEARCH_PARAM), supportsMostFundedThisMonth, projectTypeFilter)
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
      isCircularGrant: getIsCircularGrantFilter(projectTypeFilter),
      aonGoalReached: isSuccessfullyFundedCampaignsRoute || undefined,
      ...(projectTypeFilter === 'circular-grants' ? getCircularGrantGeoWhere(region) : { region }),
      search,
      status: ProjectsGetWhereInputStatus.Active,
      subCategory: subCategory as ProjectSubCategory | undefined,
      tagIds: tagIds?.length ? tagIds : undefined,
    }),
    [
      category,
      countryCode,
      filterCountryCode,
      isSuccessfullyFundedCampaignsRoute,
      projectTypeFilter,
      region,
      search,
      subCategory,
      tagIds,
    ],
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
  const resultMap =
    projectTypeFilter === 'campaigns' && !isSuccessfullyFundedCampaignsRoute
      ? (projects: ProjectForLandingPageFragment[]) => projects.filter(isCampaignProjectStillRaising)
      : undefined

  const { data, error, fetchNext, isLoading, isLoadingMore, noMoreItems, refetch } =
    useQueryWithPagination<ProjectForLandingPageFragment>({
      itemLimit: PAGE_SIZE,
      orderBy,
      resultMap,
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
  const projectFilter =
    projectTypeFilter === 'campaigns' && !isSuccessfullyFundedCampaignsRoute ? isCampaignProjectStillRaising : undefined
  const toolbarDividerColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')

  const handleSortChange = (nextSort: SortOption) => {
    const nextSearchParams = new URLSearchParams(searchParams)
    const shouldClearSortParam = nextSort === getDefaultSortOption(projectTypeFilter, supportsMostFundedThisMonth)

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
            projectType: getProjectTypeLabel(projectTypeFilter, t),
          })
        : sort === 'most_recent'
        ? t('recent {{projectType}}', {
            projectType: getProjectTypeLabel(projectTypeFilter, t),
          })
        : t('{{projectType}}', {
            projectType: getProjectTypeLabel(projectTypeFilter, t),
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

    if (projectTypeFilter === 'circular-grants') {
      return {
        ctaLabel: t('Fundraisers'),
        to: getSuggestedViewDestination({ nextProjectTypeFilter: 'fundraisers' }),
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

        <HStack
          w="full"
          spacing={2}
          whiteSpace="nowrap"
          flexShrink={0}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          overflowX={{ base: 'visible', md: 'auto' }}
          sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <HStack spacing={2} whiteSpace="nowrap" flexShrink={0}>
            <ProjectsToolbarSelect
              icon={PiStack}
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
              icon={PiTag}
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
            <ProjectsToolbarSelect
              icon={PiArrowsDownUp}
              options={sortOptions}
              value={sort}
              onChange={handleSortChange}
            />
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
            projectFilter={projectFilter}
            emptyState={<ProjectsFilterEmptyState message={emptyStateMessage} suggestion={emptyStateSuggestion} />}
            trendingAmountLabel={t('raised this month')}
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
    <VStack w="full" borderWidth="0.5px" borderColor={borderColor} borderRadius="card" padding={{ base: 4, md: 5 }}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        w="full"
        justifyContent="center"
        spacing={1}
        color="neutral1.11"
        fontSize="sm"
        textAlign="center"
      >
        <Body w={{ base: 'full', md: 'auto' }}>{message}.</Body>
        {suggestion ? (
          <HStack justifyContent="center" spacing={1} flexWrap="wrap">
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
          </HStack>
        ) : (
          <Body w={{ base: 'full', md: 'auto' }}>{t('Try a broader filter or clear your current selection')}.</Body>
        )}
      </Stack>
    </VStack>
  )
}

type ProjectsToolbarSelectProps<T extends string> = {
  defaultLabel?: string
  icon: IconType
  onChange: (value: T) => void
  options: Array<FilterDropdownOption<T>>
  value: T
}

const ProjectsToolbarSelect = <T extends string>({
  defaultLabel,
  icon,
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
          leftIcon={<Icon as={icon} />}
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
