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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretLeft, PiCaretRight, PiCheck } from 'react-icons/pi'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

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
type FilterDropdownOption<T extends string> = {
  label: string
  value: T
}
type TranslateFn = (key: string) => string

const PAGE_SIZE = 20
const SORT_SEARCH_PARAM = 'sort'
const MOST_FUNDED_THIS_MONTH_PAGE_SIZE = 30

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

const getCategoryTabs = (projectTypeFilter: ProjectTypeFilter, t: TranslateFn) => {
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

  if (nextProjectTypeFilter === 'campaigns') {
    return getPath('discoveryCampaigns')
  }

  if (nextProjectTypeFilter === 'fundraisers') {
    return getPath('discoveryFundraisers')
  }

  return getPath('discoveryProjects')
}

/** Renders the unified discovery projects page with funding-strategy URL filters. */
export const Projects = () => {
  const { t } = useTranslation()
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
                  key={tab.path}
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

type ProjectsToolbarSelectProps<T extends string> = {
  onChange: (value: T) => void
  options: Array<FilterDropdownOption<T>>
  value: T
}

const ProjectsToolbarSelect = <T extends string>({ onChange, options, value }: ProjectsToolbarSelectProps<T>) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

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
          {selectedOption?.label}
        </Button>
      </PopoverTrigger>

      <PopoverContent width="240px" maxWidth="calc(100vw - 32px)">
        <PopoverBody padding={2}>
          <VStack align="stretch" spacing={1}>
            {options.map((option) => {
              const isSelected = option.value === value

              return (
                <Button
                  key={option.value}
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
              )
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
