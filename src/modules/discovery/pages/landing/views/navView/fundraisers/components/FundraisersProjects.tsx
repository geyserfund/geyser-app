import { HStack, Select, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'

import { useFilterContext } from '@/context/filter.tsx'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '@/modules/discovery/graphql/queries/projectsQuery.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useQueryWithPagination } from '@/shared/hooks/useQueryWithPagination.tsx'
import {
  OrderByDirection,
  ProjectCategory,
  ProjectForLandingPageFragment,
  ProjectFundingStrategy,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  ProjectSubCategory,
} from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'

type FundraisersProjectsProps = {
  countryCode?: string
}

type SortOption = 'most_funded' | 'most_recent'

const PAGE_SIZE = 20
const SORT_SEARCH_PARAM = 'sort'

export const FundraisersProjects = ({ countryCode }: FundraisersProjectsProps) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    filters: { category, countryCode: filterCountryCode, region, search, subCategory, tagIds },
  } = useFilterContext()

  const sortParam = searchParams.get(SORT_SEARCH_PARAM)
  const sort: SortOption = sortParam === 'most_recent' ? 'most_recent' : 'most_funded'

  const where = useMemo(
    () => ({
      category: category as ProjectCategory | undefined,
      countryCode: countryCode ?? filterCountryCode,
      fundingStrategy: ProjectFundingStrategy.TakeItAll,
      region,
      search,
      status: ProjectsGetWhereInputStatus.Active,
      subCategory: subCategory as ProjectSubCategory | undefined,
      tagIds: tagIds?.length ? tagIds : undefined,
    }),
    [category, countryCode, filterCountryCode, region, search, subCategory, tagIds],
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

  const { data, error, fetchNext, isLoading, isLoadingMore, noMoreItems } =
    useQueryWithPagination<ProjectForLandingPageFragment>({
      itemLimit: PAGE_SIZE,
      orderBy,
      query: QUERY_PROJECTS_FOR_LANDING_PAGE,
      queryName: ['projectsGet', 'projects'],
      where,
    })

  const handleSortChange = (nextSort: SortOption) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextSort === 'most_funded') {
      nextSearchParams.delete(SORT_SEARCH_PARAM)
    } else {
      nextSearchParams.set(SORT_SEARCH_PARAM, nextSort)
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  return (
    <VStack w="full" spacing={7} alignItems="start">
      <HStack w="full" justifyContent="end" spacing={2}>
        <Body size="sm" light>
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

      {error ? <Body>{t('Failed to fetch projects')}</Body> : null}

      <RenderProjectList
        projects={data}
        loading={isLoading}
        isLoadingMore={isLoadingMore}
        noMoreItems={noMoreItems}
        fetchNext={fetchNext}
      />
    </VStack>
  )
}
