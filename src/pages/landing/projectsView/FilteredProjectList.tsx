import { useQuery } from '@apollo/client'
import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'

import { CardLayout } from '../../../components/layouts'
import { ID } from '../../../constants'
import { ScrollInvoke } from '../../../helpers'
import { useQueryWithPagination } from '../../../hooks'
import { FilterState } from '../../../hooks/state'
import {
  GetProjectsMostFundedOfTheWeekInput,
  Project,
  ProjectsMostFundedOfTheWeekGet,
} from '../../../types'
import { useMobileMode } from '../../../utils'
import {
  QUERY_PROJECTS_FOR_LANDING_PAGE,
  QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE,
} from '../projects.graphql'
import { LandingProjectCard } from './components'
import { FilterTopBar } from './FilterTopBar'

const NO_OF_PROJECT_TO_LOAD_FILTER_VIEW = 20

interface FilteredProjectListProps extends FilterState {
  projects: Project[]
  error?: any
}

export const FilteredProjectList = ({
  filters,
  updateFilter,
  projects,
  error,
}: FilteredProjectListProps) => {
  return (
    <CardLayout w="full" spacing="30px" padding="20px">
      <FilterTopBar {...{ filters, updateFilter }} />
      {error ? (
        <Text> Could not find any results</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, xl: 3 }}
          spacingX="20px"
          spacingY="20px"
        >
          {projects.map((project) => {
            return (
              <GridItem key={project.id} overflow="hidden">
                <LandingProjectCard project={project} />
              </GridItem>
            )
          })}
        </SimpleGrid>
      )}
    </CardLayout>
  )
}

export const PaginatedView = ({ filters, updateFilter }: FilterState) => {
  const isMobile = useMobileMode()
  const { sort, recent, ...restFilters } = filters

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: projects,
    error,
    fetchNext,
  } = useQueryWithPagination<Project>({
    itemLimit: 20,
    queryName: ['projects', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    where: { ...restFilters },
    orderBy: sort,
  })

  return (
    <>
      <FilteredProjectList {...{ filters, updateFilter, projects, error }} />
      <ScrollInvoke
        elementId={isMobile ? undefined : ID.root}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </>
  )
}

export const TrendingView = ({ filters, updateFilter }: FilterState) => {
  const { tagIds = [] } = filters
  const { data, loading, error } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    { input: GetProjectsMostFundedOfTheWeekInput }
  >(QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds,
        take: NO_OF_PROJECT_TO_LOAD_FILTER_VIEW,
      },
    },
  })
  const projects =
    data?.projectsMostFundedOfTheWeekGet.map(
      (returnvalue) => returnvalue.project,
    ) || []

  return <FilteredProjectList {...{ filters, updateFilter, projects, error }} />
}
